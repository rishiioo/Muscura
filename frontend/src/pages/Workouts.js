import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { getWorkouts, getMySchedule, selectPlan } from '../services/api';
import { WorkoutCard } from '../components/WorkoutCard';
import { Loader2, Filter, ChevronLeft, ChevronRight, Dumbbell, Users, Calendar } from 'lucide-react';

const planOptions = [
  { id: 'upper', name: 'Upper Body Plan', icon: Dumbbell, days: '3 days/week', description: 'Focuses on chest, back, shoulders, and arms (Mon, Wed, Fri).' },
  { id: 'lower', name: 'Lower Body Plan', icon: Users, days: '3 days/week', description: 'Focuses on quads, hamstrings, glutes, calves, and core (Tue, Thu, Sat).' },
  { id: 'bro', name: 'Bro Split', icon: Calendar, days: '5 days/week', description: 'One muscle group per day: Chest, Back, Shoulders, Arms, Legs (Mon–Fri).' },
];

const Workouts = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({
    goal: '',
    difficulty: '',
    day: '',
  });

  // Plan selection state
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [previewWorkouts, setPreviewWorkouts] = useState([]);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [addingPlan, setAddingPlan] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [confirmReplace, setConfirmReplace] = useState(false);
  const [activePlan, setActivePlan] = useState(null);

  // Fetch current schedule to know active plan
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await getMySchedule();
        setCurrentSchedule(res.data);
        setActivePlan(res.data?.planType || null);
      } catch (err) {
        console.error('Could not fetch schedule:', err);
      }
    };
    fetchSchedule();
  }, []);

  // Fetch workouts for preview when selectedPlan changes
  useEffect(() => {
    if (!selectedPlan) return;
    setPreviewLoading(true);
    const fetchPreview = async () => {
      try {
        const params = { planType: selectedPlan, page: 1, limit: 100 };
        const res = await getWorkouts(params);
        setPreviewWorkouts(res.data.data || []);
      } catch (err) {
        console.error('Error fetching preview workouts:', err);
        toast('Could not load plan workouts', 'error');
      } finally {
        setPreviewLoading(false);
      }
    };
    fetchPreview();
  }, [selectedPlan, toast]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      setError(null);
      try {
        let params = { page };
        if (user?.goal && user?.goal !== 'healthy') {
          params.goal = user.goal;
        }
        if (filter.difficulty) params.difficulty = filter.difficulty;
        if (filter.day) params.day = filter.day;

        const res = await getWorkouts(params);
        setWorkouts(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError('Could not load workouts. Please try again.');
        toast('Could not load workouts', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, [user, filter, page, toast]);

  const clearFilters = () => {
    setFilter({ goal: '', difficulty: '', day: '' });
    setPage(1);
  };

  const handleAddPlan = async () => {
    if (!selectedPlan) return;
    if (currentSchedule) {
      setConfirmReplace(true);
      return;
    }
    await doAddPlan();
  };

  const doAddPlan = async () => {
    setAddingPlan(true);
    try {
      const res = await selectPlan({ planType: selectedPlan });
      setCurrentSchedule(res.data);
      setActivePlan(res.data.planType);
      toast('Plan added to your schedule!', 'success');
    } catch (err) {
      console.error('Error adding plan:', err);
      toast('Failed to add plan', 'error');
    } finally {
      setAddingPlan(false);
      setConfirmReplace(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Workouts</h1>

        {/* Plan Selection Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Choose a Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planOptions.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer border-2 transition-all ${selectedPlan === plan.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100 hover:border-gray-300'}`}
              >
                <div className="flex items-center mb-4">
                  <plan.icon className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  {activePlan === plan.id && (
                    <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mb-2">{plan.days}</p>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Preview section */}
        {selectedPlan && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Preview: {planOptions.find(p => p.id === selectedPlan)?.name}</h2>
              <button
                onClick={handleAddPlan}
                disabled={addingPlan}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {addingPlan ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Add this plan to my schedule
              </button>
            </div>
            {previewLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : previewWorkouts.length === 0 ? (
              <p className="text-gray-500">No workouts found for this plan.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {previewWorkouts.map((workout) => (
                  <WorkoutCard key={workout._id} workout={workout} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Confirm Replace Dialog */}
        {confirmReplace && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4">
              <h3 className="text-lg font-bold mb-2">Replace Schedule?</h3>
              <p className="text-gray-600 mb-4">This will replace your current schedule. Do you want to continue?</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setConfirmReplace(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={doAddPlan}
                  disabled={addingPlan}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {addingPlan ? 'Adding...' : 'Replace'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success message with View Schedule button */}
        {currentSchedule && activePlan && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
            <span className="text-green-800">Your current plan: <strong>{planOptions.find(p => p.id === activePlan)?.name}</strong></span>
            <a href="/schedule" className="text-blue-600 hover:underline font-medium">View my schedule</a>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={filter.difficulty}
              onChange={(e) => { setFilter({ ...filter, difficulty: e.target.value }); setPage(1); }}
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select
              value={filter.day}
              onChange={(e) => { setFilter({ ...filter, day: e.target.value }); setPage(1); }}
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="">All Days</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          {filter.difficulty || filter.day ? (
            <button onClick={clearFilters} className="text-blue-600 hover:underline">
              Clear Filters
            </button>
          ) : null}
        </div>

        {/* Workouts Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => setPage(1)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : workouts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No workouts found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workouts.map((workout) => (
                <WorkoutCard key={workout._id} workout={workout} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="p-2 rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="p-2 rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Workouts;