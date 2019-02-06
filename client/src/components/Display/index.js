import React from 'react'
import Header from './Header'
import Main from './Main'
import { fetchtoLocal } from '../../apis'
import AcBoxContainer from '@cont/AcBox'

import './display.scss'

fetchtoLocal()

const shared = new AcBoxContainer()

const Display = () => (
  <div className="display">
    <Header shared={shared} />
    <Main shared={shared} />
  </div>
)

export default Display
