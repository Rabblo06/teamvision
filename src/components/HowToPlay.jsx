import React from 'react';

const STEPS = [
  {
    icon: '🗺️',
    title: '1. Choose a Level',
    desc: 'Start with Level 1 and unlock each subsequent level by completing the one before it. Levels are grouped into Beginner, Intermediate, and Advanced tiers.',
  },
  {
    icon: '🎯',
    title: '2. Read the Scenario',
    desc: 'Each question presents a real-world scenario — a suspicious email, a text message, a social media post, or a Wi-Fi choice. Read it carefully before answering.',
  },
  {
    icon: '🤔',
    title: '3. Make Your Decision',
    desc: 'Select your answer. If you are unsure, use the hint (💡) — but it costs 2 points. Take your time; there is rarely a rush (except on timed levels).',
  },
  {
    icon: '📖',
    title: '4. Learn from Feedback',
    desc: 'After each answer, you receive an explanation telling you exactly why it was right or wrong. This is the most important part — read it carefully.',
  },
  {
    icon: '⭐',
    title: '5. Earn Stars and Badges',
    desc: 'Score 80%+ to earn 3 stars. Complete certain levels to earn special badges. Track all your progress in My Progress and the Badges section.',
  },
];

const TYPES = [
  { icon: '🎣', label: 'Phishing Email', desc: 'Decide: Legitimate or Phishing?' },
  { icon: '📱', label: 'Text Message', desc: 'Decide: Legitimate or Scam?' },
  { icon: '🔘', label: 'Multiple Choice', desc: 'Choose the best answer (A–D).' },
  { icon: '📲', label: 'Social Media Post', desc: 'Decide: Safe to share or Not safe?' },
  { icon: '🔗', label: 'URL Check', desc: 'Decide: Safe link or Dangerous?' },
  { icon: '📶', label: 'Wi-Fi Selection', desc: 'Choose the safest available network.' },
  { icon: '🔒', label: 'Password Builder', desc: 'Type a password to meet the target strength.' },
];

const HowToPlay = ({ onBack }) => (
  <div className="howtoplay-screen">
    <h1 className="howtoplay-title">How CyberSafe Quest Works</h1>
    <p className="howtoplay-intro">
      CyberSafe Quest teaches you to recognise and respond to real-world cybersecurity threats
      through interactive scenarios. Complete 12 levels at your own pace — no prior knowledge required.
    </p>

    <section aria-labelledby="steps-title">
      <h2 id="steps-title" className="section-title">How to Play</h2>
      <div className="howtoplay-steps">
        {STEPS.map((step, i) => (
          <div key={i} className="howtoplay-step">
            <div className="step-icon-wrap">
              <span className="step-icon" aria-hidden="true">{step.icon}</span>
            </div>
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section aria-labelledby="types-title">
      <h2 id="types-title" className="section-title">Question Types</h2>
      <div className="howtoplay-types-grid">
        {TYPES.map((t, i) => (
          <div key={i} className="type-card">
            <span className="type-icon" aria-hidden="true">{t.icon}</span>
            <span className="type-label">{t.label}</span>
            <span className="type-desc">{t.desc}</span>
          </div>
        ))}
      </div>
    </section>

    <section aria-labelledby="scoring-title">
      <h2 id="scoring-title" className="section-title">Scoring</h2>
      <div className="howtoplay-scoring-grid">
        <div className="scoring-card">
          <span className="scoring-icon">✅</span>
          <div>
            <div className="scoring-label">Correct answer</div>
            <div className="scoring-value">+10 points</div>
          </div>
        </div>
        <div className="scoring-card">
          <span className="scoring-icon">💡</span>
          <div>
            <div className="scoring-label">Correct with hint</div>
            <div className="scoring-value">+8 points</div>
          </div>
        </div>
        <div className="scoring-card">
          <span className="scoring-icon">❌</span>
          <div>
            <div className="scoring-label">Wrong answer</div>
            <div className="scoring-value">+0 points</div>
          </div>
        </div>
      </div>

      <div className="star-thresholds">
        <h3 className="star-thresholds-title">Star Ratings</h3>
        <div className="star-row-item"><span>⭐⭐⭐</span><span>80% or above</span></div>
        <div className="star-row-item"><span>⭐⭐</span><span>60–79%</span></div>
        <div className="star-row-item"><span>⭐</span><span>40–59%</span></div>
        <div className="star-row-item"><span>—</span><span>Below 40%</span></div>
      </div>
    </section>

    <section aria-labelledby="tips-title" className="howtoplay-tips-section">
      <h2 id="tips-title" className="section-title">General Tips</h2>
      <ul className="howtoplay-tips-list">
        <li>Read every question and scenario carefully — scammers hide details in plain sight.</li>
        <li>Check sender email addresses and URLs character by character.</li>
        <li>Urgency and threats are almost always red flags — pause before you act.</li>
        <li>Use hints if you are genuinely unsure — the explanations will help you learn.</li>
        <li>Retry levels to improve your score and fully absorb the explanations.</li>
      </ul>
    </section>

    <div className="howtoplay-footer">
      <button className="btn-primary btn-large" onClick={onBack}>
        ▶ Start Training
      </button>
    </div>
  </div>
);

export default HowToPlay;
