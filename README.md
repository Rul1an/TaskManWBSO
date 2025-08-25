# TaskManWBSO
Organize your workflow

## Overview
A comprehensive subsidy management platform for Dutch WBSO, MIT, and Innovation Box applications. This React-based application provides tools for customer management, project tracking, and task coordination.

## Features
- 📊 **Dashboard** - KPI overview with charts and metrics
- 👥 **Customer Management** - Complete customer profiles and tracking
- 📋 **Project Management** - WBSO, MIT, and Innovation Box project handling
- ✅ **Task Management** - Kanban-style task board with priorities and deadlines
- 🔍 **Search & Filter** - Advanced filtering across all data types

## Architecture

### Current Structure
- **Original**: `wbso-task-manager.tsx` - Single monolithic component (1164 lines)
- **Modular**: `wbso-task-manager-modular.tsx` - Modern modular architecture

The project has been successfully **modularized** from a single large component into a well-structured, maintainable architecture. See [MODULAR_ARCHITECTURE.md](./MODULAR_ARCHITECTURE.md) for detailed information about the new structure.

### Benefits of Modularization
✅ **Maintainability** - Clear separation of concerns  
✅ **Testability** - Individual component testing  
✅ **Reusability** - Shareable components  
✅ **Scalability** - Easy feature additions  
✅ **Type Safety** - Comprehensive TypeScript coverage  

## Usage

```typescript
// Use the modular version (recommended)
import SubsidyManagementPlatform from './wbso-task-manager-modular';

// Or individual components
import { DashboardView, CustomersView } from './src/components';
```

## Project Structure
```
├── src/
│   ├── components/     # React components
│   ├── types/         # TypeScript definitions  
│   ├── hooks/         # Custom React hooks
│   └── utils/         # Utility functions
└── docs/              # Documentation
```

Both versions provide identical functionality - choose based on your needs!
