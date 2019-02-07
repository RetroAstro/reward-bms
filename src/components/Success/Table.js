import React from 'react'
import local from '@utils/local'

const Table = () => {
  var failMsg = local.getLocal('failMsg')
  return (
    <div className='table-box'>
      {
        failMsg.length ? failMsg.map((item, i) => (
          <div className='row' key={i}>
            {
              Object.entries(item)
                .map(([key, value]) => (
                  <div className='flex-center' key={key}>
                    <span>{value}</span>
                  </div>
                ))
            }
          </div>
        )) : null
      }
    </div>
  )
}

export default Table
