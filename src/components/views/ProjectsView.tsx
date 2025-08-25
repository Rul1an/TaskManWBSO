import React from 'react';
import {
  Plus,
  FileText
} from 'lucide-react';
import { Project, ModalState } from '../types';

interface ProjectsViewProps {
  projects: Project[];
  enhancedProjects: (Project & { customer?: any })[];
  setModalState: (state: ModalState) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  enhancedProjects,
  setModalState
}) => (
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