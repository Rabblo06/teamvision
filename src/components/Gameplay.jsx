import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getLevelById } from '../data/levels';
import { getQuestions } from '../data/questions';
import { calcStars, calcAccuracy } from '../utils/scoring';
import { playCorrect, playWrong } from '../utils/sounds';
import McqQuestion from './McqQuestion';
import EmailQuestion from './EmailQuestion';
import SmsQuestion from './SmsQuestion';
import SocialPostQuestion from './SocialPostQuestion';
import UrlQuestion from './UrlQuestion';
import WifiQuestion from './WifiQuestion';
import PasswordQuestion from './PasswordQuestion';

const TIMER_SECS = 30;

const isCorrect = (question, answer) => {
  switch (question.type) {
    case 'mcq':            return answer === question.correctIndex;
    case 'email':          return answer === question.isPhishing;
    case 'sms':            return answer === question.isScam;
    case 'social-post':    return answer === question.isSafe;
    case 'url-check':      return answer === question.isDangerous;
    case 'wifi':           return answer === question.correctId;
    case 'password-build': return answer >= question.targetStrength;
    default:               return false;
  }
};

const renderQuestion = (question, onAnswer, disabled) => {
  const props = { question, onAnswer, disabled };
  switch (question.type) {
    case 'email':          return <EmailQuestion {...props} />;
    case 'sms':            return <SmsQuestion {...props} />;
    case 'social-post':    return <SocialPostQuestion {...props} />;
    case 'url-check':      return <UrlQuestion {...props} />;
    case 'wifi':           return <WifiQuestion {...props} />;
    case 'password-build': return <PasswordQuestion {...props} />;
    default:               return <McqQuestion {...props} />;
  }
};

const Gameplay = ({ levelId, soundEnabled, onComplete, onQuit }) => {
  const level     = getLevelById(levelId);
  const [questions]      = useState(() => [...getQuestions(level.questionSet)]);
  const [qIdx, setQIdx]  = useState(0);
  const [phase, setPhase]= useState('question'); // 'question' | 'feedback'
  const [correct, setCorrect]  = useState(false);
  const [score, setScore]      = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [hintVisible, setHintVisible]   = useState(false);
  const [hintUsed, setHintUsed]         = useState(false);
  const [hintsTotal, setHintsTotal]     = useState(0);
  const [timeLeft, setTimeLeft]         = useState(level.hasTimer ? TIMER_SECS : null);
  const [showQuit, setShowQuit]         = useState(false);
  const timerRef = useRef(null);

  const question = questions[qIdx];
  const total    = questions.length;

  useEffect(() => {
    if (!level.hasTimer || phase !== 'question') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(null, true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, qIdx]);

  const handleAnswer = useCallback((answer, timedOut = false) => {
    clearInterval(timerRef.current);
    const result = !timedOut && isCorrect(question, answer);
    setCorrect(result);
    setPhase('feedback');

    if (result) {
      const pts = hintUsed ? 8 : 10;
      setScore(s => s + pts);
      setCorrectCount(c => c + 1);
      if (soundEnabled) playCorrect();
    } else {
      if (soundEnabled) playWrong();
    }
  }, [question, hintUsed, soundEnabled]);

  const handleNext = useCallback(() => {
    if (qIdx + 1 >= total) {
      onComplete({
        levelId,
        score,
        maxScore: total * 10,
        correct: correctCount,
        total,
        stars: calcStars(correctCount, total),
        accuracy: calcAccuracy(correctCount, total),
        hintsUsed: hintsTotal,
      });
    } else {
      setQIdx(i => i + 1);
      setPhase('question');
      setHintVisible(false);
      setHintUsed(false);
      if (level.hasTimer) setTimeLeft(TIMER_SECS);
    }
  }, [qIdx, total, score, correct, correctCount, levelId, hintsTotal, level.hasTimer, onComplete]);

  const handleHint = () => {
    if (!hintUsed && phase === 'question') {
      setHintVisible(true);
      setHintUsed(true);
      setHintsTotal(h => h + 1);
    }
  };

  if (!question) return null;

  const timerPct   = level.hasTimer ? (timeLeft / TIMER_SECS) * 100 : 100;
  const timerColor = timeLeft > 15 ? '#10b981' : timeLeft > 7 ? '#f59e0b' : '#ef4444';
  const progressPct = (qIdx / total) * 100;

  return (
    <div className="gameplay-screen">
      {/* Top bar */}
      <div className="gameplay-topbar">
        <div className="gameplay-level-info">
          <span className="gameplay-level-icon" aria-hidden="true">{level.icon}</span>
          <div>
            <span className="gameplay-level-title" style={{ color: level.color }}>{level.title}</span>
            <span className="gameplay-level-tier"> · {level.tier}</span>
          </div>
        </div>
        <div className="gameplay-stats">
          <span className="gameplay-score" aria-label={`Score: ${score} points`}>⭐ {score} pts</span>
          <span className="gameplay-progress-tag" aria-label={`Question ${qIdx + 1} of ${total}`}>
            {qIdx + 1}/{total}
          </span>
        </div>
        <button className="gameplay-quit-btn" onClick={() => setShowQuit(true)} aria-label="Quit level">
          ✕ Quit
        </button>
      </div>

      {/* Progress bar */}
      <div className="gameplay-progress-track" role="progressbar" aria-valuenow={qIdx} aria-valuemax={total}>
        <div className="gameplay-progress-fill" style={{ width: `${progressPct}%`, background: level.color }} />
      </div>

      {/* Timer */}
      {level.hasTimer && (
        <div className="timer-row">
          <div className="timer-track">
            <div className="timer-fill" style={{ width: `${timerPct}%`, background: timerColor }} />
          </div>
          <span className="timer-display" style={{ color: timerColor }} aria-live="polite">
            {timeLeft}s
          </span>
        </div>
      )}

      {/* Objective */}
      <div className="gameplay-objective">
        <span className="gameplay-obj-icon" aria-hidden="true">🎯</span>
        <span className="gameplay-obj-text">{level.objective}</span>
      </div>

      {/* Question */}
      <div className="gameplay-question-wrap">
        {renderQuestion(question, handleAnswer, phase === 'feedback')}
      </div>

      {/* Hint */}
      {phase === 'question' && question.hint && (
        <div className="hint-area">
          {hintVisible ? (
            <div className="hint-revealed" role="note">
              <span aria-hidden="true">💡</span>
              <span>{question.hint}</span>
            </div>
          ) : (
            <button className="btn-hint" onClick={handleHint}>
              💡 {hintUsed ? 'Hint used (−2 pts)' : 'Show hint (−2 pts)'}
            </button>
          )}
        </div>
      )}

      {/* Feedback panel */}
      {phase === 'feedback' && (
        <div className={`feedback-panel ${correct ? 'feedback-correct' : 'feedback-wrong'}`} role="status" aria-live="polite">
          <div className="feedback-header">
            {correct
              ? <><span aria-hidden="true">✅</span> Correct! +{hintUsed ? 8 : 10} points</>
              : <><span aria-hidden="true">❌</span> {timeLeft === 0 ? "Time's Up!" : 'Incorrect'}</>
            }
          </div>
          <p className="feedback-explanation">{question.explanation}</p>
          <button
            className="btn-next"
            onClick={handleNext}
            style={{ background: level.color }}
          >
            {qIdx + 1 >= total ? '🏆 See Results' : 'Next Question →'}
          </button>
        </div>
      )}

      {/* Quit confirmation */}
      {showQuit && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="quit-title">
          <div className="modal-box">
            <h2 id="quit-title" className="modal-title">Quit this level?</h2>
            <p className="modal-body">Your progress on this level will not be saved if you quit now.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowQuit(false)}>
                Keep Playing
              </button>
              <button className="btn-danger" onClick={onQuit}>
                Yes, Quit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gameplay;
