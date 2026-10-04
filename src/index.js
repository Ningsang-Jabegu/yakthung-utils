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
  NUMBER_MAP,
  SMALL_LETTERS,
  SUBJOINTS,
  SIGNS,
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

    // १. नासिक्य ध्वनि व्यवस्थापन: देवनागरीको 'ं' (अनुस्वार) वा 'ँ' (चन्द्रबिन्दु) आएमा लिम्बुको 'ᤱ' (Small Nga) दिने
    // 1. Nasikya Sound Management: If Devanagari's 'ं' (Anuswar) or 'ँ' (Chandrabindu) occurs, Limbu's 'ᤱ' (Small Nga) is given.
    if (char === "ं" || char === "ँ") {
      result += "ᤱ";
      i++;
      continue;
    }

    // २. विराम चिन्हहरू र विशेष संकेतहरू
    // 2. Punctuation and Special Signs

    // Special Limbu Sign Loo.
    //
    // Limbu → Devanagari:
    //   ᥀ → लो! (punctuation mark)
    //
    // Devanagari → Limbu:
    //   लो! → ᥀
    //   लो! (punctuation mark) → ᥀
    //
    // The parenthetical text is explanatory metadata only
    // and must not become part of the Limbu output.
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

    // Preserve Devanagari danda punctuation exactly.
    if (char === "।" || char === "॥") {
      result += char;
      i++;
      continue;
    }

    const signMatch = SIGNS.find((s) => s.devanagari === char);
    if (signMatch) {
      result += signMatch.limbu;
      i++;
      continue;
    }

    // Explicit Devanagari compounds:
    // ज्ञ = ज् + ञ → LIMBU LETTER GYAN (U+191D)
    // त्र = त् + र → LIMBU LETTER TRA (U+191E)

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

    // ३. संयुक्त व्यञ्जन (ज्ञ, त्र जस्ता बहु-अक्षरी संयोजनहरू)
    // 3. Compound consonants (multi-syllable combinations like ज्ञ, त्र)
    const jointMatch = CONSONANTS.find((c) => c.devanagari === char + nextChar);
    if (jointMatch) {
      result += jointMatch.limbu;
      i += 2;
      continue;
    }

    // ४. सब-जोइन्ट अक्षरहरू (उप-जोर्नीहरू / मध्य भागहरू: ्स्त, ्य, ्र, ्व)
    // 4. Sub-joint characters (Subjoints / Medials: ्स्त, ्य, ्र, ्व)
    const currentConsonant = CONSONANTS.find(
      (c) => c.devanagari === char || c.fallbackDeva.includes(char),
    );
    if (currentConsonant && nextChar === "्") {
      // क) यदि आधा अक्षर पछि य, र, व आएमा (Subjoints: ्य, ्र, ्व)
      // a) If य, र, व follows a half-letter (Sub-joined forms: ्य, ्र, ्व)
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

      // ख) यदि जुनसुकै ठाउँमा (बिचमा वा अन्त्यमा) आधा अक्षर आएमा
      //    -> Small Letters मा बदल्ने
      // b) If a half-letter appears anywhere,
      //    normalize fallback consonants to their native Devanagari equivalent
      //    before checking SMALL_LETTERS.

      let smallLetterMatch = SMALL_LETTERS.find(
        (s) => s.devanagari === char + nextChar,
      );

      // If the input consonant is a fallback form such as:
      // ट् → त्
      // ण् → न्
      // first normalize it to the primary Devanagari consonant.
      if (!smallLetterMatch && currentConsonant?.fallbackDeva?.includes(char)) {
        const fallbackSmallDevanagari = currentConsonant.devanagari + nextChar;

        smallLetterMatch = SMALL_LETTERS.find(
          (s) => s.devanagari === fallbackSmallDevanagari,
        );
      }

      if (smallLetterMatch) {
        // A native Limbu small/final letter exists.
        result += smallLetterMatch.limbu;
        i += 2;
        continue;
      }

      // No native Limbu small/final letter exists.
      //
      // Use the full Limbu consonant + Sa-i (᤻).
      //
      // Examples:
      // स् → ᤛ᤻
      // ष् → ᤚ᤻
      // श् → ᤙ᤻
      // ह् → ᤜ᤻
      //
      // Sa-i is therefore used as the final-consonant marker
      // when a dedicated Limbu small letter is unavailable.
      result += currentConsonant.limbu + "᤻";
      i += 2;
      continue;
    }

    // ५. एकल व्यञ्जन वर्ण
    // 5. Single Consonant Characters
    if (currentConsonant) {
      result += currentConsonant.limbu;
      i++;
      continue;
    }

    // ६. सामान्य एकल व्यञ्जन वर्ण (Core Consonants & Fallbacks: ट->त)
    const consonantMatch = CONSONANTS.find(
      (c) => c.devanagari === char || c.fallbackDeva.includes(char),
    );
    if (consonantMatch) {
      result += consonantMatch.limbu;
      i++;
      continue;
    }

    // ७. स्वर वर्ण र मात्रा
    // 7. Dependent Vowels
    const vowelMatch = VOWELS.find(
      (v) => v.devanagari.default === char || v.devanagari.long === char,
    );

    if (vowelMatch) {
      result += vowelMatch.limbu;

      // Long I requires Kemphreng.
      // Other vowels with their own unique Limbu
      // vowel signs do not automatically receive it.
      if (char === "ी" || char === "ू") {
        result += "᤺";
      }

      i++;
      continue;
    }

    // सुरक्षा कवच: यदि कुनै हलन्त यहाँ सम्म आइपुगेमा त्यसलाई सिधै हटाउने
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

    // 1. नासिक्य फलब्याक व्यवस्थापन: लिम्बुको 'ᤱ' (Small Nga) वा 'ᤲ' (Small Anusvara) आएमा देवनागरीको 'ं' (अनुस्वार) फर्काउने
    if (char === "ᤱ" || char === "ᤲ") {
      result += "ं";
      i++;
      continue;
    }

    // 2. व्यञ्जन वर्ण पहिचान र दन्त्य वर्ण फलब्याक (Consonants Lookup)
    const consonantMatch = CONSONANTS.find((c) => c.limbu === char);
    if (consonantMatch) {
      result += consonantMatch.devanagari;
      i++;
      continue;
    }

    // 3. स्वर मात्रा व्यवस्थापन (ह्रस्व र दीर्घको केम्फ्रेङ आधारित लजिक)
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

    // 4. सब-जोइन्ट (Medial / Half letters) पहिचान
    const subjointMatch = SUBJOINTS.find((s) => s.limbu === char);
    if (subjointMatch) {
      result += subjointMatch.devanagari;
      i++;
      continue;
    }

    // 5. साना आधा अक्षरहरू (Small Letters / Final Consonants)
    const smallLetterMatch = SMALL_LETTERS.find((s) => s.limbu === char);
    if (smallLetterMatch) {
      result += smallLetterMatch.devanagari;
      i++;
      continue;
    }

    // 6. विराम चिन्हहरू र विशेष संकेतहरू
    if (limbuText === "᥀") {
      result += "लो! (punctuation mark)";
      i++;
      continue;
    }

    // Preserve Devanagari danda punctuation exactly.
    if (char === "।" || char === "॥") {
      result += char;
      i++;
      continue;
    }

    const signMatch = SIGNS.find((s) => s.limbu === char);

    if (signMatch) {
      // Kemphreng is a length modifier and is consumed
      // together with the preceding vowel.
      if (char === "᤺") {
        i++;
        continue;
      }

      // Sa-i is the Limbu final-consonant / vowel-killer marker.
      // It corresponds to the Devanagari halanta.
      if (char === "᤻") {
        result += "्";
        i++;
        continue;
      }

      result += signMatch.devanagari;
      i++;
      continue;
    }

    result += char;
    i++;
  }

  return result;
}
