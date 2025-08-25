import React from 'react';
import {
  X,
  Hash,
  Building2,
  Users,
  Link2,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Customer, Project } from '../types';

interface CustomerDetailModalProps {
  customer: Customer;
  projects: Project[];
  onClose: () => void;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  customer,
  projects,
  onClose
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold">{customer.name}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
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
                <span>{customer.kvkNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-gray-400" />
                <span className="text-gray-600">Industry:</span>
                <span>{customer.industry}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-400" />
                <span className="text-gray-600">Size:</span>
                <span className="capitalize">{customer.size}</span>
              </div>
              {customer.website && (
                <div className="flex items-center gap-2">
                  <Link2 size={16} className="text-gray-400" />
                  <span className="text-gray-600">Website:</span>
                  <a href={customer.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {customer.website}
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
                <span>{customer.contactPerson}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-600">Email:</span>
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-600">Phone:</span>
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-gray-600">Address:</span>
                <span>{customer.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-3">Projects</h3>
          <div className="space-y-2">
            {projects.filter(p => p.customerId === customer.id).map(project => (
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
);