import React from 'react';

const SmsQuestion = ({ question, onAnswer, disabled }) => (
  <div className="question-card sms-card">
    <div className="phone-frame">
      <div className="phone-status-bar">
        <span>📶</span>
        <span className="phone-time">Messages</span>
        <span>🔋</span>
      </div>

      <div className="sms-conversation">
        <div className="sms-sender-label">{question.sender}</div>
        <div className="sms-bubble">
          <p className="sms-text">{question.message}</p>
          <span className="sms-time">Today · Just now</span>
        </div>
      </div>
    </div>

    <p className="question-prompt">Is this message legitimate or a scam?</p>

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
        ⚠️ Scam
      </button>
    </div>
  </div>
);

export default SmsQuestion;
