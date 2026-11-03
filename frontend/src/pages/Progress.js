import React, { useState, useEffect } from 'react';
import { useToast } from '../components/Toast';
import { getProgressLogs, getWeightChart } from '../services/api';
import { Loader2, Activity, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Progress = () => {
  const toast = useToast();
  const [progressLogs, setProgressLogs] = useState([]);
  const [weightHistory, setWeightHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const logsRes = await getProgressLogs();
        setProgressLogs(logsRes.data);

        const chartRes = await getWeightChart();
        setWeightHistory(chartRes.data);
      } catch (err) {
        console.error('Error fetching progress:', err);
        setError('Could not load progress data. Please try again.');
        toast('Could not load progress data', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Progress Tracker</h1>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Weight Progress
          </h3>
          {weightHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">No weight data available.</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-lg mb-4">Recent Progress Logs</h3>
          {progressLogs.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No progress logs recorded.</p>
          ) : (
            <div className="space-y-3">
              {progressLogs.map((log) => (
                <div key={log._id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{log.weight} kg</p>
                      <p className="text-xs text-gray-500">
                        {new Date(log.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {log.notes && (
                    <p className="mt-2 text-sm text-gray-600">{log.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;