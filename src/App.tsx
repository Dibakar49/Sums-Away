/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ComplianceGrid } from './components/ComplianceGrid';
import { TableOfContents } from './components/TableOfContents';
import { PolicySectionCard } from './components/PolicySectionCard';
import { Footer } from './components/Footer';
import {
  POLICY_METADATA,
  POLICY_SECTIONS,
  searchPolicy,
  calculateReadingMetrics,
} from './utils/policyData';
import { Mail, RotateCcw, Award } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [audienceMode, setAudienceMode] = useState<'legal' | 'plain'>('legal');
  const [activeSectionId, setActiveSectionId] = useState<string>('what-policy-covers');

  // Compute filtered sections based on search query
  const filteredSections = useMemo(() => {
    return searchPolicy(searchQuery, POLICY_SECTIONS);
  }, [searchQuery]);

  // Compute reading metrics
  const readingMetrics = useMemo(() => {
    return calculateReadingMetrics(POLICY_SECTIONS);
  }, []);

  const handleSelectSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      
      {/* Top Bar Header */}
      <Header />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Printable Official Letterhead (visible only in print) */}
        <div className="print-only mb-8 pb-6 border-b-2 border-black">
          <h1 className="text-2xl font-bold font-serif uppercase tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm font-semibold mt-1">Application: {POLICY_METADATA.appName}</p>
          <div className="text-xs space-y-0.5 mt-2">
            <p><strong>Developer:</strong> {POLICY_METADATA.developer}</p>
            <p><strong>Official Contact:</strong> {POLICY_METADATA.privacyContact}</p>
            <p><strong>Last Updated &amp; Effective Date:</strong> {POLICY_METADATA.lastUpdated}</p>
            <p><strong>Platform:</strong> {POLICY_METADATA.platform}</p>
            <p><strong>Policy URL:</strong> {POLICY_METADATA.policyUrl}</p>
            <p><strong>Architecture:</strong> Standalone Offline (Local On-Device Storage)</p>
          </div>
        </div>

        {/* Hero Marquee Section */}
        <section id="overview" className="mb-10 sm:mb-14">
          <div className="space-y-4 max-w-4xl">
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
              Privacy Policy
            </h1>

            <p className="text-lg sm:text-xl font-serif text-stone-700 italic">
              {POLICY_METADATA.appName}
            </p>

            {/* Document Metadata Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-stone-600 font-sans border-t border-stone-200/80">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-stone-900">Developer:</span>
                <span>{POLICY_METADATA.developer}</span>
              </div>
              <span className="text-stone-300 hidden sm:inline" aria-hidden="true">|</span>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-stone-900">Privacy Contact:</span>
                <a 
                  href={`mailto:${POLICY_METADATA.privacyContact}`}
                  className="text-stone-900 underline underline-offset-2 hover:text-stone-700"
                >
                  {POLICY_METADATA.privacyContact}
                </a>
              </div>
              <span className="text-stone-300 hidden sm:inline" aria-hidden="true">|</span>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-stone-900">Last updated:</span>
                <span>{POLICY_METADATA.lastUpdated}</span>
              </div>
            </div>

            {/* Core Mission Note */}
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed pt-2">
              This policy explains how the current offline Android version of <strong>Sumaway</strong> handles 
              information. The app provides maths games, practice activities, a parent dashboard and progress tracking. 
              <strong> No account, email login or internet connection is required to play.</strong>
            </p>

          </div>
        </section>

        {/* Executive Summary Compliance Grid */}
        <ComplianceGrid />

        {/* 2-Column Asymmetric Reading Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (4 cols): Sticky Table of Contents & Controls */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <TableOfContents
              sections={filteredSections}
              activeSectionId={activeSectionId}
              onSelectSection={handleSelectSection}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              audienceMode={audienceMode}
              onAudienceModeChange={setAudienceMode}
              readingMetrics={readingMetrics}
            />
          </div>

          {/* Right Column (8 cols): Legal Content Body */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            
            {/* Filter Notice Banner if Active */}
            {searchQuery && (
              <div className="p-3 bg-stone-100 rounded-lg border border-stone-200 flex items-center justify-between text-xs text-stone-700 no-print">
                <span>
                  Filtering sections matching: <strong className="text-stone-900">"{searchQuery}"</strong> ({filteredSections.length} results)
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center gap-1 font-medium text-stone-800 hover:text-stone-950 underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset filter
                </button>
              </div>
            )}

            {/* Empty State if Search yields 0 */}
            {filteredSections.length === 0 ? (
              <div className="text-center py-16 px-4 bg-white border border-stone-200 rounded-lg">
                <h3 className="text-base font-serif font-semibold text-stone-900 mb-1">
                  No matching policy clauses
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                  We could not find any sections matching "{searchQuery}". Try searching for terms like "COPPA", "backup", "data", "permissions", or "parents".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3.5 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md transition-colors cursor-pointer"
                >
                  Clear Search Filter
                </button>
              </div>
            ) : (
              filteredSections.map((section) => (
                <PolicySectionCard
                  key={section.id}
                  section={section}
                  audienceMode={audienceMode}
                  searchQuery={searchQuery}
                />
              ))
            )}

            {/* Developer Contact & Direct Inquiries Card */}
            <div className="border border-stone-200 bg-stone-100/70 rounded-lg p-6 sm:p-8 mt-12">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-white border border-stone-200 rounded-md shrink-0">
                  <Award className="w-6 h-6 text-stone-800" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Developer Contact &amp; Privacy Inquiries
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Sumaway is developed by Dibakar Munshi as an offline educational math application. 
                    If you have questions about this privacy policy, local data handling, or older online data from earlier test versions:
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${POLICY_METADATA.privacyContact}?subject=Sumaway%20Privacy%20Question`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Contact Dibakar Munshi ({POLICY_METADATA.privacyContact})</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Institutional Legal Footer */}
      <Footer />

    </div>
  );
}
