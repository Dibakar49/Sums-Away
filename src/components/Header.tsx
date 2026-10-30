/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200 no-print transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single-element brand wordmark */}
        <a 
          href="#top" 
          className="text-lg font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors"
          aria-label="Sumaway Legal & Privacy Portal"
        >
          Sumaway · Privacy
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600" aria-label="Main Navigation">
          <a href="#overview" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Overview
          </a>
          <a href="#information-on-device" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            On-Device Data
          </a>
          <a href="#children-parents" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Children & Parents
          </a>
          <a href="#android-backups" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Backups & Export
          </a>
          <a href="#changes-contact" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Developer Contact
          </a>
        </nav>

      </div>
    </header>
  );
};
