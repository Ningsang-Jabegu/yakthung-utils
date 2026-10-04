# yakthung-utils (ᤕᤠᤰᤌᤱ-ᤕᤢᤋᤡ᤺ᤸᤛ)

A lightweight open-source utility suite for the **Yakthung (Limbu) language** and **Sirijunga script**. It provides controlled conversion between Devanagari and native Limbu Unicode characters, with explicit handling for vowels, final consonants, subjoints, nasalization, punctuation, numbers, and Unicode edge cases.

> **Development status:** The conversion engine has undergone extensive function-by-function testing. Before declaring a `1.0.0` production release, the mapping matrix should receive a final independent linguistic audit and the packed npm artifact should be tested in a clean installation.

## परिचय

यो देवनागरी र रैथाने सिरिजङ्गा (लिम्बु) लिपिबीच सुरक्षित रूपान्तरण गर्न तथा Yakthung भाषा–लिपि सम्बन्धी डिजिटल उपकरण विकास गर्न बनाइएको हलुका Utility Library हो।

---

## Features (विशेषताहरू)

* 🔀 **Bi-directional Transliteration:** Converts text between Devanagari ↔ Sirijunga/Limbu script.
* 🧩 **Context-aware parsing:** Handles consonants, dependent vowels, medial subjoints, final/small letters, and Sa-i according to the package's mapping rules.
* 🔤 **Vowel-length handling:** Distinguishes short and long `ि/ी` and `ु/ू` through Limbu vowel signs and **Kemphreng (`᤺`)** where required.
* 🔄 **Round-trip testing:** Tests Devanagari → Limbu → Devanagari and Limbu → Devanagari → Limbu separately.
* 🔢 **Numeral localization:** Supports Arabic and Devanagari digits and converts them to native Limbu digits.
* 🧠 **Fallback handling:** Provides controlled behavior for Devanagari characters that do not have a one-to-one Limbu representation.
* 📝 **Nasalization handling:** Maps Devanagari `ं` and `ँ` to Limbu nasalization and documents the resulting normalization.
* ❗ **Special punctuation handling:** Preserves Devanagari `।` and `॥` exactly and handles Limbu Sign Loo `᥀` separately from ordinary vowel/consonant conversion.
* 🧪 **Unicode integrity testing:** Checks exact Unicode code points, replacement characters, surrogate corruption, and normalization stability.
* 🗂️ **Golden test fixtures:** Maintains manually verified expected outputs independently from the conversion engine.

---

## Installation (स्थापना विधि)

Install the package via npm:

```bash
npm install yakthung-utils
```

For development/testing from the repository:

```bash
npm install
```

The package uses ES Modules. Ensure the project configuration is compatible with:

```json
{
  "type": "module"
}
```

---

## Usage Guide (प्रयोग गर्ने तरिका)

### 1. Basic Conversion

```javascript
import {
  devanagariToLimbu,
  limbuToDevanagari,
  convertToLimbuDigits,
} from "yakthung-utils";

// Devanagari → Limbu
const limbuText = devanagariToLimbu("खेमा");
console.log(limbuText);

// Limbu → Devanagari
const devaText = limbuToDevanagari("ᤁᤡᤖᤡᤋᤡ");
console.log(devaText);

// Numbers
console.log(convertToLimbuDigits(2026));
// ᥈᥆᥈᥌
```

---

# Technical Insights & Edge-Case Handling

## (प्राविधिक चुनौती र समाधान)

Building this package exposed several structural differences between Devanagari and Sirijunga. The following rules are now explicitly represented in the implementation and test suite.

### 1. Preventing Cross-Script Halanta Leakage

**The Challenge:**
Devanagari uses the halanta/virama `्` to suppress the inherent vowel of consonants. Sirijunga does not use that character directly as a general Devanagari-style virama. Allowing `्` to leak into generated Limbu text can create mixed-script output and rendering problems such as dotted-circle sequences.

**The Resolution:**
The parser handles a Devanagari consonant followed by `्` contextually:

1. Check whether the consonant has a native Limbu small/final-letter representation.
2. If it does, use that native final letter.
3. Otherwise, use the full Limbu consonant followed by **Sa-i (`᤻`, U+193B)**.
4. Subjoint combinations such as `्य`, `्र`, and `्व` are handled separately.
5. A standalone/unhandled halanta is prevented from leaking into normal Limbu output.

Examples:

```text
त् → ᤳ
प् → ᤵ
म् → ᤶ
र् → ᤷ
ल् → ᤸ

स् → ᤛ᤻
ष् → ᤚ᤻
श् → ᤙ᤻
ह् → ᤜ᤻
```

**Important:** `᤻` is treated as **Sa-i**, not as a universal replacement for the Devanagari virama.

---

### 2. Sa-i (`᤻`) Is Not a General Virama

**The Problem:**
During development, `᤻` and `᤹` were initially easy to confuse because both are combining marks in the Limbu Unicode block.

**The Resolution:**
The implementation now treats:

```text
᤹ = U+1939
᤺ = U+193A
᤻ = U+193B
```

as distinct characters with distinct roles.

The package's conversion rules must therefore not assume that every Devanagari `्` corresponds to the same Limbu character in every context.

This distinction is covered by the dedicated test suite and Unicode-integrity tests.

---

### 3. Multi-Script Vowel Asymmetry

**The Challenge:**
Devanagari distinguishes short and long vowel forms explicitly:

```text
ि / ी
ु / ू
```

while Limbu vowel representation uses its own vowel-sign system and can additionally use **Kemphreng (`᤺`, U+193A)** as a vowel-length marker.

**The Resolution:**
The conversion logic was changed from a blanket “long vowel = add Kemphreng” rule to a more specific rule.

Current verified behavior:

```text
कि → ᤁᤡ
की → ᤁᤡ᤺

कु → ᤁᤢ
कू → ᤁᤢ᤺
```

The other vowel signs have their own Limbu representations:

```text
का → ᤁᤠ
के → ᤁᤣ
कै → ᤁᤤ
को → ᤁᤥ
कौ → ᤁᤦ
```

Therefore **Kemphreng must not be blindly appended to every Devanagari long vowel**.

This was one of the major bugs discovered during round-trip testing.

---

### 4. Kemphreng Edge Cases

The package must distinguish:

```text
᤺ = U+193A Kemphreng
```

from:

```text
᤹ = U+1939 Mukphreng
᤻ = U+193B Sa-i
```

The test suite specifically checks cases involving:

```text
ᤁᤡ᤺
ᤁᤢ᤺
ᤁᤠ
᤺
ᤠ᤺
```

The important implementation principle is that Kemphreng is interpreted according to its position and surrounding vowel rather than being treated as an independent ordinary vowel sign.

---

### 5. Nasalization Normalization

**The Challenge:**
Devanagari distinguishes:

```text
ं  Anusvara
ँ  Chandrabindu
```

but the current Limbu conversion maps both to the same Limbu nasalization character:

```text
ं → ᤱ
ँ → ᤱ
```

Therefore the original distinction cannot always be recovered during reverse conversion.

For example:

```text
कं → ᤁᤱ → कं
कँ → ᤁᤱ → कं
```

This is an **intentional normalization**, not a failed round trip.

Consequently, round-trip tests classify these cases as normalized/lossy rather than pretending that the original Devanagari spelling can always be reconstructed.

---

### 6. Devanagari Danda Preservation

A serious punctuation collision was discovered during round-trip testing.

The required behavior is:

```text
।  → ।
॥ → ॥
```

Both characters must remain exactly themselves.

They must **not** be collapsed into one another through the generic sign mapping.

The implementation therefore handles:

```text
।  U+0964
॥ U+0965
```

as explicitly preserved Devanagari punctuation.

This prevents:

```text
॥ → । 
```

from occurring during reverse conversion.

---

### 7. Limbu Sign Loo (`᥀`)

`᥀` is handled as a special case rather than being forced through the ordinary one-character `SIGNS` lookup.

The package currently supports:

```text
लो → ᤗᤥ
लो! → ᥀
लो! (punctuation mark) → ᥀
```

and reverse conversion:

```text
᥀ → लो! (punctuation mark)
```

The explanatory text is therefore intentionally handled before ordinary character-by-character parsing.

---

### 8. Retroflex / Fallback Characters

Some Devanagari inputs may not have a direct one-to-one representation in the current Limbu mapping matrix.

The package therefore contains fallback mappings for selected non-native or alternate Devanagari forms.

These mappings should be understood as **conversion/fallback rules**, not as proof that the original Devanagari phoneme and the resulting Yakthung representation are linguistically identical.

This distinction is important because:

```text
source character
      ↓
fallback mapping
      ↓
native Limbu representation
      ↓
reverse conversion
```

may not be lossless.

Therefore fallback cases belong in their own tests and should not automatically be classified as lossless round trips.

---

# Testing Architecture (परीक्षण संरचना)

The package was developed with independent tests for different classes of behavior.

```text
tests/
├── 01-script-detection.test.js
├── 02-numbers.test.js
├── 03-consonants.test.js
├── 04-vowels.test.js
├── 05-subjoints.test.js
├── 06-small-letters.test.js
├── 07-kemphreng.test.js
├── 08-mukphreng.test.js
├── 09-nasalization.test.js
├── 10-punctuation.test.js
├── 11-fallbacks.test.js
├── 12-roundtrip.test.js
├── 13-unicode-integrity.test.js
└── fixtures/
    └── golden-cases.js
```

Each test isolates a particular part of the conversion engine instead of relying only on a large end-to-end test.

---

## What We Discovered During Testing

### Problem 1 — Long `ी` and `ू` were initially indistinguishable from short vowels

Initially:

```text
कि → ᤁᤡ
की → ᤁᤡ
```

This made the reverse conversion unable to distinguish:

```text
कि
की
```

The fix was to attach Kemphreng to long I and long U:

```text
की → ᤁᤡ᤺
कू → ᤁᤢ᤺
```

---

### Problem 2 — Kemphreng was incorrectly added to `ा`

An overly broad long-vowel rule caused:

```text
का → ᤁᤠ᤺
```

instead of:

```text
का → ᤁᤠ
```

The rule was narrowed so that Kemphreng is not automatically appended to every long Devanagari vowel.

---

### Problem 3 — Chandrabindu could not remain distinguishable

Both:

```text
ं
ँ
```

map to:

```text
ᤱ
```

Therefore:

```text
काँ → ᤁᤠᤱ → कां
```

is treated as normalization rather than an exact lossless round trip.

---

### Problem 4 — `᥀` initially leaked explanatory text

A conversion involving:

```text
लो! (punctuation mark)
```

could leave part of the description behind because the parser originally processed only the visible `लो!`.

The solution was to detect the complete explanatory phrase before normal character processing.

---

### Problem 5 — `।` and `॥` collided

Both Devanagari punctuation characters were being treated through a conflicting sign mapping.

The required behavior was clarified and implemented as exact preservation:

```text
। → ।
॥ → ॥
```

This is now explicitly tested.

---

### Problem 6 — Mukphreng, Kemphreng and Sa-i were confused

The Unicode characters:

```text
᤹ U+1939
᤺ U+193A
᤻ U+193B
```

must not be treated as interchangeable.

The Unicode-integrity tests now verify their exact code points independently of transliteration behavior.

---

### Problem 7 — Expected values must not be generated by the converter itself

A major testing principle established during development is:

> **Never generate the expected test result using the same function being tested.**

Otherwise, a wrong implementation can generate a wrong answer and then pass its own test.

This led to the creation of:

```text
tests/fixtures/golden-cases.js
```

The golden fixtures contain manually established expected values and act as an independent regression reference.

---

# Round-Trip Testing Philosophy

Not every conversion can be expected to be perfectly reversible.

The tests therefore distinguish three categories.

### 1. Lossless

The original text can be reconstructed exactly:

```text
A → Limbu → A
```

### 2. Normalized

Different source representations intentionally collapse into one representation:

```text
कँ → ᤁᤱ → कं
```

### 3. Lossy

The source contains information that the target representation cannot independently preserve.

This distinction prevents the test suite from incorrectly treating an intentional linguistic/script normalization as a software bug.

---

# Golden Cases

`tests/fixtures/golden-cases.js` is the package's manually maintained **golden reference data**.

It contains examples such as:

```text
क   → ᤁ
की  → ᤁᤡ᤺
कू  → ᤁᤢ᤺
।   → ।
॥  → ॥
```

The golden cases are intentionally independent from the implementation.

Their purpose is to detect regressions when:

* mappings are changed;
* parser logic is refactored;
* new fallback rules are added;
* Unicode handling changes;
* vowel logic changes;
* punctuation handling changes.

The golden fixture should therefore be updated **only after manually verifying that the new behavior is actually intended**.

---

# Unicode Integrity

The package uses the Limbu Unicode block:

```text
U+1900–U+194F
```

Unicode-integrity testing verifies:

* exact code points;
* absence of accidental `U+FFFD` replacement characters;
* absence of invalid/unpaired UTF-16 surrogates;
* stability of important Limbu sequences under NFC;
* exact preservation of Devanagari danda characters;
* integrity of mixed-script input.

Examples:

```text
᤹ → U+1939
᤺ → U+193A
᤻ → U+193B
᥀ → U+1940

। → U+0964
॥ → U+0965
```

---

# Known Limitations

This package should not claim that every possible Devanagari spelling has a perfect one-to-one Yakthung equivalent.

Potential limitations include:

* dialectal differences;
* multiple possible Devanagari spellings for the same Yakthung pronunciation;
* information loss during fallback normalization;
* differences between orthographic and phonetic representation;
* ambiguous vowel-length representation;
* nasalization normalization;
* words containing unsupported or newly encountered Unicode sequences;
* compound/conjunct forms not yet represented in the mapping matrix.

The converter is therefore a **deterministic script utility**, not a complete natural-language transliteration engine.

---

# Upcoming / Potential Future Errors

As the package is expanded, the following classes of bugs are likely to require additional attention.

## 1. New consonant collisions

Adding new fallback forms may accidentally create duplicate Devanagari lookup keys.

**Solution:**
Add mapping-integrity tests that detect duplicate primary keys and unreachable mappings before release.

---

## 2. New vowel combinations

Additional combinations involving Kemphreng, Mukphreng, nasalization, or unusual vowel ordering may expose parser-order bugs.

**Solution:**
Add combination fixtures rather than testing only isolated vowels.

---

## 3. Halanta + vowel sequences

Inputs such as unusual sequences containing:

```text
consonant + ् + vowel
```

can produce unexpected output if parser precedence changes.

**Solution:**
Keep dedicated tests for:

```text
small/final letters
subjoints
Sa-i
vowels
```

and test their combinations separately.

---

## 4. Unicode normalization changes

Future refactoring may accidentally alter combining-mark order.

**Solution:**
Keep Unicode-integrity tests and compare exact code-point sequences, not only visually rendered text.

---

## 5. Unknown Unicode characters

Users may provide characters outside the supported mappings.

**Solution:**
Define and test a clear policy for unsupported characters—preserve, normalize, or reject—and do not silently invent a transliteration.

---

## 6. Round-trip false positives

A conversion can technically round-trip while still being linguistically incorrect.

**Solution:**
Keep two separate concepts:

```text
Software correctness
        +
Linguistic correctness
```

Passing automated tests proves that the implementation follows the expected fixture rules; it does not by itself prove that every fixture represents correct Yakthung orthography.

---

## 7. Golden fixture drift

If developers change the converter and simply regenerate expected values, the golden tests lose their purpose.

**Solution:**

> Never regenerate golden expectations automatically from the implementation under test.

Every changed golden value should be manually reviewed and justified.

---

## 8. Version-to-version mapping changes

Changing an existing mapping can alter users' output without changing the API.

**Solution:**
Treat mapping changes as potentially breaking changes and document them in the changelog. Use semantic versioning appropriately.

---

# Development Verification Checklist

Before declaring a release ready:

```text
[ ] 01 Script detection passes
[ ] 02 Numbers pass
[ ] 03 Consonants pass
[ ] 04 Vowels pass
[ ] 05 Subjoints pass
[ ] 06 Small letters pass
[ ] 07 Kemphreng passes
[ ] 08 Mukphreng passes
[ ] 09 Nasalization passes
[ ] 10 Punctuation passes
[ ] 11 Fallbacks pass
[ ] 12 Round-trip passes
[ ] 13 Unicode integrity passes

[ ] Golden cases independently verified
[ ] Mapping collisions checked
[ ] Unsupported-character behavior documented
[ ] README matches actual implementation
[ ] npm package contents inspected
[ ] npm pack --dry-run checked
[ ] Packed package tested in a clean project
[ ] Final linguistic audit completed
```

---

# Architecture of the Mapping Matrix

The conversion engine separates processing into several logical layers:

1. **Core Consonants** — primary Limbu consonant mappings.
2. **Dependent Vowels** — Limbu vowel signs and length handling.
3. **Subjoints** — medial combinations such as `ᤩ`, `ᤪ`, and `ᤫ`.
4. **Small/Final Letters** — native terminal consonant representations.
5. **Sa-i** — final-consonant vowel suppression.
6. **Nasalization** — Limbu nasalization handling.
7. **Signs and Punctuation** — special symbols such as `᥀` and preserved Devanagari punctuation.
8. **Numbers** — native Limbu numerals.
9. **Fallbacks** — controlled handling of unsupported/non-native Devanagari forms.

This layered design is important because a single generic character lookup cannot correctly resolve all of these contexts.

---

# Project Philosophy

`yakthung-utils` is being developed with two principles:

### 1. Never silently invent linguistic rules

When a mapping is uncertain, it should be explicitly marked for verification rather than presented as established linguistic fact.

### 2. Never let the implementation define its own truth

The converter generates results.

The **tests and independently verified golden fixtures define what those results are expected to be**.

---

# License (लाइसेन्स)

This project is open-source software licensed under the **MIT License**.

Feel free to use, improve, and distribute it for the benefit of Yakthung language and Indigenous language technology ecosystems.

## About the Project & Developer (परियोजना र विकासकर्ताको बारेमा)

This package was envisioned and developed by a dedicated engineer from the Yakthung community to address the absolute lack of programmatic tools for the Sirijunga script in the modern npm ecosystem. While mainstream international organizations focused primarily on digital font rendering, this package introduces the first logic-heavy, context-aware transliteration parsing engine for developers. It serves as a digital bridge to protect, preserve, and scale the structural purity of the Limbu language across modern web apps, CLI diagnostics, and localization nodes.
