import { Customer, Project, Task, User, Organization } from '../types';

export const createSampleUser = (): User => ({
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

export const createSampleCustomers = (): Customer[] => [
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
];

export const createSampleProjects = (): Project[] => [
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
];

export const createSampleTasks = (): Task[] => [
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
];