import React, { useState, useEffect } from 'react';
import { getAdminStats, getAdminUsers, updateAdminUserStatus, deleteAdminUser } from '../services/api';
import { Users, AlertTriangle, ShieldCheck, CheckCircle, RefreshCw, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAdminData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, usersRes] = await Promise.all([getAdminStats(), getAdminUsers({ page })]);
      setStats(statsRes.data);
      setUsers(usersRes.data.data || []);
      setTotalPages(usersRes.data.totalPages || 1);
    } catch (err) {
      setError('Failed to load admin data. Please try again.');
      console.error('Admin data fetch error:', err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchAdminData(); }, [page]);

  const handleToggleStatus = async (user) => {
    try {
      await updateAdminUserStatus(user._id, !user.isActive);
      setUsers(users.map(u => u._id === user._id ? { ...u, isActive: !u.isActive } : u));
    } catch (err) {
      console.error('Toggle status error:', err);
      setError('Failed to update user status.');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Remove member?')) {
      try {
        await deleteAdminUser(id);
        setUsers(users.filter(u => u._id !== id));
      } catch (err) {
        console.error('Delete user error:', err);
        setError('Failed to delete user.');
      }
    }
  };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="pt-20 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2"><ShieldCheck /> Gym Owner Panel</h1>
            <p className="text-gray-500 text-xs">Manage members & renewals</p>
          </div>
          <button onClick={fetchAdminData} className="flex items-center gap-1 bg-white p-2 rounded border text-xs"><RefreshCw size={14}/> Refresh</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded border flex justify-between"><div><p className="text-xs text-gray-400">Members</p><h3>{stats?.userCount || 0}</h3></div><Users /></div>
          <div className="bg-white p-4 rounded border flex justify-between"><div><p className="text-xs text-gray-400">Active</p><h3>{stats?.activeSubCount || 0}</h3></div><CheckCircle /></div>
          <div className="bg-white p-4 rounded border flex justify-between"><div><p className="text-xs text-gray-400">Expiring</p><h3>1 Alert</h3></div><AlertTriangle /></div>
        </div>

        <div className="bg-white rounded border p-4 overflow-x-auto">
          <div className="flex justify-between mb-4"><h2 className="text-sm font-bold">Member Directory</h2><input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-1 border rounded text-xs" /></div>
          <table className="w-full text-left text-xs">
            <thead><tr className="bg-gray-50 border-b">
              <th className="p-2">Member</th><th className="p-2">Goal</th><th className="p-2">Plan</th><th className="p-2">Status</th><th className="p-2 text-right">Actions</th>
            </tr></thead>
            <tbody>{filteredUsers.map((u) => (
              <tr key={u._id} className="border-b last:border-0">
                <td className="p-2 font-bold">{u.name}<br /><span className="text-[10px] text-gray-400 font-normal">{u.email}</span></td>
                <td className="p-2 uppercase font-bold text-blue-600">{u.goal || 'healthy'}</td>
                <td className="p-2">{u.subscription ? u.subscription.name : 'None'}</td>
                <td className="p-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{u.isActive ? 'ACTIVE' : 'INACTIVE'}</span>
                </td>
                <td className="p-2 text-right space-x-1">
                  <button onClick={() => handleToggleStatus(u)} className="p-1 border rounded">Toggle</button>
                  <button onClick={() => handleDeleteUser(u._id)} className="p-1 bg-red-50 text-red-600 rounded">Delete</button>
                </td>
              </tr>
            ))}</tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-gray-500">Page {page} of {totalPages}</span>
              <div className="flex gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1 border rounded disabled:opacity-50"><ChevronLeft size={14} /></button>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1 border rounded disabled:opacity-50"><ChevronRight size={14} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;