import React from 'react';

const SignalBars = ({ bars, color }) => (
  <div className="signal-bars" aria-hidden="true">
    {[1, 2, 3, 4].map(b => (
      <div
        key={b}
        className="signal-bar"
        style={{ height: `${b * 5 + 5}px`, background: b <= bars ? color : '#1e3a5f' }}
      />
    ))}
  </div>
);

const WifiQuestion = ({ question, onAnswer, disabled }) => (
  <div className="question-card wifi-card">
    <div className="wifi-scenario-box">
      <span className="wifi-scenario-icon">📍</span>
      <p className="wifi-scenario-text">{question.scenario}</p>
    </div>

    <div className="wifi-network-list" role="group" aria-label="Available Wi-Fi networks">
      <div className="wifi-list-header">
        <span>📶 Available Networks</span>
        <span className="wifi-list-count">{question.networks.length} found</span>
      </div>

      {question.networks.map(net => (
        <button
          key={net.id}
          className={`wifi-network-row ${disabled ? 'wifi-row-disabled' : ''}`}
          onClick={() => !disabled && onAnswer(net.id)}
          disabled={disabled}
          aria-label={`Connect to ${net.name}. Security: ${net.security}. Status: ${net.badge}`}
        >
          <div className="wifi-row-left">
            <span className="wifi-icon" aria-hidden="true">📶</span>
            <div className="wifi-info">
              <span className="wifi-name">{net.name}</span>
              <span className="wifi-security">{net.security}</span>
            </div>
          </div>
          <div className="wifi-row-right">
            <SignalBars bars={net.bars} color={net.badgeColor} />
            <span
              className="wifi-badge"
              style={{ color: net.badgeColor, borderColor: net.badgeColor + '55' }}
            >
              {net.icon} {net.badge}
            </span>
          </div>
        </button>
      ))}
    </div>

    <p className="question-prompt">Which network should you connect to?</p>
  </div>
);

export default WifiQuestion;
