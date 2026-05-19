import React, { useState } from 'react';
import { resetAll } from '../utils/storage';

const Settings = ({ soundEnabled, onToggleSound, onBack }) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetDone, setResetDone]       = useState(false);

  const handleReset = () => {
    resetAll();
    setConfirmReset(false);
    setResetDone(true);
    setTimeout(() => window.location.reload(), 1500);
  };

  return (
    <div className="settings-screen">
      <h1 className="settings-title">⚙️ Settings</h1>

      {/* Sound */}
      <section className="settings-section" aria-labelledby="sound-heading">
        <h2 id="sound-heading" className="settings-section-title">Sound</h2>
        <div className="settings-row">
          <div>
            <span className="settings-row-label">Sound effects</span>
            <span className="settings-row-desc">Play audio feedback when you answer questions</span>
          </div>
          <button
            className={`toggle-btn ${soundEnabled ? 'toggle-btn--on' : 'toggle-btn--off'}`}
            onClick={() => onToggleSound(!soundEnabled)}
            role="switch"
            aria-checked={soundEnabled}
            aria-label="Toggle sound effects"
          >
            <span className="toggle-knob" />
            <span className="toggle-label">{soundEnabled ? 'On' : 'Off'}</span>
          </button>
        </div>
      </section>

      {/* About */}
      <section className="settings-section" aria-labelledby="about-heading">
        <h2 id="about-heading" className="settings-section-title">About</h2>
        <div className="settings-about-card">
          <div className="about-logo-row">
            <span className="about-logo-icon" aria-hidden="true">🛡️</span>
            <div>
              <div className="about-app-name">CyberSafe Quest</div>
              <div className="about-tagline">Think. Protect. Stay Safe.</div>
            </div>
          </div>
          <div className="about-info-row">
            <span>Version</span><span>1.0.0</span>
          </div>
          <div className="about-info-row">
            <span>Developed by</span><span>Team Vision</span>
          </div>
          <div className="about-info-row">
            <span>Target audience</span><span>Adults 18+</span>
          </div>
          <div className="about-info-row">
            <span>Purpose</span><span>Cybersecurity awareness education</span>
          </div>
          <p className="about-disclaimer">
            All scenarios in this application are fictional and created for educational purposes.
            They are designed to reflect common real-world threats to raise awareness and build confidence.
          </p>
        </div>
      </section>

      {/* Accessibility */}
      <section className="settings-section" aria-labelledby="access-heading">
        <h2 id="access-heading" className="settings-section-title">Accessibility</h2>
        <div className="settings-about-card">
          <p>This application is designed with accessibility in mind:</p>
          <ul className="access-list">
            <li>Large text (minimum 18px) throughout</li>
            <li>High contrast colour scheme</li>
            <li>Large tap/click targets (minimum 52px)</li>
            <li>Keyboard navigation support</li>
            <li>Screen reader compatible (ARIA labels)</li>
          </ul>
          <p>If you experience any accessibility issues, please contact your training coordinator.</p>
        </div>
      </section>

      {/* Reset progress */}
      <section className="settings-section settings-section--danger" aria-labelledby="reset-heading">
        <h2 id="reset-heading" className="settings-section-title">Reset Progress</h2>
        <p className="settings-row-desc">
          Permanently erase all your scores, badges, and unlocked levels. This cannot be undone.
        </p>

        {resetDone ? (
          <div className="reset-done-msg">✅ Progress reset. Reloading…</div>
        ) : (
          <button
            className="btn-danger-outline"
            onClick={() => setConfirmReset(true)}
          >
            🗑️ Reset All Progress
          </button>
        )}
      </section>

      {/* Confirm dialog */}
      {confirmReset && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="reset-confirm-title">
          <div className="modal-box">
            <h2 id="reset-confirm-title" className="modal-title">Are you sure?</h2>
            <p className="modal-body">
              This will permanently delete all your scores, badges, and level progress. You cannot undo this.
            </p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleReset}>
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
