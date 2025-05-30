import { useState, useEffect } from "react"
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

const Ace_it = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [gameState, setGameState] = useState('initial'); // initial, test, feedback, results
    const [score, setScore] = useState(0);
    const [feedbackRate, setFeedbackRate] = useState(10);
    const [testScore, setTestScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [previousScores, setPreviousScores] = useState([]);

    // Fetch user's previous scores when component mounts
    useEffect(() => {
        const fetchPreviousScores = async () => {
            if (user) {
                try {
                    // Commented out API call for now
                    /*
                    const token = await getAccessTokenSilently();
                    const response = await axios.get(`http://localhost:5000/api/scores/user/${user.sub}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setPreviousScores(response.data);
                    */
                    // Temporary mock data
                    setPreviousScores([
                        { scoreType: 'initial_test', score: 85, feedbackRate: null },
                        { scoreType: 'final_score', score: 90, feedbackRate: 10 }
                    ]);
                } catch (error) {
                    console.error('Error fetching previous scores:', error);
                }
            }
        };

        fetchPreviousScores();
    }, [user, getAccessTokenSilently]);

    const handleStartTest = () => {
        setGameState('test');
        setError(null);
    };

    const handleTestComplete = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // Commented out API call for now
            /*
            const token = await getAccessTokenSilently();
            await axios.post('http://localhost:5000/api/scores', {
                userId: user.sub,
                gameType: 'ace_it',
                score: testScore,
                scoreType: 'initial_test'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            */
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            setGameState('feedback');
        } catch (error) {
            console.error('Error saving test score:', error);
            setError('Failed to save test score. Please try again.');
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
            // Commented out API call for now
            /*
            const token = await getAccessTokenSilently();
            await axios.post('http://localhost:5000/api/scores', {
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
            
            // Fetch updated scores after submission
            const response = await axios.get(`http://localhost:5000/api/scores/user/${user.sub}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPreviousScores(response.data);
            */

            // Simulate API delay and update with mock data
            await new Promise(resolve => setTimeout(resolve, 1000));
            setPreviousScores(prev => [
                { scoreType: 'final_score', score: score, feedbackRate: feedbackRate },
                ...prev
            ]);

            setGameState('initial');
            setScore(0);
            setTestScore(0);
            setFeedbackRate(10);
        } catch (error) {
            console.error('Error saving final score:', error);
            setError('Failed to save score. Please try again.');
        }
        setLoading(false);
    };
    // Temporarily dissabled authentication requirements
    // if (!user) {
    //     return (
    //         <div className="p-4 text-center">
    //             <h2 className="text-2xl font-bold mb-4">Please log in to play</h2>
    //             <p>You need to be logged in to play Ace It and track your scores.</p>
    //         </div>
    //     );
    // }

    return (
        <div className="p-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {gameState === 'initial' && (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Welcome to Ace It!</h2>
                    <p className="mb-4">Let's start with a test to determine your base level.</p>
                    {previousScores.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold mb-2">Your Previous Scores</h3>
                            <div className="max-w-md mx-auto">
                                {previousScores.map((score, index) => (
                                    <div key={index} className="bg-gray-100 p-2 mb-2 rounded">
                                        {score.scoreType === 'initial_test' ? 'Initial Test' : 'Final Score'}: {score.score}
                                        {score.feedbackRate && ` (Feedback Rate: ${score.feedbackRate})`}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleStartTest}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Start Test
                    </button>
                </div>
            )}

            {gameState === 'test' && (
                <form onSubmit={handleTestComplete} className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Initial Test</h2>
                    <div className="mb-4">
                        <label className="block mb-2">Enter your test score:</label>
                        <input
                            type="number"
                            value={testScore}
                            onChange={(e) => setTestScore(Number(e.target.value))}
                            className="w-full p-2 border rounded"
                            required
                            min="0"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Complete Test'}
                    </button>
                </form>
            )}

            {gameState === 'feedback' && (
                <form onSubmit={handleFeedbackRateSubmit} className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Choose Feedback Rate</h2>
                    <div className="mb-4">
                        <label className="block mb-2">Number of questions for feedback:</label>
                        <input
                            type="number"
                            value={feedbackRate}
                            onChange={(e) => setFeedbackRate(Number(e.target.value))}
                            min="1"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Continue
                    </button>
                </form>
            )}

            {gameState === 'results' && (
                <form onSubmit={handleFinalScoreSubmit} className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Enter Final Score</h2>
                    <div className="mb-4">
                        <label className="block mb-2">Your final score:</label>
                        <input
                            type="number"
                            value={score}
                            onChange={(e) => setScore(Number(e.target.value))}
                            className="w-full p-2 border rounded"
                            required
                            min="0"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Submit Score'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default Ace_it