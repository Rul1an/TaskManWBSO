// TypeScript Types for WBSO Task Manager

export interface Organization {
  id: string;
  name: string;
  slug: string;
  subscription: 'trial' | 'starter' | 'professional' | 'enterprise';
  trialEndsAt?: Date;
  settings: Record<string, any>;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'owner' | 'admin' | 'member';
  avatarUrl?: string;
  organizations: Organization[];
}

export interface Customer {
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

export interface Project {
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

export interface Task {
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

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
}

export interface Document {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface ModalState {
  type: 'customer' | 'project' | 'task' | null;
  mode: 'create' | 'edit';
  data?: any;
}

export interface Stats {
  totalCustomers: number;
  activeCustomers: number;
  totalProjects: number;
  activeProjects: number;
  totalBudget: number;
  avgSuccessRate: number;
  pendingTasks: number;
  upcomingDeadlines: number;
}

export type ViewType = 'dashboard' | 'customers' | 'projects' | 'tasks';