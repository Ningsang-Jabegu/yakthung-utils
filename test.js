/**
 * ============================================================================
 * YAKTHUNG UTILS - AUTOMATED TEST RUNNER
 * ============================================================================
 *
 * Automatically discovers and executes every *.test.js file inside /tests
 * and all of its subdirectories.
 *
 * Adding a new test file does NOT require modifying this runner.
 *
 * Example:
 *
 * tests/
 * ├── 01-script-detection.test.js
 * ├── 02-numbers.test.js
 * ├── ...
 * ├── 14-independent-vowels.test.js
 * └── 15-real-world-devanagari-cases.test.js
 *
 * Running:
 *
 *     npm test
 *
 * will automatically execute all of them.
 * ============================================================================
 */

import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_ROOT = path.join(__dirname, "tests");

/**
 * Recursively find every *.test.js file.
 */
function findTestFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...findTestFiles(fullPath));
      continue;
    }

    if (
      entry.isFile() &&
      entry.name.endsWith(".test.js")
    ) {
      files.push(fullPath);
    }
  }

  return files.sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );
}

/**
 * ============================================================================
 * MAIN TEST RUNNER
 * ============================================================================
 */

console.log("=".repeat(78));
console.log("YAKTHUNG UTILS - AUTOMATED TEST RUNNER");
console.log("=".repeat(78));

if (!fs.existsSync(TEST_ROOT)) {
  console.error(`\n❌ TEST DIRECTORY NOT FOUND: ${TEST_ROOT}`);
  process.exit(1);
}

const testFiles = findTestFiles(TEST_ROOT);

if (testFiles.length === 0) {
  console.error("\n❌ NO TEST FILES FOUND.");
  console.error("Expected files matching: tests/**/*.test.js");
  process.exit(1);
}

console.log(`\nTest directory : ${TEST_ROOT}`);
console.log(`Test suites    : ${testFiles.length}`);

console.log("\nDiscovered test suites:");

for (const file of testFiles) {
  console.log(`  • ${path.relative(__dirname, file)}`);
}

console.log("\n" + "=".repeat(78));

let passedSuites = 0;
let failedSuites = 0;

const failures = [];

for (let index = 0; index < testFiles.length; index++) {
  const file = testFiles[index];
  const relativePath = path.relative(__dirname, file);

  console.log(`\n[${index + 1}/${testFiles.length}] ${relativePath}`);
  console.log("-".repeat(78));

  const result = spawnSync(
    process.execPath,
    [file],
    {
      cwd: __dirname,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }
  );

  const stdout = result.stdout || "";
  const stderr = result.stderr || "";

  const passed =
    result.status === 0 &&
    !result.error;

  if (passed) {
    passedSuites++;

    console.log(`✅ PASSED: ${relativePath}`);

    // Show the suite's final summary if available.
    const lines = stdout.trim().split("\n");

    const summaryLines = lines.filter((line) =>
      /Total tests|Passed|Failed|TEST SUMMARY|TEST PASSED|TEST FAILED/i.test(
        line
      )
    );

    if (summaryLines.length > 0) {
      console.log("\n" + summaryLines.slice(-8).join("\n"));
    }
  } else {
    failedSuites++;

    console.log(`❌ FAILED: ${relativePath}`);

    failures.push({
      file: relativePath,
      status: result.status,
      signal: result.signal,
      error: result.error,
    });

    if (stdout.trim()) {
      console.log("\n--- Test Output ---");
      console.log(stdout.trim());
    }

    if (stderr.trim()) {
      console.log("\n--- Error Output ---");
      console.log(stderr.trim());
    }

    if (result.error) {
      console.log("\n--- Runner Error ---");
      console.log(result.error);
    }
  }
}

/**
 * ============================================================================
 * FINAL SUMMARY
 * ============================================================================
 */

console.log("\n" + "=".repeat(78));
console.log("FINAL TEST SUMMARY");
console.log("=".repeat(78));

console.log(`Total suites : ${testFiles.length}`);
console.log(`Passed       : ${passedSuites}`);
console.log(`Failed       : ${failedSuites}`);

if (failedSuites > 0) {
  console.log("\n❌ TEST RUN FAILED");

  console.log("\nFailed suites:");

  for (const failure of failures) {
    console.log(`  • ${failure.file}`);

    if (failure.status !== null) {
      console.log(`    Exit code: ${failure.status}`);
    }

    if (failure.signal) {
      console.log(`    Signal: ${failure.signal}`);
    }
  }

  console.log(
    "\nFix the failed test suite(s), then run `npm test` again."
  );

  process.exitCode = 1;
} else {
  console.log("\n✅ ALL TEST SUITES PASSED");
  console.log("No test suite reported an error.");
}