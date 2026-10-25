import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTajweedWord, TAJWEED_RULES_CATALOG } from './tajweedParser';

test('TAJWEED_RULES_CATALOG contains the required tajweed rule categories', () => {
  const categories = TAJWEED_RULES_CATALOG.map(r => r.category);
  assert.ok(categories.includes('madd'));
  assert.ok(categories.includes('ghunnah'));
  assert.ok(categories.includes('idgham'));
  assert.ok(categories.includes('ikhfa'));
  assert.ok(categories.includes('iqlab'));
  assert.ok(categories.includes('qalqalah'));
});

test('parseTajweedWord detects Ghunnah in Noon or Meem with Shaddah', () => {
  const tokens = parseTajweedWord("إِنَّ");
  assert.equal(tokens.length, 1);
  assert.equal(tokens[0].ruleId, 'ghunnah');
  assert.equal(tokens[0].className, 'tajweed-ghunnah');
});

test('parseTajweedWord detects Madd signs', () => {
  const tokens = parseTajweedWord("السَّمَآءِ");
  assert.equal(tokens.length, 1);
  assert.equal(tokens[0].ruleId, 'madd_obligatory');
});

test('parseTajweedWord detects Iqlab marker', () => {
  const tokens = parseTajweedWord("مِنۢ");
  assert.equal(tokens.length, 1);
  assert.equal(tokens[0].ruleId, 'iqlab');
});

test('parseTajweedWord returns plain token for words without special rules', () => {
  const tokens = parseTajweedWord("كَتَبَ");
  assert.equal(tokens.length, 1);
  assert.equal(tokens[0].ruleId, undefined);
});
