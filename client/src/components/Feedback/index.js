import React from 'react'
import Header from './Header'
import Feed from './Feed'
import Export from './Export'

import './feedback.scss'

const Feedback = () => (
  <div className="feedback">
    <Header />
    <Feed />
    <Export />
  </div>
)

export default Feedback
