import React, { useState } from 'react'
import './App.css'
import ProfilePanel from './components/ProfilePanel'
import SocialPanel from './components/SocialPanel'
import PortfolioPanel from './components/PortfolioPanel'
import ExperiencePanel from './components/ExperiencePanel'
import SideProjectsPanel from './components/SideProjectsPanel'
import Footer from './components/Footer'

function App() {
  const [skills, setSkills] = useState({
    gameDesigner: true,
    gameDeveloper: true,
    creativeCoder: true
  })

  const toggleSkill = (skill) => {
    setSkills(prev => ({
      ...prev,
      [skill]: !prev[skill]
    }))
  }

  return (
    <div className="app">
      <div className="dashboard">
        {/* Left Panel - Profile */}
        <ProfilePanel 
          skills={skills} 
          onToggleSkill={toggleSkill}
        />
        
        {/* Center Section */}
        <div className="center-section">
          <SocialPanel />
          <PortfolioPanel />
          <ExperiencePanel />
        </div>
        
        {/* Right Panel - Side Projects */}
        <SideProjectsPanel />
      </div>
      
      <Footer />
    </div>
  )
}

export default App
