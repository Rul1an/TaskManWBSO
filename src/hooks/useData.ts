import { useMemo } from 'react';
import { Customer, Project, Task, Stats } from '../types';

export const useStats = (customers: Customer[], projects: Project[], tasks: Task[]): Stats => {
  return useMemo(() => {
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
};

export const useEnhancedData = (customers: Customer[], projects: Project[], tasks: Task[]) => {
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

  return { enhancedProjects, enhancedTasks };
};

export const useFilteredCustomers = (customers: Customer[], searchQuery: string) => {
  return useMemo(() => {
    if (!searchQuery) return customers;
    const query = searchQuery.toLowerCase();
    return customers.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.contactPerson?.toLowerCase().includes(query) ||
      c.kvkNumber?.includes(query)
    );
  }, [customers, searchQuery]);
};