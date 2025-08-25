import React from 'react';
import {
  Building2,
  Briefcase,
  Target,
  CheckSquare,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  UserPlus,
  Upload,
  Square
} from 'lucide-react';
import { Stats, Project, Task, ModalState } from '../types';

interface DashboardViewProps {
  stats: Stats;
  enhancedProjects: (Project & { customer?: any })[];
  enhancedTasks: (Task & { project?: any })[];
  tasks: Task[];
  setModalState: (state: ModalState) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  enhancedProjects,
  enhancedTasks,
  tasks,
  setModalState
}) => (
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