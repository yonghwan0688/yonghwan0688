import React from 'react'
import './ProfilePanel.css'

const ProfilePanel = ({ skills, onToggleSkill }) => {
  return (
    <div className="profile-panel">
      {/* Header */}
      <div className="profile-header">
        <h1>ESCAPEON</h1>
        <div className="logo">
          <div className="logo-bar"></div>
          <div className="logo-bar"></div>
          <div className="logo-bar"></div>
        </div>
      </div>
      
      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-avatar">
          <div className="avatar-character">
            <div className="character-face">
              <div className="glasses"></div>
            </div>
          </div>
          <div className="background-pattern">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="pattern-element">E</div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contact Button */}
      <button className="contact-btn">
        PLAY NOW
        <span className="arrow">→</span>
      </button>
      
      {/* Customizer */}
      <div className="customizer">
        <span className="gear-icon">⚙</span>
        <span>Game customizer</span>
      </div>
      
      {/* Skills */}
      <div className="skills">
        <div className="skill-item">
          <span>GAME DESIGNER</span>
          <div 
            className={`toggle ${skills.gameDesigner ? 'active' : ''}`}
            onClick={() => onToggleSkill('gameDesigner')}
          >
            <div className="toggle-circle"></div>
          </div>
        </div>
        
        <div className="skill-item">
          <span>GAME DEVELOPER</span>
          <div 
            className={`toggle ${skills.gameDeveloper ? 'active' : ''}`}
            onClick={() => onToggleSkill('gameDeveloper')}
          >
            <div className="toggle-circle"></div>
          </div>
        </div>
        
        <div className="skill-item">
          <span>CREATIVE CODER</span>
          <div 
            className={`toggle ${skills.creativeCoder ? 'active' : ''}`}
            onClick={() => onToggleSkill('creativeCoder')}
          >
            <div className="toggle-circle"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePanel
