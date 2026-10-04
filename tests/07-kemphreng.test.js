import { devanagariToLimbu, limbuToDevanagari } from "../src/index.js";

let passed = 0;
let failed = 0;

function test(name, actual, expected) {
  if (actual === expected) {
    console.log(`✅ ${name}`);
    passed++;
  } else {
    console.log(`❌ ${name}`);
    console.log(`   Expected : ${expected}`);
    console.log(`   Actual   : ${actual}`);

    console.log(
      `   Expected Unicode: ${[...expected]
        .map(
          (c) =>
            `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`,
        )
        .join(" ")}`,
    );

    console.log(
      `   Actual Unicode  : ${[...actual]
        .map(
          (c) =>
            `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`,
        )
        .join(" ")}`,
    );

    failed++;
  }
}

function section(title) {
  console.log(`\n=== ${title} ===`);
}

/* =========================================================
   1. Kemphreng Unicode
   ========================================================= */

section("Kemphreng Unicode");

test("᤺ is U+193A", "᤺".codePointAt(0).toString(16).toUpperCase(), "193A");

/* =========================================================
   2. Reverse Kemphreng Conversion
   ========================================================= */

section("Reverse Kemphreng Conversion");

test("ᤁᤠ᤺ → का", limbuToDevanagari("ᤁᤠ᤺"), "का");

test("ᤁᤡ᤺ → की", limbuToDevanagari("ᤁᤡ᤺"), "की");

test("ᤁᤢ᤺ → कू", limbuToDevanagari("ᤁᤢ᤺"), "कू");

test("ᤁᤣ᤺ → के", limbuToDevanagari("ᤁᤣ᤺"), "के");

test("ᤁᤤ᤺ → कै", limbuToDevanagari("ᤁᤤ᤺"), "कै");

test("ᤁᤥ᤺ → को", limbuToDevanagari("ᤁᤥ᤺"), "को");

test("ᤁᤦ᤺ → कौ", limbuToDevanagari("ᤁᤦ᤺"), "कौ");

/* =========================================================
   3. Kemphreng with Different Consonants
   ========================================================= */

section("Kemphreng with Different Consonants");

test("ᤁᤠ᤺ → का", limbuToDevanagari("ᤁᤠ᤺"), "का");

test("ᤋᤠ᤺ → ता", limbuToDevanagari("ᤋᤠ᤺"), "ता");

test("ᤐᤠ᤺ → पा", limbuToDevanagari("ᤐᤠ᤺"), "पा");

test("ᤔᤠ᤺ → मा", limbuToDevanagari("ᤔᤠ᤺"), "मा");

test("ᤖᤠ᤺ → रा", limbuToDevanagari("ᤖᤠ᤺"), "रा");

test(
  "ᤜᤠ᤺ → हा",
  limbuToDevanagari("ᤜᤠ᤺"),
  "हा"
);

/* =========================================================
   4. Kemphreng + Vowels
   ========================================================= */

section("Kemphreng + Vowels");

test("ᤁᤠ᤺ → का", limbuToDevanagari("ᤁᤠ᤺"), "का");

test("ᤁᤡ᤺ → की", limbuToDevanagari("ᤁᤡ᤺"), "की");

test("ᤁᤢ᤺ → कू", limbuToDevanagari("ᤁᤢ᤺"), "कू");

test("ᤁᤣ᤺ → के", limbuToDevanagari("ᤁᤣ᤺"), "के");

test("ᤁᤤ᤺ → कै", limbuToDevanagari("ᤁᤤ᤺"), "कै");

test("ᤁᤥ᤺ → को", limbuToDevanagari("ᤁᤥ᤺"), "को");

test("ᤁᤦ᤺ → कौ", limbuToDevanagari("ᤁᤦ᤺"), "कौ");

/* =========================================================
   5. Ordinary Vowels Must NOT Get Kemphreng
   ========================================================= */

section("Ordinary Vowels Must NOT Get Kemphreng");

test(
  "का must not automatically contain Kemphreng",
  devanagariToLimbu("का"),
  "ᤁᤠ",
);

test(
  "की must automatically contain Kemphreng",
  devanagariToLimbu("की"),
  "ᤁᤡ᤺",
);

test(
  "कू must automatically contain Kemphreng",
  devanagariToLimbu("कू"),
  "ᤁᤢ᤺",
);

test(
  "के must not automatically contain Kemphreng",
  devanagariToLimbu("के"),
  "ᤁᤣ",
);

test(
  "कै must not automatically contain Kemphreng",
  devanagariToLimbu("कै"),
  "ᤁᤤ",
);

test(
  "को must not automatically contain Kemphreng",
  devanagariToLimbu("को"),
  "ᤁᤥ",
);

test(
  "कौ must not automatically contain Kemphreng",
  devanagariToLimbu("कौ"),
  "ᤁᤦ",
);

/* =========================================================
   6. Kemphreng Must Be Explicit
   ========================================================= */

section("Kemphreng Must Be Explicit");

test(
  "᤺ alone produces no output",
  limbuToDevanagari("᤺"),
  ""
);

test(
  "ᤠ᤺ without consonant carrier produces only vowel",
  limbuToDevanagari("ᤠ᤺"),
  "ा"
);

test(
  "ᤁᤠ᤺ with consonant carrier produces का",
  limbuToDevanagari("ᤁᤠ᤺"),
  "का"
);

test(
  "ᤁᤠ without Kemphreng produces का",
  limbuToDevanagari("ᤁᤠ"),
  "का"
);

/* =========================================================
   7. Kemphreng with Subjoint
   ========================================================= */

section("Kemphreng with Subjoint");

test("ᤁᤩᤠ᤺ → क्या", limbuToDevanagari("ᤁᤩᤠ᤺"), "क्या");

test("ᤁᤪᤠ᤺ → क्रा", limbuToDevanagari("ᤁᤪᤠ᤺"), "क्रा");

test("ᤁᤫᤠ᤺ → क्वा", limbuToDevanagari("ᤁᤫᤠ᤺"), "क्वा");

/* =========================================================
   8. Kemphreng with Small Letters
   ========================================================= */

section("Kemphreng with Small Letters");

test("ᤰᤠ᤺ → क्ा", limbuToDevanagari("ᤰᤠ᤺"), "क्ा");

test("ᤳᤠ᤺ → त्ा", limbuToDevanagari("ᤳᤠ᤺"), "त्ा");

test("ᤵᤠ᤺ → प्ा", limbuToDevanagari("ᤵᤠ᤺"), "प्ा");

test("ᤶᤠ᤺ → म्ा", limbuToDevanagari("ᤶᤠ᤺"), "म्ा");

test("ᤷᤠ᤺ → र्ा", limbuToDevanagari("ᤷᤠ᤺"), "र्ा");

test("ᤸᤠ᤺ → ल्ा", limbuToDevanagari("ᤸᤠ᤺"), "ल्ा");

/* =========================================================
   9. Kemphreng in Longer Text
   ========================================================= */

section("Kemphreng in Longer Text");

test("Multiple Kemphreng sequences", limbuToDevanagari("ᤁᤠ᤺ ᤐᤠ᤺"), "का पा");

test(
  "Kemphreng sequence inside text",
  limbuToDevanagari("ᤁᤠ᤺ᤔ"),
  "काम"
);

/* =========================================================
   10. No Accidental Kemphreng on Forward Conversion
   ========================================================= */

section("No Accidental Kemphreng on Forward Conversion");

const ordinaryVowels = [
  ["का", "ᤁᤠ"],
  ["कि", "ᤁᤡ"],
  ["की", "ᤁᤡ᤺"],
  ["कु", "ᤁᤢ"],
  ["कू", "ᤁᤢ᤺"],
  ["के", "ᤁᤣ"],
  ["कै", "ᤁᤤ"],
  ["को", "ᤁᤥ"],
  ["कौ", "ᤁᤦ"],
];

for (const [input, expected] of ordinaryVowels) {
  const actual = devanagariToLimbu(input);

  test(`${input} → ${expected} without ᤺`, actual, expected);
}

/* =========================================================
   11. Exact Kemphreng Character
   ========================================================= */

section("Exact Kemphreng Character");

test(
  "Kemphreng code point",
  [..."᤺"]
    .map(
      (c) =>
        `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`,
    )
    .join(" "),
  "U+193A",
);

/* =========================================================
   Summary
   ========================================================= */

console.log("\n========================================");
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total : ${passed + failed}`);
console.log("========================================");

if (failed > 0) {
  process.exit(1);
}
