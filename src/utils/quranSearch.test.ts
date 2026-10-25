import test from 'node:test';
import assert from 'node:assert/strict';
import { removeTashkeel, normalizeArabic, matchesQuery, highlightMatches } from './quranSearch';

test('removeTashkeel strips fathah, dammah, kasrah, and shaddah', () => {
  const input = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
  const result = removeTashkeel(input);
  assert.equal(result, "بسم الله الرحمن الرحيم");
});

test('normalizeArabic handles alef variants and taa marbuta', () => {
  assert.equal(normalizeArabic("إِيَّاكَ نَعْبُدُ"), "اياك نعبد");
  assert.equal(normalizeArabic("الصَّلَاةَ"), "الصلاه");
  assert.equal(normalizeArabic("الْهُدَىٰ"), "الهدي");
});

test('matchesQuery finds verses regardless of tashkeel or alef spelling', () => {
  const verse = "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ";
  assert.equal(matchesQuery(verse, "الصراط"), true);
  assert.equal(matchesQuery(verse, "المستقيم"), true);
  assert.equal(matchesQuery(verse, "اهدنا"), true);
  assert.equal(matchesQuery(verse, "الرحمن"), false);
});

test('highlightMatches breaks down matching words', () => {
  const text = "الحمد لله رب العالمين";
  const segments = highlightMatches(text, "رب");
  assert.equal(segments.length, 4);
  assert.equal(segments[2].isMatch, true);
  assert.equal(segments[0].isMatch, false);
});
