import React from 'react';

const NAV_ITEMS = [
  { id: 'map',      label: 'Missions',    icon: '🗺️' },
  { id: 'profile',  label: 'My Progress', icon: '📊' },
  { id: 'badges',   label: 'Badges',      icon: '🏅' },
  { id: 'settings', label: 'Settings',    icon: '⚙️' },
  { id: 'howtoplay',label: 'Help',        icon: '❓' },
];

const Header = ({ screen, onNav, soundEnabled, onToggleSound }) => (
  <header className="app-header">
    <div className="header-inner">
      <button className="header-logo" onClick={() => onNav('home')} aria-label="CyberSafe Quest Home">
        <span className="logo-icon">🛡️</span>
        <div className="logo-text">
          <span className="logo-title">CyberSafe Quest</span>
          <span className="logo-tagline">Think. Protect. Stay Safe.</span>
        </div>
      </button>

      <nav className="header-nav" role="navigation" aria-label="Main navigation">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`nav-btn ${screen === item.id ? 'nav-btn--active' : ''}`}
            onClick={() => onNav(item.id)}
            aria-current={screen === item.id ? 'page' : undefined}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <button
        className="sound-toggle"
        onClick={() => onToggleSound(!soundEnabled)}
        aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
        title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>
    </div>
  </header>
);

export default Header;
