/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { COMPLIANCE_ITEMS } from '../utils/policyData';
import { Smartphone, Ban, BarChart2, UserX, Cpu, Users, LayoutDashboard } from 'lucide-react';

export const ComplianceGrid: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'storage':
        return <Smartphone className="w-5 h-5 text-stone-700" />;
      case 'ads':
        return <Ban className="w-5 h-5 text-stone-700" />;
      case 'analytics':
        return <BarChart2 className="w-5 h-5 text-stone-700" />;
      case 'accounts':
        return <UserX className="w-5 h-5 text-stone-700" />;
      case 'dashboard':
        return <LayoutDashboard className="w-5 h-5 text-stone-700" />;
      case 'hardware':
      default:
        return <Cpu className="w-5 h-5 text-stone-700" />;
    }
  };

  return (
    <section aria-labelledby="compliance-overview-title" className="mb-12">
      <div className="border border-stone-200 bg-white rounded-lg p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 mb-6 border-b border-stone-200 gap-4">
          <div>
            <h2 id="compliance-overview-title" className="text-xl sm:text-2xl font-serif font-semibold text-stone-900 tracking-tight">
              Offline App Privacy Summary
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
              This page describes the information-handling practices of Sumaway. The app stores progress locally on your device and does not include third-party advertising or remote analytics SDKs.
            </p>
          </div>
          <div className="text-xs font-mono text-stone-500 shrink-0">
            <span>Offline Android Release</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPLIANCE_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="p-4 bg-stone-50 rounded-md border border-stone-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-white rounded border border-stone-200">
                    {getIcon(item.id)}
                  </div>
                  <span className="text-xs font-medium text-stone-700 font-mono">
                    {item.badgeLabel}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-stone-900 mb-1.5 font-sans">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
                <span>Practice</span>
                <span className="font-medium text-stone-900">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
