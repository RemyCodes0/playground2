import React, { useState } from "react";
import { Modal } from "../../components/BetOn_Components/Modal";

export const Game = () => {
  // State variables
  const [arr, setArr] = useState([]);
  const [trials, setTrials] = useState(0);
  const MaxTrials = 20;
  const [isDisabled, setIsDisabled] = useState(false);
  const [colorBox, setColorBox] = useState("grey");
  const [message, setMessage] = useState("Ready to predict?");
  const [showModal, setShowModal] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const greenProbability = 0.8;

  const calculateProb = (prob) => {
    return Math.random() <= prob;
  };

  const selectButton = (value) => {
    if (trials < MaxTrials) {
      const correct = calculateProb(greenProbability) ? "green" : "red";
      const isCorrect = correct === value;
      
      // Update message with more engaging feedback
      if (isCorrect) {
        setMessage("🎉 Correct! Great prediction!");
        setCurrentStreak(prev => prev + 1);
      } else {
        setMessage("❌ Wrong guess! Better luck next time");
        if (currentStreak > bestStreak) {
          setBestStreak(currentStreak);
        }
        setCurrentStreak(0);
      }

      setColorBox(correct);

      const newTrial = trials + 1;
      setArr((prevArr) => [
        ...prevArr,
        { 
          trial: newTrial, 
          guess: value, 
          ans: correct, 
          correct: isCorrect,
          timestamp: new Date().toLocaleTimeString()
        },
      ]);
      setTrials(newTrial);

      if (newTrial === MaxTrials) {
        setIsDisabled(true);
        // Final streak check
        if (currentStreak > bestStreak) {
          setBestStreak(currentStreak);
        }
        setTimeout(() => {
          setShowModal(true);
        }, 1000);
      }
    }
  };

  const reset = () => {
    setTrials(0);
    setArr([]);
    setIsDisabled(false);
    setColorBox("grey");
    setMessage("Ready to predict?");
    setShowModal(false);
    setCurrentStreak(0);
    setBestStreak(0);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Statistics calculations
  const greenGuesses = arr.filter((item) => item.guess === "green").length;
  const redGuesses = arr.filter((item) => item.guess === "red").length;
  const correctGreenguesses = arr.filter(
    (item) => item.guess === "green" && item.ans === "green"
  ).length;
  const correctRedguesses = arr.filter(
    (item) => item.guess === "red" && item.ans === "red"
  ).length;
  const correctGuesses = arr.filter((item) => item.guess === item.ans).length;
  
  // Advanced statistics
  const actualGreenResults = arr.filter((item) => item.ans === "green").length;
  const actualRedResults = arr.filter((item) => item.ans === "red").length;
  const overallAccuracy = trials > 0 ? (correctGuesses / trials * 100) : 0;
  const greenAccuracy = greenGuesses > 0 ? (correctGreenguesses / greenGuesses * 100) : 0;
  const redAccuracy = redGuesses > 0 ? (correctRedguesses / redGuesses * 100) : 0;

  // Performance rating
  const getPerformanceRating = (accuracy) => {
    if (accuracy >= 80) return { rating: "Excellent", emoji: "🏆", color: "#e53e3e" };
    if (accuracy >= 60) return { rating: "Good", emoji: "🎯", color: "#38a169" };
    if (accuracy >= 40) return { rating: "Average", emoji: "👍", color: "#d69e2e" };
    return { rating: "Needs Practice", emoji: "💪", color: "#718096" };
  };

  const performance = getPerformanceRating(overallAccuracy);

  return (
    
      <div className="container">
        <div className="game-header">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(trials / MaxTrials) * 100}%` }}
            ></div>
          </div>
          <div className="trial-info">
            Round {trials} of {MaxTrials}
          </div>
        </div>

        <div className="color-container" style={{ backgroundColor: colorBox }}>
          <div className="message-content">
            <div className="main-message">{message}</div>
            {currentStreak > 0 && (
              <div className="streak-indicator">
                🔥 Streak: {currentStreak}
              </div>
            )}
          </div>
        </div>

        <p className="instruction">
          Predict the next color: Will it be <span className="green-text">Green</span> or <span className="red-text">Red</span>?
        </p>

        <div className="controls">
          <button
            className="green prediction-btn"
            value="green"
            onClick={() => selectButton("green")}
            disabled={isDisabled}
          >
            <span className="btn-icon">🟢</span>
            Green
          </button>
          <button
            className="red prediction-btn"
            value="red"
            onClick={() => selectButton("red")}
            disabled={isDisabled}
          >
            <span className="btn-icon">🔴</span>
            Red
          </button>
        </div>

        <button className="reset" onClick={reset}>
          Reset Game
        </button>

        {/* Live Stats */}
        {trials > 0 && (
          <div className="live-stats">
            <div className="stat-item">
              <span className="stat-label">Accuracy</span>
              <span className="stat-value">{overallAccuracy.toFixed(1)}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Correct</span>
              <span className="stat-value">{correctGuesses}/{trials}</span>
            </div>
            {currentStreak > 0 && (
              <div className="stat-item">
                <span className="stat-label">Current Streak</span>
                <span className="stat-value">🔥 {currentStreak}</span>
              </div>
            )}
          </div>
        )}

        {/* Results Modal */}
        <Modal isOpen={showModal} onClose={closeModal}>
          <div className="results-modal">
            <div className="results-header">
              <h2>🎯 Game Complete!</h2>
              <div className="performance-badge" style={{ color: performance.color }}>
                <span className="performance-emoji">{performance.emoji}</span>
                <span className="performance-text">{performance.rating}</span>
              </div>
            </div>

            <div className="results-summary">
              <div className="summary-card main-score">
                <div className="score-big">{overallAccuracy.toFixed(1)}%</div>
                <div className="score-label">Overall Accuracy</div>
                <div className="score-detail">{correctGuesses} out of {MaxTrials} correct</div>
              </div>
            </div>

            <div className="detailed-stats">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">🟢</div>
                  <div className="stat-info">
                    <div className="stat-title">Green Predictions</div>
                    <div className="stat-number">{correctGreenguesses} out of {greenGuesses}</div>
                    <div className="stat-accuracy">{greenAccuracy.toFixed(1)}% accurate</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">🔴</div>
                  <div className="stat-info">
                    <div className="stat-title">Red Predictions</div>
                    <div className="stat-number">{correctRedguesses} out of {redGuesses}</div>
                    <div className="stat-accuracy">{redAccuracy.toFixed(1)}% accurate</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">🔥</div>
                  <div className="stat-info">
                    <div className="stat-title">Best Streak</div>
                    <div className="stat-number">{bestStreak}</div>
                    <div className="stat-accuracy">consecutive correct</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-info">
                    <div className="stat-title">Actual Results</div>
                    <div className="stat-number">{actualGreenResults}G / {actualRedResults}R</div>
                    <div className="stat-accuracy">{((actualGreenResults/MaxTrials)*100).toFixed(0)}% green</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="insights-section">
              <h3>💡 Insights</h3>
              <div className="insights-list">
                {overallAccuracy > 50 ? (
                  <div className="insight-item positive">
                    <span className="insight-icon">✅</span>
                    <span>You performed better than random chance!</span>
                  </div>
                ) : (
                  <div className="insight-item neutral">
                    <span className="insight-icon">🎲</span>
                    <span>Your accuracy was close to random guessing.</span>
                  </div>
                )}
                
                {bestStreak >= 5 && (
                  <div className="insight-item positive">
                    <span className="insight-icon">🔥</span>
                    <span>Impressive! You had a streak of {bestStreak} correct predictions.</span>
                  </div>
                )}

                {Math.abs(actualGreenResults - 16) <= 2 && (
                  <div className="insight-item neutral">
                    <span className="insight-icon">🎯</span>
                    <span>The results closely matched the expected 80/20 distribution.</span>
                  </div>
                )}

                {greenGuesses > redGuesses * 2 && (
                  <div className="insight-item neutral">
                    <span className="insight-icon">🟢</span>
                    <span>You strongly favored green predictions - a logical strategy!</span>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-actions">
              <button className="play-again-btn" onClick={reset}>
                🎮 Play Again
              </button>
              <button className="close-btn" onClick={closeModal}>
                📊 View Results
              </button>
            </div>
          </div>
        </Modal>
      </div>
    
  );
};