import React from 'react';

const PLATFORM_COLORS = {
  'Facebook': '#1877f2',
  'Instagram': '#e040fb',
  'Twitter / X': '#1d9bf0',
  'Snapchat': '#fbbf24',
  'YouTube': '#ef4444',
  'LinkedIn': '#0a66c2',
};

const SocialPostQuestion = ({ question, onAnswer, disabled }) => {
  const color = PLATFORM_COLORS[question.platform] || '#a855f7';

  return (
    <div className="question-card social-card">
      <div className="social-platform-bar" style={{ borderBottomColor: color }}>
        <span className="social-platform-name" style={{ color }}>{question.platform}</span>
        <span className="social-time">{question.timeAgo}</span>
      </div>

      <div className="social-user-row">
        <span className="social-avatar" aria-hidden="true">{question.avatar}</span>
        <div>
          <span className="social-username">@{question.username}</span>
          <span className="social-public-tag">🌍 Public post</span>
        </div>
      </div>

      <div className="social-post-body">
        <p className="social-post-text">{question.post}</p>
      </div>

      <p className="question-prompt">Is it safe to share this publicly?</p>

      <div className="answer-row" role="group" aria-label="Your verdict">
        <button
          className="btn-answer btn-safe"
          onClick={() => !disabled && onAnswer(true)}
          disabled={disabled}
        >
          ✅ Safe to Share
        </button>
        <button
          className="btn-answer btn-danger"
          onClick={() => !disabled && onAnswer(false)}
          disabled={disabled}
        >
          🚫 Not Safe
        </button>
      </div>
    </div>
  );
};

export default SocialPostQuestion;
