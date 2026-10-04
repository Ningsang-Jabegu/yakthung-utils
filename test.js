/**
 * Local Test Script for yakthung-utils
 */
import { devanagariToLimbu, limbuToDevanagari, convertToLimbuDigits } from './src/index.js';

console.log("=== YAKTHUNG UTILS ENGINE TEST ===");

// १. टेस्ट: सामान्य र संयुक्त अक्षरहरू
const testText1 = "किरात याक्थुङ चुम्लुङ";
const limbuOutput1 = devanagariToLimbu(testText1);
console.log("\n[1] Devanagari -> Limbu:");
console.log("Input: ", testText1);
console.log("Output:", limbuOutput1);
console.log("Ningsang Jabegu:", devanagariToLimbu("निङ्साङ् जवेगु"))

// २. टेस्ट: चन्द्रबिन्दु (ँ) र अनुस्वार (ं) व्यवस्थापन
const testText2 = "यहाँ र त्यहाँ";
const limbuOutput2 = devanagariToLimbu(testText2);
console.log("\n[2] Nasalization Handling (ँ / ं):");
console.log("Input: ", testText2);
console.log("Output:", limbuOutput2);

// ३. टेस्ट: लिम्बु लिपिबाट देवनागरी रिभर्स
console.log("\n[3] Limbu -> Devanagari Reverse:");
console.log("Reversed:", limbuToDevanagari(limbuOutput1));

// ४. टेस्ट: अंक रूपान्तरण
console.log("\n[4] Numeric Conversion:");
console.log("2026 ->", convertToLimbuDigits(2026));
