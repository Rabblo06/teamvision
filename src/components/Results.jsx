import React, { useMemo } from 'react';
import { getLevelById } from '../data/levels';
import { getStarMessage, getGrade } from '../utils/scoring';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#a855f7', '#ef4444', '#ffffff'];

const Confetti = () => {
  const pieces = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      background: COLORS[Math.floor(Math.random() * COLORS.length)],
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${2 + Math.random() * 2}s`,
      width: `${6 + Math.random() * 8}px`,
      height: `${6 + Math.random() * 8}px`,
    }))
  , []);

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map(p => (
        <div key={p.id} className="confetti-piece" style={p} />
      ))}
    </div>
  );
};

const StarDisplay = ({ stars }) => (
  <div className="result-stars" aria-label={`${stars} out of 3 stars`}>
    {[1, 2, 3].map(i => (
      <span key={i} className={`result-star ${i <= stars ? 'result-star--on' : 'result-star--off'}`} aria-hidden="true">
        ★
      </span>
    ))}
  </div>
);

const Results = ({ result, onContinue, onRetry }) => {
  if (!result) return null;

  const level    = getLevelById(result.levelId);
  const grade    = getGrade(result.accuracy);
  const message  = getStarMessage(result.stars);
  const perfect  = result.stars === 3;

  return (
    <div className="results-screen">
      {perfect && <Confetti />}

      <div className="results-card">
        <div className="results-level-tag" style={{ color: level.color }}>
          {level.icon} Level {level.id} · {level.title}
        </div>

        <h1 className="results-title">
          {perfect ? '🏆 Excellent!' : result.stars >= 2 ? '👍 Well Done!' : '📚 Keep Learning!'}
        </h1>

        <StarDisplay stars={result.stars} />
        <p className="results-message">{message}</p>

        {/* Score circle */}
        <div className="results-score-block">
          <div className="score-circle" style={{ borderColor: grade.color }}>
            <span className="score-pct" style={{ color: grade.color }}>{result.accuracy}%</span>
            <span className="score-grade" style={{ color: grade.color }}>{grade.label}</span>
          </div>
          <div className="score-breakdown">
            <div className="score-row">
              <span>Correct answers</span>
              <strong>{result.correct}/{result.total}</strong>
            </div>
            <div className="score-row">
              <span>Points earned</span>
              <strong>{result.score}/{result.maxScore}</strong>
            </div>
            {result.hintsUsed > 0 && (
              <div className="score-row">
                <span>Hints used</span>
                <strong>{result.hintsUsed}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Badge earned */}
        {result.earnedBadge && (
          <div className="badge-earned-panel">
            <div className="badge-earned-header">🏅 Badge Earned!</div>
            <div className="badge-earned-body">
              <span className="badge-earned-icon">{result.earnedBadge.icon}</span>
              <div>
                <div className="badge-earned-name">{result.earnedBadge.name}</div>
                <div className="badge-earned-desc">{result.earnedBadge.description}</div>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        {level.tips && level.tips.length > 0 && (
          <div className="results-tips">
            <h2 className="results-tips-title">💡 Key Takeaways</h2>
            <ul className="results-tips-list">
              {level.tips.map((tip, i) => (
                <li key={i} className="results-tip-item">{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="results-actions">
          <button className="btn-secondary" onClick={onRetry}>
            🔄 Try Again
          </button>
          <button className="btn-primary" onClick={onContinue} style={{ background: level.color }}>
            {result.levelId < 12 ? 'Next Level →' : '🗺️ Mission Map'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
