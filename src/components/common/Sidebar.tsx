import React from 'react';
import {
  BarChart3,
  Building2,
  Briefcase,
  CheckSquare,
  Settings,
  Menu,
  Sparkles
} from 'lucide-react';
import { ViewType, Organization, Stats } from '../types';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  currentOrg: Organization;
  stats: Stats;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeView,
  setActiveView,
  currentOrg,
  stats
}) => (
  <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white h-screen transition-all duration-300 flex flex-col`}>
    <div className="p-4 border-b border-gray-800">
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          {sidebarOpen && <span className="font-bold">SubsidyPro</span>}
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-400 hover:text-white"
        >
          <Menu size={20} />
        </button>
      </div>
    </div>

    <nav className="flex-1 p-4">
      <div className="space-y-2">
        <button
          onClick={() => setActiveView('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            activeView === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <BarChart3 size={20} />
          {sidebarOpen && <span>Dashboard</span>}
        </button>
        
        <button
          onClick={() => setActiveView('customers')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            activeView === 'customers' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <Building2 size={20} />
          {sidebarOpen && <span>Customers</span>}
        </button>
        
        <button
          onClick={() => setActiveView('projects')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            activeView === 'projects' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <Briefcase size={20} />
          {sidebarOpen && <span>Projects</span>}
        </button>
        
        <button
          onClick={() => setActiveView('tasks')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            activeView === 'tasks' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <CheckSquare size={20} />
          {sidebarOpen && <span>Tasks</span>}
          {stats.pendingTasks > 0 && sidebarOpen && (
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {stats.pendingTasks}
            </span>
          )}
        </button>
      </div>
    </nav>

    <div className="p-4 border-t border-gray-800">
      {sidebarOpen && (
        <div className="mb-4 p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
          <div className="text-xs opacity-90">Subscription</div>
          <div className="font-semibold capitalize">{currentOrg.subscription}</div>
          <button className="mt-2 text-xs underline">Upgrade</button>
        </div>
      )}
      
      <button className={`w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg ${!sidebarOpen && 'justify-center'}`}>
        <Settings size={20} />
        {sidebarOpen && <span>Settings</span>}
      </button>
    </div>
  </aside>
);