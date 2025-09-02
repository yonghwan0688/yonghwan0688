import React from 'react'
import './SideProjectsPanel.css'

const SideProjectsPanel = () => {
  return (
    <div className="side-projects-panel">
      <div className="side-projects-header">
        <span className="coffee-icon">☕</span>
        <h3>SIDE-PROJECTS</h3>
        <button className="mute-btn">
          <span className="speaker-icon">🔇</span>
        </button>
      </div>
      
      <div className="side-project-icons">
        <button className="project-icon yellow">
          <span className="mountain">🏔</span>
        </button>
        <button className="project-icon purple">
          <span className="abstract">◢</span>
        </button>
        <button className="project-icon pink">
          <span className="coo">COO</span>
        </button>
        <button className="project-icon green">
          <span className="vs">VS</span>
        </button>
      </div>
      
      <div className="expandable-section">
        <div className="grid-dots">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="dot"></div>
          ))}
        </div>
        <div className="expand-buttons">
          <button className="expand-btn">+</button>
          <button className="expand-btn">+</button>
          <button className="expand-btn">+</button>
          <button className="expand-btn">+</button>
        </div>
      </div>
    </div>
  )
}

export default SideProjectsPanel
