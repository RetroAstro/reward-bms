import axios from 'axios'
import hash from 'hash.js'
import bus from '@utils/bus'
import local from '@utils/local'

const createForm = data => {
  var form = new FormData()

  Object.entries(data)
    .map(([key, value]) => form.append(key, value))

  return form
}

const shuffle = array => {
  var t
  var i
  var m = array.length

  while (m) {
    i = Math.floor(Math.random() * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }

  return array
}

export const requestLogin = ({ username, password }) => {
  var encode = hash
    .sha256()
    .update('redrock' + password)
    .digest('hex')

  return axios({
    method: 'POST',
    url: '/prizetool/login',
    data: createForm({
      username,
      password: encode
    })
  })
}

export const loginOut = () => {
  return axios({
    method: 'POST',
    url: '/prizetool/loginOut',
    data: createForm({
      token: local.getLocal('token')
    })
  })
}

export const fetchtoLocal = async () => {
  var token = local.getLocal('token')
  var form = createForm({
    page: 0,
    pagesize: 5,
    token: token
  })
  var res = await axios.post('/prizetool/showActivity', form)
  var items = res.data.data.filter(item => item.status === 2)
  var result = await Promise.all(
    items.map(async ({ actid }) => {
      var res = await axios
        .post('/prizetool/showTemp', createForm({ actid, token }))

      return { ...res.data.data, actid }
    })
  )
  var temps = result
    .map(item => ({
      actid: item.actid,
      acname: item.activity,
      status: 2,
      typelist: item.typeA.map(item => ({
        mark: item.mark,
        prize_name: item.reward,
        prize_date: item.prizeDate,
        push_message: item.sendmsg,
        student_list: item.reqStudents,
        type: '指定类型'
      })),
      untypelist: item.typeB.map(item => ({
        mark: item.mark,
        prize_name: item.reward,
        type: '非指定类型'
      }))
    }))
  var actives = res.data.data.filter(item => item.status === 1)
  var qrData = actives
    .map(item => ({
      acname: item.actname,
      qrlist: item.urls
        .map(item => ({
          url: item.url,
          prize: item.reward
        }))
    }))
  var listData = temps
    .concat(
      actives
        .map(item => ({
          actid: item.actid,
          acname: item.actname,
          status: item.status
        }))
    )
  var ends = res.data.data.filter(item => item.status === 3)
  var historyData = ends.map(item => ({
    actid: item.actid,
    acname: item.actname
  }))

  local.setLocal('dataList', listData)
  local.setLocal('qrcodeList', qrData)
  local.setLocal('historyList', historyData)
  bus.emit('renderInitialdataList', listData)
}

export const saveEdit = data => {
  var typeA = data.typelist
    .map(item => ({
      mark: item.mark,
      reward: item.prize_name,
      prizeDate: item.prize_date,
      sendmsg: item.push_message,
      reqStudents: item.student_list
    }))
  var typeB = data.untypelist
    .map(item => ({
      mark: item.mark,
      reward: item.prize_name
    }))
  data = JSON.stringify({
    activity: data.acname,
    acturl: '',
    token: local.getLocal('token'),
    typeA: typeA,
    typeB: typeB
  })

  axios({
    method: 'POST',
    url: '/prizetool/tempAct',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

export const createAct = async data => {
  var instance = axios.create({
    headers: {
      'Content-Type': 'application/json'
    }
  })
  var typeA = data.typelist
    .map(item => ({
      mark: item.mark,
      reward: item.prize_name,
      prizeDate: item.prize_date,
      sendmsg: item.push_message,
      reqStudents: item.student_list
    }))
  var typeB = data.untypelist
    .map(item => ({
      mark: item.mark,
      reward: item.prize_name
    }))
  data = JSON.stringify({
    activity: data.acname,
    token: local.getLocal('token'),
    typeA,
    typeB
  })
  var res = await instance.post('/prizetool/specifiedAct', data)
  var result = Object.entries(res.data.aactID)
    .map(([key, value]) => ({
      url: `https://wx.redrock.team/game/api/index.php?redirect=http://api-234.redrock.team/prizetool/getPrizeA/${res.data.actid}/${value}`,
      prize: key,
      acname: data.acname,
      type: '指定类型'
    }))
    .concat(
      Object.entries(res.data.bactID)
        .map(([key, value]) => ({
          url: `https://wx.redrock.team/game/api/index.php?redirect=http://api-234.redrock.team/prizetool/getPrizeB/${res.data.actid}/${value}`,
          prize: key,
          acname: data.acname,
          type: '非指定类型'
        }))
    )
  var acturls = result.map(item => ({
    url: item.url,
    reward: item.prize
  }))
  var sendData = JSON.stringify({
    token: local.getLocal('token'),
    actid: res.data.actid,
    acturls: acturls
  })

  await instance.post('/prizetool/addActUrl', sendData)

  if (res.data.msg) {
    var failMsg = res.data.msg
      .map(item => ({
        stuname: item.stuname,
        college: item.college,
        stuid: item.stuid,
        telephone: item.telephone
      }))

    local.setLocal('failMsg', failMsg)
  }

  return result
}

export const endAct = (actid) => {
  axios({
    method: 'POST',
    url: '/prizetool/EndActivity',
    data: createForm({
      actid: actid,
      token: local.getLocal('token')
    })
  })
}

export const deleteTemp = (actid) => {
  axios({
    method: 'POST',
    url: '/prizetool/deleteTemp',
    data: createForm({
      actid: actid,
      token: local.getLocal('token')
    })
  })
}

export const deleteAct = (actid) => {
  axios({
    method: 'POST',
    url: '/prizetool/deleteActivity',
    data: createForm({
      actid,
      token: local.getLocal('token')
    })
  })
}

export const showType = async (actid, page, pagesize = 10) => {
  var res = await axios({
    method: 'POST',
    url: '/prizetool/showPrizerA',
    data: createForm({
      actid,
      page,
      pagesize,
      token: local.getLocal('token')
    })
  })
  var items = res.data.data
    .map((item, i) => ({
      '序号': i + 1,
      '领奖类型': '指定类型',
      '姓名': item.stuname,
      '学院': item.college,
      '学号': item.stuid,
      '电话': item.telephone,
      '奖品名称': item.reward,
      '推送情况': item.push_status ? '推送失败' : '推送成功',
      '领奖情况': item.status ? '已领取' : '未领取'
    }))

  return {
    items,
    total: res.data.total
  }
}

export const showUntype = async (actid, page, pagesize = 10) => {
  var res = await axios({
    method: 'POST',
    url: '/prizetool/showPrizerB',
    data: createForm({
      actid,
      page,
      pagesize,
      token: local.getLocal('token')
    })
  })
  var items = res.data.data
    .map((item, i) => ({
      '序号': i + 1,
      '领奖类型': '非指定类型',
      '姓名': item.stuname,
      '学院': item.college,
      '学号': item.stuid,
      '电话': item.telephone,
      '奖品名称': item.reward,
      '推送情况': item.push_status ? '推送成功' : '推送失败',
      '领奖情况': item.status ? '已领取' : '未领取'
    }))

  return {
    items,
    total: res.data.total
  }
}

export const showAll = async (actid, page) => {
  const SIZE = 10
  const MAX = 666666
  var dataOne = await showType(actid, 0, MAX)
  var dataTwo = await showUntype(actid, 0, MAX)
  var data = shuffle([...dataOne.items, ...dataTwo.items])
    .map((item, i) => {
      item['序号'] = i + 1
      return item
    })

  if (page) {
    var total = Math.ceil(data.length / SIZE)
    var current = page * SIZE
    var result = data
      .filter((item, i) => current >= data.length ? i + 1 > current - SIZE : i + 1 >= current - 9 && i + 1 <= current)

    return {
      total,
      items: result
    }
  }

  return {
    items: data
  }
}
