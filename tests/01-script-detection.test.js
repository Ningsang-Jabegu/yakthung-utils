/**
 * 01-script-detection.test.js
 *
 * Tests:
 * - Limbu Unicode block detection
 * - Every code point from U+1900 to U+194F
 * - Devanagari rejection
 * - Latin rejection
 * - Digits and punctuation rejection
 * - Mixed-script detection
 * - Empty/null/undefined/non-string input
 *
 * IMPORTANT:
 * This tests Unicode/script detection only.
 * It does NOT test whether a character is linguistically valid Yakthung.
 */

import { isLimbuScript } from '../src/index.js';


// ============================================================================
// TEST UTILITIES
// ============================================================================

let passed = 0;
let failed = 0;

function codePoint(char) {
    if (!char) return 'N/A';

    return `U+${char
        .codePointAt(0)
        .toString(16)
        .toUpperCase()
        .padStart(4, '0')}`;
}

function assertEqual(actual, expected, description) {
    if (actual === expected) {
        passed++;

        console.log(`✅ PASS: ${description}`);
    } else {
        failed++;

        console.error(`❌ FAIL: ${description}`);
        console.error(`   Expected: ${expected}`);
        console.error(`   Actual:   ${actual}`);
    }
}

function section(title) {
    console.log('\n' + '='.repeat(80));
    console.log(title);
    console.log('='.repeat(80));
}


// ============================================================================
// 1. BASIC LIMBU CHARACTERS
// ============================================================================

section('1. BASIC LIMBU CHARACTERS');

const basicLimbuCharacters = [
    'ᤀ', // U+1900
    'ᤁ', // U+1901
    'ᤂ', // U+1902
    'ᤃ', // U+1903
    'ᤄ', // U+1904
    'ᤅ', // U+1905
    'ᤆ', // U+1906
    'ᤇ', // U+1907
    'ᤈ', // U+1908
    'ᤉ', // U+1909
    'ᤊ', // U+190A
    'ᤋ', // U+190B
    'ᤌ', // U+190C
    'ᤍ', // U+190D
    'ᤎ', // U+190E
    'ᤏ', // U+190F
    'ᤐ', // U+1910
    'ᤑ', // U+1911
    'ᤒ', // U+1912
    'ᤓ', // U+1913
    'ᤔ', // U+1914
    'ᤕ', // U+1915
    'ᤖ', // U+1916
    'ᤗ', // U+1917
    'ᤘ', // U+1918
    'ᤙ', // U+1919
    'ᤚ', // U+191A
    'ᤛ', // U+191B
    'ᤜ', // U+191C
    'ᤝ', // U+191D
    'ᤞ', // U+191E
];

for (const char of basicLimbuCharacters) {
    assertEqual(
        isLimbuScript(char),
        true,
        `${char} (${codePoint(char)}) should be detected as Limbu`
    );
}


// ============================================================================
// 2. LIMBU VOWEL SIGNS
// ============================================================================

section('2. LIMBU VOWEL SIGNS');

const limbuVowels = [
    'ᤠ', // U+1920
    'ᤡ', // U+1921
    'ᤢ', // U+1922
    'ᤣ', // U+1923
    'ᤤ', // U+1924
    'ᤥ', // U+1925
    'ᤦ', // U+1926
    'ᤧ', // U+1927
    'ᤨ', // U+1928
];

for (const char of limbuVowels) {
    assertEqual(
        isLimbuScript(char),
        true,
        `${char} (${codePoint(char)}) should be detected as Limbu`
    );
}


// ============================================================================
// 3. LIMBU SUBJOINTS
// ============================================================================

section('3. LIMBU SUBJOINTS');

const limbuSubjoints = [
    'ᤩ', // U+1929
    'ᤪ', // U+192A
    'ᤫ', // U+192B
];

for (const char of limbuSubjoints) {
    assertEqual(
        isLimbuScript(char),
        true,
        `${char} (${codePoint(char)}) should be detected as Limbu`
    );
}


// ============================================================================
// 4. LIMBU SMALL LETTERS
// ============================================================================

section('4. LIMBU SMALL LETTERS');

const limbuSmallLetters = [
    'ᤰ', // U+1930
    'ᤱ', // U+1931
    'ᤲ', // U+1932
    'ᤳ', // U+1933
    'ᤴ', // U+1934
    'ᤵ', // U+1935
    'ᤶ', // U+1936
    'ᤷ', // U+1937
    'ᤸ', // U+1938
];

for (const char of limbuSmallLetters) {
    assertEqual(
        isLimbuScript(char),
        true,
        `${char} (${codePoint(char)}) should be detected as Limbu`
    );
}


// ============================================================================
// 5. LIMBU MODIFIER SIGNS
// ============================================================================

section('5. LIMBU MODIFIER SIGNS');

const limbuSigns = [
    '᤹', // U+1939 Mukphreng
    '᤺', // U+193A Kemphreng
    '᤻', // U+193B Sai-I
];

for (const char of limbuSigns) {
    assertEqual(
        isLimbuScript(char),
        true,
        `${char} (${codePoint(char)}) should be detected as Limbu`
    );
}


// ============================================================================
// 6. LIMBU SACRED SIGN
// ============================================================================

section('6. LIMBU SACRED SIGN');

const limbuSacredSign = '᥀'; // U+1940

assertEqual(
    isLimbuScript(limbuSacredSign),
    true,
    `${limbuSacredSign} (${codePoint(limbuSacredSign)}) should be detected as Limbu`
);


// ============================================================================
// 7. LIMBU NUMBERS
// ============================================================================

section('7. LIMBU NUMBERS');

const limbuNumbers = [
    '᥆', // U+1946
    '᥇', // U+1947
    '᥈', // U+1948
    '᥉', // U+1949
    '᥊', // U+194A
    '᥋', // U+194B
    '᥌', // U+194C
    '᥍', // U+194D
    '᥎', // U+194E
    '᥏', // U+194F
];

for (const char of limbuNumbers) {
    assertEqual(
        isLimbuScript(char),
        true,
        `${char} (${codePoint(char)}) should be detected as Limbu`
    );
}


// ============================================================================
// 8. EVERY CODE POINT IN U+1900–U+194F
// ============================================================================

section('8. EVERY CODE POINT: U+1900–U+194F');

/*
 * This is the most important structural test.
 *
 * Your implementation claims that the entire range U+1900–U+194F
 * belongs to the Limbu Unicode block.
 *
 * Therefore every code point in this range must return true.
 */

for (let cp = 0x1900; cp <= 0x194F; cp++) {
    const char = String.fromCodePoint(cp);

    assertEqual(
        isLimbuScript(char),
        true,
        `${char} (${codePoint(char)}) U+${cp
            .toString(16)
            .toUpperCase()} should be detected as Limbu`
    );
}


// ============================================================================
// 9. DEVANAGARI MUST NOT BE DETECTED AS LIMBU
// ============================================================================

section('9. DEVANAGARI REJECTION');

const devanagariCharacters = [
    'अ',
    'आ',
    'इ',
    'ई',
    'उ',
    'ऊ',
    'ए',
    'ऐ',
    'ओ',
    'औ',

    'क',
    'ख',
    'ग',
    'घ',
    'ङ',

    'च',
    'छ',
    'ज',
    'झ',
    'ञ',

    'ट',
    'ठ',
    'ड',
    'ढ',
    'ण',

    'त',
    'थ',
    'द',
    'ध',
    'न',

    'प',
    'फ',
    'ब',
    'भ',
    'म',

    'य',
    'र',
    'ल',
    'व',

    'श',
    'ष',
    'स',
    'ह',

    '्',
    'ं',
    'ँ',
    'ा',
    'ि',
    'ी',
    'ु',
    'ू',
    'े',
    'ै',
    'ो',
    'ौ',
];

for (const char of devanagariCharacters) {
    assertEqual(
        isLimbuScript(char),
        false,
        `${char} (${codePoint(char)}) should NOT be detected as Limbu`
    );
}


// ============================================================================
// 10. LATIN CHARACTERS MUST NOT BE DETECTED
// ============================================================================

section('10. LATIN CHARACTER REJECTION');

const latinCharacters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',

    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
];

for (const char of latinCharacters) {
    assertEqual(
        isLimbuScript(char),
        false,
        `${char} (${codePoint(char)}) should NOT be detected as Limbu`
    );
}


// ============================================================================
// 11. NUMBERS / PUNCTUATION / SYMBOLS
// ============================================================================

section('11. NUMBERS / PUNCTUATION / SYMBOLS');

const nonLimbuCharacters = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',

    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '-',
    '+',
    '=',
    ',',
    '.',
    ':',
    ';',
    '/',
    '\\',
    '"',
    "'",
];

for (const char of nonLimbuCharacters) {
    assertEqual(
        isLimbuScript(char),
        false,
        `${char} (${codePoint(char)}) should NOT be detected as Limbu`
    );
}


// ============================================================================
// 12. WHITESPACE
// ============================================================================

section('12. WHITESPACE');

const whitespaceCharacters = [
    ' ',
    '\t',
    '\n',
    '\r',
];

for (const char of whitespaceCharacters) {
    assertEqual(
        isLimbuScript(char),
        false,
        `Whitespace ${JSON.stringify(char)} should NOT be detected as Limbu`
    );
}


// ============================================================================
// 13. EMPTY STRING
// ============================================================================

section('13. EMPTY STRING');

assertEqual(
    isLimbuScript(''),
    false,
    'Empty string should NOT be detected as Limbu'
);


// ============================================================================
// 14. INVALID INPUT TYPES
// ============================================================================

section('14. INVALID INPUT TYPES');

assertEqual(
    isLimbuScript(null),
    false,
    'null should return false'
);

assertEqual(
    isLimbuScript(undefined),
    false,
    'undefined should return false'
);

assertEqual(
    isLimbuScript(123),
    false,
    'number should return false'
);

assertEqual(
    isLimbuScript(true),
    false,
    'boolean should return false'
);

assertEqual(
    isLimbuScript(false),
    false,
    'boolean false should return false'
);

assertEqual(
    isLimbuScript({}),
    false,
    'object should return false'
);

assertEqual(
    isLimbuScript([]),
    false,
    'array should return false'
);


// ============================================================================
// 15. MIXED STRINGS
// ============================================================================

section('15. MIXED STRINGS');

const mixedTests = [
    {
        input: 'ᤁ',
        expected: true,
        description: 'Limbu only',
    },
    {
        input: 'क',
        expected: false,
        description: 'Devanagari only',
    },
    {
        input: 'a',
        expected: false,
        description: 'Latin only',
    },
    {
        input: 'ᤁक',
        expected: true,
        description: 'Limbu + Devanagari',
    },
    {
        input: 'कᤁ',
        expected: true,
        description: 'Devanagari + Limbu',
    },
    {
        input: 'abcᤁ',
        expected: true,
        description: 'Latin + Limbu',
    },
    {
        input: 'किरात ᤁᤡᤖᤠᤋ',
        expected: true,
        description: 'Devanagari + Limbu word',
    },
    {
        input: 'Hello ᤁᤡᤖᤠᤋ',
        expected: true,
        description: 'English + Limbu',
    },
    {
        input: 'Hello World',
        expected: false,
        description: 'English only',
    },
];

for (const test of mixedTests) {
    assertEqual(
        isLimbuScript(test.input),
        test.expected,
        `${test.description}: ${JSON.stringify(test.input)}`
    );
}


// ============================================================================
// 16. LIMBU CHARACTERS INSIDE LONG TEXT
// ============================================================================

section('16. LIMBU CHARACTERS INSIDE LONG TEXT');

const longTexts = [
    'ᤁᤡᤖᤠᤋ',
    'ᤏᤡᤅᤚᤠ᤺ᤅ ᤈᤘᤣ᤺ᤃᤢ',
    'Hello ᤁᤡᤖᤠᤋ',
    'किरात ᤁᤡᤖᤠᤋ',
    '123 ᤁ 456',
];

for (const text of longTexts) {
    assertEqual(
        isLimbuScript(text),
        true,
        `Long text containing Limbu should be detected: ${JSON.stringify(text)}`
    );
}


// ============================================================================
// 17. STRINGS JUST OUTSIDE THE LIMBU BLOCK
// ============================================================================

section('17. CODE POINTS JUST OUTSIDE LIMBU BLOCK');

/*
 * These are boundary tests.

 * U+18FF = immediately before U+1900
 * U+1950 = immediately after U+194F
 */

const beforeLimbu = String.fromCodePoint(0x18FF);
const afterLimbu = String.fromCodePoint(0x1950);

assertEqual(
    isLimbuScript(beforeLimbu),
    false,
    `${codePoint(beforeLimbu)} immediately before Limbu block should be false`
);

assertEqual(
    isLimbuScript(afterLimbu),
    false,
    `${codePoint(afterLimbu)} immediately after Limbu block should be false`
);


// ============================================================================
// FINAL RESULT
// ============================================================================

section('TEST SUMMARY');

console.log(`Total tests : ${passed + failed}`);
console.log(`Passed      : ${passed}`);
console.log(`Failed      : ${failed}`);

if (failed > 0) {
    console.error('\n❌ SCRIPT DETECTION TEST FAILED');
    process.exitCode = 1;
} else {
    console.log('\n✅ SCRIPT DETECTION TEST PASSED');
}