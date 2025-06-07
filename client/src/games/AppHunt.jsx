import React, { useState, useEffect, useCallback } from 'react';
const AppHuntGame = () => {
  const apps =[
    { id: 1, name: "WhatsApp", icon: "icon/Whatsapp.jpeg" },
    { id: 2, name: "Facebook", icon: "icon/facebook.jpeg" },
    { id: 3, name: "Instagram", icon: "icon/instagram.jpeg" },
    { id: 4, name: "Twitter", icon: "icon/twitter.png" },
    { id: 5, name: "LinkedIn", icon: "icon/linkedin.png" },
    { id: 6, name: "TikTok", icon: "icon/tiktok.png" },
    { id: 7, name: "Snapchat", icon: "icon/snapchat.png" },
    { id: 8, name: "YouTube", icon: "icon/youtube.png" },
    { id: 9, name: "Pinterest", icon: "icon/pinterest.png" },
    { id: 10, name: "Spotify", icon: "icon/spotify.png" },
    { id: 11, name: "Netflix", icon: "icon/netflix.png" },
    { id: 12, name: "Amazon", icon: "icon/amazon.png" },
    { id: 13, name: "Google Maps", icon: "icon/googlemaps.png" },
    { id: 14, name: "Gmail", icon: "icon/gmail2.png" },
    { id: 15, name: "Uber", icon: "icon/uber.png" },
    { id: 16, name: "Toyota", icon: "icon/toyota.png" },
    { id: 17, name: "Zoom", icon: "icon/zoom.png" },
    { id: 18, name: "Google", icon: "icon/google.png" },
    { id: 19, name: "Airbnb", icon: "icon/airbnb.png" },
    { id: 20, name: "Duolingo", icon: "icon/duolingo.jpeg" },
    { id: 21, name: "Canal+", icon: "icon/canal.png" },
    { id: 22, name: "PayPal", icon: "icon/paypal.png" },
    { id: 23, name: "Samsung", icon: "icon/samsung.png" },
    { id: 24, name: "Discord", icon: "icon/discord.png" },
    { id: 25, name: "Telegram", icon: "icon/telegram.jpeg" },
    { id: 26, name: "Reddit", icon: "icon/reddit.png" },
    { id: 27, name: "Messenger", icon: "icon/messenger.jpeg" },
    { id: 28, name: "Shazam", icon: "icon/shazam.jpeg" },
    { id: 29, name: "Xender", icon: "icon/xender.jpeg" },
    { id: 30, name: "Canal2", icon: "icon/canal2.jpeg" },
    { id: 31, name: "Microsoft Teams", icon: "icon/teams.png" },
    { id: 32, name: "Adobe Photoshop", icon: "icon/photoshop.png" },
    { id: 33, name: "Canva", icon: "icon/canva.jpeg" },
    { id: 34, name: "Notion", icon: "icon/notion.png" },
    { id: 35, name: "Disney+", icon: "icon/disneyplus.png" },
    { id: 36, name: "Minecraft", icon: "icon/minecraft.jpeg" },
    { id: 37, name: "Yango", icon: "icon/yango.png" },
    { id: 38, name: "Mboa Hub", icon: "icon/mboa.png" },
    { id: 39, name: "Candy Crush", icon: "icon/candy.jpeg" },
    { id: 40, name: "Amea", icon: "icon/amea.png" },
    { id: 41, name: "Chrome", icon: "icon/chrome.jpeg" },
    { id: 42, name: "Camtel", icon: "icon/camtel.jpeg" },
    { id: 43, name: "Prime Video", icon: "icon/primevideo.png" },
    { id: 44, name: "Kawlo", icon: "icon/kawlo.png" },
    { id: 45, name: "Orange Cameroon", icon: "icon/Orange.png" },
    { id: 46, name: "Mc Donald", icon: "icon/donald.png" },
    { id: 47, name: "TotalEnergies", icon: "icon/total.jpeg" },
    { id: 48, name: "Coca Cola", icon: "icon/coca.png" },
    { id: 49, name: "MTN", icon: "icon/mtn.png" },
    { id: 50, name: "Roblox", icon: "icon/roblox.png" }
  ]


  const [currentRound, setCurrentRound] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [mistakesRound1, setMistakesRound1] = useState(0);
  const [mistakesRound2, setMistakesRound2] = useState(0);
  const [appsToFind, setAppsToFind] = useState([]);
  const [foundApps, setFoundApps] = useState([]);
  const [round1Time, setRound1Time] = useState(0);
  const [selectedApps, setSelectedApps] = useState(new Set());
  const [incorrectSelections, setIncorrectSelections] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [shuffledApps, setShuffledApps] = useState([]);
  const [start, setStart] =useState(false)

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (startTime && !gameOver) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, gameOver]);

  // Format time helper
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  // Get random apps
  const getRandomApps = (n) => {
    const shuffled = [...apps].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  // Initialize game
  const initGame = useCallback(() => {
    setCurrentRound(1);
    setMistakesRound1(0);
    setMistakesRound2(0);
    setFoundApps([]);
    setSelectedApps(new Set());
    setIncorrectSelections(new Set());
    setGameOver(false);
    setElapsedTime(0);
    startRound();
  }, []);

  // Start a new round
  const startRound = () => {
    setSelectedApps(new Set());
    setIncorrectSelections(new Set());
    setFoundApps([]);
    
    const newAppsToFind = getRandomApps(5);
    setAppsToFind(newAppsToFind);
    
    const shuffled = [...apps].sort(() => 0.5 - Math.random());
    setShuffledApps(shuffled);
    
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  // Handle app click
  const handleAppClick = (app) => {
    const isAppToFind = appsToFind.some(appToFind => appToFind.id === app.id);
    const newSelectedApps = new Set(selectedApps);
    const newIncorrectSelections = new Set(incorrectSelections);
    
    if (selectedApps.has(app.id)) {
      // Deselect app
      newSelectedApps.delete(app.id);
      setSelectedApps(newSelectedApps);
      
      if (isAppToFind) {
        setFoundApps(prev => prev.filter(foundApp => foundApp.id !== app.id));
      } else {
        newIncorrectSelections.delete(app.id);
        setIncorrectSelections(newIncorrectSelections);
      }
    } else {
      // Select app
      newSelectedApps.add(app.id);
      setSelectedApps(newSelectedApps);
      
      if (isAppToFind) {
        const newFoundApps = [...foundApps, app];
        setFoundApps(newFoundApps);
        
        // Check if all apps are found
        if (newFoundApps.length === appsToFind.length) {
          endRound();
        }
      } else {
        // Incorrect selection
        newIncorrectSelections.add(app.id);
        setIncorrectSelections(newIncorrectSelections);
        
        if (currentRound === 1) {
          setMistakesRound1(prev => prev + 1);
        } else {
          setMistakesRound2(prev => prev + 1);
        }
        
        // Remove red highlight after 1 second
        setTimeout(() => {
          setIncorrectSelections(prev => {
            const updated = new Set(prev);
            updated.delete(app.id);
            return updated;
          });
        }, 1000);
      }
    }
  };

  // End current round
  const endRound = () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    
    if (currentRound === 1) {
      setRound1Time(timeTaken);
      setCurrentRound(2);
      
      setTimeout(() => {
        startRound();
      }, 1500);
    } else {
      // Game over
      setTimeout(() => {
        setGameOver(true);
      }, 1000);
    }
  };
 const handleStart =() =>{
        setStart(true)
    }
  // Initialize game on mount
  useEffect(() => {
    initGame();
  }, [initGame]);

  const currentMistakes = currentRound === 1 ? mistakesRound1 : mistakesRound2;

  return (
    <>
    {!start?
    (<div className='min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 p-8'>
        <div className='max-w-7xl mx-auto rounded-lg flex flex-col alignCenter justify-center items-center  bg-white p-8' >
          <h1 className='text-xl font-bold text-red-900 underline mb-4'>App Hunt</h1>
          <p className='mb-8'>
<p className='mt-4 mb-4 font-semibold'>Sharpen your eyes in App Hunt, the ultimate game of speed, precision, and digital intuition! Dive into a world of icons where only the truly observant will rise to the top.

In Round 1, you’ll be challenged to find 5 random app logos </p>
<br/>
<img src='find.png' alt='Image' className='rounded-lg w-full' />
<p className='mt-4 mb-4 font-semibold'>
  hidden among a chaotic grid of 50.
</p>

<img src='apps.png' alt='Apps' className='rounded-lg w-full'/>
 <p className='mt-4 mb-4 font-semibold'>Each correct selection boosts your confidence—but beware! Every mistake is counted, and the clock is ticking. </p>
 <img src='mist.png' alt='mistakes' className='w-full rounded-lg'/>
<p className='mt-4 font-semibold'>
   Can you identify WhatsApp from Telegram under pressure? Facebook from LinkedIn in a flash?

But just when you think you’ve mastered the game…
  </p>
<br/>

<p className='mt-4 font-semibold'>
Round 2 begins. It’s the same concept—with a clever twist you’ll discover for yourself. Let’s just say: it’s designed to keep even the sharpest minds on edge.
<br/>
Whether you're a tech lover or just looking to train your brain, App Hunt will challenge your speed and accuracy like never before.
<br/>
<br/>
Can you spot them all? It has already started 😈
</p>




          </p>
            <button onClick={handleStart} className='text-white bg-red-700 p-5 rounded-lg w-full mb-5 text-xl'>Start</button>
        </div>
    </div>):
    ( <div className="min-h-screen bg-gray-100 p-5 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-5 p-4 bg-white rounded-lg shadow-md">
          <div className="text-2xl font-bold text-gray-800">App Hunt Game</div>
          <div className="flex gap-4">
            <div className="text-lg text-gray-600">
              Time: <span className="font-bold text-red-500">{formatTime(elapsedTime)}</span>
            </div>
            <div className="text-lg text-gray-600">
              Mistakes: <span className="font-bold text-red-500">{currentMistakes}</span>
            </div>
          </div>
        </div>

        {!gameOver ? (
          <>
            {/* Message Container */}
            <div className="bg-white rounded-lg p-4 mb-5 shadow-md text-center">
              <div className="text-xl text-gray-800 mb-2">
                {currentRound === 1 ? "Let the hunt begin!" : "Round 2: Color Distortion Challenge"}
              </div>
              <div className="text-gray-600 mb-2">Find these apps:</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {appsToFind.map(app => (
                  <div
                    key={app.id}
                    className="bg-green-100 px-3 py-1 rounded-full text-sm text-green-800 font-bold"
                  >
                    {app.name}
                  </div>
                ))}
              </div>
            </div>

            {/* App Grid */}
            <div className="grid grid-cols-5 gap-4">
              {shuffledApps.map(app => {
                const isSelected = selectedApps.has(app.id);
                const isCorrect = appsToFind.some(appToFind => appToFind.id === app.id) && isSelected;
                const isIncorrect = incorrectSelections.has(app.id);
                
                return (
                  <div
                    key={app.id}
                    className={`
                      bg-white rounded-lg p-3 flex flex-col items-center cursor-pointer 
                      transform transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-1
                      ${isCorrect ? 'bg-blue-50 border-2 border-blue-500' : ''}
                      ${isIncorrect ? 'bg-red-50 border-2 border-red-500' : ''}
                    `}
                    onClick={() => handleAppClick(app)}
                  >
                    <img
                      src={app.icon}
                      alt={app.name}
                      className={`
                        w-12 h-12 rounded-lg mb-2 object-cover
                        ${currentRound === 2 ? 'filter hue-rotate-180 saturate-150' : ''}
                      `}
                    />
                    <div className="text-xs text-center text-gray-800">{app.name}</div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Game Over Screen */
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <h2 className="text-2xl text-gray-800 mb-4">Game Over!</h2>
            <div className="space-y-4">
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <div className="font-bold text-gray-600">Round 1 Time:</div>
                <div className="text-blue-500 font-bold">{formatTime(round1Time)}</div>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <div className="font-bold text-gray-600">Round 1 Mistakes:</div>
                <div className="text-blue-500 font-bold">{mistakesRound1}</div>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <div className="font-bold text-gray-600">Round 2 Time:</div>
                <div className="text-blue-500 font-bold">{formatTime(elapsedTime)}</div>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <div className="font-bold text-gray-600">Round 2 Mistakes:</div>
                <div className="text-blue-500 font-bold">{mistakesRound2}</div>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <div className="font-bold text-gray-600">Total Mistakes:</div>
                <div className="text-blue-500 font-bold">{mistakesRound1 + mistakesRound2}</div>
              </div>
            </div>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold mt-6 transition-colors"
              onClick={initGame}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>)

    }
    
    </>
   
  );
};

export default AppHuntGame;