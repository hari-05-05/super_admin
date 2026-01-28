import React, { useState } from 'react';
import './index.css';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  ShieldCheck, 
  FileText, 
  PieChart, 
  Settings, 
  Bell, 
  Search, 
  ChevronDown, 
  MoreVertical,
  HelpCircle,
  CheckCircle2,
  Plus,
  Download
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Sidebar navigation items
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Organizations', icon: Building2 },
    { name: 'User Management', icon: Users },
    { name: 'Roles & Permissions', icon: ShieldCheck },
    { name: 'Statutory Settings', icon: FileText },
    { name: 'Reports', icon: PieChart },
    { name: 'Settings', icon: Settings },
  ];

  // --- CONTENT COMPONENTS ---

  const DashboardHome = () => {
    const todoTasks = [
      { title: '12 Org Registrations', status: 'Pending Approval', action: 'Approve' },
      { title: '8 Statutory Updates', status: 'Requires Review', action: 'Review' },
      { title: '4 Security Alerts', status: 'Unresolved', action: 'Check' },
    ];

    return (
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-9 space-y-6">
          <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">System Sync For Jan 2026</span>
              <span className="bg-green-100 text-green-600 text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Optimal</span>
            </div>
            <div className="flex gap-12 text-sm">
              <div><p className="text-gray-400 text-xs">TOTAL ORGS</p><p className="font-bold text-gray-800">1,245</p></div>
              <div><p className="text-gray-400 text-xs">NEW THIS MONTH</p><p className="font-bold text-gray-800">42</p></div>
              <div><p className="text-gray-400 text-xs">SYSTEM UPTIME</p><p className="font-bold text-gray-800">99.98%</p></div>
            </div>
            <button className="bg-black text-white text-[10px] font-bold px-4 py-2 rounded uppercase">View Logs</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">License Distribution</h3>
                <button className="text-gray-400"><MoreVertical size={16}/></button>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-4">
                  <div><p className="text-xs text-gray-400 font-medium">ENTERPRISE</p><p className="text-lg font-bold text-gray-800">842</p></div>
                  <div><p className="text-xs text-gray-400 font-medium">BASIC</p><p className="text-lg font-bold text-gray-800">403</p></div>
                </div>
                <div className="w-24 h-24 bg-[#F4F7FE] rounded-full border-8 border-[#4F85F6] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#4F85F6]">84%</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm flex items-center justify-center text-center">
              <div className="space-y-2">
                <p className="text-xs text-gray-400 font-bold uppercase">Active Systems</p>
                <p className="text-3xl font-bold text-gray-800">14/15</p>
                <p className="text-xs text-green-500 flex items-center justify-center gap-1"><CheckCircle2 size={12} /> Compliance Met</p>
                <button className="text-[#4F85F6] text-xs font-bold hover:underline mt-2">View Compliance Details</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-bold text-gray-500 uppercase">Organization Growth</h3>
              <select className="bg-[#F4F7FE] border-none text-xs font-bold px-3 py-1 rounded outline-none">
                <option>This Year</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="flex items-end justify-between h-48 gap-4">
              {[60, 45, 80, 55, 90, 70, 85].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col gap-2 group">
                  <div className="relative w-full bg-[#E5EDFF] rounded-t-sm h-full overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-[#4F85F6] transition-all duration-500 group-hover:bg-[#3b6edb]" style={{ height: `${height}%` }}></div>
                  </div>
                  <span className="text-[10px] text-center text-gray-400 font-bold uppercase">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm h-full">
            <h3 className="text-sm font-bold text-gray-800 mb-6">System To Do</h3>
            <div className="space-y-8">
              {todoTasks.map((task, idx) => (
                <div key={idx} className="space-y-2 border-b border-gray-50 pb-6 last:border-none">
                  <h4 className="text-xs font-bold text-gray-700">{task.title}</h4>
                  <p className="text-[10px] text-gray-400 font-medium">{task.status}</p>
                  <button className="w-full py-1.5 border border-[#4F85F6] text-[#4F85F6] text-[10px] font-bold rounded hover:bg-[#4F85F6] hover:text-white transition-all">
                    {task.action}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-[#F4F7FE] p-4 rounded-lg">
              <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase">System Health</p>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[95%]"></div>
                </div>
                <span className="text-xs font-bold text-gray-700">95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Organizations = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Registered Organizations</h3>
        <button className="bg-[#4F85F6] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm">
          <Plus size={16} /> New Organization
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F4F7FE] text-gray-500 text-[10px] font-bold uppercase">
            <tr>
              <th className="px-6 py-4">Org Name</th>
              <th className="px-6 py-4">Industry</th>
              <th className="px-6 py-4">Users</th>
              <th className="px-6 py-4">Plan</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-700">Client Organization {i}</td>
                <td className="px-6 py-4 text-gray-500">Technology</td>
                <td className="px-6 py-4 text-gray-500">{Math.floor(Math.random() * 500) + 50}</td>
                <td className="px-6 py-4 text-gray-500">{i % 2 === 0 ? 'Enterprise' : 'Business'}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-[10px] font-bold">ACTIVE</span>
                </td>
                <td className="px-6 py-4 text-right"><MoreVertical size={16} className="text-gray-400 cursor-pointer" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const UserManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Global Admin Directory</h3>
        <button className="bg-[#4F85F6] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
          <Plus size={16} /> Add Admin
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-[#4F85F6] text-white flex items-center justify-center font-bold">JD</div>
            <div>
              <p className="font-bold text-gray-800 text-sm">John Doe {i}</p>
              <p className="text-xs text-gray-400 font-medium">System Super Admin</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RolesPermissions = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Role Master Settings</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {['Super Admin', 'Org Admin', 'HR Admin', 'Payroll Admin', 'Employee'].map((role) => (
          <div key={role} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">{role}</p>
              <p className="text-xs text-gray-400 mt-1">Full access to modules including organizations and billing.</p>
            </div>
            <button className="text-[#4F85F6] text-xs font-bold hover:underline">Edit Access</button>
          </div>
        ))}
      </div>
    </div>
  );

  const StatutorySettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Global Statutory Configurations</h3>
        <div className="space-y-6">
          {['EPF Contribution Rate', 'ESI Ceiling Limit', 'TDS Slab Rates (FY 2025-26)', 'Professional Tax Rules'].map((setting) => (
            <div key={setting} className="flex items-center justify-between p-4 bg-[#F4F7FE] rounded-lg">
              <span className="text-sm font-bold text-gray-700">{setting}</span>
              <button className="bg-white border border-gray-200 px-3 py-1 rounded text-[10px] font-bold text-gray-500 uppercase">Update</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Reports = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Global System Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['System Usage Audit', 'Org Compliance Report', 'Financial Transaction Log', 'User Activity Summary'].map((rep) => (
          <div key={rep} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm group hover:border-[#4F85F6] transition-colors">
            <FileText className="text-[#4F85F6]" />
            <p className="mt-4 font-bold text-gray-800 text-sm">{rep}</p>
            <p className="text-xs text-gray-400 mt-2">Generated weekly for system health checks.</p>
            <button className="mt-4 flex items-center gap-2 text-[#4F85F6] text-xs font-bold">
              <Download size={14} /> Export PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="max-w-2xl bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-8">System Configuration</h3>
      <div className="space-y-8">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">System Name</label>
          <input type="text" defaultValue="Nexus Super Admin Portal" className="w-full bg-[#F4F7FE] border-none p-3 rounded text-sm font-medium outline-none focus:ring-1 focus:ring-[#4F85F6]" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-800">Maintenance Mode</p>
            <p className="text-xs text-gray-400">Restrict access during system updates.</p>
          </div>
          <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
            <div className="absolute left-1 top-1 h-3 w-3 bg-white rounded-full"></div>
          </div>
        </div>
        <button className="w-full bg-[#4F85F6] text-white py-3 rounded-lg font-bold shadow-md hover:bg-[#3b6edb]">Save All Changes</button>
      </div>
    </div>
  );

  // Function to render content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'Dashboard': return <DashboardHome />;
      case 'Organizations': return <Organizations />;
      case 'User Management': return <UserManagement />;
      case 'Roles & Permissions': return <RolesPermissions />;
      case 'Statutory Settings': return <StatutorySettings />;
      case 'Reports': return <Reports />;
      case 'Settings': return <SettingsView />;
      default: return <DashboardHome />;
    }
  };

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
                activeTab === item.name 
                ? 'bg-[#F4F7FE] text-[#4F85F6]' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-100">
          <button className="text-gray-400 text-sm flex items-center gap-2 hover:text-gray-600">
            <HelpCircle size={16} /> Contact Support
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER */}
        <header className="h-14 bg-[#4F85F6] flex items-center justify-between px-6 text-white shrink-0">
          <div className="flex items-center gap-8 flex-1">
            <span className="text-lg font-bold tracking-wide">Nexus Portal</span>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={16} />
              <input 
                type="text" 
                placeholder="Search Database" 
                className="w-full bg-white/20 border-none rounded-md py-1.5 pl-10 pr-4 text-sm text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/40 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 px-3 py-1.5 rounded-md transition-colors">
              <span className="text-sm font-medium uppercase">IBM-INTERN</span>
              <ChevronDown size={14} />
            </div>
            <div className="flex items-center gap-3 border-l border-white/20 pl-4">
              <Bell size={18} className="cursor-pointer hover:opacity-80" />
              <HelpCircle size={18} className="cursor-pointer hover:opacity-80" />
              <Settings size={18} className="cursor-pointer hover:opacity-80" />
            </div>
          </div>
        </header>

        {/* DYNAMIC CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;