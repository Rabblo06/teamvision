import React from 'react';

const LETTERS = ['A', 'B', 'C', 'D'];

const McqQuestion = ({ question, onAnswer, disabled }) => (
  <div className="question-card mcq-card">
    <p className="question-text">{question.question}</p>
    <div className="mcq-options" role="group" aria-label="Answer choices">
      {question.options.map((opt, i) => (
        <button
          key={i}
          className="mcq-option"
          onClick={() => !disabled && onAnswer(i)}
          disabled={disabled}
          aria-label={`Option ${LETTERS[i]}: ${opt}`}
        >
          <span className="mcq-letter" aria-hidden="true">{LETTERS[i]}</span>
          <span className="mcq-text">{opt}</span>
        </button>
      ))}
    </div>
  </div>
);

export default McqQuestion;
