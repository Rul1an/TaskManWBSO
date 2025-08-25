import React from 'react';
import {
  Plus,
  Hash,
  Eye,
  Edit2,
  MoreVertical
} from 'lucide-react';
import { Customer, Project, ModalState } from '../types';

interface CustomersViewProps {
  filteredCustomers: Customer[];
  projects: Project[];
  setModalState: (state: ModalState) => void;
  setSelectedCustomer: (customer: Customer) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({
  filteredCustomers,
  projects,
  setModalState,
  setSelectedCustomer
}) => (
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