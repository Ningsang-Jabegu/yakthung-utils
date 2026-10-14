/**
 * @file index.js
 * @description Core Transliteration Engine for Devanagari ↔ Sirijunga (Limbu) conversions.
 * Implements context-aware syllable parsing, subjoint attachment, and small letter processing.
 * Includes explicit support for Nasalization (Anusvara and Chandrabindu).
 * Prevents Devanagari halanta leakage and correctly maps mid-word syllable finals.
 *
 * @description देवनागरी ↔ सिरिजङ्गा (लिम्बु) लिपि रूपान्तरणका लागि मुख्य पार्सिङ इन्जिन।
 * यसमा चन्द्रबिन्दु र अनुस्वारको नासिक्य ध्वनिलाई पूर्ण व्यवस्थापन गरिएको छ।
 * यसले देवनागरी 'हलन्त' (virama) को अनावश्यक प्रसारलाई रोक्छ र शब्दको बीचमा आउने अक्षरका अन्तिम भागहरूलाई सही रूपमा मिलाउँछ।
 */

import {
  CONSONANTS,
  VOWELS,
  INDEPENDENT_VOWELS,
  NUMBER_MAP,
  SMALL_LETTERS,
  SUBJOINTS,
  SIGNS,
  DEVANAGARI_NUMBER_MAP,
  LIMBU_TO_DEVANAGARI_NUMBER_MAP,
} from "./mappings.js";

/**
 * Helper to check if a character belongs to the Limbu Unicode Block (U+1900 - U+194F)
 * @param {string} text
 * @returns {boolean}
 */
export function isLimbuScript(text) {
  if (typeof text !== "string") return false;
  const limbuRegex = /[\u1900-\u194F]/;
  return limbuRegex.test(text);
}

/**
 * Transforms standard digits (0-9) into native Limbu digits.
 * @param {string|number} input
 * @returns {string}
 */
export function convertToLimbuDigits(input) {
  // Support both ASCII digits (0-9) and Devanagari digits (०-९).
  // Both forms are normalized to native Limbu digits.
  const DEVANAGARI_DIGITS = {
    "०": "0",
    "१": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9",
  };

  return String(input)
    .split("")
    .map((char) => {
      const normalizedDigit = DEVANAGARI_DIGITS[char] || char;
      return NUMBER_MAP[normalizedDigit] || char;
    })
    .join("");
}

/**
 * Converts Devanagari text to native Sirijunga (Limbu) script.
 * @param {string} text
 * @returns {string}
 */

export function devanagariToLimbu(text) {
  if (!text) return "";

  let result = "";
  let i = 0;

  while (i < text.length) {
    let char = text[i];
    let nextChar = text[i + 1];
    let nextNextChar = text[i + 2];

    // Special conjuncts: match before generic consonant + halant handling.
    // Each visible conjunct consists of three Devanagari code points.

    if (text.slice(i, i + 3) === "ज्ञ") {
      result += "ᤝ";
      i += 3;
      continue;
    }

    if (text.slice(i, i + 3) === "त्र") {
      result += "ᤞ";
      i += 3;
      continue;
    }

    // ============================================================================
    // INDEPENDENT DEVANAGARI VOWELS
    // ============================================================================

    const independentVowelMatch = INDEPENDENT_VOWELS.find(
      (vowel) => vowel.devanagari === char,
    );

    if (independentVowelMatch) {
      result += independentVowelMatch.limbu;
      i++;
      continue;
    }

    // ============================================================================
    // NASALIZATION
    // ============================================================================

    if (char === "ं" || char === "ँ") {
      result += "ᤱ";
      i++;
      continue;
    }

    // ============================================================================
    // SPECIAL SIGN LOO
    // ============================================================================

    const looWithDescription = "लो! (punctuation mark)";

    if (text.slice(i, i + looWithDescription.length) === looWithDescription) {
      result += "᥀";
      i += looWithDescription.length;
      continue;
    }

    if (text.slice(i, i + 3) === "लो!") {
      result += "᥀";
      i += 3;
      continue;
    }

    // ============================================================================
    // PUNCTUATION AND NUMBERS
    // ============================================================================

    if (char === "।" || char === "॥") {
      result += char;
      i++;
      continue;
    }

    if (Object.prototype.hasOwnProperty.call(DEVANAGARI_NUMBER_MAP, char)) {
      result += DEVANAGARI_NUMBER_MAP[char];
      i++;
      continue;
    }

    const signMatch = SIGNS.find((s) => s.devanagari === char);

    if (signMatch) {
      result += signMatch.limbu;
      i++;
      continue;
    }

    // ============================================================================
    // CONSONANT LOOKUP
    // ============================================================================

    const currentConsonant = CONSONANTS.find(
      (c) => c.devanagari === char || c.fallbackDeva.includes(char),
    );

    // ============================================================================
    // CONTEXTUAL REPH: र् BEFORE A CONSONANT
    // ============================================================================
    //
    // In this implementation, the reph in ऊर्जा is represented by
    // the full Limbu Ra (ᤖ), not the small/final Ra (ᤷ).
    //
    // This rule must run before generic SMALL_LETTERS handling.

    if (
      char === "र" &&
      nextChar === "्" &&
      nextNextChar &&
      CONSONANTS.some(
        (c) =>
          c.devanagari === nextNextChar ||
          c.fallbackDeva.includes(nextNextChar),
      )
    ) {
      result += "ᤖ";
      i += 2;
      continue;
    }

    // ============================================================================
    // CONSONANT + HALANT SEQUENCES
    // ============================================================================

    if (currentConsonant && nextChar === "्") {
      // Handle subjoined y, r, and w.
      if (["य", "र", "व"].includes(nextNextChar)) {
        const subjointMatch = SUBJOINTS.find(
          (s) => s.devanagari === "्" + nextNextChar,
        );

        if (subjointMatch) {
          result += currentConsonant.limbu + subjointMatch.limbu;
          i += 3;
          continue;
        }
      }

      let smallLetterMatch = SMALL_LETTERS.find(
        (s) => s.devanagari === char + nextChar,
      );

      // Normalize fallback consonants before looking up small letters.
      if (!smallLetterMatch && currentConsonant.fallbackDeva?.includes(char)) {
        const fallbackSmallDevanagari = currentConsonant.devanagari + nextChar;

        smallLetterMatch = SMALL_LETTERS.find(
          (s) => s.devanagari === fallbackSmallDevanagari,
        );
      }

      if (smallLetterMatch) {
        result += smallLetterMatch.limbu;
        i += 2;
        continue;
      }

      // No dedicated small/final letter exists.
      result += currentConsonant.limbu + "᤻";
      i += 2;
      continue;
    }

    // ============================================================================
    // SINGLE CONSONANTS
    // ============================================================================

    if (currentConsonant) {
      result += currentConsonant.limbu;
      i++;
      continue;
    }

    const consonantMatch = CONSONANTS.find(
      (c) => c.devanagari === char || c.fallbackDeva.includes(char),
    );

    if (consonantMatch) {
      result += consonantMatch.limbu;
      i++;
      continue;
    }

    // ============================================================================
    // DEPENDENT VOWEL SIGNS
    // ============================================================================

    const vowelMatch = VOWELS.find(
      (v) => v.devanagari.default === char || v.devanagari.long === char,
    );

    if (vowelMatch) {
      result += vowelMatch.limbu;

      if (char === "ी" || char === "ू") {
        result += "᤺";
      }

      i++;
      continue;
    }

    // ============================================================================
    // HALANT FALLBACK AND UNKNOWN CHARACTERS
    // ============================================================================

    if (char === "्") {
      i++;
      continue;
    }

    result += char;
    i++;
  }

  return result;
}

/**
 * Converts Sirijunga (Limbu) script back to Devanagari.
 * Maps back to native dental sounds according to Option 1 (Linguistic Native Fallback).
 * @param {string} limbuText
 * @returns {string}
 */

export function limbuToDevanagari(limbuText) {
  if (!limbuText) return "";

  let result = "";
  let i = 0;

  while (i < limbuText.length) {
    let char = limbuText[i];
    let nextChar = limbuText[i + 1];

    // ============================================================================
    // INDEPENDENT VOWEL SEQUENCES
    // ============================================================================

    // Historical/alternate O representation.
    if (char === "ᤀ" && nextChar === "ᤨ") {
      result += "ओ";
      i += 2;
      continue;
    }

    // Primary O representation.
    if (char === "ᤀ" && nextChar === "ᤥ") {
      result += "ओ";
      i += 2;
      continue;
    }

    // Match the longest configured independent-vowel sequence first.
    const independentVowelMatch = INDEPENDENT_VOWELS.slice()
      .sort((a, b) => b.limbu.length - a.limbu.length)
      .find((vowel) => limbuText.startsWith(vowel.limbu, i));

    if (independentVowelMatch) {
      result += independentVowelMatch.devanagari;
      i += independentVowelMatch.limbu.length;
      continue;
    }

    // ============================================================================
    // NASALIZATION
    // ============================================================================

    if (char === "ᤱ" || char === "ᤲ") {
      result += "ं";
      i++;
      continue;
    }

    // ============================================================================
    // REVERSE DIGIT MAPPING
    // ============================================================================
    //
    // Example:
    // ᥈᥆᥈᥌ → २०२६

    if (
      Object.prototype.hasOwnProperty.call(LIMBU_TO_DEVANAGARI_NUMBER_MAP, char)
    ) {
      result += LIMBU_TO_DEVANAGARI_NUMBER_MAP[char];
      i++;
      continue;
    }

    // ============================================================================
    // CONSONANTS
    // ============================================================================

    const consonantMatch = CONSONANTS.find((c) => c.limbu === char);

    if (consonantMatch) {
      result += consonantMatch.devanagari;
      i++;
      continue;
    }

    // ============================================================================
    // DEPENDENT VOWEL SIGNS AND LENGTH
    // ============================================================================

    const vowelMatch = VOWELS.find((v) => v.limbu === char);

    if (vowelMatch) {
      if (nextChar === "᤺") {
        result += vowelMatch.devanagari.long;
        i += 2;
      } else {
        result += vowelMatch.devanagari.default;
        i++;
      }

      continue;
    }

    // ============================================================================
    // SUBJOINTS / MEDIALS
    // ============================================================================

    const subjointMatch = SUBJOINTS.find((s) => s.limbu === char);

    if (subjointMatch) {
      result += subjointMatch.devanagari;
      i++;
      continue;
    }

    // ============================================================================
    // SMALL LETTERS / FINAL CONSONANTS
    // ============================================================================

    const smallLetterMatch = SMALL_LETTERS.find((s) => s.limbu === char);

    if (smallLetterMatch) {
      result += smallLetterMatch.devanagari;
      i++;
      continue;
    }

    // ============================================================================
    // PUNCTUATION AND SPECIAL SIGNS
    // ============================================================================

    if (limbuText === "᥀") {
      result += "लो! (punctuation mark)";
      i++;
      continue;
    }

    if (char === "।" || char === "॥") {
      result += char;
      i++;
      continue;
    }

    const signMatch = SIGNS.find((s) => s.limbu === char);

    if (signMatch) {
      // Kemphreng is consumed with the preceding vowel when possible.
      if (char === "᤺") {
        i++;
        continue;
      }

      // Preserve the existing Sa-i behavior.
      if (char === "᤻") {
        result += "्";
        i++;
        continue;
      }

      result += signMatch.devanagari;
      i++;
      continue;
    }

    // Preserve unrecognized characters.
    result += char;
    i++;
  }

  return result;
}
