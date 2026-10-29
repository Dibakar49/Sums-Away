import test from 'node:test';
import assert from 'node:assert/strict';
import {
  POLICY_METADATA,
  POLICY_SECTIONS,
  COMPLIANCE_ITEMS,
  searchPolicy,
  calculateReadingMetrics,
  generatePlayConsoleSummary,
} from './policyData';

test('POLICY_METADATA contains correct Sumaway name, developer and URL attributes', () => {
  assert.equal(POLICY_METADATA.appName, 'Sumaway: Math Games for Kids');
  assert.equal(POLICY_METADATA.developer, 'Dibakar Munshi');
  assert.equal(POLICY_METADATA.privacyContact, 'dibakar61601@gmail.com');
  assert.equal(POLICY_METADATA.lastUpdated, '29 October 2026');
  assert.equal(POLICY_METADATA.policyUrl, 'https://sumsaway.vercel.app/');
});

test('POLICY_SECTIONS contains all 10 core numbered sections', () => {
  assert.equal(POLICY_SECTIONS.length, 10);
  POLICY_SECTIONS.forEach((sec, idx) => {
    assert.equal(sec.number, idx + 1);
    assert.ok(sec.title.length > 0);
    assert.ok(sec.legalParagraphs.length > 0);
    assert.ok(sec.plainSummary.length > 0);
    assert.ok(sec.keywords.length > 0);
  });
});

test('COMPLIANCE_ITEMS accurately describes factual SQLite storage and local analytics calculation', () => {
  assert.equal(COMPLIANCE_ITEMS.length, 6);
  
  const networkItem = COMPLIANCE_ITEMS.find((c) => c.id === 'network');
  assert.ok(networkItem);
  assert.equal(networkItem.status, 'Zero Collected');

  const analyticsItem = COMPLIANCE_ITEMS.find((c) => c.id === 'analytics');
  assert.ok(analyticsItem);
  assert.equal(analyticsItem.status, 'On-Device Only');
  assert.ok(analyticsItem.description.includes('locally on your phone'));

  const storageItem = COMPLIANCE_ITEMS.find((c) => c.id === 'storage');
  assert.ok(storageItem);
  assert.equal(storageItem.badgeLabel, 'On-Device SQLite');

  const dashboardItem = COMPLIANCE_ITEMS.find((c) => c.id === 'dashboard');
  assert.ok(dashboardItem);
  assert.equal(dashboardItem.badgeLabel, 'PIN-Free Local Dashboard');
});

test('searchPolicy filters sections accurately for SQLite, Parent Dashboard, and 90-day retention', () => {
  // Empty query returns all sections
  assert.equal(searchPolicy('').length, 10);
  assert.equal(searchPolicy('   ').length, 10);

  // Search for SQLite
  const sqliteResults = searchPolicy('SQLite');
  assert.ok(sqliteResults.length >= 2, 'Should match on-device storage and retention sections');
  assert.ok(sqliteResults.some((s) => s.id === 'retention-deletion'));

  // Search for Parent Dashboard
  const dashboardResults = searchPolicy('parent dashboard');
  assert.ok(dashboardResults.length >= 2);
  assert.ok(dashboardResults.some((s) => s.id === 'information-on-device'));
  assert.ok(dashboardResults.some((s) => s.id === 'children-parents'));

  // Search for 90 days retention
  const retentionResults = searchPolicy('90 days');
  assert.ok(retentionResults.length >= 1);
  assert.ok(retentionResults.some((s) => s.id === 'retention-deletion'));

  // Search for WorkManager (Notifications)
  const workManagerResults = searchPolicy('WorkManager');
  assert.ok(workManagerResults.length >= 1);
  assert.ok(workManagerResults.some((s) => s.id === 'notifications-vibration'));

  // Search for nonexistent term
  const noResults = searchPolicy('cryptocurrency_blockchain_token');
  assert.equal(noResults.length, 0);
});

test('calculateReadingMetrics computes word count and reading time', () => {
  const metrics = calculateReadingMetrics();
  assert.equal(metrics.totalSections, 10);
  assert.ok(metrics.totalParagraphs >= 10);
  assert.ok(metrics.totalWords > 500);
  assert.ok(metrics.readingTimeMinutes >= 3);
});

test('generatePlayConsoleSummary includes Sumaway, SQLite, Parent Dashboard and 90 days retention notice', () => {
  const summary = generatePlayConsoleSummary();
  assert.ok(summary.includes('Sumaway: Math Games for Kids'));
  assert.ok(summary.includes('Dibakar Munshi'));
  assert.ok(summary.includes('SQLite database'));
  assert.ok(summary.includes('PARENT DASHBOARD'));
  assert.ok(summary.includes('90 days'));
  assert.ok(summary.includes('https://sumsaway.vercel.app/'));
});
