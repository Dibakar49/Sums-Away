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

test('POLICY_METADATA contains correct developer and URL attributes', () => {
  assert.equal(POLICY_METADATA.appName, 'Sums Away: Math Games for Kids');
  assert.equal(POLICY_METADATA.developer, 'Dibakar Munshi');
  assert.equal(POLICY_METADATA.privacyContact, 'dibakar61601@gmail.com');
  assert.equal(POLICY_METADATA.lastUpdated, '26 October 2026');
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

test('COMPLIANCE_ITEMS accurately describes factual offline practices without false certification claims', () => {
  assert.equal(COMPLIANCE_ITEMS.length, 6);
  const networkItem = COMPLIANCE_ITEMS.find((c) => c.id === 'network');
  assert.ok(networkItem);
  assert.equal(networkItem.status, 'Zero Collected');

  const familyItem = COMPLIANCE_ITEMS.find((c) => c.id === 'family');
  assert.ok(familyItem);
  assert.equal(familyItem.status, 'Family-Friendly');
  assert.equal(familyItem.badgeLabel, 'Family-Friendly Design');
});

test('searchPolicy filters sections accurately', () => {
  // Empty query returns all sections
  assert.equal(searchPolicy('').length, 10);
  assert.equal(searchPolicy('   ').length, 10);

  // Search for WorkManager (Notifications)
  const workManagerResults = searchPolicy('WorkManager');
  assert.ok(workManagerResults.length >= 1);
  assert.ok(workManagerResults.some((s) => s.id === 'notifications-vibration'));

  // Search for SmartSum (Legacy disclosure)
  const smartSumResults = searchPolicy('SmartSum');
  assert.ok(smartSumResults.length >= 1);
  assert.ok(smartSumResults.some((s) => s.id === 'website-support-earlier'));

  // Search for Age Calculator
  const ageResults = searchPolicy('age calculator');
  assert.ok(ageResults.length >= 1);
  assert.ok(ageResults.some((s) => s.id === 'information-on-device'));

  // Search for Backup
  const backupResults = searchPolicy('backup');
  assert.ok(backupResults.length >= 2, 'Should match system backups and export sections');

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

test('generatePlayConsoleSummary includes URL, developer, and publisher responsibility notice', () => {
  const summary = generatePlayConsoleSummary();
  assert.ok(summary.includes('Dibakar Munshi'));
  assert.ok(summary.includes('dibakar61601@gmail.com'));
  assert.ok(summary.includes('https://sumsaway.vercel.app/'));
  assert.ok(summary.includes('Zero Personal Data Collected'));
  assert.ok(summary.includes('The publisher remains responsible for the compliance declaration'));
});
