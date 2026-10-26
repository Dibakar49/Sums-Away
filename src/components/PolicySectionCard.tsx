/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PolicySection } from '../utils/policyData';
import { Link2, Check, Sparkles, CheckCircle2 } from 'lucide-react';

interface PolicySectionCardProps {
  section: PolicySection;
  audienceMode: 'legal' | 'plain';
  searchQuery?: string;
}

export const PolicySectionCard: React.FC<PolicySectionCardProps> = ({
  section,
  audienceMode,
  searchQuery,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyAnchor = () => {
    const url = new URL(window.location.href);
    url.hash = section.id;
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Helper to highlight matching text if there is an active search query
  const renderText = (text: string) => {
    if (!searchQuery || !searchQuery.trim()) {
      return text;
    }
    const clean = searchQuery.trim();
    const regex = new RegExp(`(${clean})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === clean.toLowerCase() ? (
        <mark key={i} className="bg-amber-100 text-stone-900 rounded-xs px-0.5 font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <article
      id={section.id}
      className="scroll-mt-24 border border-stone-200 bg-white rounded-lg p-6 sm:p-8 shadow-xs mb-8 transition-shadow hover:shadow-sm"
    >
      {/* Section Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
        <div>
          <span className="text-xs font-mono font-medium text-stone-500 uppercase tracking-wider block mb-1">
            Section {section.number < 10 ? `0${section.number}` : section.number}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
            {renderText(section.title)}
          </h2>
        </div>
        <button
          onClick={handleCopyAnchor}
          className="no-print p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-md transition-colors cursor-pointer shrink-0"
          title="Copy direct link to this section"
          aria-label={`Copy link to section ${section.number}`}
        >
          {copiedLink ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <Link2 className="w-4 h-4 text-stone-500" />
          )}
        </button>
      </div>

      {/* Parent Plain Language Summary Box (Always visible or prioritized in plain mode) */}
      <div className="my-5 p-4 bg-stone-50 rounded-md border border-stone-200/90 text-sm">
        <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-stone-700 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-stone-600" />
          <span>Parent & Educator Summary</span>
        </div>
        <p className="text-stone-700 leading-relaxed">
          {renderText(section.plainSummary)}
        </p>
      </div>

      {/* Full Legal Text */}
      {audienceMode === 'legal' && (
        <div className="space-y-4 text-stone-800 text-sm sm:text-base leading-relaxed font-sans">
          {section.legalParagraphs.map((para, idx) => {
            if (para.startsWith('•')) {
              return (
                <div key={idx} className="pl-4 border-l border-stone-300 py-0.5 text-stone-700 text-sm">
                  {renderText(para)}
                </div>
              );
            }
            if (/^\d+\./.test(para)) {
              return (
                <div key={idx} className="pl-4 font-medium text-stone-900 text-sm">
                  {renderText(para)}
                </div>
              );
            }
            return (
              <p key={idx} className={idx === 0 ? "first-letter:font-serif first-letter:text-xl font-normal text-stone-800" : "font-normal text-stone-800"}>
                {renderText(para)}
              </p>
            );
          })}
        </div>
      )}

      {/* Key Legal Takeaways Checklist */}
      {section.keyPoints && section.keyPoints.length > 0 && (
        <div className="mt-6 pt-5 border-t border-stone-100">
          <h4 className="text-xs font-mono font-semibold text-stone-700 uppercase tracking-wider mb-2.5">
            Key Governance Points
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
            {section.keyPoints.map((point, ptIdx) => (
              <li key={ptIdx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                <span>{renderText(point)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};
