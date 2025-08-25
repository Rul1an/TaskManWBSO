import React from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  Settings,
  LogOut
} from 'lucide-react';
import { ViewType, Organization, User } from '../types';

interface HeaderProps {
  activeView: ViewType;
  currentOrg: Organization;
  currentUser: User;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  showUserMenu: boolean;
  setShowUserMenu: (show: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  currentOrg,
  currentUser,
  searchQuery,
  setSearchQuery,
  showNotifications,
  setShowNotifications,
  showUserMenu,
  setShowUserMenu
}) => (
  <header className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">
          {activeView === 'dashboard' && 'Dashboard'}
          {activeView === 'customers' && 'Customers'}
          {activeView === 'projects' && 'Projects'}
          {activeView === 'tasks' && 'Tasks'}
        </h1>
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
          {currentOrg.name}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button className="relative p-2 hover:bg-gray-100 rounded-lg" onClick={() => setShowNotifications(!showNotifications)}>
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <HelpCircle size={20} />
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {currentUser.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <ChevronDown size={16} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b">
                <div className="font-semibold">{currentUser.fullName}</div>
                <div className="text-sm text-gray-500">{currentUser.email}</div>
              </div>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                <Settings size={16} />
                Account Settings
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600">
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </header>
);