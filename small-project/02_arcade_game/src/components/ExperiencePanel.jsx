import React from 'react'
import './ExperiencePanel.css'

const ExperiencePanel = () => {
  return (
    <div className="experience-panel">
      <div className="color-circles">
        <div className="color-circle red"></div>
        <div className="color-circle blue"></div>
        <div className="color-circle yellow"></div>
        <div className="color-circle white"></div>
      </div>
      
      <div className="experience-indicator">
        <div className="experience-circle">
          <span className="years">3</span>
        </div>
        <span className="experience-text">YEARS OF GAME DEVELOPMENT</span>
      </div>
    </div>
  )
}

export default ExperiencePanel
