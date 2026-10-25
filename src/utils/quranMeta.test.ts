import test from 'node:test';
import assert from 'node:assert/strict';
import { SURAH_LIST, TOTAL_SURAH_COUNT, TOTAL_PAGES_COUNT, getSurahMeta, getSurahByPage } from '../data/surahList';

test('SURAH_LIST contains exactly 114 Surahs', () => {
  assert.equal(SURAH_LIST.length, 114);
  assert.equal(TOTAL_SURAH_COUNT, 114);
  assert.equal(TOTAL_PAGES_COUNT, 604);
});

test('getSurahMeta returns correct info for Al-Fatihah and An-Nas', () => {
  const fatihah = getSurahMeta(1);
  assert.ok(fatihah);
  assert.equal(fatihah?.name, "الفاتحة");
  assert.equal(fatihah?.numberOfAyahs, 7);
  assert.equal(fatihah?.page, 1);

  const nas = getSurahMeta(114);
  assert.ok(nas);
  assert.equal(nas?.name, "الناس");
  assert.equal(nas?.numberOfAyahs, 6);
  assert.equal(nas?.page, 604);
});

test('getSurahByPage locates starting surah for page 1 and page 604', () => {
  const page1 = getSurahByPage(1);
  assert.equal(page1?.name, "الفاتحة");

  const page604 = getSurahByPage(604);
  assert.ok(page604);
  assert.equal(page604?.page, 604);
});
