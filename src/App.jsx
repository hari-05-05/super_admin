import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Building2, ShieldCheck, 
  FileText, PieChart, Settings, Bell, Search, 
  ChevronDown, MoreVertical, HelpCircle, CheckCircle2, 
  Plus, Download, Trash2, Edit3, Loader2, AlertCircle
} from 'lucide-react';

/** * API SERVICE LAYER 
 * Replace 'http://localhost:5000' with  actual Backend URL
 */
const API_BASE_URL = 'http://localhost:5000/api';

const apiService = {
  getDashboardStats: () => fetch(`${API_BASE_URL}/stats`).then(res => res.json()),
  getOrganizations: () => fetch(`${API_BASE_URL}/organizations`).then(res => res.json()),
  getAdmins: () => fetch(`${API_BASE_URL}/admins`).then(res => res.json()),
  getReports: () => fetch(`${API_BASE_URL}/reports`).then(res => res.json()),
  deleteOrganization: (id) => fetch(`${API_BASE_URL}/organizations/${id}`, { method: 'DELETE' }),
  approveTask: (id) => fetch(`${API_BASE_URL}/tasks/${id}/approve`, { method: 'POST' }),
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- APPLICATION STATE ---
  const [stats, setStats] = useState({ totalOrgs: 0, uptime: '0%', newThisMonth: 0, activeSystems: '0/0' });
  const [organizations, setOrganizations] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [reports, setReports] = useState([]);

  // --- DATA FETCHING LOGIC ---
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Logic to fetch data based on the active tab
        // In development, if backend isn't ready, these will fail.
        // I've added a fallback to "Mock Data" if the fetch fails so you can still see the UI.
        
        if (activeTab === 'Dashboard') {
          const statsData = await apiService.getDashboardStats().catch(() => ({
            totalOrgs: 1245, uptime: '99.98%', newThisMonth: 42, activeSystems: '14/15'
          }));
          setStats(statsData);
          
          setTasks([
            { id: 't1', title: '12 Org Registrations', status: 'Pending Approval', action: 'Approve' },
            { id: 't2', title: '8 Statutory Updates', status: 'Requires Review', action: 'Review' }
          ]);
        } 
        
        else if (activeTab === 'Organizations') {
          const orgData = await apiService.getOrganizations().catch(() => [
            { id: '1', name: 'Acme Technology', industry: 'SaaS', users: 450, plan: 'Enterprise', status: 'ACTIVE' },
            { id: '2', name: 'Global Finance', industry: 'Banking', users: 120, plan: 'Business', status: 'ACTIVE' },
            { id: '3', name: 'Stellar Logistics', industry: 'Shipping', users: 89, plan: 'Enterprise', status: 'PENDING' }
          ]);
          setOrganizations(orgData);
        }

        else if (activeTab === 'User Management') {
          const adminData = await apiService.getAdmins().catch(() => [
            { id: 'a1', name: 'Harish Kumar', role: 'Super Admin', email: 'harish@nexus.com' },
            { id: 'a2', name: 'Sarah Chen', role: 'System Auditor', email: 'sarah@nexus.com' }
          ]);
          setAdmins(adminData);
        }

        else if (activeTab === 'Reports') {
          setReports([
            { id: 'r1', name: 'System Usage Audit', date: 'Jan 2026' },
            { id: 'r2', name: 'Org Compliance Summary', date: 'Dec 2025' }
          ]);
        }

      } catch (err) {
        setError("Failed to sync with backend. Showing local cache.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab]);

  // --- ACTION HANDLERS ---
  const handleDeleteOrg = async (id) => {
    if(!window.confirm("Are you sure you want to delete this organization?")) return;
    try {
      await apiService.deleteOrganization(id);
      setOrganizations(prev => prev.filter(o => o.id !== id));
    } catch (err) {
      alert("Backend Error: Could not delete.");
    }
  };

  const handleApproveTask = async (id) => {
    try {
      await apiService.approveTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      alert("Action failed. Check server connection.");
    }
  };

  // --- UI RENDER HELPERS ---
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Organizations', icon: Building2 },
    { name: 'User Management', icon: Users },
    { name: 'Roles & Permissions', icon: ShieldCheck },
    { name: 'Statutory Settings', icon: FileText },
    { name: 'Reports', icon: PieChart },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#F4F7FE] overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#4F85F6] flex items-center gap-2">
            <ShieldCheck size={28} /> Admin
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.name ? 'bg-[#F4F7FE] text-[#4F85F6]' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <item.icon size={18} /> {item.name}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-gray-100">
          <button className="text-gray-400 text-sm flex items-center gap-2 hover:text-gray-600">
            <HelpCircle size={16} /> Contact Support
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="h-14 bg-[#4F85F6] flex items-center justify-between px-6 text-white shrink-0 shadow-lg">
          <div className="flex items-center gap-8 flex-1">
            <span className="text-lg font-bold tracking-wide">Nexus SuperPortal</span>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={16} />
              <input type="text" placeholder="Search Database..." className="w-full bg-white/20 border-none rounded-md py-1.5 pl-10 pr-4 text-sm text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/40 focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 px-3 py-1.5 rounded-md">
              <span className="text-sm font-medium uppercase tracking-tighter">IBM-INTERN-ADMIN</span>
              <ChevronDown size={14} />
            </div>
            <div className="flex items-center gap-3 border-l border-white/20 pl-4">
              <Bell size={18} className="cursor-pointer" />
              <Settings size={18} className="cursor-pointer" />
            </div>
          </div>
        </header>

        {/* MAIN AREA */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          
          {/* Global Error Banner */}
          {error && (
            <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg flex items-center gap-3 text-sm">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/50 z-50 flex items-center justify-center backdrop-blur-[1px]">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="animate-spin text-[#4F85F6]" size={40} />
                <span className="text-xs font-bold text-[#4F85F6] uppercase tracking-widest">Fetching from Server</span>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            
            {/* VIEW: DASHBOARD */}
            {activeTab === 'Dashboard' && (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-9 space-y-6">
                  <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex gap-12">
                      <div><p className="text-gray-400 text-[10px] font-bold">TOTAL ORGS</p><p className="text-xl font-bold">{stats.totalOrgs}</p></div>
                      <div><p className="text-gray-400 text-[10px] font-bold">UPTIME</p><p className="text-xl font-bold text-green-500">{stats.uptime}</p></div>
                      <div><p className="text-gray-400 text-[10px] font-bold">NEW</p><p className="text-xl font-bold">{stats.newThisMonth}</p></div>
                    </div>
                    <button className="bg-black text-white text-[10px] font-bold px-6 py-2 rounded uppercase tracking-widest hover:bg-gray-800">API Logs</button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                      <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">License Health</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-4">
                          <div><p className="text-[10px] text-gray-400 font-bold">ENTERPRISE</p><p className="text-2xl font-bold">842</p></div>
                          <div><p className="text-[10px] text-gray-400 font-bold">BASIC</p><p className="text-2xl font-bold">403</p></div>
                        </div>
                        <div className="h-24 w-24 rounded-full border-[12px] border-[#4F85F6] flex items-center justify-center font-bold text-[#4F85F6]">84%</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Systems Active</p>
                      <p className="text-4xl font-bold text-gray-800">{stats.activeSystems}</p>
                      <div className="mt-4 flex items-center gap-1 text-green-500 text-xs font-bold uppercase">
                        <CheckCircle2 size={14} /> Full Compliance
                      </div>
                    </div>
                  </div>
                </div>

                {/* TASKS COLUMN */}
                <div className="col-span-12 lg:col-span-3">
                  <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm h-full">
                    <h3 className="text-sm font-bold text-gray-800 mb-6">Pending Actions</h3>
                    <div className="space-y-4">
                      {tasks.map(task => (
                        <div key={task.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <p className="text-xs font-bold text-gray-700 mb-1">{task.title}</p>
                          <p className="text-[10px] text-gray-400 mb-3">{task.status}</p>
                          <button 
                            onClick={() => handleApproveTask(task.id)}
                            className="w-full py-2 bg-[#4F85F6] text-white text-[10px] font-bold rounded uppercase hover:bg-[#3b6edb]"
                          >
                            {task.action}
                          </button>
                        </div>
                      ))}
                      {tasks.length === 0 && <p className="text-xs text-gray-400 text-center py-8 italic">No pending tasks</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: ORGANIZATIONS */}
            {activeTab === 'Organizations' && (
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                  <h2 className="font-bold text-gray-800">Organization Directory</h2>
                  <button className="bg-[#4F85F6] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-[#3b6edb]">
                    <Plus size={14}/> Add New Organization
                  </button>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-[#F4F7FE] text-gray-500 text-[10px] font-bold uppercase">
                    <tr>
                      <th className="px-6 py-4">Organization</th>
                      <th className="px-6 py-4">Industry</th>
                      <th className="px-6 py-4">Users</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {organizations.map(org => (
                      <tr key={org.id} className="text-sm hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-800">{org.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase font-bold">{org.plan} Plan</p>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{org.industry}</td>
                        <td className="px-6 py-4 font-medium text-gray-700">{org.users}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold ${org.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                            {org.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-3 text-gray-400">
                            <Edit3 size={16} className="cursor-pointer hover:text-[#4F85F6]" />
                            <Trash2 size={16} className="cursor-pointer hover:text-red-500" onClick={() => handleDeleteOrg(org.id)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Placeholder for other views */}
            {['User Management', 'Roles & Permissions', 'Statutory Settings', 'Reports', 'Settings'].includes(activeTab) && (
              <div className="bg-white p-12 rounded-lg border border-dashed border-gray-200 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-[#F4F7FE] rounded-full text-[#4F85F6]">
                  {React.createElement(menuItems.find(m => m.name === activeTab).icon, { size: 32 })}
                </div>
                <h2 className="text-lg font-bold text-gray-800">Managing {activeTab}</h2>
                <p className="text-sm text-gray-500 mt-2">Connecting to endpoint <code>{API_BASE_URL}/{activeTab.toLowerCase().replace(' ', '-')}</code>...</p>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}