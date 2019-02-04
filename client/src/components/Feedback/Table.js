import React from 'react'

const Table = ({ items }) => (
  <div className="table-box">
    <ul className="table-list table-row">
      {
        items.map(
          (item, i) => (
            <li className="table-row" key={i}>
              {
                Object.entries(item)
                  .map(
                    ([key, value]) => (
                      <div className="flex-center" key={key}>
                        <span>{value}</span>
                      </div>
                    )
                  )
              }
            </li>
          )
        )
      }
    </ul>
  </div>
)

export default Table
