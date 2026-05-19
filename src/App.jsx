import React, { useState, useCallback, useRef } from 'react';
import { BADGES } from './data/levels';
import { getSettings, saveSettings, saveLevelResult } from './utils/storage';
import { playComplete, playClick } from './utils/sounds';
import Header from './components/Header';
import Home from './components/Home';
import MissionMap from './components/MissionMap';
import Gameplay from './components/Gameplay';
import Results from './components/Results';
import Profile from './components/Profile';
import Badges from './components/Badges';
import Settings from './components/Settings';
import HowToPlay from './components/HowToPlay';

const App = () => {
  const [screen, setScreen] = useState('home');
  const [currentLevelId, setCurrentLevelId] = useState(null);
  const [levelResult, setLevelResult] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(() => getSettings().soundEnabled);
  const prevScreenRef = useRef('home');

  const navigate = useCallback((to, params = {}) => {
    if (soundEnabled) playClick();
    prevScreenRef.current = screen;
    if (params.levelId !== undefined) setCurrentLevelId(params.levelId);
    setScreen(to);
  }, [soundEnabled, screen]);

  const handleLevelComplete = useCallback((result) => {
    const updatedState = saveLevelResult(result.levelId, result.stars, result.score, result.correct, result.total);
    if (soundEnabled) playComplete();
    const levelBadge = BADGES.find(b => b.levelId === result.levelId);
    const earnedBadge = levelBadge && updatedState.badges.includes(levelBadge.id) ? levelBadge : null;
    setLevelResult({ ...result, earnedBadge });
    setScreen('results');
  }, [soundEnabled]);

  const handleToggleSound = useCallback((val) => {
    setSoundEnabled(val);
    saveSettings({ soundEnabled: val });
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <Home onStart={() => navigate('map')} onHowToPlay={() => navigate('howtoplay')} />;
      case 'map':
        return <MissionMap onSelectLevel={(id) => navigate('gameplay', { levelId: id })} />;
      case 'gameplay':
        return (
          <Gameplay
            levelId={currentLevelId}
            soundEnabled={soundEnabled}
            onComplete={handleLevelComplete}
            onQuit={() => navigate('map')}
          />
        );
      case 'results':
        return (
          <Results
            result={levelResult}
            onContinue={() => navigate('map')}
            onRetry={() => navigate('gameplay', { levelId: currentLevelId })}
          />
        );
      case 'profile':
        return <Profile onBack={() => navigate(prevScreenRef.current || 'map')} />;
      case 'badges':
        return <Badges onBack={() => navigate(prevScreenRef.current || 'map')} />;
      case 'settings':
        return (
          <Settings
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onBack={() => navigate(prevScreenRef.current || 'map')}
          />
        );
      case 'howtoplay':
        return <HowToPlay onBack={() => navigate(prevScreenRef.current || 'home')} />;
      default:
        return <Home onStart={() => navigate('map')} onHowToPlay={() => navigate('howtoplay')} />;
    }
  };

  const showHeader = screen !== 'home' && screen !== 'gameplay';

  return (
    <div className="app">
      {showHeader && (
        <Header
          screen={screen}
          onNav={navigate}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}
      <main className={showHeader ? 'with-header' : ''}>
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
