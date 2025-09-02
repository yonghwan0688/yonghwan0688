import React from 'react'
import './SocialPanel.css'

const SocialPanel = () => {
  return (
    <div className="social-panel">
      <div className="social-buttons">
        <button className="social-btn twitter">
          <span>X</span>
        </button>
        <button className="social-btn linkedin">
          <span>in</span>
        </button>
        <button className="social-btn webflow">
          <span>W</span>
        </button>
      </div>
    </div>
  )
}

export default SocialPanel
