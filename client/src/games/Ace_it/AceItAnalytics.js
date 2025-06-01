import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    BarChart,
    Bar,
    ReferenceLine
} from 'recharts';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const AceItAnalytics = () => {
    const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScores = async () => {
            if (isAuthenticated && user) {
                try {
                    const token = await getAccessTokenSilently();
                    const response = await axios.get(`/api/scores/user/${user.sub}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    // Process the scores to group initial and final scores by session
                    const processedScores = processScores(response.data);
                    setScores(processedScores);
                } catch (error) {
                    console.error('Error fetching scores:', error);
                    setError('Failed to load analytics data');
                }
                setLoading(false);
            }
        };

        fetchScores();
    }, [isAuthenticated, user, getAccessTokenSilently]);

    const processScores = (rawScores) => {
        // Sort scores by date
        const sortedScores = rawScores.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // Group scores by session (initial and final scores together)
        const sessions = [];
        for (let i = 0; i < sortedScores.length; i += 2) {
            if (i + 1 < sortedScores.length) {
                const initialScore = sortedScores[i];
                const finalScore = sortedScores[i + 1];

                if (initialScore.scoreType === 'initial_test' && finalScore.scoreType === 'final_score') {
                    sessions.push({
                        session: sessions.length + 1,
                        date: new Date(initialScore.createdAt).toLocaleDateString(),
                        initialScore: initialScore.score,
                        finalScore: finalScore.score,
                        feedbackRate: finalScore.feedbackRate,
                        improvement: finalScore.score - initialScore.score
                    });
                }
            }
        }
        return sessions;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-red-900 mb-4">Loading Analytics...</h2>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900 mx-auto"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-red-900 mb-4">Error</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    if (scores.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-red-900 mb-4">No Data Available</h2>
                    <p className="text-gray-600">Complete some game sessions to see your analytics!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-red-900 text-center mb-8">Your Progress Analytics</h1>

                {/* Score Evolution Chart */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Score Evolution Over Time</h2>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={scores}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="initialScore"
                                    stroke="#ef4444"
                                    name="Initial Score"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="finalScore"
                                    stroke="#3b82f6"
                                    name="Final Score"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Feedback Rate vs Final Score Scatter Plot */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Feedback Rate Impact on Performance</h2>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="feedbackRate"
                                    name="Feedback Rate"
                                    type="number"
                                    label={{ value: 'Feedback Rate (questions)', position: 'bottom' }}
                                />
                                <YAxis
                                    dataKey="finalScore"
                                    name="Final Score"
                                    label={{ value: 'Final Score', angle: -90, position: 'left' }}
                                />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Legend />
                                <Scatter
                                    name="Sessions"
                                    data={scores}
                                    fill="#3b82f6"
                                />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Score Improvement Bar Chart */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Score Improvement per Session</h2>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={scores}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="improvement"
                                    name="Score Improvement"
                                    fill="#10b981"
                                />
                                <ReferenceLine y={0} stroke="#666" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AceItAnalytics;