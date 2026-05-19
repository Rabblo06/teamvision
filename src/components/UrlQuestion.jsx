import React from 'react';

const UrlQuestion = ({ question, onAnswer, disabled }) => (
  <div className="question-card url-card">
    <div className="url-context-box">
      <span className="url-context-icon">💬</span>
      <p className="url-context-text">{question.context}</p>
    </div>

    <div className="url-display-box">
      <div className="url-bar-chrome">
        <span className="url-bar-label">URL</span>
        <span className="url-text" role="text" aria-label={`URL: ${question.url}`}>
          {question.url}
        </span>
      </div>
      <p className="url-inspect-tip">
        💡 Tip: Look carefully at the domain (the part between <code>://</code> and the next <code>/</code>)
      </p>
    </div>

    <p className="question-prompt">Is this URL safe or dangerous?</p>

    <div className="answer-row" role="group" aria-label="Your verdict">
      <button
        className="btn-answer btn-safe"
        onClick={() => !disabled && onAnswer(false)}
        disabled={disabled}
      >
        ✅ Safe
      </button>
      <button
        className="btn-answer btn-danger"
        onClick={() => !disabled && onAnswer(true)}
        disabled={disabled}
      >
        ⚠️ Dangerous
      </button>
    </div>
  </div>
);

export default UrlQuestion;
