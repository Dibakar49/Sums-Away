/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Official Privacy Policy Data & Utilities for Sumaway: Math Games for Kids
 */

export interface PolicyMetadata {
  appName: string;
  appSubtitle: string;
  developer: string;
  privacyContact: string;
  lastUpdated: string;
  policyUrl: string;
  platform: string;
  targetAudience: string;
  architectureType: string;
}

export interface CompliancePoint {
  id: string;
  title: string;
  status: 'Zero Collected' | 'Not Applicable' | 'On-Device Only' | 'Family-Friendly';
  description: string;
  badgeLabel: string;
}

export interface PolicySection {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  plainSummary: string;
  legalParagraphs: string[];
  keyPoints?: string[];
  keywords: string[];
}

export const POLICY_METADATA: PolicyMetadata = {
  appName: "Sumaway: Math Games for Kids",
  appSubtitle: "Math Games, Practice Activities, Parent Dashboard and Progress Tracking",
  developer: "Dibakar Munshi",
  privacyContact: "dibakar61601@gmail.com",
  lastUpdated: "29 October 2026",
  policyUrl: "https://sumsaway.vercel.app/",
  platform: "Android (Offline)",
  targetAudience: "Children and Families",
  architectureType: "On-Device SQLite Storage (No Remote Analytics Upload)",
};

export const COMPLIANCE_ITEMS: CompliancePoint[] = [
  {
    id: "network",
    title: "Internet Permission",
    status: "Zero Collected",
    description: "The current app has no Internet permission and does not send saved profiles, answers, gameplay history or crash logs to developer-operated servers.",
    badgeLabel: "No Internet Permission"
  },
  {
    id: "ads",
    title: "Advertising",
    status: "Zero Collected",
    description: "The app does not include advertising, sponsored links, or commercial advertising SDKs.",
    badgeLabel: "100% Ad-Free"
  },
  {
    id: "analytics",
    title: "Learning Statistics & Analytics",
    status: "On-Device Only",
    description: "Learning statistics (screen time, accuracy, hints) are calculated locally on your phone for the Parent Dashboard; remote analytics are not uploaded.",
    badgeLabel: "On-Device Statistics"
  },
  {
    id: "storage",
    title: "Local SQLite Storage",
    status: "On-Device Only",
    description: "Game progress and learning records are stored in an on-device SQLite database. Manual user backups are exported in JSON format.",
    badgeLabel: "On-Device SQLite"
  },
  {
    id: "dashboard",
    title: "Parent Dashboard",
    status: "Family-Friendly",
    description: "Built-in parent dashboard displays screen time, learning durations, answers and hint summaries on the same device without a PIN.",
    badgeLabel: "PIN-Free Local Dashboard"
  },
  {
    id: "hardware",
    title: "Device Permissions & Sensors",
    status: "Zero Collected",
    description: "The app does not access your contacts, camera, microphone or device location.",
    badgeLabel: "No Sensor Access"
  }
];

export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "what-policy-covers",
    number: 1,
    title: "1. What this policy covers",
    shortTitle: "What This Policy Covers",
    plainSummary: "This policy explains how the offline Android version of Sumaway handles information. The app provides maths games, practice activities, a parent dashboard and progress tracking. No account, email login or internet connection is required to play.",
    legalParagraphs: [
      "This policy explains how the current offline Android version of Sumaway handles information. The app provides maths games, practice activities, a parent dashboard and progress tracking. No account, email login or internet connection is required to play."
    ],
    keyPoints: [
      "Applies to the offline Android version of Sumaway",
      "Covers math games, practice modules, and local parent dashboard",
      "No account, email login or internet connection required"
    ],
    keywords: ["covers", "sumaway", "offline", "maths", "practice", "parent dashboard", "account", "login", "internet"]
  },
  {
    id: "information-on-device",
    number: 2,
    title: "2. Information kept on your device",
    shortTitle: "Information on Device",
    plainSummary: "The app saves information locally in an on-device SQLite database. The local Parent Dashboard tracks screen time, learning time, correct/wrong answers and hints without requiring a PIN. The age calculator processes dates only on the device.",
    legalParagraphs: [
      "The app saves information locally in an on-device SQLite database so you can continue playing and reviewing progress:",
      "• Your chosen explorer name or nickname, optional country/region label, avatar choice and daily practice goal. You can keep the default profile; a real name is not required. The country/region label is entered by you, not obtained from location services.",
      "• Levels, stars, badges, treasures, XP, game credits, answers, mistakes, saved attempts, practice dates and time spent practising.",
      "• Parent Dashboard & Learning Statistics: The app locally logs app screen time, learning time, correct and incorrect answers, hint usage, and daily, weekly and monthly practice summaries. This Parent Dashboard is accessed on the same device without requiring a PIN.",
      "• Preferences such as sound, animations, appearance, reminders and badge showcase choices.",
      "• Local recovery copies and technical crash details if the app crashes.",
      "Playing does not require a real name, email address, account password, date of birth or payment information. The optional age calculator processes dates entered into that tool on the device; those dates are not added to the saved profile or sent to the developer.",
      "The current app does not request an account password, email address, phone number, real date of birth or payment details as a condition of play. It does not access your contacts, camera, microphone or device location."
    ],
    keyPoints: [
      "Data is stored locally in an on-device SQLite database",
      "Parent Dashboard tracks learning time, screen time, accuracy and hints on-device without a PIN",
      "Age calculator processes dates strictly in device memory without saving",
      "No access to contacts, camera, microphone or device location"
    ],
    keywords: ["sqlite", "device", "storage", "nickname", "avatar", "screen time", "learning time", "parent dashboard", "pin", "hints", "age calculator", "camera", "microphone", "location"]
  },
  {
    id: "collection-use-sharing",
    number: 3,
    title: "3. Collection, use and sharing",
    shortTitle: "Collection, Use & Sharing",
    plainSummary: "Learning statistics are calculated locally on your phone for personal review and the parent dashboard; remote analytics are not uploaded. The app has no Internet permission and we do not receive or sell your gameplay data.",
    legalParagraphs: [
      "The current app has no Internet permission and does not send saved profiles, answers, gameplay history or crash logs to developer-operated servers. It does not include third-party advertising, remote tracking or analytics SDKs, remote crash-reporting, Firebase Authentication or Firestore services. It does not use advertising identifiers or provide an online leaderboard or live cloud synchronisation.",
      "Learning statistics are calculated entirely on your phone for personal review and the local Parent Dashboard; remote analytics are not uploaded to external servers.",
      "Information saved on the device is used to run the game, calculate rewards, show progress, review mistakes, resume attempts, display the local parent dashboard, apply preferences and schedule local reminders. Crash details stay in app-specific storage and are not automatically uploaded.",
      "We do not receive or sell the app's locally stored gameplay data. Android backups, files you export, external websites and support messages are separate cases described below."
    ],
    keyPoints: [
      "No Internet permission declared in the app manifest",
      "Learning statistics are calculated locally on the phone; remote analytics are not uploaded",
      "Zero advertising SDKs or third-party tracking identifiers",
      "Developer does not receive, store or sell local gameplay data"
    ],
    keywords: ["internet permission", "collection", "sharing", "learning statistics", "remote analytics", "advertising", "analytics", "parent dashboard", "sell"]
  },
  {
    id: "android-backups",
    number: 4,
    title: "4. Android backups and device transfer",
    shortTitle: "Android Backups & Transfer",
    plainSummary: "Android and your device backup provider may back up app data and local database records to the cloud. This is managed by Android settings, not by Sumaway.",
    legalParagraphs: [
      "Android may back up eligible app progress, local database records and profile data, or transfer them to another device, depending on your Android version, device manufacturer, backup provider and device settings. This may include storage in your device-backup provider's cloud.",
      "These backups are managed by Android and your backup provider, not by a Sumaway account or developer-run sync service. Restore is not guaranteed and may not include the latest session. Parents or guardians can review device backup settings and the backup provider's privacy policy."
    ],
    keyPoints: [
      "Backups are managed by Android OS and device backup provider",
      "May include eligible app progress and local database records",
      "Not operated or monitored by a Sumaway server",
      "Parents can review or disable backups in Android System Settings"
    ],
    keywords: ["backup", "android backup", "google drive", "transfer", "cloud", "database records", "restore"]
  },
  {
    id: "export-import",
    number: 5,
    title: "5. Export and import",
    shortTitle: "Export & Import",
    plainSummary: "You can export and import an unencrypted JSON backup using Android's file picker. Exported backups can include retained learning history. A local recovery copy is kept so you can undo.",
    legalParagraphs: [
      "Export and Import use Android's system file picker. The app accesses the backup file or destination you select; it does not request access to your entire file library.",
      "An exported JSON backup contains your saved profile, progress, activity, mistakes, preferences and retained learning history. It is not encrypted by the app. Anyone with access to that file may be able to read its contents. If you choose a cloud storage provider in the picker, that provider handles the selected file under its own terms and privacy policy.",
      "Importing a backup merges or replaces local progress as you choose. The app keeps a local recovery copy before an import so you can undo the last import."
    ],
    keyPoints: [
      "Uses Android's system file picker without broad file library access",
      "Exported JSON backup includes retained learning history",
      "JSON backup file is not encrypted; keep it secure",
      "Local recovery copy is preserved to allow undoing the last import"
    ],
    keywords: ["export", "import", "file picker", "json", "backup", "retained learning history", "recovery", "undo"]
  },
  {
    id: "notifications-vibration",
    number: 6,
    title: "6. Notifications and vibration",
    shortTitle: "Notifications & Vibration",
    plainSummary: "Reminders use AndroidX WorkManager on the device. Sound setting controls audio, while vibration provides tactile feedback.",
    legalParagraphs: [
      "Notification permission, where required by Android, is used for optional local practice reminders. Reminders are scheduled on the device using AndroidX WorkManager; delivery time can vary with Android background scheduling. You can turn reminders off in app Settings or control notifications in Android Settings. Vibration permission is used for touch and answer feedback. The sound preference controls audio, not vibration."
    ],
    keyPoints: [
      "Reminders are scheduled locally using AndroidX WorkManager",
      "Notification delivery time can vary with Android background scheduling",
      "Can be toggled off in app Settings or Android Settings",
      "Sound preference controls audio; vibration is for touch feedback"
    ],
    keywords: ["notifications", "vibration", "workmanager", "reminders", "haptics", "settings"]
  },
  {
    id: "children-parents",
    number: 7,
    title: "7. Children and parents",
    shortTitle: "Children & Parents",
    plainSummary: "Sumaway is intended for children and families. Parents can review learning metrics, screen time and accuracy directly on the phone via the built-in Parent Dashboard, which opens without a PIN.",
    legalParagraphs: [
      "Sumaway is intended for children and families. A child can play using the default profile without providing a real name or contact information. The app does not contain advertising, messaging, public profiles or online player communication.",
      "The built-in Parent Dashboard enables parents and guardians to review screen time, learning durations, correct/wrong answers and hint usage directly on the device. Because the dashboard opens on the same phone without a PIN, parents sharing the device can inspect learning metrics at any time.",
      "Parents or guardians should manage device backups, exported files, external links and support messages. Please do not send a child's real name, date of birth, school, address, passwords or other unnecessary personal information in a support request."
    ],
    keyPoints: [
      "Children can play with the default profile without personal details",
      "Parent Dashboard shows screen time, learning durations, accuracy and hints",
      "Parent Dashboard opens on the same phone without a PIN",
      "Zero advertising, messaging, public profiles or stranger communication"
    ],
    keywords: ["children", "parents", "family", "kids", "parent dashboard", "pin-free", "screen time", "learning durations", "default profile", "no ads"]
  },
  {
    id: "retention-deletion",
    number: 8,
    title: "8. Retention and deletion",
    shortTitle: "Retention & Deletion",
    plainSummary: "Data is stored in an on-device SQLite database. Detailed question text is removed after 90 days once activity is processed; compact outcomes and time records are kept for summaries. You can clear all data in Android Settings.",
    legalParagraphs: [
      "Profile, progress, preferences and learning records are stored locally in an on-device SQLite database with recovery safeguards. Manual backups are exported in JSON format.",
      "Data Retention & Automatic Clean-up:",
      "• Detailed question text is automatically removed after 90 days once the activity has been processed.",
      "• Compact outcome records (such as scores, completion counts) and time records are retained for ongoing daily, weekly and monthly progress summaries.",
      "• If the app crashes, technical crash details may be saved in app-specific local storage. They are not automatically uploaded.",
      "Local game data remains until you change or remove it, clear the app's storage, or uninstall the app. To remove all local app data, use Android Settings > Apps > Sumaway > Storage (or Storage & cache) > Clear storage/Clear data. Android menu names may differ. Uninstalling normally removes app-specific local data.",
      "Exported files and Android/cloud backups are separate copies. Delete those through the file manager, storage provider or device-backup settings if you do not want them retained or restored. The developer cannot remotely read or delete your local save or copies held by your chosen provider."
    ],
    keyPoints: [
      "Stored in an on-device SQLite database; manual backups export as JSON",
      "Detailed question text is automatically removed after 90 days once processed",
      "Compact outcomes and time records are retained for ongoing progress summaries",
      "To delete all data: Android Settings > Apps > Sumaway > Storage > Clear storage"
    ],
    keywords: ["sqlite", "retention", "90 days", "deletion", "clear storage", "clear data", "uninstall", "json backup", "crash logs", "question text"]
  },
  {
    id: "website-support-earlier",
    number: 9,
    title: "9. Website, support and earlier versions",
    shortTitle: "Website & Support",
    plainSummary: "The website hosting provider processes standard connection logs. If you email support, messages are handled to reply. Contact us for questions about older data.",
    legalParagraphs: [
      "Opening the policy website uses your browser. The website's hosting provider may process connection information such as IP address, browser details and request logs to deliver and protect the site. The app does not automatically send its saved gameplay data to the website.",
      "If you email support, your email address, message and voluntarily attached files are handled by email providers and used to respond. Contact dibakar61601@gmail.com to request deletion of support correspondence, subject to applicable retention obligations.",
      "This policy describes the current offline app. Moving to the offline version does not by itself delete information previously submitted to an older online SmartSum AI service. Contact dibakar61601@gmail.com for questions about earlier online data."
    ],
    keyPoints: [
      "Website host processes routine connection logs for security and delivery",
      "Gameplay data is never sent to the website",
      "Support emails are handled to respond; request deletion at dibakar61601@gmail.com",
      "Legacy SmartSum AI note: moving to offline app does not delete older online data"
    ],
    keywords: ["website", "support", "email", "smartsum", "legacy data", "hosting logs", "retention obligations"]
  },
  {
    id: "changes-contact",
    number: 10,
    title: "10. Changes and contact",
    shortTitle: "Changes & Contact",
    plainSummary: "We update this policy if practices change. A policy change does not authorise new collection. Contact Dibakar Munshi at dibakar61601@gmail.com.",
    legalParagraphs: [
      "We will update this policy when the app's information-handling practices change and revise the date above. A policy change by itself does not authorise new data collection.",
      "For privacy questions, support requests or questions about older online data:",
      "Developer: Dibakar Munshi",
      "Privacy contact: dibakar61601@gmail.com",
      "Official Policy URL: https://sumsaway.vercel.app/"
    ],
    keyPoints: [
      "Policy updates reflect real practice changes and update the date above",
      "A policy change does not by itself authorise new data collection",
      "Contact developer Dibakar Munshi directly at dibakar61601@gmail.com"
    ],
    keywords: ["changes", "contact", "developer", "dibakar munshi", "email", "updates", "privacy contact"]
  }
];

/**
 * Searches policy sections for matching keywords or text content
 */
export function searchPolicy(query: string, sections: PolicySection[] = POLICY_SECTIONS): PolicySection[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return sections;

  return sections.filter((section) => {
    const titleMatch = section.title.toLowerCase().includes(clean);
    const shortTitleMatch = section.shortTitle.toLowerCase().includes(clean);
    const summaryMatch = section.plainSummary.toLowerCase().includes(clean);
    const keywordMatch = section.keywords.some((k) => k.toLowerCase().includes(clean));
    const paragraphMatch = section.legalParagraphs.some((p) => p.toLowerCase().includes(clean));
    const pointsMatch = section.keyPoints?.some((kp) => kp.toLowerCase().includes(clean));

    return titleMatch || shortTitleMatch || summaryMatch || keywordMatch || paragraphMatch || pointsMatch;
  });
}

/**
 * Calculates word count, paragraph count, and estimated reading time
 */
export function calculateReadingMetrics(sections: PolicySection[] = POLICY_SECTIONS) {
  let totalWords = 0;
  let totalParagraphs = 0;

  sections.forEach((sec) => {
    totalParagraphs += sec.legalParagraphs.length;
    sec.legalParagraphs.forEach((p) => {
      const words = p.split(/\s+/).filter(Boolean).length;
      totalWords += words;
    });
  });

  const readingTimeMinutes = Math.max(1, Math.ceil(totalWords / 200));

  return {
    totalSections: sections.length,
    totalParagraphs,
    totalWords,
    readingTimeMinutes,
  };
}

/**
 * Formats a clean reference summary for Google Play Console submission
 */
export function generatePlayConsoleSummary(metadata: PolicyMetadata = POLICY_METADATA): string {
  return [
    `APP: ${metadata.appName}`,
    `DEVELOPER: ${metadata.developer}`,
    `CONTACT: ${metadata.privacyContact}`,
    `POLICY URL: ${metadata.policyUrl}`,
    `LAST UPDATED: ${metadata.lastUpdated}`,
    `TARGET AUDIENCE: ${metadata.targetAudience}`,
    `DATA COLLECTION STATUS: Zero Personal Data Collected (Local Learning Stats Only)`,
    `INTERNET ACCESS: None (android.permission.INTERNET is omitted)`,
    `THIRD-PARTY ADVERTISING: None (no advertising SDKs)`,
    `THIRD-PARTY ANALYTICS: None (learning statistics calculated locally on-device; no remote uploads)`,
    `LOCAL STORAGE: On-device SQLite database; manual backups export as JSON`,
    `PARENT DASHBOARD: Screen time, learning duration, accuracy and hints stored locally; accessible on device without a PIN`,
    `DATA RETENTION: Detailed question text purged after 90 days; compact progress summaries retained`,
    `NOTICE: A public policy URL and text alone do not certify all applicable legal requirements. The publisher remains responsible for the compliance declaration.`,
  ].join('\n');
}
