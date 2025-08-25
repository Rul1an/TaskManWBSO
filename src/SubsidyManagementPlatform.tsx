import React, { useState } from 'react';

// Types
import { 
  User,
  Organization,
  Customer,
  Project,
  Task,
  ModalState,
  ViewType
} from './types';

// Components
import {
  Sidebar,
  Header,
  DashboardView,
  CustomersView,
  ProjectsView,
  TasksView,
  CustomerDetailModal
} from './components';

// Hooks
import { useStats, useEnhancedData, useFilteredCustomers } from './hooks/useData';

// Utilities
import { 
  createSampleUser,
  createSampleCustomers,
  createSampleProjects,
  createSampleTasks
} from './utils/sampleData';

// Modern Production-Ready Subsidy Management Platform
const SubsidyManagementPlatform: React.FC = () => {
  // Auth & Organization State
  const [currentUser] = useState<User>(createSampleUser());
  const [currentOrg] = useState<Organization>(currentUser.organizations[0]);

  // Data States
  const [customers, setCustomers] = useState<Customer[]>(createSampleCustomers());
  const [projects, setProjects] = useState<Project[]>(createSampleProjects());
  const [tasks, setTasks] = useState<Task[]>(createSampleTasks());

  // UI States
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Modal States
  const [modalState, setModalState] = useState<ModalState>({ 
    type: null, 
    mode: 'create' 
  });

  // Computed Data
  const stats = useStats(customers, projects, tasks);
  const { enhancedProjects, enhancedTasks } = useEnhancedData(customers, projects, tasks);
  const filteredCustomers = useFilteredCustomers(customers, searchQuery);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeView={activeView}
        setActiveView={setActiveView}
        currentOrg={currentOrg}
        stats={stats}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          activeView={activeView}
          currentOrg={currentOrg}
          currentUser={currentUser}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
        />
        
        <main className="flex-1 overflow-y-auto">
          {activeView === 'dashboard' && (
            <DashboardView
              stats={stats}
              enhancedProjects={enhancedProjects}
              enhancedTasks={enhancedTasks}
              tasks={tasks}
              setModalState={setModalState}
            />
          )}
          {activeView === 'customers' && (
            <CustomersView
              filteredCustomers={filteredCustomers}
              projects={projects}
              setModalState={setModalState}
              setSelectedCustomer={setSelectedCustomer}
            />
          )}
          {activeView === 'projects' && (
            <ProjectsView
              projects={projects}
              enhancedProjects={enhancedProjects}
              setModalState={setModalState}
            />
          )}
          {activeView === 'tasks' && (
            <TasksView
              enhancedTasks={enhancedTasks}
              stats={stats}
              setModalState={setModalState}
            />
          )}
        </main>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          projects={projects}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
};

export default SubsidyManagementPlatform;