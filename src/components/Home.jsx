import React from 'react';
import { getState } from '../utils/storage';
import { LEVELS } from '../data/levels';

const FEATURES = [
  { icon: '🎣', title: 'Spot Phishing', desc: 'Learn to identify fake emails, texts, and websites before they catch you out.' },
  { icon: '🔒', title: 'Strong Passwords', desc: 'Build passwords that resist attacks and discover why unique passwords matter.' },
  { icon: '🛡️', title: 'Protect Your Privacy', desc: 'Know what to share online — and what to keep private.' },
  { icon: '📶', title: 'Safe Browsing', desc: 'Navigate public Wi-Fi, online shopping, and unknown links safely.' },
  { icon: '💻', title: 'Device Security', desc: 'Keep your phone, computer, and accounts secure against modern threats.' },
  { icon: '🏆', title: '12 Levels', desc: 'Progress from beginner to cyber champion with increasing challenges and real-life scenarios.' },
];

const Home = ({ onStart, onHowToPlay }) => {
  const state = getState();
  const completed = state.completedLevels.length;
  const pct = Math.round((completed / LEVELS.length) * 100);

  return (
    <div className="home-screen">
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-badge">🛡️ Team Vision</div>
        <h1 id="hero-title" className="hero-title">
          <span className="hero-cyber">CyberSafe</span>
          <span className="hero-quest">Quest</span>
        </h1>
        <p className="hero-tagline">Think. Protect. Stay Safe.</p>
        <p className="hero-desc">
          An interactive cybersecurity awareness programme designed for adults.
          Learn to recognise scams, phishing attacks, and online threats through
          real-life scenarios — at your own pace.
        </p>

        <div className="hero-actions">
          <button className="btn-primary btn-large" onClick={onStart}>
            {completed > 0 ? '▶ Continue Training' : '▶ Start Training'}
          </button>
          <button className="btn-secondary btn-large" onClick={onHowToPlay}>
            ❓ How It Works
          </button>
        </div>

        {completed > 0 && (
          <div className="hero-progress">
            <div className="hero-progress-label">
              <span>Your progress</span>
              <span>{completed}/{LEVELS.length} levels complete</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
      </section>

      {/* Stats bar */}
      <section className="stats-bar" aria-label="Programme overview">
        <div className="stat-item">
          <span className="stat-num">12</span>
          <span className="stat-lbl">Levels</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-num">70+</span>
          <span className="stat-lbl">Questions</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-num">10</span>
          <span className="stat-lbl">Badges</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-num">~45</span>
          <span className="stat-lbl">Minutes</span>
        </div>
      </section>

      {/* Features grid */}
      <section className="features-section" aria-labelledby="features-title">
        <h2 id="features-title" className="section-title">What You Will Learn</h2>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card">
              <span className="feature-icon" aria-hidden="true">{f.icon}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Vision footer note */}
      <section className="home-footer">
        <p>Developed by <strong>Team Vision</strong> · Cybersecurity Awareness Programme</p>
        <p className="home-footer-sub">This training uses simulated scenarios for educational purposes only.</p>
      </section>
    </div>
  );
};

export default Home;
