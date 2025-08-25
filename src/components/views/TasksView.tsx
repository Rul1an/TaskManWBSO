import React from 'react';
import {
  Clock,
  Plus,
  MoreVertical,
  CheckSquare
} from 'lucide-react';
import { Task, Stats, ModalState } from '../types';

interface TasksViewProps {
  enhancedTasks: (Task & { project?: any })[];
  stats: Stats;
  setModalState: (state: ModalState) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  enhancedTasks,
  stats,
  setModalState
}) => {
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