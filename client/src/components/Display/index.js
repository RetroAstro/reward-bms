import React from 'react'
import Header from './Header'
import Main from './Main'
import { fetchtoLocal } from '../../apis'

import './display.scss'

fetchtoLocal()

const Display = () => (
  <div className="display">
    <Header />
    <Main />
  </div>
)

export default Display
