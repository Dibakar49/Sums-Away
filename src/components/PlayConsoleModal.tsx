/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Copy, Check, FileCheck, Info } from 'lucide-react';
import { POLICY_METADATA, generatePlayConsoleSummary } from '../utils/policyData';

interface PlayConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlayConsoleModal: React.FC<PlayConsoleModalProps> = ({ isOpen, onClose }) => {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  const currentUrl = POLICY_METADATA.policyUrl;
  const summaryText = generatePlayConsoleSummary(POLICY_METADATA);

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(summaryText);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl border border-stone-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-stone-800" />
            <h3 id="modal-title" className="text-base font-serif font-bold text-stone-900">
              Google Play Console Data Safety Reference
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-md transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-sm">
          
          {/* Important Publisher Responsibility Notice */}
          <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-md flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Publisher Responsibility:</strong> A public policy URL and corrected text alone do not certify all applicable legal requirements. The publisher remains responsible for the compliance declaration.
            </p>
          </div>

          <p className="text-stone-600 text-xs leading-relaxed">
            Reference details for the <strong className="text-stone-900">Data safety</strong> and <strong className="text-stone-900">Target audience and content</strong> sections in Google Play Console for <em className="text-stone-800 font-medium">Sumaway: Math Games for Kids</em>.
          </p>

          {/* Privacy Policy URL Box */}
          <div className="p-3 bg-stone-50 border border-stone-200 rounded-md">
            <label className="block text-xs font-mono font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Public Privacy Policy URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded font-mono text-stone-700 select-all"
              />
              <button
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded transition-colors shrink-0 cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-600" />}
                <span>{copiedUrl ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Q&A Data Safety Reference Sheet */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-stone-800 uppercase tracking-wider">
              Play Console Form Reference
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="font-semibold text-stone-900 block mb-0.5">
                  1. Does your app collect or share any of the required user data types?
                </span>
                <span className="text-stone-800 font-medium block">
                  Select: "No"
                </span>
                <span className="text-stone-500 text-[11px] mt-0.5 block">
                  Learning statistics (screen time, accuracy, hints) are calculated on-device for the local Parent Dashboard and are not sent to developer-operated servers.
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="font-semibold text-stone-900 block mb-0.5">
                  2. Is all of the user data collected by your app encrypted in transit?
                </span>
                <span className="text-stone-700 font-medium block">
                  Select: "Not applicable" (No network transfer occurs)
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="font-semibold text-stone-900 block mb-0.5">
                  3. Do you provide a way for users to request that their data be deleted?
                </span>
                <span className="text-stone-800 font-medium block">
                  Select: "Yes"
                </span>
                <span className="text-stone-500 text-[11px] mt-0.5 block">
                  Users can delete local records anytime via Android Settings &gt; Apps &gt; Sumaway &gt; Clear Storage, or by uninstalling. Detailed question text is also automatically removed on-device after 90 days.
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="font-semibold text-stone-900 block mb-0.5">
                  4. Advertising &amp; Target Audience:
                </span>
                <span className="text-stone-800 font-medium block">
                  Target audience: General &amp; Educational · Contains ads: "No"
                </span>
              </div>
            </div>
          </div>

          {/* Formatted Text Snippet */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono font-bold text-stone-800 uppercase tracking-wider">
                Summary Reference Block
              </span>
              <button
                onClick={handleCopySnippet}
                className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
              >
                {copiedSnippet ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSnippet ? 'Copied' : 'Copy All'}</span>
              </button>
            </div>
            <pre className="p-3 bg-stone-900 text-stone-100 rounded text-xs font-mono whitespace-pre-wrap select-all max-h-36 overflow-y-auto">
              {summaryText}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
