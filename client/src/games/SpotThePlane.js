import React, { useState, useEffect, useRef, useCallback } from 'react';

const SpotThePlaneGame = () => {
  // Game constants
  const TOTAL_PLANES = 12;
  const TOTAL_LEVELS = 6;
  const MOVE_DURATION = 7000;
  const CONTAINER_WIDTH = 1100;
  const CONTAINER_HEIGHT = 600;

  // Game state
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameState, setGameState] = useState('idle'); // 'idle', 'memorize', 'moving', 'guessing', 'complete'
  const [planesFound, setPlanesFound] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Click Start to begin!');
  const [showStartOverlay, setShowStartOverlay] = useState(true);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [showGameComplete, setShowGameComplete] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState('');

  // Refs for game data
  const planesRef = useRef([]);
  const trackedPlanesRef = useRef([]);
  const planeMotionsRef = useRef([]);
  const animationFrameRef = useRef(null);
  const moveStartTimeRef = useRef(0);

  // Plane component
  const Plane = ({ id, isTracked, isFound, onClick, style }) => (
    <div
      id={id}
      className={`plane ${isTracked ? 'tracked-plane' : ''} ${isFound ? 'victory-animation' : ''}`}
      onClick={onClick}
      style={style}
    />
  );

  // Cloud component
  const Cloud = ({ style }) => (
    <div className="cloud" style={style}>
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="cloud"
          style={{
            width: `${style.width * (0.6 + Math.random() * 0.4)}px`,
            height: `${style.width * (0.6 + Math.random() * 0.4)}px`,
            left: `${i * style.width * 0.4}px`,
            top: `${Math.random() * style.width * 0.2}px`,
          }}
        />
      ))}
    </div>
  );

  // Generate random position within container
  const getRandomContainerPoint = useCallback(() => ({
    x: 60 + Math.random() * (CONTAINER_WIDTH - 120),
    y: 60 + Math.random() * (CONTAINER_HEIGHT - 120)
  }), []);

  // Mathematical helpers
  const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  
  const lerpAngle = (a, b, t) => {
    const diff = ((b - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    return a + diff * t;
  };

  // Initialize game
  const initGame = useCallback(() => {
    // Cancel any running animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Reset game state
    setPlanesFound(0);
    setGameState('idle');
    setStatusMessage('Click Start to begin!');

    // Initialize planes
    const newPlanes = [];
    const newMotions = [];

    for (let i = 0; i < TOTAL_PLANES; i++) {
      const xPos = 40 + Math.random() * (CONTAINER_WIDTH - 80);
      const yPos = 40 + Math.random() * (CONTAINER_HEIGHT - 80);
      const rotation = Math.random() * 360;

      newPlanes.push({
        id: `plane-${i}`,
        x: xPos,
        y: yPos,
        rotation: rotation,
        isTracked: false,
        isFound: false
      });

      newMotions.push({
        startX: xPos,
        startY: yPos,
        x: xPos,
        y: yPos,
        lastX: xPos,
        lastY: yPos,
        rotation: rotation,
        baseSpeed: 1.5 + Math.random() * 0.5,
        currentSpeed: 1.5 + Math.random() * 0.5,
        maxSpeed: 2.0,
        minSpeed: 1.5,
        direction: Math.random() * Math.PI * 2,
        targetDirection: Math.random() * Math.PI * 2,
        turnRate: 0.02 + Math.random() * 0.01,
        pattern: Math.floor(Math.random() * 3),
        patternTime: 0,
        patternPhase: Math.random() * Math.PI * 2,
        patternDuration: 200 + Math.random() * 100,
        circleRadius: 30 + Math.random() * 40,
        amplitude: 20 + Math.random() * 20,
        frequency: 0.01 + Math.random() * 0.02,
        targetX: Math.random() * CONTAINER_WIDTH,
        targetY: Math.random() * CONTAINER_HEIGHT,
        targetTimer: 0,
        targetDuration: 150 + Math.random() * 100,
        width: 40,
        height: 40,
        previousPositions: Array(5).fill({ x: xPos, y: yPos }),
        positionHistorySize: 5
      });
    }

    planesRef.current = newPlanes;
    planeMotionsRef.current = newMotions;
    trackedPlanesRef.current = [];
  }, []);

  // Start level
  const startLevel = useCallback(() => {
    setGameState('memorize');
    setStatusMessage(`Memorize ${currentLevel} plane${currentLevel > 1 ? 's' : ''}!`);

    // Select random planes to track
    const availableIndices = Array.from({ length: TOTAL_PLANES }, (_, i) => i);
    const trackedIndices = [];
    
    for (let i = 0; i < currentLevel && availableIndices.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const selectedIndex = availableIndices.splice(randomIndex, 1)[0];
      trackedIndices.push(selectedIndex);
    }

    trackedPlanesRef.current = trackedIndices;

    // Update planes to show tracking
    planesRef.current = planesRef.current.map((plane, index) => ({
      ...plane,
      isTracked: trackedIndices.includes(index)
    }));

    // Start moving after 3 seconds
    setTimeout(() => {
      startMoving();
    }, 3000);
  }, [currentLevel]);

  // Update plane position
  const updatePlanePosition = useCallback((planeIndex, elapsedTime) => {
    const motion = planeMotionsRef.current[planeIndex];
    if (!motion) return;

    motion.lastX = motion.x;
    motion.lastY = motion.y;
    motion.patternTime += 0.016;

    let newX = motion.x;
    let newY = motion.y;

    // Pattern-specific movement (simplified for React version)
    switch(motion.pattern) {
      case 0: // Smooth directed flight
        if (Math.random() < 0.01) {
          motion.targetDirection = Math.random() * Math.PI * 2;
        }
        motion.direction = lerpAngle(motion.direction, motion.targetDirection, motion.turnRate * 0.7);
        motion.currentSpeed = motion.currentSpeed * 0.97 + 
                            (motion.minSpeed + Math.sin(motion.patternTime * 0.3) * 
                            (motion.maxSpeed - motion.minSpeed) * 0.3) * 0.03;
        newX += Math.cos(motion.direction) * motion.currentSpeed;
        newY += Math.sin(motion.direction) * motion.currentSpeed;
        break;

      case 1: // Gentle curved path
        motion.targetTimer++;
        if (motion.targetTimer >= motion.targetDuration) {
          const target = getRandomContainerPoint();
          motion.targetX = target.x;
          motion.targetY = target.y;
          motion.targetTimer = 0;
        }
        
        const dx = motion.targetX - motion.x;
        const dy = motion.targetY - motion.y;
        const angleToTarget = Math.atan2(dy, dx);
        
        motion.direction = lerpAngle(motion.direction, angleToTarget, 0.015);
        
        const waveOffset = Math.sin(motion.patternTime * motion.frequency + motion.patternPhase) * 
                          (motion.amplitude * 0.7);
        const perpDirection = motion.direction + Math.PI/2;
        
        newX += Math.cos(motion.direction) * motion.baseSpeed + 
              Math.cos(perpDirection) * waveOffset * 0.08;
        newY += Math.sin(motion.direction) * motion.baseSpeed +
              Math.sin(perpDirection) * waveOffset * 0.08;
        break;

      case 2: // Gentle circular pattern
        motion.targetTimer++;
        if (motion.targetTimer >= motion.targetDuration) {
          const target = getRandomContainerPoint();
          motion.targetX = target.x;
          motion.targetY = target.y;
          motion.targetTimer = 0;
        }
        
        const targetDx = motion.targetX - motion.x;
        const targetDy = motion.targetY - motion.y;
        const targetAngle = Math.atan2(targetDy, targetDx);
        
        motion.direction = lerpAngle(motion.direction, targetAngle, 0.02);
        motion.currentSpeed = motion.baseSpeed * (1 + 0.1 * Math.sin(motion.patternTime * 0.1));
        
        newX += Math.cos(motion.direction) * motion.currentSpeed;
        newY += Math.sin(motion.direction) * motion.currentSpeed;
        break;
    }

    // Keep within bounds
    if (newX < 10) newX = 10 + Math.random() * 5;
    if (newX > CONTAINER_WIDTH - motion.width - 10) newX = CONTAINER_WIDTH - motion.width - 10 - Math.random() * 5;
    if (newY < 10) newY = 10 + Math.random() * 5;
    if (newY > CONTAINER_HEIGHT - motion.height - 10) newY = CONTAINER_HEIGHT - motion.height - 10 - Math.random() * 5;

    // Bounce off edges
    const bounceMargin = 30;
    if (newX <= bounceMargin || newX >= CONTAINER_WIDTH - motion.width - bounceMargin) {
      motion.targetDirection = Math.PI - motion.targetDirection;
      motion.targetDirection += (Math.random() - 0.5) * 0.3;
    }
    if (newY <= bounceMargin || newY >= CONTAINER_HEIGHT - motion.height - bounceMargin) {
      motion.targetDirection = -motion.targetDirection;
      motion.targetDirection += (Math.random() - 0.5) * 0.3;
    }

    // Limit movement per frame
    const maxMovementPerFrame = motion.baseSpeed * 1.5;
    const deltaX = newX - motion.x;
    const deltaY = newY - motion.y;
    const movementDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (movementDistance > maxMovementPerFrame) {
      const scaleFactor = maxMovementPerFrame / movementDistance;
      newX = motion.x + deltaX * scaleFactor;
      newY = motion.y + deltaY * scaleFactor;
    }

    motion.x = newX;
    motion.y = newY;

    // Update position history
    motion.previousPositions.push({x: newX, y: newY});
    if (motion.previousPositions.length > motion.positionHistorySize) {
      motion.previousPositions.shift();
    }

    // Calculate average position
    let avgX = 0, avgY = 0;
    motion.previousPositions.forEach(pos => {
      avgX += pos.x;
      avgY += pos.y;
    });
    avgX /= motion.previousPositions.length;
    avgY /= motion.previousPositions.length;

    // Calculate rotation from movement
    const movementX = motion.x - motion.lastX;
    const movementY = motion.y - motion.lastY;
    let visualRotation = motion.rotation;

    if (Math.abs(movementX) > 0.1 || Math.abs(movementY) > 0.1) {
      visualRotation = Math.atan2(movementY, movementX) * (180/Math.PI) + 90;
    }

    motion.rotation = visualRotation;

    // Update plane in state
    planesRef.current[planeIndex] = {
      ...planesRef.current[planeIndex],
      x: avgX,
      y: avgY,
      rotation: visualRotation
    };
  }, [getRandomContainerPoint]);

  // Animation loop
  const animateMovement = useCallback(() => {
    const currentTime = performance.now();
    const elapsedTime = currentTime - moveStartTimeRef.current;

    // Update all plane positions
    for (let i = 0; i < TOTAL_PLANES; i++) {
      updatePlanePosition(i, elapsedTime);
    }

    if (elapsedTime < MOVE_DURATION && gameState === 'moving') {
      animationFrameRef.current = requestAnimationFrame(animateMovement);
    } else if (gameState === 'moving') {
      startGuessing();
    }
  }, [gameState, updatePlanePosition]);

  // Start moving phase
  const startMoving = useCallback(() => {
    setGameState('moving');
    setStatusMessage('Keep track of the planes!');

    // Remove tracking highlights
    planesRef.current = planesRef.current.map(plane => ({
      ...plane,
      isTracked: false
    }));

    // Initialize motion positions
    planeMotionsRef.current.forEach((motion, index) => {
      const plane = planesRef.current[index];
      motion.x = plane.x;
      motion.y = plane.y;
      motion.lastX = plane.x;
      motion.lastY = plane.y;
      motion.previousPositions = Array(motion.positionHistorySize).fill({x: plane.x, y: plane.y});
      
      const target = getRandomContainerPoint();
      motion.targetX = target.x;
      motion.targetY = target.y;
      motion.targetTimer = 0;
      motion.patternTime = 0;
    });

    moveStartTimeRef.current = performance.now();
    animateMovement();
  }, [animateMovement, getRandomContainerPoint]);

  // Start guessing phase
  const startGuessing = useCallback(() => {
    setGameState('guessing');
    setStatusMessage(`Find the ${currentLevel} plane${currentLevel > 1 ? 's' : ''}!`);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, [currentLevel]);

  // Handle plane click
  const handlePlaneClick = useCallback((planeIndex) => {
    if (gameState !== 'guessing') return;

    const isTrackedPlane = trackedPlanesRef.current.includes(planeIndex);

    if (isTrackedPlane) {
      // Correct plane found
      planesRef.current[planeIndex] = {
        ...planesRef.current[planeIndex],
        isTracked: true,
        isFound: true
      };

      // Remove from tracked list
      trackedPlanesRef.current = trackedPlanesRef.current.filter(index => index !== planeIndex);
      
      const newPlanesFound = planesFound + 1;
      setPlanesFound(newPlanesFound);

      if (newPlanesFound === currentLevel) {
        // Level complete
        setTimeout(() => {
          if (currentLevel === TOTAL_LEVELS) {
            setShowGameComplete(true);
          } else {
            setShowLevelComplete(true);
          }
        }, 1000);
        
        setGameState('complete');
        setStatusMessage('Level Complete!');
      } else {
        setStatusMessage(`Good! Find ${currentLevel - newPlanesFound} more plane${currentLevel - newPlanesFound > 1 ? 's' : ''}!`);
      }
    } else {
      // Wrong plane - game over
      setGameState('complete');
      
      // Show all tracked planes
      planesRef.current = planesRef.current.map((plane, index) => ({
        ...plane,
        isTracked: trackedPlanesRef.current.includes(index)
      }));

      setGameOverMessage(`You found ${planesFound} out of ${currentLevel} planes.`);
      setShowGameOver(true);
    }
  }, [gameState, planesFound, currentLevel]);

  // Generate clouds
  const generateClouds = useCallback(() => {
    const clouds = [];
    const cloudCount = 5 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < cloudCount; i++) {
      const size = 30 + Math.random() * 70;
      clouds.push({
        id: i,
        width: size,
        height: size * 0.6,
        left: Math.random() * CONTAINER_WIDTH,
        top: Math.random() * CONTAINER_HEIGHT * 0.7
      });
    }
    return clouds;
  }, []);

  const [clouds] = useState(() => generateClouds());

  // Next level
  const nextLevel = () => {
    setCurrentLevel(prev => prev + 1);
    setShowLevelComplete(false);
    initGame();
  };

  // Restart game
  const restartGame = () => {
    setCurrentLevel(1);
    setShowGameComplete(false);
    setShowGameOver(false);
    initGame();
  };

  // Initialize game on mount
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Force re-render during animation
  useEffect(() => {
    let interval;
    if (gameState === 'moving') {
      interval = setInterval(() => {
        // Trigger re-render by updating a dummy state
      }, 16); // ~60fps
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState]);

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      textAlign: 'center', 
      backgroundColor: '#f0f8ff', 
      margin: 0, 
      padding: 0,
      minHeight: '100vh'
    }}>
      <div style={{ 
        position: 'absolute', 
        opacity: 1, 
        marginLeft: '-100px',
        fontSize: '14px',
        color: '#666'
      }}>
        {/* Logo placeholder */}
      </div>
      
      <div style={{ display: 'inline', fontSize: '20px', margin: '10px', color: '#333' }}>
        Level: {currentLevel}
      </div>
      <hr style={{ 
        rotate: '90deg', 
        height: '3px', 
        width: '20px', 
        display: 'inline', 
        borderWidth: '2px', 
        borderStyle: 'solid', 
        color: 'red' 
      }} />
      <div style={{ fontSize: '24px', margin: '20px', fontWeight: 'bold', color: '#333', display: 'inline' }}>
        {statusMessage}
      </div>

      <div style={{
        position: 'relative',
        width: `${CONTAINER_WIDTH}px`,
        height: `${CONTAINER_HEIGHT}px`,
        margin: '20px auto',
        border: '3px solid #333',
        backgroundColor: '#e6f7ff',
        overflow: 'hidden'
      }}>
        {/* Clouds */}
        {clouds.map(cloud => (
          <Cloud
            key={cloud.id}
            style={{
              width: cloud.width,
              height: cloud.height,
              left: cloud.left,
              top: cloud.top,
              zIndex: -1
            }}
          />
        ))}

        {/* Planes */}
        {planesRef.current.map((plane, index) => (
          <Plane
            key={plane.id}
            id={plane.id}
            isTracked={plane.isTracked}
            isFound={plane.isFound}
            onClick={() => handlePlaneClick(index)}
            style={{
              left: `${plane.x}px`,
              top: `${plane.y}px`,
              transform: `rotate(${plane.rotation}deg)`
            }}
          />
        ))}

        {/* Overlays */}
        {showStartOverlay && (
          <div className="overlay">
            <h2>Spot the Plane</h2>
            <p>Keep track of the highlighted planes as they move!</p>
            <button onClick={() => setShowStartOverlay(false)}>Start Game</button>
          </div>
        )}

        {showLevelComplete && (
          <div className="overlay">
            <h2>Level Complete!</h2>
            <p>Great job! Ready for the next level?</p>
            <button onClick={nextLevel}>Next Level</button>
          </div>
        )}

        {showGameComplete && (
          <div className="overlay">
            <h2 style={{color: 'green'}}>Congratulations!</h2>
            <p>You completed all levels!</p>
            <button onClick={restartGame}>Play Again</button>
          </div>
        )}

        {showGameOver && (
          <div className="overlay">
            <h2 style={{color: 'red'}}>Game Over!</h2>
            <p>{gameOverMessage}</p>
            <button onClick={() => {
              setShowGameOver(false);
              initGame();
            }}>Try Again</button>
          </div>
        )}
      </div>

      <div style={{ margin: '20px' }}>
        <button 
          onClick={startLevel}
          disabled={gameState !== 'idle'}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: gameState !== 'idle' ? '#cccccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: gameState !== 'idle' ? 'not-allowed' : 'pointer',
            margin: '0 10px'
          }}
        >
          Start
        </button>
        <button 
          onClick={restartGame}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '0 10px'
          }}
        >
          Restart
        </button>
      </div>

      <style jsx>{`
        .plane {
          position: absolute;
          width: 40px;
          height: 40px;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M22,16v-2l-8.5-5V3.5C13.5,2.67,12.83,2,12,2s-1.5,0.67-1.5,1.5V9L2,14v2l8.5-2.5V19L8,20.5V22l4-1l4,1v-1.5L13.5,19 v-5.5L22,16z"/></svg>');
          background-size: contain;
          background-repeat: no-repeat;
          cursor: pointer;
          transition: transform 0.2s;
          transform-origin: center;
        }

        .plane:hover {
          transform: scale(1.1);
        }

        .tracked-plane {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23f00"><path d="M22,16v-2l-8.5-5V3.5C13.5,2.67,12.83,2,12,2s-1.5,0.67-1.5,1.5V9L2,14v2l8.5-2.5V19L8,20.5V22l4-1l4,1v-1.5L13.5,19 v-5.5L22,16z"/></svg>');
        }

        .victory-animation {
          animation: victory 1s ease-in-out;
        }

        @keyframes victory {
          0% { transform: scale(1); }
          50% { transform: scale(1.5) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }

        .cloud {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          z-index: -1;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          color: white;
          font-size: 24px;
          z-index: 100;
        }

        .overlay button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin: 10px;
        }

        .overlay button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default SpotThePlaneGame;