import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Filter, Layers, Database, 
  User, CheckCircle, MessageSquare, Clock, AlertTriangle, HelpCircle, Eye, LogOut
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { fetchLeads, updateLeadStatus, fetchDashboardStats } from '../services/api.js';

function AdminDashboard() {
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem('adminEmail') || 'admin@leaddesk.co';

  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, closed: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminEmail');
    toast.success('Logged out successfully.');
    navigate('/login', { replace: true });
  };
  
  // Modal for viewing long message details
  const [activeMessage, setActiveMessage] = useState(null);

  // Fetch leads and stats
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        fetchLeads({ search: searchQuery, status: statusFilter }),
        fetchDashboardStats()
      ]);
      setLeads(leadsRes.data || []);
      setStats(statsRes.data || { total: 0, new: 0, contacted: 0, closed: 0 });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data. Please check your database connection.');
    } finally {
      setLoading(false);
    }
  };

  // Run initial fetch and re-fetch when filters/search changes
  useEffect(() => {
    // Adding a small debounce for search query
    const delayDebounceFn = setTimeout(() => {
      loadDashboardData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, statusFilter]);

  // Fast fetch stats only (used after status update to keep counters synchronized)
  const refreshStatsOnly = async () => {
    try {
      const statsRes = await fetchDashboardStats();
      if (statsRes.success) {
        setStats(statsRes.data);
      }
    } catch (err) {
      console.error('Error updating stats counters:', err);
    }
  };

  // Change lead status without page reload
  const handleStatusChange = async (leadId, newStatus) => {
    const originalLeads = [...leads];
    
    // Optimistic Update for instant feedback
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));

    try {
      const res = await updateLeadStatus(leadId, newStatus);
      if (res.success) {
        toast.success(`Lead status updated to ${newStatus}`);
        
        // Refresh leads list and stats from database to ensure consistency
        const [leadsRes, statsRes] = await Promise.all([
          fetchLeads({ search: searchQuery, status: statusFilter }),
          fetchDashboardStats()
        ]);
        if (leadsRes.data) setLeads(leadsRes.data);
        if (statsRes.data) setStats(statsRes.data);
      }
    } catch (error) {
      console.error('Status Update Error:', error);
      toast.error('Failed to update status. Reverting changes.');
      // Rollback on error
      setLeads(originalLeads);
    }
  };

  // Helper to format date
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Color badges based on status
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'CONTACTED':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'CLOSED':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      default:
        return 'bg-dark-700 text-dark-300';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark-950 text-white relative">
      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-slow"></div>

      {/* Admin Nav */}
      <header className="sticky top-0 z-40 w-full glass-panel bg-dark-950/70 border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-dark-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="h-4 w-[1px] bg-dark-800"></div>
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-brand-purple" />
              <span className="font-bold tracking-tight">LeadDesk <span className="text-gradient">Admin</span></span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-dark-800 text-dark-300 border border-dark-700 items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse"></span>
              {adminEmail}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-purple/10 text-brand-purple border border-brand-purple/20 flex items-center gap-1">
              <Database className="h-3 w-3" /> Live DB Mode
            </span>
            <button
              onClick={handleLogout}
              className="p-2 bg-dark-900 hover:bg-red-500/10 border border-dark-800 hover:border-red-500/30 text-dark-400 hover:text-red-400 rounded-xl transition-all duration-200"
              title="Logout session"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Cards Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Leads', count: stats.total, color: 'border-dark-700 hover:border-dark-500', bgGlow: 'bg-dark-300/10' },
            { label: 'New Leads', count: stats.new, color: 'border-blue-500/20 hover:border-blue-500/40', text: 'text-blue-400', bgGlow: 'bg-blue-500/10' },
            { label: 'Contacted Leads', count: stats.contacted, color: 'border-amber-500/20 hover:border-amber-500/40', text: 'text-amber-400', bgGlow: 'bg-amber-500/10' },
            { label: 'Closed Leads', count: stats.closed, color: 'border-emerald-500/20 hover:border-emerald-500/40', text: 'text-emerald-400', bgGlow: 'bg-emerald-500/10' }
          ].map((card, idx) => (
            <div 
              key={idx} 
              className={`p-5 rounded-2xl glass-panel border ${card.color} transition-all duration-300 flex flex-col justify-between relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-white/5 rounded-bl-full pointer-events-none"></div>
              <div>
                <span className="text-xs sm:text-sm text-dark-400 font-medium tracking-wide uppercase">{card.label}</span>
                <h4 className={`text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight ${card.text || 'text-white'}`}>
                  {loading ? '...' : card.count}
                </h4>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[10px] sm:text-xs text-dark-500">
                <span className={`w-1.5 h-1.5 rounded-full ${card.bgGlow} animate-pulse`}></span>
                Live update
              </div>
            </div>
          ))}
        </section>

        {/* Filter Controls Row */}
        <section className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-dark-900/30 p-4 rounded-2xl glass-panel border border-dark-800">
          {/* Search bar */}
          <div className="relative w-full sm:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4.5 w-4.5 text-dark-400" />
            </span>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input placeholder-dark-500 text-sm"
            />
          </div>

          {/* Dropdown status Filter */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-dark-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-48 px-3.5 py-2.5 rounded-xl glass-input text-sm cursor-pointer"
            >
              <option value="ALL" className="bg-dark-950 text-white">All Statuses</option>
              <option value="NEW" className="bg-dark-950 text-white">NEW</option>
              <option value="CONTACTED" className="bg-dark-950 text-white">CONTACTED</option>
              <option value="CLOSED" className="bg-dark-950 text-white">CLOSED</option>
            </select>
          </div>
        </section>

        {/* Lead Table Component */}
        <section className="glass-panel border border-dark-800 rounded-2xl overflow-hidden bg-dark-900/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-dark-800 text-dark-400 text-xs font-semibold tracking-wider uppercase bg-dark-950/40">
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Budget</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Submitted At</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-800/60 text-sm text-dark-200">
                {loading ? (
                  // Skeleton Loading Rows
                  Array.from({ length: 4 }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      <td className="px-6 py-5">
                        <div className="h-4 bg-dark-800 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-dark-800 rounded w-44"></div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-6 bg-dark-800 rounded-full w-20"></div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-4 bg-dark-800 rounded w-48"></div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-6 bg-dark-800 rounded-full w-24"></div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-4 bg-dark-800 rounded w-28"></div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-8 bg-dark-800 rounded w-20 ml-auto"></div>
                      </td>
                    </tr>
                  ))
                ) : leads.length === 0 ? (
                  // Empty State Row
                  <tr>
                    <td colSpan="6" className="text-center py-16 text-dark-400">
                      <div className="flex flex-col items-center gap-3">
                        <HelpCircle className="h-10 w-10 text-dark-500" />
                        <div>
                          <p className="font-semibold text-white">No leads found</p>
                          <p className="text-xs text-dark-500 mt-1">Try modifying your search or status filter query.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  // Active Leads Data List
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-dark-900/20 transition-colors">
                      {/* Client info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center font-bold text-brand-blue text-xs shrink-0">
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="truncate max-w-[180px]">
                            <p className="font-semibold text-white truncate">{lead.name}</p>
                            <p className="text-xs text-dark-400 truncate">{lead.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Budget */}
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-dark-800 border border-dark-700 text-dark-200">
                          {lead.budget}
                        </span>
                      </td>

                      {/* Message preview */}
                      <td className="px-6 py-4 max-w-xs">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-dark-300 text-xs sm:text-sm">{lead.message}</p>
                          <button
                            onClick={() => setActiveMessage(lead)}
                            className="p-1 hover:bg-dark-800 rounded text-brand-blue hover:text-white transition-colors shrink-0"
                            title="Read Message"
                          >
                            <Eye className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </td>

                      {/* Status badge */}
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold inline-block ${getStatusBadgeStyle(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>

                      {/* Created date */}
                      <td className="px-6 py-4 text-xs text-dark-400 whitespace-nowrap">
                        {formatDate(lead.createdAt)}
                      </td>

                      {/* Interactive state dropdown changer */}
                      <td className="px-6 py-4 text-right">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="px-2 py-1 bg-dark-950 border border-dark-850 rounded-lg text-xs font-semibold cursor-pointer text-white focus:ring-1 focus:ring-brand-purple/40 outline-none"
                        >
                          <option value="NEW">Set NEW</option>
                          <option value="CONTACTED">Set CONTACTED</option>
                          <option value="CLOSED">Set CLOSED</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Message Viewer Dialog / Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm transition-all">
          <div className="glass-panel max-w-lg w-full bg-dark-900 border border-dark-700 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-brand-purple" /> Lead Requirements
            </h3>
            
            <div className="flex items-center gap-3 mt-4 mb-5 p-3 rounded-xl bg-dark-950 border border-dark-800">
              <div className="w-10 h-10 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center font-bold text-brand-purple">
                {activeMessage.name.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold text-white truncate">{activeMessage.name}</p>
                <p className="text-xs text-dark-400 truncate">{activeMessage.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-dark-500 font-bold uppercase tracking-wider block mb-1">Budget</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-dark-950 border border-dark-800 text-brand-blue">
                  {activeMessage.budget}
                </span>
              </div>

              <div>
                <span className="text-xs text-dark-500 font-bold uppercase tracking-wider block mb-1">Message Detail</span>
                <p className="text-sm text-dark-200 leading-relaxed bg-dark-950 border border-dark-800 p-4 rounded-xl max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {activeMessage.message}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setActiveMessage(null)}
                className="px-5 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-white text-sm font-medium border border-dark-700 transition-colors"
              >
                Close Dialog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer training attribution */}
      <footer className="w-full border-t border-dark-800 bg-dark-950/40 py-6 text-center text-xs text-dark-500">
        <a 
          href="https://digitalheroesco.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-brand-purple hover:underline"
        >
          Built for Digital Heroes Training Task
        </a>
      </footer>
    </div>
  );
}

export default AdminDashboard;
