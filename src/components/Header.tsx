/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Printer, Copy, Check, FileCheck } from 'lucide-react';
import { POLICY_METADATA } from '../utils/policyData';

interface HeaderProps {
  onOpenPlayConsoleModal: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPlayConsoleModal, onPrint }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200 no-print transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single-element brand wordmark */}
        <a 
          href="#top" 
          className="text-lg font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors"
          aria-label="Sums Away Legal & Privacy Portal"
        >
          Sums Away · Privacy
        </a>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600" aria-label="Main Navigation">
          <a href="#overview" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Overview
          </a>
          <a href="#on-device-data" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Local Data
          </a>
          <a href="#children-parents" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Children & COPPA
          </a>
          <a href="#backups-transfers" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Backups & Export
          </a>
          <a href="#amendments-contact" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Developer Contact
          </a>
        </nav>

        {/* Zone 3: Functional actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenPlayConsoleModal}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Google Play Console Data Safety Helper"
          >
            <FileCheck className="w-3.5 h-3.5 text-stone-600" />
            <span>Play Store Audit</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Copy Public URL for Google Play Store Listing"
            aria-label="Copy public URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-600" />}
            <span className="hidden sm:inline">{copied ? 'Link Copied' : 'Copy URL'}</span>
            <span className="sm:hidden">{copied ? 'Copied' : 'URL'}</span>
          </button>

          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Print or Save Official Policy as PDF"
            aria-label="Print or Save PDF"
          >
            <Printer className="w-3.5 h-3.5 text-stone-300" />
            <span className="hidden sm:inline">Print PDF</span>
            <span className="sm:hidden">Print</span>
          </button>
        </div>

      </div>
    </header>
  );
};
