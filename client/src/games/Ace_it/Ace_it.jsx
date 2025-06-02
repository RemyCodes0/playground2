import { useState, useEffect } from "react"
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

const API_BASE_URL = 'http://localhost:5000/api';

const Ace_it = () => {
    const { user, getAccessTokenSilently, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    const [gameState, setGameState] = useState('initial');
    const [score, setScore] = useState(0);
    const [feedbackRate, setFeedbackRate] = useState(10);
    const [testScore, setTestScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [previousScores, setPreviousScores] = useState([]);
    const [start, setStart] = useState(false);


    const fetchPreviousScores = async () => {
        if (isAuthenticated && user) {
            try {

                const token = localStorage.getItem("token")
                console.log("Hello world, ", token)
                console.log('Fetching scores for user:', user.sub);
                const response = await axios.get(`${API_BASE_URL}/scores/user/${user.sub}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Scores fetched successfully:', response.data);
                setPreviousScores(response.data);
            } catch (error) {
                console.error('Error fetching previous scores:', error);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Error response:', error.response.data);
                    console.error('Error status:', error.response.status);
                    setError(error.response.data.error || 'Failed to fetch previous scores. Please try again.');
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                    setError('No response from server. Please check your connection.');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error setting up request:', error.message);
                    setError('Failed to fetch previous scores. Please try again.');
                }
            }
        }
    };
    // Debug authentication state
    useEffect(() => {
        console.log('Auth State:', {
            isAuthenticated,
            isLoading,
            user
        });
        fetchPreviousScores();
    }, [isAuthenticated, isLoading, user, getAccessTokenSilently]);


    const handleStartTest = () => {
        setGameState('test');
        setError(null);
    };

    const handleTestComplete = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token")
            console.log('Submitting test score:', testScore);
            const response = await axios.post(`${API_BASE_URL}/scores`, {
                userId: user.sub,
                gameType: 'ace_it',
                score: testScore,
                scoreType: 'initial_test'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Test score saved successfully:', response.data);
            setGameState('feedback');
        } catch (error) {
            console.error('Error saving test score:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
                setError(error.response.data.error || 'Failed to save test score. Please try again.');
            } else if (error.request) {
                console.error('No response received:', error.request);
                setError('No response from server. Please check your connection.');
            } else {
                console.error('Error setting up request:', error.message);
                setError('Failed to save test score. Please try again.');
            }
        }
        setLoading(false);
    };

    const handleFeedbackRateSubmit = (e) => {
        e.preventDefault();
        setGameState('results');
        setError(null);
    };

    const handleFinalScoreSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token")
            console.log('Submitting final score:', score);
            const response = await axios.post(`${API_BASE_URL}/scores`, {
                userId: user.sub,
                gameType: 'ace_it',
                score: score,
                scoreType: 'final_score',
                feedbackRate: feedbackRate
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Final score saved successfully:', response.data);

            // Fetch updated scores after submission
            console.log('Fetching updated scores');
            const scoresResponse = await axios.get(`${API_BASE_URL}/scores/user/${user.sub}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Updated scores fetched:', scoresResponse.data);
            setPreviousScores(scoresResponse.data);

            setGameState('initial');
            setScore(0);
            setTestScore(0);
            setFeedbackRate(10);
        } catch (error) {
            console.error('Error saving final score:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
                setError(error.response.data.error || 'Failed to save score. Please try again.');
            } else if (error.request) {
                console.error('No response received:', error.request);
                setError('No response from server. Please check your connection.');
            } else {
                console.error('Error setting up request:', error.message);
                setError('Failed to save score. Please try again.');
            }
        }
        setLoading(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-red-900 mb-4">Loading...</h2>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900 mx-auto"></div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 p-8">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
                    <h2 className="text-3xl font-bold text-red-900 mb-4">Welcome to Ace It!</h2>
                    <p className="text-gray-600 mb-6">Test your skills and track your progress. Please log in to continue.</p>
                    <button
                        onClick={() => loginWithRedirect()}
                        className="bg-red-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-800 transition-colors duration-200"
                    >
                        Log In to Play
                    </button>
                </div>
            </div>
        );
    }

    if (!start) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-red-900 text-center mb-6">Welcome to Ace It!</h1>

                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Play</h2>
                            <p className="text-gray-600 mb-4">
                                Ace It is a game of skill and precision. Test your abilities and track your progress to find your optimal strategy!
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="font-semibold text-red-700 mb-2">Initial Test</h3>
                                    <p className="text-gray-600">Start with a baseline test to determine your current level.</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="font-semibold text-red-700 mb-2">Feedback Rate</h3>
                                    <p className="text-gray-600">Choose how often you want to receive feedback on your performance.</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="font-semibold text-red-700 mb-2">Final Score</h3>
                                    <p className="text-gray-600">Complete the game and submit your final score to track your progress.</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="font-semibold text-red-700 mb-2">Progress Tracking</h3>
                                    <p className="text-gray-600">View your previous scores and see how you've improved over time.</p>
                                </div>
                            </div>
                        </div>

                        {previousScores.length > 0 && (
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Previous Scores</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {previousScores.map((score, index) => (
                                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm transform transition-all duration-200 hover:scale-105">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-700">
                                                    {score.scoreType === 'initial_test' ? 'Initial Test' : 'Final Score'}
                                                </span>
                                                <span className="text-lg font-bold text-red-900">{score.score}</span>
                                            </div>
                                            {score.feedbackRate && (
                                                <div className="text-sm text-gray-500 mt-1">
                                                    Feedback Rate: {score.feedbackRate} questions
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setStart(true)}
                        className="w-full mt-8 bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-800 transition-all duration-200 transform hover:scale-105"
                    >
                        Start Game
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 p-8">
            {error && (
                <div className="max-w-2xl mx-auto mb-6 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
                    {error}
                </div>
            )}

            {gameState === 'initial' && (
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-red-900 mb-6 text-center">Welcome to Ace It!</h2>
                    <p className="text-gray-600 mb-8 text-center">Let's start with a test to determine your base level.</p>

                    {previousScores.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Previous Scores</h3>
                            <div className="space-y-3">
                                {previousScores.map((score, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 transform transition-all duration-200 hover:scale-105">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-700">
                                                {score.scoreType === 'initial_test' ? 'Initial Test' : 'Final Score'}
                                            </span>
                                            <span className="text-lg font-bold text-red-900">{score.score}</span>
                                        </div>
                                        {score.feedbackRate && (
                                            <div className="text-sm text-gray-500 mt-1">
                                                Feedback Rate: {score.feedbackRate} questions
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleStartTest}
                        className="w-full bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-800 transition-all duration-200 transform hover:scale-105"
                    >
                        Start Test
                    </button>
                </div>
            )}

            {gameState === 'test' && (
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-red-900 mb-6 text-center">Initial Test</h2>
                    <form onSubmit={handleTestComplete} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-lg font-medium mb-2">
                                Enter your test score:
                            </label>
                            <input
                                type="number"
                                value={testScore}
                                onChange={(e) => setTestScore(Number(e.target.value))}
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                                required
                                min="0"
                                placeholder="Enter your score"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-800 transition-all duration-200 transform hover:scale-105 disabled:bg-gray-400 disabled:transform-none"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </span>
                            ) : 'Complete Test'}
                        </button>
                    </form>
                </div>
            )}

            {gameState === 'feedback' && (
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-red-900 mb-6 text-center">Choose Feedback Rate</h2>
                    <form onSubmit={handleFeedbackRateSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-lg font-medium mb-2">
                                Number of questions for feedback:
                            </label>
                            <input
                                type="number"
                                value={feedbackRate}
                                onChange={(e) => setFeedbackRate(Number(e.target.value))}
                                min="1"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                                required
                                placeholder="Enter number of questions"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-800 transition-all duration-200 transform hover:scale-105"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            )}

            {gameState === 'results' && (
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-red-900 mb-6 text-center">Enter Final Score</h2>
                    <form onSubmit={handleFinalScoreSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-lg font-medium mb-2">
                                Your final score:
                            </label>
                            <input
                                type="number"
                                value={score}
                                onChange={(e) => setScore(Number(e.target.value))}
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                                required
                                min="0"
                                placeholder="Enter your final score"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-800 transition-all duration-200 transform hover:scale-105 disabled:bg-gray-400 disabled:transform-none"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </span>
                            ) : 'Submit Score'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Ace_it