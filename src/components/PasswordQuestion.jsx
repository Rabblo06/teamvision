import React, { useState } from 'react';
import { analysePassword } from '../utils/passwordStrength';

const PasswordQuestion = ({ question, onAnswer, disabled }) => {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const analysis = analysePassword(value);

  const handleSubmit = () => {
    if (!disabled && value.length > 0) {
      onAnswer(analysis.strength);
    }
  };

  const segments = ['Weak', 'Fair', 'Medium', 'Strong'];
  const segColors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

  return (
    <div className="question-card password-card">
      <div className="pw-context-box">
        <p className="pw-prompt-text">{question.prompt}</p>
        <p className="pw-context-text">{question.context}</p>
      </div>

      <div className="pw-target">
        <span className="pw-target-label">Target strength:</span>
        <span className="pw-target-value" style={{ color: segColors[question.targetStrength] }}>
          {segments[question.targetStrength]}
        </span>
      </div>

      <div className="pw-input-wrap">
        <input
          type={show ? 'text' : 'password'}
          className="pw-input"
          value={value}
          onChange={e => !disabled && setValue(e.target.value)}
          placeholder="Type your password here…"
          disabled={disabled}
          aria-label="Password input"
          autoComplete="new-password"
        />
        <button
          className="pw-show-toggle"
          onClick={() => setShow(s => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          type="button"
        >
          {show ? '🙈' : '👁️'}
        </button>
      </div>

      {/* Strength meter */}
      <div className="pw-meter-wrap">
        <div className="pw-meter-track">
          {segments.map((seg, i) => (
            <div
              key={seg}
              className="pw-meter-seg"
              style={{ background: i <= analysis.strength && value.length > 0 ? segColors[i] : '#1e3a5f' }}
              aria-hidden="true"
            />
          ))}
        </div>
        {value.length > 0 && (
          <span className="pw-strength-label" style={{ color: analysis.color }}>
            {analysis.label}
          </span>
        )}
      </div>

      {/* Rules checklist */}
      {value.length > 0 && (
        <ul className="pw-rules-list" aria-label="Password requirements">
          {analysis.rules.map(rule => (
            <li
              key={rule.id}
              className={`pw-rule ${rule.pass ? 'pw-rule--pass' : 'pw-rule--fail'}`}
              aria-label={`${rule.label}: ${rule.pass ? 'met' : 'not yet met'}`}
            >
              <span aria-hidden="true">{rule.pass ? '✅' : '⬜'}</span>
              {rule.label}
            </li>
          ))}
        </ul>
      )}

      <button
        className="btn-submit-pw"
        onClick={handleSubmit}
        disabled={disabled || value.length === 0}
      >
        Submit Password
      </button>
    </div>
  );
};

export default PasswordQuestion;
