/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Shield, ArrowUp } from 'lucide-react';
import { POLICY_METADATA } from '../utils/policyData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-stone-200 bg-white text-stone-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-stone-100">
          
          {/* Col 1: Identity */}
          <div className="space-y-2">
            <h3 className="text-base font-serif font-bold text-stone-900">
              {POLICY_METADATA.appName}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
              An offline educational math game engineered for children and families. 
              Zero tracking, zero advertisements, and complete on-device data sovereignty.
            </p>
            <div className="pt-2 text-xs font-mono text-stone-500">
              <span>Developer: {POLICY_METADATA.developer}</span>
            </div>
          </div>

          {/* Col 2: Direct Legal Contact */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-800">
              Official Privacy Inquiries &amp; Deletion
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Parents, educators, and regulators can contact the developer directly regarding data protection or audit verification:
            </p>
            <a
              href={`mailto:${POLICY_METADATA.privacyContact}?subject=Sums%20Away%20Privacy%20Inquiry%20or%20Data%20Request`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-900 hover:text-stone-700 underline underline-offset-2 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-stone-600" />
              <span>{POLICY_METADATA.privacyContact}</span>
            </a>
          </div>

          {/* Col 3: Statutory Standards */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-800">
              Compliance Governance
            </h4>
            <ul className="text-xs text-stone-600 space-y-1">
              <li>• US Children's Online Privacy Protection Act (COPPA)</li>
              <li>• EU &amp; UK GDPR Article 8 (Child Data Protection)</li>
              <li>• Google Play Families Policy &amp; Data Safety Standards</li>
              <li>• Standalone Client Architecture (No Remote Telemetry)</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-stone-500" />
            <span>
              Official Privacy Policy · Last updated {POLICY_METADATA.lastUpdated}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="no-print inline-flex items-center gap-1 text-stone-600 hover:text-stone-900 font-medium transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
