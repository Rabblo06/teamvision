import React from 'react';

const EmailQuestion = ({ question, onAnswer, disabled }) => (
  <div className="question-card email-card">
    <div className="email-client">
      <div className="email-toolbar">
        <span className="email-toolbar-dot" style={{ background: '#ef4444' }} />
        <span className="email-toolbar-dot" style={{ background: '#f59e0b' }} />
        <span className="email-toolbar-dot" style={{ background: '#10b981' }} />
        <span className="email-toolbar-label">Email Message</span>
      </div>

      <div className="email-header">
        <div className="email-row">
          <span className="email-field-label">From:</span>
          <span className="email-from">{question.from}</span>
        </div>
        <div className="email-row">
          <span className="email-field-label">Subject:</span>
          <span className="email-subject">{question.subject}</span>
        </div>
      </div>

      <div className="email-body">
        {question.body.split('\n').map((line, i) =>
          line.trim() === '' ? <br key={i} /> : <p key={i}>{line}</p>
        )}
      </div>
    </div>

    <p className="question-prompt">Is this email legitimate or a phishing attempt?</p>

    <div className="answer-row" role="group" aria-label="Your verdict">
      <button
        className="btn-answer btn-safe"
        onClick={() => !disabled && onAnswer(false)}
        disabled={disabled}
      >
        ✅ Legitimate
      </button>
      <button
        className="btn-answer btn-danger"
        onClick={() => !disabled && onAnswer(true)}
        disabled={disabled}
      >
        🎣 Phishing
      </button>
    </div>
  </div>
);

export default EmailQuestion;
