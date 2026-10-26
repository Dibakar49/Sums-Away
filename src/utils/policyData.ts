/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Official Privacy Policy Data & Utilities for Sums Away: Math Games for Kids
 */

export interface PolicyMetadata {
  appName: string;
  appSubtitle: string;
  developer: string;
  privacyContact: string;
  lastUpdated: string;
  effectiveDate: string;
  platform: string;
  targetAudience: string;
  storeCategory: string;
  architectureType: string;
}

export interface CompliancePoint {
  id: string;
  title: string;
  status: 'Compliant' | 'Not Applicable' | 'Zero Collected';
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
  appName: "Sums Away: Math Games for Kids",
  appSubtitle: "Interactive Math Practice & Educational Puzzles for Children",
  developer: "Dibakar Munshi",
  privacyContact: "dibakar61601@gmail.com",
  lastUpdated: "26 October 2026",
  effectiveDate: "26 October 2026",
  platform: "Android (Offline Standalone)",
  targetAudience: "Children, Families & Elementary Students",
  storeCategory: "Educational / Math Games (Google Play Families Program)",
  architectureType: "100% Client-Side Local Storage (Zero Network Transmissions)",
};

export const COMPLIANCE_ITEMS: CompliancePoint[] = [
  {
    id: "network",
    title: "Internet Permissions",
    status: "Zero Collected",
    description: "The application requests NO internet access permission (android.permission.INTERNET is omitted). It cannot make network requests.",
    badgeLabel: "No Network Permission"
  },
  {
    id: "ads",
    title: "Third-Party Advertising",
    status: "Zero Collected",
    description: "Contains zero advertising SDKs, zero banners, zero interstitial popups, and zero sponsored placements.",
    badgeLabel: "100% Ad-Free"
  },
  {
    id: "analytics",
    title: "Telemetry & Tracking SDKs",
    status: "Zero Collected",
    description: "Zero analytics suites (no Firebase Analytics, Google Analytics, Adjust, AppsFlyer, or Flurry). No tracking identifiers.",
    badgeLabel: "No Tracking SDKs"
  },
  {
    id: "accounts",
    title: "Account Creation & Passwords",
    status: "Not Applicable",
    description: "No sign-up, email registration, password creation, or cloud authentication (no Firebase Auth, OAuth, or social logins).",
    badgeLabel: "No Login Required"
  },
  {
    id: "hardware",
    title: "Sensitive Sensors & Peripherals",
    status: "Zero Collected",
    description: "Never accesses camera, microphone, GPS/location services, contact books, call logs, or photos gallery.",
    badgeLabel: "No Sensor Access"
  },
  {
    id: "coppa",
    title: "COPPA & GDPR-K Compliance",
    status: "Compliant",
    description: "Strictly conforms to the US Children's Online Privacy Protection Act (COPPA), EU/UK GDPR Article 8, and Google Play Families Policy.",
    badgeLabel: "Kids Safe & Certified"
  }
];

export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "scope-purpose",
    number: 1,
    title: "1. Scope and Purpose of this Policy",
    shortTitle: "Scope & Purpose",
    plainSummary: "Sums Away is an offline math game for kids. You can play all math challenges and track your progress without an internet connection, account, or personal profile.",
    legalParagraphs: [
      "This Privacy Policy governs the operational architecture, data handling practices, and user privacy safeguards of the standalone Android mobile application known as \"Sums Away: Math Games for Kids\" (the \"Application\"), authored and maintained by independent developer Dibakar Munshi (\"we\", \"us\", or \"developer\").",
      "The Application is designed primarily to provide children, elementary school students, and families with interactive arithmetic games, cognitive practice challenges, math puzzles, and self-paced educational skill tracking.",
      "The Application operates fundamentally as an offline, self-contained client. Access to and use of all gameplay, educational math modules, practice modes, and progress features does not require the creation of a user account, submission of an electronic mail address, generation of credentials, or an active connection to the internet."
    ],
    keyPoints: [
      "Operates entirely offline on Android devices",
      "No user account or login registration is ever requested",
      "Designed specifically for children and family learning"
    ],
    keywords: ["scope", "purpose", "offline", "math", "account", "login", "kids", "families", "standalone"]
  },
  {
    id: "on-device-data",
    number: 2,
    title: "2. Information Processed Locally on Your Device",
    shortTitle: "Local Device Data",
    plainSummary: "Any information you choose to enter—like a game nickname, avatar, or your high scores—is stored only on your phone or tablet. We cannot see it or access it.",
    legalParagraphs: [
      "To enable persistent gameplay, level progression, and motivational rewards across gaming sessions, the Application stores non-sensitive gameplay parameters exclusively within the local, sandboxed storage directory assigned to the Application by the Android operating system.",
      "The locally stored parameters are strictly limited to the following categories:",
      "• Explorer Profile Configuration: An optional explorer nickname, an optional user-typed regional or country text label, an avatar visual icon choice, and an optional daily math practice goal. Users may retain the default system pseudonym without providing any real identifying names. The optional country or regional label is entered manually as arbitrary text and is under no circumstances derived from GPS, cellular triangulation, IP address, or location services.",
      "• Educational Progression & Metrics: Arithmetic level milestones achieved, stars earned, unlockable accomplishment badges, virtual treasure items, cumulative XP, virtual in-game credits, problem attempt counts, user answer choices, recorded calculation errors for educational review, session timestamps, and cumulative time spent practicing.",
      "• Local Gameplay Preferences: User configurations regarding audio playback, sound effects, animation speeds, UI appearance modes, local reminder schedules, and badge display showcases.",
      "• Diagnostic Recovery Records: Local recovery snapshots and crash breadcrumb details maintained within isolated sandbox memory to prevent game save corruption.",
      "The optional on-device Age Calculator tool processes date values inputted directly by the user strictly in transient volatile memory. Inputted calendar dates are neither integrated into the explorer profile nor permanently written to disk, and are never transmitted to any external recipient.",
      "Under no circumstances does the Application request, solicit, or require an account password, email address, physical address, telephone number, government ID, real date of birth, or payment card data. The Application does not declare or utilize Android permissions to access device contacts, camera sensors, audio recording microphones, biometric hardware, or geographical location coordinates."
    ],
    keyPoints: [
      "Nicknames and avatars are purely local and arbitrary",
      "No location tracking: regional labels are manually typed text only",
      "Age calculator calculations are processed purely in device RAM",
      "Zero access to camera, microphone, contacts, or GPS"
    ],
    keywords: ["device", "storage", "local", "nickname", "avatar", "xp", "stars", "badges", "age calculator", "camera", "microphone", "location"]
  },
  {
    id: "zero-collection-sharing",
    number: 3,
    title: "3. Absolute Prohibition on Remote Data Collection & Sharing",
    shortTitle: "Zero Remote Collection",
    plainSummary: "We do not collect, upload, track, or sell your data. There are no ads, no trackers, and no company servers storing your answers.",
    legalParagraphs: [
      "The Application does not declare or hold the Android \"android.permission.INTERNET\" permission in its application manifest. Consequently, the Application lacks the operating system capability to initiate outbound network sockets, query remote web servers, or transmit saved game profiles, arithmetic answers, time stamps, or diagnostic logs to developer-controlled infrastructure or third-party servers.",
      "The Application incorporates zero third-party commercial advertising networks, zero commercial analytics software development kits (SDKs), zero remote crash-reporting agents (such as Firebase Crashlytics or Bugsnag), and zero cloud database connectors (such as Firebase Firestore, Realtime Database, or Supabase).",
      "The Application does not capture, read, or process operating system Advertising Identifiers (Google Advertising ID / GAID), Android ID, IMEI, or hardware serial numbers. The Application provides no global public leaderboards, social network integrations, or real-time multi-tenant cloud synchronization.",
      "We affirm that we do not receive, store, broker, monetize, rent, or sell any gameplay information or user-generated input created within the Application. External scenarios such as Android operating system backups, user-initiated file exports, direct support communications, and visits to web pages are governed independently as detailed in subsequent sections."
    ],
    keyPoints: [
      "No INTERNET permission is declared in AndroidManifest.xml",
      "No Google Advertising ID (GAID) or device fingerprinting",
      "Zero commercial sale, rental, or brokering of child or user data",
      "No remote third-party analytics or crash trackers"
    ],
    keywords: ["collection", "sharing", "internet permission", "advertising", "analytics", "tracking", "monetization", "sale", "firebase"]
  },
  {
    id: "backups-transfers",
    number: 4,
    title: "4. Operating System-Level Backups & Cloud Device Transfers",
    shortTitle: "System Backups & Cloud",
    plainSummary: "Android's built-in Google Drive backup can save your progress if you switch phones. This is handled by your Google account settings, not by Sums Away.",
    legalParagraphs: [
      "Depending on the user's specific Android version, device manufacturer firmware, active Google Account preferences, and system settings, the Android operating system may automatically include the Application's local sandbox state in system-wide device backups (e.g., Android Auto Backup for Apps via Google Drive) or during direct device-to-device migration workflows.",
      "Such backup mechanisms and cloud archives are controlled exclusively by the user, the device manufacturer, and the cloud storage infrastructure provider (e.g., Google LLC). They are not facilitated, inspected, or managed by a developer-operated server or independent Sums Away sync service.",
      "Restoration fidelity is not guaranteed and may vary based on OS backup frequency. Parents, legal guardians, and adult device owners retain full autonomy to inspect, configure, or disable Android Auto Backup at any time via Android Settings > System > Backup (or Google > Backup)."
    ],
    keyPoints: [
      "Backups are handled by Android OS, not developer servers",
      "Stored in user's personal Google Drive backup if enabled on device",
      "Parents can disable or manage backups via Android System Settings"
    ],
    keywords: ["backup", "android backup", "google drive", "transfer", "cloud", "device migration", "restore"]
  },
  {
    id: "export-import",
    number: 5,
    title: "5. Data Portability: User-Controlled Export and Import",
    shortTitle: "Data Export & Import",
    plainSummary: "You can save a backup file of your progress to your phone or transfer it using the Android file picker. The file stays in your hands.",
    legalParagraphs: [
      "The Application includes user-directed Data Portability tools enabling the manual export and import of saved game progress. These features utilize the official Android Storage Access Framework (SAF) system document picker.",
      "When invoking Export or Import, the Application interacts strictly with the specific file URI or storage destination explicitly selected by the user in the system picker interface. The Application does not seek, request, or hold broad file storage permissions (such as READ_EXTERNAL_STORAGE or MANAGE_EXTERNAL_STORAGE) across the broader device file system.",
      "An exported backup file is generated in open JSON format containing the user's saved nickname, level achievements, stars, badges, error logs, and game preferences. Exported backup archives are not encrypted with proprietary keys by the Application; any individual with access to the generated JSON file or storage medium can view its plaintext contents.",
      "If the user selects a third-party cloud drive or external messaging app within the Android file picker to save or transmit the backup, that destination handles the file pursuant to its own privacy policy and terms. Importing a backup allows the user to merge or overwrite existing local progress. The Application automatically maintains a temporary local rollback snapshot prior to import to facilitate an immediate undo."
    ],
    keyPoints: [
      "Uses secure Android Storage Access Framework (SAF)",
      "Zero broad storage permissions requested",
      "Exported file is transparent JSON under user custody",
      "Built-in local recovery rollback safeguards progress"
    ],
    keywords: ["export", "import", "saf", "file picker", "json", "backup", "portability", "recovery"]
  },
  {
    id: "permissions",
    number: 6,
    title: "6. Android System Permissions: Notifications & Vibration",
    shortTitle: "Permissions & Haptics",
    plainSummary: "We only ask for notification permission to send optional daily math practice reminders. Vibration is used for tactile feedback on answers.",
    legalParagraphs: [
      "The Application minimizes its permission surface footprint to the absolute minimum required for core offline utility:",
      "• Notification Permission (android.permission.POST_NOTIFICATIONS): On Android 13 (API level 33) and higher, the Application may request permission to schedule optional, recurring local alarms for daily math practice reminders. The Application remains fully playable if this permission is denied. Notification schedules are computed and triggered entirely on-device by the Android AlarmManager/NotificationManager without remote push server dispatch. Users may enable, alter, or silence practice reminders at any time in the in-app Settings menu or via Android Settings > Apps > Sums Away > Notifications.",
      "• Haptic Vibration (android.permission.VIBRATE): Used solely to provide tactile sensory feedback during gameplay button interactions, correct answer affirmations, or celebration effects. Haptic feedback may be toggled off within in-app sound preferences."
    ],
    keyPoints: [
      "POST_NOTIFICATIONS is strictly for optional local math reminders",
      "Reminders are triggered purely on-device by Android AlarmManager",
      "VIBRATE is used solely for tactile button and answer feedback",
      "Full gameplay remains 100% accessible if notifications are declined"
    ],
    keywords: ["permissions", "notifications", "vibrate", "haptics", "post_notifications", "reminders", "alarm"]
  },
  {
    id: "children-parents",
    number: 7,
    title: "7. Strict Children's Online Privacy (COPPA & GDPR-K)",
    shortTitle: "Children & COPPA",
    plainSummary: "Sums Away is built specifically for children. We never ask for a child's real name, photos, or location, and there is no chat or contact with strangers.",
    legalParagraphs: [
      "Sums Away is purposefully designed for young learners, elementary school students, and families. Because our users include children under the age of 13 in the United States and under the age of 16 in the European Economic Area / United Kingdom, we adhere strictly to the Children's Online Privacy Protection Act (COPPA), the General Data Protection Regulation (GDPR-K / UK GDPR), and the Google Play Families Policy.",
      "Our compliance model is anchored in Privacy by Design and Complete Data Minimization: We collect no personal information from children. Children can enjoy all arithmetic modules, unlock all badges, and advance through all grade-level stages using the default explorer profile without revealing their identity.",
      "The Application does not include:",
      "• Any form of behavioral, targeted, or contextual commercial advertising.",
      "• Any chat rooms, direct messaging, open text boxes visible to others, or social media plugins.",
      "• Any public multiplayer lobbies, online ranking leaderboards, or public profile pages.",
      "• Any third-party data tracking, behavioral profiling, or advertising network SDKs.",
      "Parents and legal guardians maintain complete authority over their child's digital footprint. We recommend parents oversee device backup policies, exported files, and any support communications. When submitting technical support or inquiry emails, parents are advised never to include a child's real full name, birth certificate, school, home address, or sensitive records."
    ],
    keyPoints: [
      "Compliant with US COPPA (15 U.S.C. §§ 6501–6506)",
      "Compliant with EU & UK GDPR Article 8 (Children's Consent)",
      "Compliant with Google Play Designed for Families Policy",
      "Zero social features, chat, or stranger communication"
    ],
    keywords: ["coppa", "children", "parents", "gdpr-k", "families", "kids", "child safety", "protection", "designed for families"]
  },
  {
    id: "retention-deletion",
    number: 8,
    title: "8. Data Retention, Purging & User Erasure Mechanisms",
    shortTitle: "Retention & Deletion",
    plainSummary: "Your data stays on your device until you delete it. You can erase everything anytime by clearing app storage or uninstalling the app.",
    legalParagraphs: [
      "All saved gameplay records, profile nicknames, unlocked items, and error logs are retained exclusively within the device's local application storage sandbox until explicitly modified, purged, or deleted by the user.",
      "Permanent Local Erasure: A user or parent may irrevocably delete all local progress, stored profiles, and configuration preferences at any time by performing either of the following actions:",
      "1. Clear App Data: Open device Android Settings > Apps (or Application Manager) > Sums Away > Storage (or Storage & cache) > select \"Clear Storage\" (or \"Clear Data\"). This immediately and permanently deletes the local SQLite/SharedPreferences game database.",
      "2. Uninstall Application: Uninstalling the Application from the Android device automatically causes the operating system to delete the Application's private internal storage directory.",
      "Independent Secondary Copies: User-exported JSON backup files stored on external drives or cloud services and Android system backups stored in Google Drive exist independently of the Application sandbox. To delete these secondary archives, users should delete the exported file from their file manager or purge their cloud backup via Google Drive settings. Because the developer maintains no centralized server infrastructure holding user data, the developer cannot remotely view, access, or delete records held on your personal hardware or private backup cloud."
    ],
    keyPoints: [
      "Local data can be cleared instantly in Android Settings > Apps > Storage",
      "Uninstalling the app automatically deletes all sandbox game records",
      "Developer operates no remote servers, ensuring absolute local sovereignty",
      "Exported JSON files remain under direct parent/user custody"
    ],
    keywords: ["retention", "deletion", "clear data", "uninstall", "erasure", "storage", "purge", "right to be forgotten"]
  },
  {
    id: "website-support",
    number: 9,
    title: "9. Policy Webpage, Direct Support Correspondence & Legacy Notes",
    shortTitle: "Website & Support",
    plainSummary: "When you view this privacy webpage or send us an email for support, basic web logs and your email message are handled securely to reply to you.",
    legalParagraphs: [
      "Hosting Infrastructure for this Policy: When you access this Privacy Policy webpage via an internet browser, the hosting provider delivering these web assets (such as Google Cloud / GitHub Pages) automatically logs routine technical HTTP connection metadata. This may include your client IP address, user-agent browser string, referring page, and request timestamps strictly to ensure network reliability, prevent denial-of-service abuse, and maintain web security. The Application does not link gameplay data with this policy web page.",
      "Direct Support Correspondence: If a parent, educator, or user contacts the developer directly via electronic mail at dibakar61601@gmail.com, we receive the sender's email address, subject header, message body, and any voluntary diagnostic attachments. This information is used strictly to investigate, reply to, and resolve the specific inquiry, bug report, or privacy concern.",
      "We retain customer service emails only for the duration necessary to satisfy the support inquiry and comply with applicable legal or accounting obligations. Senders may email dibakar61601@gmail.com at any time to request the immediate deletion of their correspondence history.",
      "Scope of Current Version: This document defines the privacy architecture of the current offline release of Sums Away. If any historical experimental test builds incorporated remote endpoints in prior development cycles, current production distributions are completely decoupled from remote database synchronization."
    ],
    keyPoints: [
      "Web hosting logs standard HTTP access data for site security",
      "Support emails to dibakar61601@gmail.com are used solely to reply",
      "Parents can request immediate deletion of their support emails",
      "Current production release is completely offline"
    ],
    keywords: ["website", "support", "email", "server logs", "correspondence", "contact", "http"]
  },
  {
    id: "amendments-contact",
    number: 10,
    title: "10. Policy Amendments, Governing Law & Developer Contact",
    shortTitle: "Updates & Contact",
    plainSummary: "If we ever update this policy, the new date will be displayed at the top. You can contact developer Dibakar Munshi at dibakar61601@gmail.com anytime.",
    legalParagraphs: [
      "We reserve the right to amend or update this Privacy Policy periodically to reflect technological changes, regulatory guidelines, or functional enhancements to the Application. When revisions occur, the \"Last updated\" and \"Effective Date\" legend at the top of this document will be modified accordingly.",
      "Substantive Policy Safeguard: A revision to this text document does not, by itself, authorize or activate remote collection of personal data. Any future feature that would introduce network communication or cloud synchronization will be accompanied by explicit in-app notices, updated permission declarations, and verifiable parental consent mechanisms where mandated by law.",
      "Inquiries & Statutory Privacy Requests: For any questions, parental requests, regulatory audits, or inquiries concerning this Privacy Policy, please contact the developer directly:",
      "Developer: Dibakar Munshi",
      "Official Privacy Email: dibakar61601@gmail.com",
      "Application: Sums Away: Math Games for Kids",
      "Jurisdiction: Distributed globally via Google Play Store pursuant to Google Play Developer Program Policies and Children's Online Privacy Standards."
    ],
    keyPoints: [
      "Policy revisions never silently enable data collection",
      "Direct contact with developer Dibakar Munshi via email",
      "Transparent date stamping and regulatory alignment"
    ],
    keywords: ["amendments", "contact", "developer", "dibakar munshi", "email", "governing law", "updates"]
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

  // Average reading speed: 200 words per minute for legal texts
  const readingTimeMinutes = Math.max(1, Math.ceil(totalWords / 200));

  return {
    totalSections: sections.length,
    totalParagraphs,
    totalWords,
    readingTimeMinutes,
  };
}

/**
 * Formats a clean verification statement for Google Play Console submission
 */
export function generatePlayConsoleSummary(metadata: PolicyMetadata = POLICY_METADATA): string {
  return [
    `APP: ${metadata.appName}`,
    `DEVELOPER: ${metadata.developer}`,
    `CONTACT: ${metadata.privacyContact}`,
    `LAST UPDATED: ${metadata.lastUpdated}`,
    `DATA COLLECTION STATUS: Zero Personal Data Collected`,
    `CHILDREN'S PRIVACY: Fully compliant with COPPA, GDPR-K & Google Play Families Policy`,
    `INTERNET ACCESS: None (android.permission.INTERNET is omitted)`,
    `THIRD-PARTY ADVERTISING: None`,
    `THIRD-PARTY ANALYTICS: None`,
  ].join('\n');
}
