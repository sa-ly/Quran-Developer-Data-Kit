import test from 'node:test';
import assert from 'node:assert/strict';
import { getLocalTadabbur, getLocalSemanticSearch } from './localTadabburEngine';

test('getLocalTadabbur returns rich, contextual reflection for an Ayah', () => {
  const result = getLocalTadabbur(
    'الفاتحة',
    1,
    'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    'أبتدئ قراءتي للقرآن مستعينا باسم الله، مستصحبا معاني الرحمة.'
  );

  assert.ok(result.tadabbur.includes('الفاتحة'));
  assert.ok(result.tadabbur.includes('الرحمن الرحيم') || result.tadabbur.includes('رحمة'));
  assert.ok(result.keyTakeaway.length > 5);
  assert.equal(result.practicalSteps.length, 3);
  assert.ok(result.linguisticGems.length > 10);
});

test('getLocalTadabbur works properly even when classical tafsir is omitted', () => {
  const result = getLocalTadabbur('الإخلاص', 1, 'قُلْ هُوَ اللَّهُ أَحَدٌ');
  assert.ok(result.tadabbur.includes('الإخلاص'));
  assert.ok(result.practicalSteps.length === 3);
});

test('getLocalSemanticSearch finds appropriate themes for keywords', () => {
  const search1 = getLocalSemanticSearch('بر الوالدين والإحسان');
  assert.ok(search1.relatedThemes.some(t => t.includes('الوالدين')));
  assert.ok(search1.recommendedSurahs.some(s => s.includes('الإسراء')));

  const search2 = getLocalSemanticSearch('الصبر عند الشدائد');
  assert.ok(search2.summary.includes('الصبر'));
  assert.ok(search2.relatedThemes.some(t => t.includes('صابر') || t.includes('صبر')));
  assert.ok(search2.recommendedSurahs.some(s => s.includes('البقرة')));
});
