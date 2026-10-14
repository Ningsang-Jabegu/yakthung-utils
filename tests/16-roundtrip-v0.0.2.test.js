import {
  devanagariToLimbu,
  limbuToDevanagari,
} from "../src/index.js";

let passed = 0;
let failed = 0;

function codePoints(text) {
  return [...text]
    .map(
      (char) =>
        `U+${char
          .codePointAt(0)
          .toString(16)
          .toUpperCase()
          .padStart(4, "0")}`
    )
    .join(" ");
}

function test(name, actual, expected) {
  if (actual === expected) {
    console.log(`✅ ${name}`);
    passed++;
  } else {
    console.log(`❌ ${name}`);
    console.log(`   Expected : ${expected}`);
    console.log(`   Actual   : ${actual}`);
    console.log(`   Expected Unicode: ${codePoints(expected)}`);
    console.log(`   Actual Unicode  : ${codePoints(actual)}`);
    failed++;
  }
}

function section(title) {
  console.log(`\n=== ${title} ===`);
}

/*
 * ============================================================================
 * YAKTHUNG UTILS - v0.0.2 ROUND-TRIP TEST
 * ============================================================================
 *
 * This suite is intentionally separate from the frozen v0.0.1 round-trip
 * baseline.
 *
 * Round-trip direction:
 *
 * Devanagari
 *     ↓
 * Sirijanga
 *     ↓
 * Devanagari
 *
 * The tests distinguish:
 *
 * 1. Lossless round-trip
 * 2. Expected normalization
 * 3. Alternate/historical Sirijanga representation
 *
 * Passing this test does NOT establish linguistic or orthographic correctness.
 * It verifies consistency with the defined computational mapping.
 * ============================================================================
 */


// ============================================================================
// 1. LOSSLESS DEVANAGARI → SIRIJANGA → DEVANAGARI
// ============================================================================

section("Lossless Devanagari Round-Trip");

const losslessDevanagariCases = [
  "अ",
  "आ",
  "इ",
  "ई",
  "उ",
  "ऊ",
  "ए",
  "ऐ",
  "ओ",
  "औ",

  "आमा",
  "उखु",
  "एक",
  "ऐना",
  "ओखर",
  "औषधि",

  "२०२६",
  "ज़िल्ला",
  "ख़ुशी!",
];

for (const input of losslessDevanagariCases) {
  const sirijanga = devanagariToLimbu(input);
  const roundTrip = limbuToDevanagari(sirijanga);

  test(
    `${input} → Sirijanga → ${input}`,
    roundTrip,
    input
  );
}


// ============================================================================
// 2. LOSSLESS SIRIJANGA → DEVANAGARI → SIRIJANGA
// ============================================================================

section("Lossless Sirijanga Round-Trip");

const losslessSirijangaCases = [
  "ᤀ",
  "ᤀᤠ",
  "ᤀᤡ",
  "ᤀᤡ᤺",
  "ᤀᤢ",
  "ᤀᤢ᤺",
  "ᤀᤣ",
  "ᤀᤤ",
  "ᤀᤥ",
  "ᤀᤦ",

  "ᤀᤠᤔᤠ",
  "ᤀᤡᤋᤠ",
  "ᤀᤢᤂᤢ",
  "ᤀᤣᤁ",
  "ᤀᤤᤏᤠ",
  "ᤀᤥᤂᤖ",
  "ᤀᤦᤚᤎᤡ",

  "᥈᥆᥈᥌",
  "ᤀᤡᤸᤗᤠ",
];

for (const input of losslessSirijangaCases) {
  const devanagari = limbuToDevanagari(input);
  const roundTrip = devanagariToLimbu(devanagari);

  test(
    `${input} → Devanagari → ${input}`,
    roundTrip,
    input
  );
}


// ============================================================================
// 3. HISTORICAL / ALTERNATE O REPRESENTATION
// ============================================================================

section("Historical / Alternate O Representation");

/*
 * ᤀᤨ is treated as an alternate/historical representation in the research
 * inventory.
 *
 * It is NOT required to round-trip byte-for-byte through the primary
 * Devanagari mapping because the primary computational representation
 * currently uses ᤀᤥ for ओ.
 */

const historicalO = "ᤀᤨ";

const historicalOToDevanagari = limbuToDevanagari(historicalO);

test(
  "Historical/alternate ᤀᤨ → Devanagari ओ",
  historicalOToDevanagari,
  "ओ"
);

const historicalORoundTrip = devanagariToLimbu(
  historicalOToDevanagari
);

test(
  "Primary round-trip normalization: ᤀᤨ → ओ → ᤀᤥ",
  historicalORoundTrip,
  "ᤀᤥ"
);

section("Known Many-to-One Mapping");

const normalizedCases = [
  ["इटा", "इता"],
];

for (const [input, expectedRoundTrip] of normalizedCases) {
  const sirijanga = devanagariToLimbu(input);
  const roundTrip = limbuToDevanagari(sirijanga);

  test(
    `${input} → Sirijanga → documented fallback ${expectedRoundTrip}`,
    roundTrip,
    expectedRoundTrip
  );
}


// ============================================================================
// 5. TEST SUMMARY
// ============================================================================

console.log("\n=== TEST SUMMARY ===");
console.log(`Total tests : ${passed + failed}`);
console.log(`Passed      : ${passed}`);
console.log(`Failed      : ${failed}`);

if (failed > 0) {
  console.error("\n❌ v0.0.2 ROUND-TRIP TEST FAILED");
  process.exitCode = 1;
} else {
  console.log("\n✅ v0.0.2 ROUND-TRIP TEST PASSED");
}