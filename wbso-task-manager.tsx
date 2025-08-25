import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Users, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Calendar, 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  Settings, 
  Building2, 
  UserPlus, 
  Briefcase, 
  ChevronRight, 
  Save, 
  X, 
  FileText, 
  Brain, 
  BarChart3, 
  Clock, 
  Filter, 
  MoreVertical, 
  ArrowUpRight, 
  Target, 
  Loader2, 
  CheckSquare, 
  Square, 
  Upload, 
  Download, 
  Bell, 
  HelpCircle, 
  LogOut, 
  Menu,
  ChevronDown,
  Sparkles,
  TrendingDown,
  Mail,
  Phone,
  MapPin,
  Hash,
  Tag,
  Link2,
  Eye
} from 'lucide-react';

// TypeScript Types (normally in separate file)
interface Organization {
  id: string;
  name: string;
  slug: string;
  subscription: 'trial' | 'starter' | 'professional' | 'enterprise';
  trialEndsAt?: Date;
  settings: Record<string, any>;
}

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'owner' | 'admin' | 'member';
  avatarUrl?: string;
  organizations: Organization[];
}

interface Customer {
  id: string;
  organizationId: string;
  name: string;
  kvkNumber?: string;
  industry: string;
  size: 'micro' | 'small' | 'medium' | 'large' | 'enterprise';
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  status: 'lead' | 'prospect' | 'active' | 'inactive';
  tags: string[];
  annualRevenue?: number;
  employeeCount?: number;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

interface Project {
  id: string;
  organizationId: string;
  customerId: string;
  customer?: Customer;
  name: string;
  type: 'wbso' | 'mit' | 'innovationbox' | 'other';
  status: 'draft' | 'active' | 'submitted' | 'approved' | 'rejected' | 'completed';
  deadline?: Date;
  budget?: number;
  successProbability?: number;
  documents: Document[];
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

interface Task {
  id: string;
  projectId: string;
  project?: Project;
  assignedTo?: string;
  assignee?: User;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  dueDate?: Date;
  completedAt?: Date;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  checklist: ChecklistItem[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
}

interface Document {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedAt: Date;
}

// Modern Production-Ready Subsidy Management Platform
const SubsidyManagementPlatform = () => {
  // Auth & Organization State
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    email: 'admin@company.nl',
    fullName: 'Admin User',
    role: 'owner',
    organizations: [{
      id: '1',
      name: 'Innovation Consultancy',
      slug: 'innovation-consultancy',
      subscription: 'professional',
      settings: {}
    }]
  });

  const [currentOrg, setCurrentOrg] = useState<Organization>(currentUser.organizations[0]);

  // Data States
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      organizationId: '1',
      name: 'TechStart B.V.',
      kvkNumber: '12345678',
      industry: 'Technology',
      size: 'medium',
      contactPerson: 'Jan Jansen',
      email: 'jan@techstart.nl',
      phone: '+31 6 12345678',
      address: 'Startupweg 42, 1234 AB Amsterdam',
      website: 'https://techstart.nl',
      status: 'active',
      tags: ['High Priority', 'WBSO Active'],
      annualRevenue: 5000000,
      employeeCount: 45,
      metadata: {},
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-08-20')
    },
    {
      id: '2',
      organizationId: '1',
      name: 'Innovation Labs',
      kvkNumber: '87654321',
      industry: 'Research',
      size: 'small',
      contactPerson: 'Marie de Vries',
      email: 'marie@innovationlabs.nl',
      phone: '+31 6 87654321',
      address: 'Innovatiestraat 1, 5678 CD Utrecht',
      website: 'https://innovationlabs.nl',
      status: 'prospect',
      tags: ['New Lead', 'MIT Eligible'],
      annualRevenue: 1500000,
      employeeCount: 12,
      metadata: {},
      createdAt: new Date('2024-07-01'),
      updatedAt: new Date('2024-08-22')
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      organizationId: '1',
      customerId: '1',
      name: 'WBSO 2025 - Q1 Aanvraag',
      type: 'wbso',
      status: 'active',
      deadline: new Date('2025-09-30'),
      budget: 250000,
      successProbability: 85,
      documents: [],
      metadata: {},
      createdAt: new Date('2024-08-01'),
      updatedAt: new Date('2024-08-25')
    },
    {
      id: '2',
      organizationId: '1',
      customerId: '2',
      name: 'MIT Haalbaarheidsproject',
      type: 'mit',
      status: 'draft',
      deadline: new Date('2025-10-15'),
      budget: 50000,
      successProbability: 70,
      documents: [],
      metadata: {},
      createdAt: new Date('2024-08-10'),
      updatedAt: new Date('2024-08-24')
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      projectId: '1',
      assignedTo: '1',
      title: 'Technical documentation review',
      description: 'Review and update technical documentation for WBSO application',
      priority: 'high',
      status: 'in_progress',
      dueDate: new Date('2025-09-05'),
      estimatedHours: 8,
      actualHours: 3,
      tags: ['Documentation', 'WBSO'],
      checklist: [
        { id: '1', text: 'Review project scope', completed: true },
        { id: '2', text: 'Update technical specifications', completed: false },
        { id: '3', text: 'Validate innovation criteria', completed: false }
      ],
      comments: [],
      createdAt: new Date('2024-08-20'),
      updatedAt: new Date('2024-08-25')
    },
    {
      id: '2',
      projectId: '2',
      assignedTo: '1',
      title: 'Feasibility study draft',
      description: 'Create initial draft for MIT feasibility study',
      priority: 'medium',
      status: 'todo',
      dueDate: new Date('2025-09-10'),
      estimatedHours: 16,
      tags: ['MIT', 'Research'],
      checklist: [],
      comments: [],
      createdAt: new Date('2024-08-22'),
      updatedAt: new Date('2024-08-22')
    }
  ]);

  // UI States
  const [activeView, setActiveView] = useState<'dashboard' | 'customers' | 'projects' | 'tasks'>('dashboard');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Modal States
  const [modalState, setModalState] = useState<{
    type: 'customer' | 'project' | 'task' | null;
    mode: 'create' | 'edit';
    data?: any;
  }>({ type: null, mode: 'create' });

  // Calculate Statistics
  const stats = useMemo(() => {
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const avgSuccessRate = projects.reduce((sum, p) => sum + (p.successProbability || 0), 0) / projects.length;
    const upcomingDeadlines = tasks.filter(t => 
      t.dueDate && new Date(t.dueDate) > new Date() && new Date(t.dueDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ).length;

    return {
      totalCustomers: customers.length,
      activeCustomers: customers.filter(c => c.status === 'active').length,
      totalProjects: projects.length,
      activeProjects,
      totalBudget,
      avgSuccessRate: Math.round(avgSuccessRate),
      pendingTasks: tasks.filter(t => t.status !== 'completed').length,
      upcomingDeadlines
    };
  }, [customers, projects, tasks]);

  // Enhanced Data with Relations
  const enhancedProjects = useMemo(() => 
    projects.map(project => ({
      ...project,
      customer: customers.find(c => c.id === project.customerId)
    })), [projects, customers]
  );

  const enhancedTasks = useMemo(() =>
    tasks.map(task => ({
      ...task,
      project: enhancedProjects.find(p => p.id === task.projectId)
    })), [tasks, enhancedProjects]
  );

  // Filter Functions
  const filteredCustomers = useMemo(() => {
    if (!searchQuery) return customers;
    const query = searchQuery.toLowerCase();
    return customers.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.contactPerson?.toLowerCase().includes(query) ||
      c.kvkNumber?.includes(query)
    );
  }, [customers, searchQuery]);

  // Sidebar Component
  const Sidebar = () => (
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

  // Header Component
  const Header = () => (
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

  // Dashboard View
  const DashboardView = () => (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <Building2 className="text-blue-500" size={24} />
            <span className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp size={14} />
              +12%
            </span>
          </div>
          <div className="text-2xl font-bold">{stats.activeCustomers}</div>
          <div className="text-sm text-gray-500">Active Customers</div>
          <div className="mt-2 text-xs text-gray-400">{stats.totalCustomers} total</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <Briefcase className="text-purple-500" size={24} />
            <span className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp size={14} />
              +8%
            </span>
          </div>
          <div className="text-2xl font-bold">{stats.activeProjects}</div>
          <div className="text-sm text-gray-500">Active Projects</div>
          <div className="mt-2 text-xs text-gray-400">{stats.totalProjects} total</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="text-green-500" size={24} />
            <span className="text-xs text-gray-600">{stats.avgSuccessRate}%</span>
          </div>
          <div className="text-2xl font-bold">€{(stats.totalBudget / 1000).toFixed(0)}k</div>
          <div className="text-sm text-gray-500">Total Budget</div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${stats.avgSuccessRate}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckSquare className="text-orange-500" size={24} />
            {stats.upcomingDeadlines > 0 && (
              <span className="text-xs text-orange-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {stats.upcomingDeadlines} urgent
              </span>
            )}
          </div>
          <div className="text-2xl font-bold">{stats.pendingTasks}</div>
          <div className="text-sm text-gray-500">Pending Tasks</div>
          <div className="mt-2 text-xs text-gray-400">
            {tasks.filter(t => t.status === 'in_progress').length} in progress
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Recent Projects</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {enhancedProjects.slice(0, 5).map(project => (
                <div key={project.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      project.status === 'active' ? 'bg-green-500' :
                      project.status === 'draft' ? 'bg-gray-400' :
                      'bg-blue-500'
                    }`} />
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-gray-500">
                        {project.customer?.name} • {project.type.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.successProbability && (
                      <span className={`text-sm px-2 py-1 rounded ${
                        project.successProbability >= 80 ? 'bg-green-100 text-green-700' :
                        project.successProbability >= 60 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {project.successProbability}%
                      </span>
                    )}
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-2">
            <button 
              onClick={() => setModalState({ type: 'customer', mode: 'create' })}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-left"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserPlus className="text-blue-600" size={20} />
              </div>
              <div>
                <div className="font-medium">Add Customer</div>
                <div className="text-xs text-gray-500">Create new customer profile</div>
              </div>
            </button>

            <button 
              onClick={() => setModalState({ type: 'project', mode: 'create' })}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-left"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Briefcase className="text-purple-600" size={20} />
              </div>
              <div>
                <div className="font-medium">New Project</div>
                <div className="text-xs text-gray-500">Start subsidy application</div>
              </div>
            </button>

            <button 
              onClick={() => setModalState({ type: 'task', mode: 'create' })}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-left"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckSquare className="text-green-600" size={20} />
              </div>
              <div>
                <div className="font-medium">Create Task</div>
                <div className="text-xs text-gray-500">Add new task to project</div>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-left">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Upload className="text-orange-600" size={20} />
              </div>
              <div>
                <div className="font-medium">Import Data</div>
                <div className="text-xs text-gray-500">Upload CSV or Excel</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">Upcoming Tasks</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm">View All</button>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {enhancedTasks
              .filter(t => t.dueDate && t.status !== 'completed')
              .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
              .slice(0, 5)
              .map(task => {
                const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
                const daysUntilDue = task.dueDate ? Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;
                
                return (
                  <div key={task.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <button className="text-gray-400 hover:text-gray-600">
                        {task.status === 'completed' ? <CheckSquare size={20} /> : <Square size={20} />}
                      </button>
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-gray-500">
                          {task.project?.name} • {task.project?.customer?.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm px-2 py-1 rounded ${
                        task.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                        task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {task.priority}
                      </span>
                      {daysUntilDue !== null && (
                        <span className={`text-sm ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                          {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : 
                           daysUntilDue === 0 ? 'Due today' :
                           daysUntilDue === 1 ? 'Due tomorrow' :
                           `${daysUntilDue} days`}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );

  // Customers View
  const CustomersView = () => (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">Customer Management</h2>
          <button 
            onClick={() => setModalState({ type: 'customer', mode: 'create' })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={20} />
            Add Customer
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map(customer => {
                const customerProjects = projects.filter(p => p.customerId === customer.id);
                return (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <Hash size={12} />
                            {customer.kvkNumber}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div>{customer.contactPerson}</div>
                        <div className="text-gray-500">{customer.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div>{customer.industry}</div>
                        <div className="text-gray-500 capitalize">{customer.size}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        customer.status === 'active' ? 'bg-green-100 text-green-700' :
                        customer.status === 'prospect' ? 'bg-yellow-100 text-yellow-700' :
                        customer.status === 'lead' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {customer.annualRevenue ? `€${(customer.annualRevenue / 1000000).toFixed(1)}M` : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{customerProjects.length}</span>
                        {customerProjects.some(p => p.status === 'active') && (
                          <span className="w-2 h-2 bg-green-500 rounded-full" title="Active projects" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedCustomer(customer)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <Edit2 size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Projects View
  const ProjectsView = () => (
    <div className="p-6">
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {['wbso', 'mit', 'innovationbox', 'other'].map(type => {
          const typeProjects = projects.filter(p => p.type === type);
          const totalBudget = typeProjects.reduce((sum, p) => sum + (p.budget || 0), 0);
          
          return (
            <div key={type} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500 uppercase">{type}</span>
                <span className="text-lg font-bold">{typeProjects.length}</span>
              </div>
              <div className="text-sm text-gray-600">
                €{(totalBudget / 1000).toFixed(0)}k budget
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(typeProjects.length / projects.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">All Projects</h2>
          <button 
            onClick={() => setModalState({ type: 'project', mode: 'create' })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={20} />
            New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {enhancedProjects.map(project => (
            <div key={project.id} className="border rounded-lg hover:shadow-lg transition-shadow">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.customer?.name}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'active' ? 'bg-green-100 text-green-700' :
                    project.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                    project.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                    project.status === 'approved' ? 'bg-green-100 text-green-700' :
                    project.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium uppercase">{project.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Budget</span>
                    <span className="font-medium">€{((project.budget || 0) / 1000).toFixed(0)}k</span>
                  </div>
                  {project.deadline && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Deadline</span>
                      <span className="font-medium">
                        {new Date(project.deadline).toLocaleDateString('nl-NL')}
                      </span>
                    </div>
                  )}
                  {project.successProbability && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Success Rate</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              project.successProbability >= 80 ? 'bg-green-500' :
                              project.successProbability >= 60 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${project.successProbability}%` }}
                          />
                        </div>
                        <span className="font-medium">{project.successProbability}%</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-500">{project.documents.length} docs</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Tasks View
  const TasksView = () => {
    const tasksByStatus = {
      todo: enhancedTasks.filter(t => t.status === 'todo'),
      in_progress: enhancedTasks.filter(t => t.status === 'in_progress'),
      review: enhancedTasks.filter(t => t.status === 'review'),
      completed: enhancedTasks.filter(t => t.status === 'completed')
    };

    return (
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Task Board</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} />
              {stats.pendingTasks} pending • {stats.upcomingDeadlines} urgent
            </div>
          </div>
          <button 
            onClick={() => setModalState({ type: 'task', mode: 'create' })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={20} />
            New Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
            <div key={status} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold capitalize">{status.replace('_', ' ')}</h3>
                <span className="bg-white px-2 py-1 rounded text-sm">{statusTasks.length}</span>
              </div>

              <div className="space-y-3">
                {statusTasks.map(task => {
                  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
                  
                  return (
                    <div key={task.id} className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical size={16} />
                        </button>
                      </div>

                      {task.project && (
                        <div className="text-xs text-gray-500 mb-2">
                          {task.project.name}
                        </div>
                      )}

                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          task.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                          task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {task.priority}
                        </span>
                        
                        {task.dueDate && (
                          <span className={`text-xs ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                            {new Date(task.dueDate).toLocaleDateString('nl-NL', { month: 'short', day: 'numeric' })}
                          </span>
                        )}
                      </div>

                      {task.checklist.length > 0 && (
                        <div className="mb-2">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckSquare size={14} />
                            {task.checklist.filter(item => item.completed).length}/{task.checklist.length}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className="bg-blue-500 h-1 rounded-full"
                              style={{ 
                                width: `${(task.checklist.filter(item => item.completed).length / task.checklist.length) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'customers' && <CustomersView />}
          {activeView === 'projects' && <ProjectsView />}
          {activeView === 'tasks' && <TasksView />}
        </main>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold">{selectedCustomer.name}</h2>
              <button onClick={() => setSelectedCustomer(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Company Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Hash size={16} className="text-gray-400" />
                      <span className="text-gray-600">KvK:</span>
                      <span>{selectedCustomer.kvkNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-gray-400" />
                      <span className="text-gray-600">Industry:</span>
                      <span>{selectedCustomer.industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-gray-600">Size:</span>
                      <span className="capitalize">{selectedCustomer.size}</span>
                    </div>
                    {selectedCustomer.website && (
                      <div className="flex items-center gap-2">
                        <Link2 size={16} className="text-gray-400" />
                        <span className="text-gray-600">Website:</span>
                        <a href={selectedCustomer.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          {selectedCustomer.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-gray-600">Contact:</span>
                      <span>{selectedCustomer.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-gray-600">Email:</span>
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-gray-600">Phone:</span>
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-gray-600">Address:</span>
                      <span>{selectedCustomer.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-3">Projects</h3>
                <div className="space-y-2">
                  {projects.filter(p => p.customerId === selectedCustomer.id).map(project => (
                    <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-gray-500">{project.type.toUpperCase()} • {project.status}</div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        View →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubsidyManagementPlatform;