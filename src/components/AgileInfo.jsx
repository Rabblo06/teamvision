import React, { useState } from 'react';

const SPRINTS = [
  {
    number: 1,
    icon: '🏗️',
    title: 'Foundation & Setup',
    week: 'Week 1',
    goal: 'Set up the project and deliver a working home screen',
    color: '#2563eb',
    tasks: [
      'Initialise Vite + React project',
      'Create folder structure (components, data, utils)',
      'Build App.jsx with screen navigation system',
      'Build Home screen component',
      'Create questions.js data file',
      'Set up base CSS styles',
    ],
    delivered: 'Working home screen with navigation',
  },
  {
    number: 2,
    icon: '🎮',
    title: 'Core Gameplay & Scoring',
    week: 'Week 2',
    goal: 'Players can play MCQ levels and see results',
    color: '#10b981',
    tasks: [
      'Build Gameplay component',
      'Build multiple-choice question type',
      'Build Results screen with star rating',
      'Create scoring utility',
      'Add Levels 1, 4, 5, 7, 11 (MCQ levels)',
      'Connect gameplay to results screen',
    ],
    delivered: '5 playable MCQ levels with score and stars',
  },
  {
    number: 3,
    icon: '📧',
    title: 'Scenario-Based Questions',
    week: 'Week 3',
    goal: 'Add real-world phishing email and SMS scam questions',
    color: '#f59e0b',
    tasks: [
      'Build Email phishing identification component',
      'Build SMS scam identification component',
      'Build Social media post review component',
      'Add Level 2 (Fake Bank Emails)',
      'Add Level 3 (Delivery Scam SMS)',
      'Add Level 8 (Social Media Privacy)',
    ],
    delivered: '3 new scenario-based question types across 3 levels',
  },
  {
    number: 4,
    icon: '🔗',
    title: 'Advanced Interactive Types',
    week: 'Week 4',
    goal: 'Add URL checking, Wi-Fi selection, and password building',
    color: '#a855f7',
    tasks: [
      'Build URL safety checker component',
      'Build Wi-Fi network selection component',
      'Build Password strength builder component',
      'Create password strength utility',
      'Add Level 9 (Online Shopping / URL Check)',
      'Add Level 10 (Public Wi-Fi Safety)',
      'Add Level 6 (Strong Password Builder)',
    ],
    delivered: '3 interactive question types across 3 more levels',
  },
  {
    number: 5,
    icon: '🏆',
    title: 'Gamification & Progression',
    week: 'Week 5',
    goal: 'Add mission map, badges, profile, and progress saving',
    color: '#ef4444',
    tasks: [
      'Build Mission Map with all 12 levels',
      'Build Badges collection screen',
      'Build Profile & stats screen',
      'Create localStorage persistence utility',
      'Implement badge award logic',
      'Show locked/unlocked state on map',
      'Display star ratings on completed levels',
    ],
    delivered: 'Progress saved, mission map, badges, and profile screen',
  },
  {
    number: 6,
    icon: '🚀',
    title: 'Polish & Deployment',
    week: 'Week 6',
    goal: 'Final challenge, sound effects, settings, and deploy',
    color: '#06b6d4',
    tasks: [
      'Add Level 12 (Final Challenge — 8 mixed questions)',
      'Build Settings screen with sound toggle',
      'Build How to Play guide screen',
      'Create sound effects utility',
      'Add click and completion sounds',
      'End-to-end testing of all 12 levels',
      'Push to GitHub and deploy',
    ],
    delivered: 'All 12 levels live, deployed, and accessible online',
  },
];

const USER_STORIES = [
  { id: 'US-01', story: 'See a home screen to start the game', priority: 'High' },
  { id: 'US-02', story: 'Answer multiple-choice cybersecurity questions', priority: 'High' },
  { id: 'US-03', story: 'Identify phishing emails from real ones', priority: 'High' },
  { id: 'US-04', story: 'Spot scam SMS messages', priority: 'High' },
  { id: 'US-05', story: 'Check if a URL is safe or dangerous', priority: 'High' },
  { id: 'US-06', story: 'Choose the safest Wi-Fi network in a scenario', priority: 'Medium' },
  { id: 'US-07', story: 'Build strong passwords and get live feedback', priority: 'Medium' },
  { id: 'US-08', story: 'Identify unsafe social media posts', priority: 'Medium' },
  { id: 'US-09', story: 'See my score and star rating after each level', priority: 'High' },
  { id: 'US-10', story: 'Earn badges for completing levels', priority: 'Medium' },
  { id: 'US-11', story: 'See a mission map with all levels and my progress', priority: 'Medium' },
  { id: 'US-12', story: 'Have my progress saved so I can return later', priority: 'Medium' },
  { id: 'US-13', story: 'Hear sound effects to make the game engaging', priority: 'Low' },
  { id: 'US-14', story: 'View my profile and overall stats', priority: 'Low' },
  { id: 'US-15', story: 'Read a How to Play guide', priority: 'Low' },
  { id: 'US-16', story: 'Toggle sound on and off in settings', priority: 'Low' },
];

const PRINCIPLES = [
  { icon: '🔄', title: 'Iterative Delivery', desc: 'Each sprint delivered working software, not just plans.' },
  { icon: '👤', title: 'User Stories', desc: 'Features defined from the player\'s point of view.' },
  { icon: '📋', title: 'Product Backlog', desc: 'All 16 features prioritised before development began.' },
  { icon: '⏱️', title: '1-Week Sprints', desc: '6 sprints of one week each — focused and deliverable.' },
  { icon: '🔍', title: 'Sprint Review', desc: 'Each sprint ended with a working demo and review.' },
  { icon: '📦', title: 'Version Control', desc: 'GitHub commits after every sprint to track progress.' },
];

const priorityColor = (p) => p === 'High' ? '#ef4444' : p === 'Medium' ? '#f59e0b' : '#10b981';

const AgileInfo = ({ onBack }) => {
  const [activeSprint, setActiveSprint] = useState(null);

  return (
    <div className="agile-screen">
      <h1 className="agile-title">How We Built This Game</h1>
      <p className="agile-intro">
        CyberSafe Quest was developed using <strong>Agile methodology</strong> — specifically the
        Scrum framework. The project was broken into <strong>6 one-week sprints</strong>, each
        delivering a working part of the game. Click any sprint to see what was built.
      </p>

      {/* Agile Principles */}
      <section className="agile-section" aria-labelledby="principles-title">
        <h2 id="principles-title" className="section-title">Agile Principles Applied</h2>
        <div className="agile-principles-grid">
          {PRINCIPLES.map((p, i) => (
            <div key={i} className="agile-principle-card">
              <span className="agile-principle-icon">{p.icon}</span>
              <h3 className="agile-principle-title">{p.title}</h3>
              <p className="agile-principle-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sprint Timeline */}
      <section className="agile-section" aria-labelledby="sprints-title">
        <h2 id="sprints-title" className="section-title">Sprint Timeline</h2>
        <div className="agile-sprints-grid">
          {SPRINTS.map((sprint) => (
            <button
              key={sprint.number}
              className={`agile-sprint-card ${activeSprint === sprint.number ? 'agile-sprint-card--active' : ''}`}
              style={{ '--sprint-color': sprint.color }}
              onClick={() => setActiveSprint(activeSprint === sprint.number ? null : sprint.number)}
              aria-expanded={activeSprint === sprint.number}
            >
              <div className="sprint-card-header">
                <span className="sprint-icon">{sprint.icon}</span>
                <div className="sprint-card-meta">
                  <span className="sprint-number">Sprint {sprint.number} · {sprint.week}</span>
                  <span className="sprint-card-title">{sprint.title}</span>
                </div>
                <span className="sprint-chevron">{activeSprint === sprint.number ? '▲' : '▼'}</span>
              </div>

              {activeSprint === sprint.number && (
                <div className="sprint-card-body">
                  <p className="sprint-goal"><strong>Goal:</strong> {sprint.goal}</p>
                  <ul className="sprint-task-list">
                    {sprint.tasks.map((task, i) => (
                      <li key={i} className="sprint-task-item">
                        <span className="sprint-task-check">✓</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                  <div className="sprint-delivered">
                    <span className="sprint-delivered-label">Delivered:</span> {sprint.delivered}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* User Stories */}
      <section className="agile-section" aria-labelledby="stories-title">
        <h2 id="stories-title" className="section-title">Product Backlog — User Stories</h2>
        <p className="agile-section-desc">
          All features were written as user stories before development began: <em>"As a player, I want to…"</em>
        </p>
        <div className="agile-stories-table">
          <div className="stories-table-header">
            <span>ID</span>
            <span>As a player, I want to…</span>
            <span>Priority</span>
          </div>
          {USER_STORIES.map((s) => (
            <div key={s.id} className="stories-table-row">
              <span className="story-id">{s.id}</span>
              <span className="story-text">{s.story}</span>
              <span className="story-priority" style={{ color: priorityColor(s.priority) }}>
                {s.priority}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Summary stats */}
      <section className="agile-section agile-summary">
        <div className="agile-stat">
          <span className="agile-stat-num">6</span>
          <span className="agile-stat-lbl">Sprints</span>
        </div>
        <div className="agile-stat-divider" />
        <div className="agile-stat">
          <span className="agile-stat-num">16</span>
          <span className="agile-stat-lbl">User Stories</span>
        </div>
        <div className="agile-stat-divider" />
        <div className="agile-stat">
          <span className="agile-stat-num">12</span>
          <span className="agile-stat-lbl">Levels Built</span>
        </div>
        <div className="agile-stat-divider" />
        <div className="agile-stat">
          <span className="agile-stat-num">68</span>
          <span className="agile-stat-lbl">Questions</span>
        </div>
      </section>

      <div className="howtoplay-footer">
        <button className="btn-primary btn-large" onClick={onBack}>
          ← Back
        </button>
      </div>
    </div>
  );
};

export default AgileInfo;
