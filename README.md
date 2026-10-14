# yakthung-utils (ᤕᤠᤰᤌᤱ-ᤕᤢᤋᤡ᤺ᤸᤛ)

_First updated: October 12, 2026_

`yakthung-utils` is a JavaScript utility package for converting text between Devanagari and the Sirijanga script used for Yakthung (Limbu). It uses explicit mapping and context-sensitive parsing rules for consonants, vowels, conjuncts, final letters, nasalization, punctuation, and numerals.

The package is a script-conversion utility. Passing its tests means that the code matches the expected test cases; it does not, by itself, establish that every mapping is linguistically correct for every Yakthung dialect or orthographic practice.

## परिचय

यो देवनागरी र सिरिजङ्गा लिपिबीच पाठ रूपान्तरण गर्न बनाइएको JavaScript utility package हो। यसको mapping र conversion नियमहरू परीक्षणमार्फत जाँचिन्छन्। सबै शब्द, बोली वा हिज्जेका लागि रूपान्तरण पूर्ण रूपमा मिल्छ भन्ने यसको दाबी होइन।

## Features

- Convert text from Devanagari to Sirijanga and from Sirijanga to Devanagari.
- Handle consonants, dependent vowel signs, subjoints, and small/final letters.
- Apply Kemphreng (`᤺`) for the vowel combinations covered by the mapping rules.
- Convert Arabic and Devanagari digits to Limbu digits.
- Handle nasalization, selected punctuation, and Limbu Sign Loo (`᥀`).
- Define fallback behavior for selected Devanagari characters that do not have a direct one-to-one mapping.
- Test expected output and Unicode code points with dedicated test files and manually maintained fixtures.

## Version history

### `0.0.1` — initial tested baseline

The `0.0.1` baseline had 13 test suites and 913 passing tests. Those tests provided a starting point, but further testing exposed cases that needed more precise handling. The version number describes the package baseline, not a claim that all linguistic and round-trip edge cases had been solved.

Issues identified during follow-up validation included:

- **Incomplete independent-vowel coverage:** Testing identified missing or incomplete mappings for Devanagari independent vowels from आ through अः, which prompted further mapping work in 0.0.2.

- **Long and short vowels:** `कि` and `की`, and `कु` and `कू`, could collapse to the same output, making the original distinction impossible to recover.
- **Over-applying Kemphreng:** a broad vowel-length rule could append `᤺` to forms such as `का`, where the expected output was `ᤁᤠ`.
- **Conjunct parsing:** `ज्ञ` and `त्र` needed explicit matching before the general consonant/halanta logic. They consist of three Devanagari code points each, not two.
- **Digit conversion in reverse:** reverse conversion needed explicit mappings from Limbu digits to Devanagari digits.
- **Round-trip interpretation:** some mappings are intentionally normalized or lossy, so an output that differs from the original input is not always an implementation failure.

These were validation findings, not a reason to describe every conversion in `0.0.1` as broken. See the examples below for the behavior and limitations.

### `0.0.2` — targeted fixes and expanded tests

Version `0.0.2` addresses the specific conversion cases above and adds further test coverage. The changes include:

- Expanded the conversion mappings and tests for Devanagari independent vowels from आ through अः, addressing gaps identified in 0.0.1.
- More selective handling of Kemphreng so it is not added indiscriminately to every long Devanagari vowel.
- Explicit handling for `ज्ञ` and `त्र` before generic consonant and halanta processing.
- Reverse mapping for Limbu numerals `᥆`–`᥏` to Devanagari digits `०`–`९`.
- Additional real-word, regression, and numeral-related tests.
- Continued checks for punctuation, combining marks, fallback behavior, and Unicode integrity.

The current local test suite has passed after these changes. The total number of tests in `0.0.2` is not stated here because it should be taken from the actual final test run immediately before publishing.

## Installation

```bash
npm install yakthung-utils
```

For development from the repository:

```bash
npm install
npm test
```

The package uses ES modules. If you are using it in a project that does not already support ES modules, check your project's Node.js and `package.json` configuration.

## Usage

```javascript
import {
  devanagariToLimbu,
  limbuToDevanagari,
  convertToLimbuDigits,
} from "yakthung-utils";

const sirijanga = devanagariToLimbu("खेमा");
console.log(sirijanga);

const devanagari = limbuToDevanagari("ᤁᤡᤖᤡᤋᤡ");
console.log(devanagari);

console.log(convertToLimbuDigits(2026));
// ᥈᥆᥈᥌
```

Use the exact exported function names and package version available in the release you install.

## Examples and version-specific behavior

### Vowel length

The intended behavior covered by the current tests is:

```text
Input     Sirijanga
कि        ᤁᤡ
की        ᤁᤡ᤺
कु        ᤁᤢ
कू        ᤁᤢ᤺
का        ᤁᤠ
के        ᤁᤣ
कै        ᤁᤤ
को        ᤁᤥ
कौ        ᤁᤦ
```

In the `0.0.1` baseline, testing exposed two relevant issues: short and long `ि/ी` or `ु/ू` could become indistinguishable, and a broad rule could incorrectly produce `का → ᤁᤠ᤺`. In `0.0.2`, the rules are more selective: the expected `की` and `कू` outputs include Kemphreng, while `का` does not.

### Special conjuncts

```text
Input     Sirijanga
ज्ञ        ᤝ
त्र        ᤞ
```

In `0.0.2`, these conjuncts are checked before the generic consonant-plus-halanta logic. Each visible conjunct contains three Devanagari code points, so the parser must consume all three. This targeted rule should not change unrelated combinations such as `क्र`, whose expected output remains `ᤁᤪ`.

### Numerals

```text
Arabic digits       Limbu digits
2026                ᥈᥆᥈᥌

Devanagari digits    Limbu digits
२०२६                ᥈᥆᥈᥌
```

The `0.0.2` test coverage includes conversion of Arabic and Devanagari digits to Limbu digits, and reverse conversion of Limbu digits `᥆`–`᥏` to Devanagari digits `०`–`९`.

### Fallbacks are not always reversible

Some Devanagari characters do not have a distinct one-to-one mapping in the current table. For example:

```text
इटा → ᤀᤡᤋᤠ → इता
```

In this case, `ट` uses a fallback that converts back as `त`. The output is therefore lossy: the original spelling `इटा` cannot be reconstructed from the Sirijanga output alone. This is a known mapping limitation, not a lossless round trip.

### Nasalization normalization

The current mapping converts both Devanagari anusvara (`ं`) and chandrabindu (`ँ`) to the same Limbu nasalization character:

```text
कं → ᤁᤱ → कं
कँ → ᤁᤱ → कं
```

The original distinction between `ं` and `ँ` is therefore not preserved in the second example. Tests should classify this as normalization rather than exact round-trip preservation.

### Punctuation

The Devanagari danda and double danda should be preserved as separate characters:

```text
।  → ।
॥ → ॥
```

Their code points are U+0964 and U+0965 respectively. They must not be collapsed into one another by a generic sign mapping.

### Limbu Sign Loo

The Limbu Sign Loo is `᥀` (U+1940). The package has special handling for this sign; do not assume that it behaves like an ordinary consonant or vowel mapping. Check the current implementation and tests for the exact accepted input forms and reverse-conversion behavior.

## How conversion works

The conversion code applies mapping rules in a specific order. This matters because some sequences need to be recognized before their individual characters:

1. Special conjuncts such as `ज्ञ` and `त्र`.
2. Independent vowels and consonant mappings.
3. Dependent vowel signs and vowel-length handling.
4. Halanta, subjoints, and small/final-letter cases.
5. Nasalization, punctuation, numerals, and selected special signs.
6. Fallback handling for supported characters without a direct mapping.

This is a high-level description. The exact processing order is defined by the source code and may change as the implementation develops.

## Unicode details

The Sirijanga/Limbu characters used by the package are in the Unicode Limbu block, U+1900–U+194F. The code and tests distinguish these combining characters:

```text
᤹  U+1939  Mukphreng
᤺  U+193A  Kemphreng
᤻  U+193B  Sa-i
᥀  U+1940  Limbu Sign Loo
```

Unicode tests are useful for catching replacement characters, invalid UTF-16 sequences, unexpected combining-mark changes, and punctuation collisions. They do not replace linguistic review.

## Testing

Run the repository's test suite with:

```bash
npm test
```

Individual test files can also be run directly with Node.js, for example:

```bash
node tests/03-consonants.test.js
node tests/05-subjoints.test.js
node tests/15-real-world-nepali-words.test.js
```

Test names and suite numbers may change as coverage grows. Expected values should be independently reviewed rather than generated automatically by the conversion function being tested. Otherwise, the same bug can appear in both the implementation and its expected output.

A passing test suite shows that the current code matches its defined expectations. It does not prove that every mapping is correct for all Yakthung words, dialects, or orthographic conventions. Community and linguistic review remains important.

## Known limitations

- Some mappings are fallbacks rather than one-to-one equivalents.
- Nasalization can be normalized, so the source distinction may be lost.
- A successful round trip does not necessarily establish linguistic correctness.
- Dialect, spelling, and orthographic conventions may differ.
- Unsupported or newly encountered Unicode sequences may not convert as expected.
- Not every possible conjunct or word form is necessarily represented.

Please report reproducible examples with the input, actual output, expected output, and the relevant script or spelling convention. That makes it possible to distinguish a code defect from a mapping decision that needs linguistic review.

## Project structure

The repository separates mapping data, conversion logic, and tests. The mapping table defines supported character relationships; the conversion functions apply those mappings with contextual rules; tests check expected results and regressions.

The test fixtures are intended to remain independent of the converter. Change an expected value only after confirming that the new output is intended.

## License

This project is licensed under the MIT License. See `LICENSE` for the complete license text.

Use, adaptation, and distribution of this software are welcome. If `yakthung-utils` helps your project, we kindly encourage you to acknowledge the package and link to its repository. Although attribution beyond the MIT License requirements is voluntary, every acknowledgment helps more people discover this work and creates opportunities for the Yakthung community to connect, collaborate, and contribute.

## About

`yakthung-utils` is a community-oriented open-source project designed to make Devanagari–Sirijanga conversion easier to use in JavaScript applications.

Its broader purpose is to support the digital preservation, documentation, and continued development of Yakthung language and cultural knowledge. By making useful tools accessible to developers, researchers, educators, and community members, we hope to help preserve language, traditions, rituals, and knowledge for future generations.

We welcome contributions from everyone, especially those that improve the code, verify language mappings, document spelling and transliteration decisions, provide carefully reviewed examples, and share knowledge responsibly. Language and cultural knowledge are best supported when community members can participate, review, correct, and build upon one another's work.

**If you use this package, please consider giving it credit.** A link in your README, documentation, acknowledgments, or project credits can help others find and contribute to this work.

Project repository: https://github.com/Ningsang-Jabegu/yakthung-utils

### A shared vision for cultural technology

We hope this project can inspire people from Yakthung and other cultural communities to develop and share open-source tools for their own languages, scripts, histories, traditions, and cultural practices. By working together, documenting knowledge carefully, and making tools accessible, communities can strengthen their digital presence and help future generations learn from the knowledge entrusted to them.

Technology alone cannot preserve a culture. It can, however, help communities document, teach, research, and pass on their knowledge—when that work is guided by the people whose language and culture it represents.
