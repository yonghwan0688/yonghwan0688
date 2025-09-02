import React from 'react'
import './PortfolioPanel.css'

const PortfolioPanel = () => {
  return (
    <div className="portfolio-panel">
      <div className="portfolio-header">
        <span className="folder-icon">📁</span>
        <h3>PORTFOLIO</h3>
      </div>
      
      <div className="portfolio-navigation">
        <button className="nav-btn prev">←</button>
        <button className="nav-btn next">→</button>
      </div>
      
      <div className="portfolio-display">
        <div className="portfolio-content">
          <span className="browse-text">BROWSE MY GAMES</span>
          <div className="curved-arrow">↗</div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioPanel
