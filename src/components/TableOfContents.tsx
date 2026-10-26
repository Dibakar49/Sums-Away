/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PolicySection } from '../utils/policyData';
import { Search, X, BookOpen, Scale, Clock, Bookmark } from 'lucide-react';

interface TableOfContentsProps {
  sections: PolicySection[];
  activeSectionId: string;
  onSelectSection: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  audienceMode: 'legal' | 'plain';
  onAudienceModeChange: (mode: 'legal' | 'plain') => void;
  readingMetrics: {
    totalWords: number;
    readingTimeMinutes: number;
  };
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  activeSectionId,
  onSelectSection,
  searchQuery,
  onSearchChange,
  audienceMode,
  onAudienceModeChange,
  readingMetrics,
}) => {
  return (
    <aside className="no-print">
      <div className="sticky top-20 space-y-6">
        
        {/* Reading Mode Segmented Control */}
        <div className="bg-white border border-stone-200 rounded-lg p-3 shadow-xs">
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono">
            Reading Mode
          </label>
          <div className="grid grid-cols-2 gap-1 p-1 bg-stone-100 rounded-md">
            <button
              onClick={() => onAudienceModeChange('legal')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                audienceMode === 'legal'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Full Legal Terms</span>
            </button>
            <button
              onClick={() => onAudienceModeChange('plain')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                audienceMode === 'plain'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Parent Summary</span>
            </button>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="bg-white border border-stone-200 rounded-lg p-3 shadow-xs">
          <label htmlFor="policy-search" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono">
            Filter Policy Clauses
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              id="policy-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search e.g. COPPA, backup, delete..."
              className="w-full pl-8 pr-8 py-2 text-xs bg-stone-50 border border-stone-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-stone-400 text-stone-900 placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-2 p-0.5 text-stone-400 hover:text-stone-700 cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-[11px] text-stone-500 mt-2 font-mono">
              Showing {sections.length} matching {sections.length === 1 ? 'section' : 'sections'}
            </p>
          )}
        </div>

        {/* Document Navigation Rail */}
        <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
            <h3 className="text-xs font-semibold text-stone-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-stone-500" />
              Sections Index
            </h3>
            <span className="text-[11px] font-mono text-stone-500">
              {sections.length} / 10
            </span>
          </div>

          <nav className="space-y-1 max-h-[420px] overflow-y-auto pr-1 text-xs" aria-label="Table of Contents">
            {sections.length === 0 ? (
              <div className="py-4 text-center text-stone-500 text-xs">
                No matching policy clauses found.
              </div>
            ) : (
              sections.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => onSelectSection(sec.id)}
                    className={`w-full text-left px-2.5 py-2 rounded-md transition-all flex items-start gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-stone-900 text-white font-medium shadow-xs'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span className={`font-mono text-[11px] shrink-0 mt-0.5 ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>
                      {sec.number < 10 ? `0${sec.number}` : sec.number}
                    </span>
                    <span className="truncate leading-snug">
                      {sec.shortTitle}
                    </span>
                  </button>
                );
              })
            )}
          </nav>

          {/* Quick Metrics Bar */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-mono">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              ~{readingMetrics.readingTimeMinutes} min read
            </span>
            <span>{readingMetrics.totalWords.toLocaleString()} words</span>
          </div>
        </div>

      </div>
    </aside>
  );
};
