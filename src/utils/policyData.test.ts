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

test('POLICY_METADATA contains correct developer and contact attributes', () => {
  assert.equal(POLICY_METADATA.appName, 'Sums Away: Math Games for Kids');
  assert.equal(POLICY_METADATA.developer, 'Dibakar Munshi');
  assert.equal(POLICY_METADATA.privacyContact, 'dibakar61601@gmail.com');
  assert.equal(POLICY_METADATA.lastUpdated, '26 October 2026');
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

test('COMPLIANCE_ITEMS covers critical family and privacy standards', () => {
  assert.equal(COMPLIANCE_ITEMS.length, 6);
  const networkItem = COMPLIANCE_ITEMS.find((c) => c.id === 'network');
  assert.ok(networkItem);
  assert.equal(networkItem.status, 'Zero Collected');

  const coppaItem = COMPLIANCE_ITEMS.find((c) => c.id === 'coppa');
  assert.ok(coppaItem);
  assert.equal(coppaItem.status, 'Compliant');
});

test('searchPolicy filters sections accurately', () => {
  // Empty query returns all sections
  assert.equal(searchPolicy('').length, 10);
  assert.equal(searchPolicy('   ').length, 10);

  // Search for COPPA
  const coppaResults = searchPolicy('COPPA');
  assert.ok(coppaResults.length >= 1);
  const foundCoppaSection = coppaResults.some((s) => s.id === 'children-parents');
  assert.ok(foundCoppaSection, 'Must find the Children & COPPA section');

  // Search for Backup
  const backupResults = searchPolicy('backup');
  assert.ok(backupResults.length >= 2, 'Should match system backups and export sections');

  // Search for nonexistent term
  const noResults = searchPolicy('cryptocurrency_blockchain_token');
  assert.equal(noResults.length, 0);
});

test('calculateReadingMetrics computes accurate words and estimated time', () => {
  const metrics = calculateReadingMetrics();
  assert.equal(metrics.totalSections, 10);
  assert.ok(metrics.totalParagraphs > 15);
  assert.ok(metrics.totalWords > 800, 'Word count should reflect comprehensive legal text');
  assert.ok(metrics.readingTimeMinutes >= 4, 'Reading time should be at least 4 minutes');
});

test('generatePlayConsoleSummary includes required Google Play developer fields', () => {
  const summary = generatePlayConsoleSummary();
  assert.ok(summary.includes('Dibakar Munshi'));
  assert.ok(summary.includes('dibakar61601@gmail.com'));
  assert.ok(summary.includes('Sums Away: Math Games for Kids'));
  assert.ok(summary.includes('Zero Personal Data Collected'));
});
