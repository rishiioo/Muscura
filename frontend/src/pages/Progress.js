import React, { useState, useEffect } from 'react';
import { getProgressLogs, getWeightChart } from '../services/api';
import { Loader2, Activity, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Progress = () => {
  const [progressLogs, setProgressLogs] = useState([]);
  const [weightHistory, setWeightHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const logsRes = await getProgressLogs();
        setProgressLogs(logsRes.data);

        const chartRes = await getWeightChart();
        setWeightHistory(chartRes.data);
      } catch (err) {
        console.error('Error fetching progress:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
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