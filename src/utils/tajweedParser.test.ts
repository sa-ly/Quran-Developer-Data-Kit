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
  assert.ok(tokens[0].ruleId?.startsWith('madd'));
});

test('parseTajweedWord detects Madd Lazim in Ad-Dalleen', () => {
  const tokens = parseTajweedWord("الضَّالِّينَ");
  assert.equal(tokens.length, 1);
  assert.equal(tokens[0].ruleId, 'madd_obligatory');
});

test('parseTajweedWord detects Qalqalah in Ahad and As-Samad and Yalid', () => {
  const t1 = parseTajweedWord("أَحَدٌ");
  assert.equal(t1[0].ruleId, 'qalqalah');

  const t2 = parseTajweedWord("الصَّمَدُ");
  assert.equal(t2[0].ruleId, 'qalqalah');

  const t3 = parseTajweedWord("يَلِدْ");
  assert.equal(t3[0].ruleId, 'qalqalah');
});

test('parseTajweedWord detects Iqlab marker', () => {
  const tokens = parseTajweedWord("مِنۢ");
  assert.equal(tokens.length, 1);
  assert.equal(tokens[0].ruleId, 'iqlab');
});

test('parseTajweedWord respects dark mode colors', () => {
  const lightTokens = parseTajweedWord("الضَّالِّينَ", false);
  const darkTokens = parseTajweedWord("الضَّالِّينَ", true);
  assert.equal(lightTokens[0].color, '#DC2626');
  assert.equal(darkTokens[0].color, '#F87171');
});

test('parseTajweedWord returns plain token for words without special rules', () => {
  const tokens = parseTajweedWord("كَتَبَ");
  assert.equal(tokens.length, 1);
  assert.equal(tokens[0].ruleId, undefined);
});
