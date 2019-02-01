import axios from 'axios'
import QRcode from 'qrcode'
import bus from '@utils/bus'
import local from '@utils/local'

const createForm = data => {
  var form = new FormData()
  Object.entries(data)
    .map(([key, value]) => {
      form.append(key, value)
    })
  return form
}

export const requestLogin = data => {
  return axios({
    method: 'POST',
    url: '/accept_prize/login',
    data: data
  })
}

export const fetchtoLocal = async () => {
  var token = local.getLocal('token')
  var form = createForm({
    page: 0,
    pagesize: 5,
    token: token
  })
  var res = await axios.post('/accept_prize/showActivity', form)
  var items = res.data.data.filter(item => item.status === 2)
  var result = await Promise.all(
    items.map(async ({ actid }) => {
      var res = await axios
        .post('/accept_prize/showTemp', createForm({
          actid: actid,
          token: token
        }))
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
  var data = temps
    .concat(res.data.data
      .filter(item => item.status !== 2)
      .map(item => ({
        actid: item.actid,
        acname: item.actname,
        status: item.status,
        qrurls: item.urls
      })))
  local.setLocal('dataList', data)
  bus.emit('renderInitialList', data)
}

export const saveEdit = data => {
  var typeA = data.typelist
    .map(item => ({
      mark: item.mark,
      reward: item.prize_name,
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
    url: '/accept_prize/tempAct',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
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
  var res = await instance.post('/accept_prize/specifiedAct', data)
  var result = await Promise.all(
    Object.entries(res.data.aactID)
      .map(([key, value]) => (async () => {
        var url = await QRcode
          .toDataURL(`https://wx.idsbllp.cn/game/api/index.php?redirect=http://zblade.top/accept_prize/getPrizeA/${res.data.actid}/${value}`)
        return {
          url,
          prize: key,
          acname: data.acname,
          type: '指定类型'
        }
      })())
      .concat(
        Object.entries(res.data.bactID)
          .map(([key, value]) => (async () => {
            var url = await QRcode
              .toDataURL(`https://wx.idsbllp.cn/game/api/index.php?redirect=http://axrsqx.natappfree.cc/getPrizeB/${res.data.actid}/${value}`)
            return {
              url,
              prize: key,
              acname: data.acname,
              type: '非指定类型'
            }
          })())
      )
  )
  var acturls = result.map(item => ({
    url: item.url,
    reward: item.prize
  }))
  var sendData = JSON.stringify({
    actid: res.data.actid,
    acturl: acturls,
    token: local.getLocal('token')
  })
  console.log(sendData)
  await instance.post('/accept_prize/addActUrl', sendData)
  return result
}

export const deleteAct = (actid, acname) => {
  axios({
    method: 'POST',
    url: '/accept_prize/deleteActivity',
    data: createForm({
      actid: actid,
      activity: acname,
      token: local.getLocal('token')
    })
  })
}
