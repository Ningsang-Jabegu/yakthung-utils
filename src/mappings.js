/**
 * @file mappings.js
 * @description Multi-dimensional relational mapping matrix for Roman, Devanagari, and Sirijunga (Limbu) script systems.
 * Designed with strict production-grade fallback workflows and context metadata for developers.
 *
 * @description रोमन, देवनागरी र सिरिजङ्गा (लिम्बु) लिपि बीचको बहु-आयामिक सम्बन्ध तालिका।
 * यसलाई उत्पादन-स्तरको सुरक्षित वैकल्पिक कार्यप्रवाह (Fallback Workflow) र विकासकर्ताहरूको जानकारीका लागि विस्तृत विवरण सहित डिजाइन गरिएको छ।
 */

/**
 * ============================================================================
 * 1. DEVELOPER LINGUISTIC INFORMATION & DOCUMENTATION MATRIX
 * ============================================================================
 * This object acts as a dictionary for developers to query grammar rules,
 * character hints, and script anomalies directly via CLI or UI components.
 *
 * यो अब्जेक्ट विकासकर्ताहरूका लागि व्याकरणका नियमहरू, अक्षरका विशेषताहरू र लिपिका
 * भिन्नताहरू CLI वा वेब UI मा सिधै प्रदर्शन गर्नका लागि एउटा ज्ञानकोषको रूपमा काम गर्दछ।
 */
export const HINTS_AND_DOCS = {
  general: {
    en: "Limbu (Yakthung) script belongs to the Unicode range U+1900 to U+194F. It relies on a distinct phonetic system compared to Devanagari.",
    ne: "लिम्बु (याक्थुङ) लिपि यूनिकोडको U+1900 देखि U+194F दायरा भित्र पर्दछ। यो देवनागरीको तुलनामा भिन्न ध्वन्यात्मक प्रणालीमा आधारित छ।",
  },
  linguisticFallback: {
    en: "CRITICAL: Limbu language natively lacks retroflex sounds (ट, ठ, ड, ढ, ण) and sibilants (ष). Users typing in Devanagari will routinely use these characters. The matrix maps them to their nearest native dental equivalents (त, थ, द, ध, न, स). When reversing from Limbu to Devanagari, it strictly resolves back to the native dental variants as per standard Yakthung dictionary conventions.",
    ne: "महत्त्वपूर्ण: लिम्बु भाषामा रैथाने रूपमा मूर्धन्य ध्वनिहरू (ट, ठ, ड, ढ, ण) र पेटकाटिएको (ष) हुँदैनन्। प्रयोगकर्ताहरूले देवनागरीमा टाइप गर्दा यी अक्षरहरू प्रयोग गर्न सक्छन्। यस म्याट्रिक्सले तिनीहरूलाई सबैभन्दा नजिकको रैथाने दन्त्य वर्णहरू (त, थ, द, ध, न, स) मा सुरक्षित रूपान्तरण गर्दछ। लिम्बु लिपिबाट देवनागरीमा फिर्ता लैजाँदा, याक्थुङ शब्दकोशको नियम अनुसार सधैं दन्त्य वर्णमै रूपान्तरण हुन्छ।",
  },
  manyToOneVowels: {
    en: "Limbu font rendering does not differentiate between short and long forms of 'I' (ि/ी) and 'U' (ु/ू). Both short and long versions are mapped to single character representations. During reverse conversion, short vowel variant is chosen as default unless explicit vowel lengtheners are present.",
    ne: "लिम्बु लिपिमा ह्रस्व र दीर्घ 'इ' (ि/ी) र 'उ' (ु/ू) बीच चिन्हमा कुनै भिन्नता हुँदैन। दुवैलाई एउटै चिन्हमा म्याप गरिन्छ। लिम्बुबाट देवनागरीमा उल्टाउँदा, कतै विशेष दीर्घ संकेत नभएमा डिफल्ट रूपमा ह्रस्व मात्रा नै चयन गरिन्छ।",
  },
  smallLetters: {
    en: "Unlike Devanagari which uses Halanta (्) to denote any syllable block end, Limbu uses explicitly encoded 'Small Letters' (U+1930 to U+1938) exclusively as final consonants at the very end of a syllable string. No vowel signs can be attached after a Small Letter.",
    ne: "कुनै पनि अक्षरको खुट्टा काट्न देवनागरीले हलन्त (्) प्रयोग गरे जस्तो नभई, लिम्बु लिपिमा शब्द वा ध्वनिको अन्त्यमा आउने आधा अक्षरका लागि छुट्टै 'साना अक्षरहरू' (Small Letters: U+1930 देखि U+1938) कोडित छन्। साना अक्षरहरूको पछाडि कुनै पनि स्वर मात्रा थप्न मिल्दैन।",
  },
  subjoints: {
    en: "Medial consonants or subjoints (ᤩ, ᤪ, ᤫ) represent consonant clusters combined within the middle of a word (e.g., k+y, k+r, k+w). They append below/beside the main consonant carrier before the application of dependent vowel signs.",
    ne: "संयुक्त व्यञ्जन वा सब-जोइन्टहरू (ᤩ, ᤪ, ᤫ) शब्दको बीचमा जोडिएर आउने आधा अक्षर बुझाउन प्रयोग हुन्छन् (जस्तै: क+य, क+र, क+व)। यिनीहरू मुख्य व्यञ्जन वर्णको मुनि वा पछाडि जोडिन्छन् र यसको पछाडि स्वर मात्रा पनि आउन सक्छ।",
  },
  mukphreng: {
    en: "Limbu Sign Mukphreng (᤹) marks glottalization or a sudden glottal stop. Programmatically, it behaves like a special terminal modifier.",
    ne: "लिम्बु चिन्ह मुक्फ्रेङ (᤹) ले ग्लाट्टल स्टप वा स्वरलाई झट्का दिएर उच्चारण गर्ने शैली बुझाउँछ। प्राविधिक रूपमा यो एउटा विशेष परिमार्जक संकेत हो।",
  },
  kemphreng: {
    en: "Limbu Sign Kemphreng (᤺) denotes vowel lengthening. It is used to systematically map short vowels into long vowel equivalents during round-trip script conversions.",
    ne: "लिम्बु चिन्ह केम्फ्रेङ (᤺) ले स्वरलाई लामो (दीर्घ) बनाउने काम गर्दछ। यसको उपस्थितिले पार्सरलाई ह्रस्व स्वर चिन्हलाई देवनागरीको दीर्घ मात्रामा बदल्न मद्दत गर्छ।",
  },
};

/**
 * ============================================================================
 * 2. DIGITAL NUMBER MAPPING (NUMBERS)
 * ============================================================================
 * Standard Arabic numerals mapped to native Limbu numeric block characters.
 *
 * मानक अरबी अंकहरू र रैथाने लिम्बु अंकहरू बीचको सम्बन्ध।
 */
export const NUMBER_MAP = {
  0: "᥆",
  1: "᥇",
  2: "᥈",
  3: "᥉",
  4: "᥊",
  5: "᥋",
  6: "᥌",
  7: "᥍",
  8: "᥎",
  9: "᥏",
};

export const LIMBU_TO_DEVANAGARI_NUMBER_MAP = {
  "᥆": "०",
  "᥇": "१",
  "᥈": "२",
  "᥉": "३",
  "᥊": "४",
  "᥋": "५",
  "᥌": "६",
  "᥍": "७",
  "᥎": "८",
  "᥏": "९",
};

export const DEVANAGARI_NUMBER_MAP = {
  "०": "᥆",
  "१": "᥇",
  "२": "᥈",
  "३": "᥉",
  "४": "᥊",
  "५": "᥋",
  "६": "᥌",
  "७": "᥍",
  "८": "᥎",
  "९": "᥏",
};

/**
 * ============================================================================
 * 3. CORE CONSONANTS MATRIX
 * ============================================================================
 * Key features:
 * - Includes 'fallbackDeva' array for worst-case non-native inputs (Retroflex).
 * - Target native 'devanagari' string serves as the exact destination for Limbu reverse parsing.
 *
 * मुख्य विशेषताहरू:
 * - गैर-रैथाने इनपुट (ट, ठ, ड आदि) व्यवस्थापनका लागि 'fallbackDeva' एरे समावेश छ।
 * - 'devanagari' मा राखिएको मुख्य अक्षर नै लिम्बुबाट देवनागरी उल्टाउँदा निस्कने अन्तिम अक्षर हो।
 */
export const CONSONANTS = [
  {
    roman: "a",
    devanagari: "अ",
    fallbackDeva: [],
    limbu: "ᤀ",
    code: "U+1900",
    hint: "Vowel Carrier",
  },
  {
    roman: "k",
    devanagari: "क",
    fallbackDeva: [],
    limbu: "ᤁ",
    code: "U+1901",
    hint: "Ka",
  },
  {
    roman: "kh",
    devanagari: "ख",
    fallbackDeva: [],
    limbu: "ᤂ",
    code: "U+1902",
    hint: "Kha",
  },
  {
    roman: "g",
    devanagari: "ग",
    fallbackDeva: [],
    limbu: "ᤃ",
    code: "U+1903",
    hint: "Ga",
  },
  {
    roman: "gh",
    devanagari: "घ",
    fallbackDeva: [],
    limbu: "ᤄ",
    code: "U+1904",
    hint: "Gha",
  },
  {
    roman: "ng",
    devanagari: "ङ",
    fallbackDeva: [],
    limbu: "ᤅ",
    code: "U+1905",
    hint: "Nga",
  },
  {
    roman: "c",
    devanagari: "च",
    fallbackDeva: [],
    limbu: "ᤆ",
    code: "U+1906",
    hint: "Ca",
  },
  {
    roman: "ch",
    devanagari: "छ",
    fallbackDeva: [],
    limbu: "ᤇ",
    code: "U+1907",
    hint: "Cha",
  },
  {
    roman: "j",
    devanagari: "ज",
    fallbackDeva: [],
    limbu: "ᤈ",
    code: "U+1908",
    hint: "Ja",
  },
  {
    roman: "jh",
    devanagari: "झ",
    fallbackDeva: [],
    limbu: "ᤉ",
    code: "U+1909",
    hint: "Jha",
  },
  {
    roman: "ny",
    devanagari: "ञ",
    fallbackDeva: [],
    limbu: "ᤊ",
    code: "U+190A",
    hint: "Nya",
  },

  // Strict Fallback Configuration: Retroflex mapping to corresponding Dental counterparts
  // वैकल्पिक व्यवस्थापन: प्रयोगकर्ताले 'ट' वा 'त' जे थिचे पनि लिम्बुको 'ᤋ' बन्छ, तर फर्किँदा सधैं 'त' बन्छ।
  {
    roman: "t",
    devanagari: "त",
    fallbackDeva: ["ट"],
    limbu: "ᤋ",
    code: "U+190B",
    hint: "Ta / Fallback for Retroflex",
  },
  {
    roman: "th",
    devanagari: "थ",
    fallbackDeva: ["ठ"],
    limbu: "ᤌ",
    code: "U+190C",
    hint: "Tha / Fallback for Retroflex",
  },
  {
    roman: "d",
    devanagari: "द",
    fallbackDeva: ["ड"],
    limbu: "ᤍ",
    code: "U+190D",
    hint: "Da / Fallback for Retroflex",
  },
  {
    roman: "dh",
    devanagari: "ध",
    fallbackDeva: ["ढ"],
    limbu: "ᤎ",
    code: "U+190E",
    hint: "Dha / Fallback for Retroflex",
  },
  {
    roman: "n",
    devanagari: "न",
    fallbackDeva: ["ण"],
    limbu: "ᤏ",
    code: "U+190F",
    hint: "Na / Fallback for Retroflex",
  },

  {
    roman: "p",
    devanagari: "प",
    fallbackDeva: [],
    limbu: "ᤐ",
    code: "U+1910",
    hint: "Pa",
  },
  {
    roman: "ph",
    devanagari: "फ",
    fallbackDeva: [],
    limbu: "ᤑ",
    code: "U+1911",
    hint: "Pha",
  },
  {
    roman: "b",
    devanagari: "ब",
    fallbackDeva: [],
    limbu: "ᤒ",
    code: "U+1912",
    hint: "Ba",
  },
  {
    roman: "bh",
    devanagari: "भ",
    fallbackDeva: [],
    limbu: "ᤓ",
    code: "U+1913",
    hint: "Bha",
  },
  {
    roman: "m",
    devanagari: "म",
    fallbackDeva: [],
    limbu: "ᤔ",
    code: "U+1914",
    hint: "Ma",
  },
  {
    roman: "y",
    devanagari: "य",
    fallbackDeva: [],
    limbu: "ᤕ",
    code: "U+1915",
    hint: "Ya",
  },
  {
    roman: "r",
    devanagari: "र",
    fallbackDeva: [],
    limbu: "ᤖ",
    code: "U+1916",
    hint: "Ra",
  },
  {
    roman: "l",
    devanagari: "ल",
    fallbackDeva: [],
    limbu: "ᤗ",
    code: "U+1917",
    hint: "La",
  },
  {
    roman: "w",
    devanagari: "व",
    fallbackDeva: [],
    limbu: "ᤘ",
    code: "U+1918",
    hint: "Wa",
  },
  {
    roman: "sh",
    devanagari: "श",
    fallbackDeva: [],
    limbu: "ᤙ",
    code: "U+1919",
    hint: "Sha",
  },
  {
    roman: "s",
    devanagari: "ष",
    fallbackDeva: [],
    limbu: "ᤚ",
    code: "U+191A",
    hint: "Ssa",
  },
  {
    roman: "s",
    devanagari: "स",
    fallbackDeva: [],
    limbu: "ᤛ",
    code: "U+191B",
    hint: "Sa",
  },
  {
    roman: "h",
    devanagari: "ह",
    fallbackDeva: [],
    limbu: "ᤜ",
    code: "U+191C",
    hint: "Ha",
  },
  {
    roman: "gya",
    devanagari: "ज्ञ",
    fallbackDeva: [],
    limbu: "ᤝ",
    code: "U+191D",
    hint: "Gyan",
  },
  {
    roman: "tra",
    devanagari: "त्र",
    fallbackDeva: [],
    limbu: "ᤞ",
    code: "U+191E",
    hint: "Tra",
  },
];

/**
 * ============================================================================
 * 4A. DEPENDENT VOWEL SIGNS MATRIX (VOWELS)
 * ============================================================================
 * Addresses Many-to-One structural rules. Maps structural fields for default
 * (short/inherent) and long configurations.
 * Includes short/open vowel modifiers U+1927 and U+1928 based on Unicode standards.
 * यसले ह्रस्व र दीर्घ मात्राको Many-to-One समस्या व्यवस्थापन गर्दछ।
 * यूनिकोड मापदण्ड अनुसार खुल्ला/छोटा स्वर परिमार्जकहरू U+1927 र U+1928 पनि समावेश छन्।
 */

export const VOWELS = [
  {
    roman: "a",
    devanagari: { default: "", long: "" },
    limbu: "",
    code: "Inherent",
    hint: "Inherent",
  },
  {
    roman: "aa",
    devanagari: { default: "ा", long: "ा" },
    limbu: "ᤠ",
    code: "U+1920",
    hint: "Aamba Aa",
  },
  {
    roman: "i",
    devanagari: { default: "ि", long: "ी" },
    limbu: "ᤡ",
    code: "U+1921",
    hint: "I / Ee Many-to-One",
  },
  {
    roman: "u",
    devanagari: { default: "ु", long: "ू" },
    limbu: "ᤢ",
    code: "U+1922",
    hint: "U / Oo Many-to-One",
  },
  {
    roman: "ee",
    devanagari: { default: "े", long: "े" },
    limbu: "ᤣ",
    code: "U+1923",
    hint: "Ee",
  },
  {
    roman: "ai",
    devanagari: { default: "ै", long: "ै" },
    limbu: "ᤤ",
    code: "U+1924",
    hint: "Ai",
  },
  {
    roman: "o",
    devanagari: { default: "ो", long: "ो" },
    limbu: "ᤥ",
    code: "U+1925",
    hint: "O",
  },
  {
    roman: "au",
    devanagari: { default: "ौ", long: "ौ" },
    limbu: "ᤦ",
    code: "U+1926",
    hint: "Au",
  },

  // Specific Open/Short Vowel realizations in standard Limbu linguistics
  // लिम्बु भाषाका विशेष छोटा/खुल्ला स्वर चिन्हहरू
  {
    roman: "e",
    devanagari: { default: "े", long: "े" },
    limbu: "ᤧ",
    code: "U+1927",
    hint: "Short/Open E",
  },
  {
    roman: "o_s",
    devanagari: { default: "ो", long: "ो" },
    limbu: "ᤨ",
    code: "U+1928",
    hint: "Short/Open O",
  },
];

/**
 * ============================================================================
 * 4B. INDEPENDENT DEVANAGARI VOWELS
 * ============================================================================
 *
 * Devanagari has independent vowel letters.
 * Modern Limbu/Sirijanga does not have equivalent independent vowel letters;
 * syllable-initial vowels are represented using the U+1900 vowel carrier plus
 * an appropriate vowel sign.
 *
 * These mappings are transliteration mappings and should not automatically be
 * interpreted as proof of modern Yakthung orthographic usage.
 */

export const INDEPENDENT_VOWELS = [
  {
    devanagari: "अ",
    limbu: "ᤀ",
    code: "U+1900",
    relation: "vowel-carrier",
    hint: "Independent A / vowel carrier",
  },
  {
    devanagari: "आ",
    limbu: "ᤀᤠ",
    code: "U+1900 U+1920",
    relation: "carrier + vowel sign",
    hint: "Independent AA",
  },
  {
    devanagari: "इ",
    limbu: "ᤀᤡ",
    code: "U+1900 U+1921",
    relation: "carrier + vowel sign",
    hint: "Independent I",
  },
  {
    devanagari: "ई",
    limbu: "ᤀᤡ᤺",
    code: "U+1900 U+1921 U+193A",
    relation: "carrier + vowel sign + length",
    hint: "Independent long I",
  },
  {
    devanagari: "उ",
    limbu: "ᤀᤢ",
    code: "U+1900 U+1922",
    relation: "carrier + vowel sign",
    hint: "Independent U",
  },
  {
    devanagari: "ऊ",
    limbu: "ᤀᤢ᤺",
    code: "U+1900 U+1922 U+193A",
    relation: "carrier + vowel sign + length",
    hint: "Independent long U",
  },
  {
    devanagari: "ए",
    limbu: "ᤀᤣ",
    code: "U+1900 U+1923",
    relation: "carrier + vowel sign",
    hint: "Independent E",
  },
  {
    devanagari: "ऐ",
    limbu: "ᤀᤤ",
    code: "U+1900 U+1924",
    relation: "carrier + vowel sign",
    hint: "Independent AI",
  },
  {
    devanagari: "ओ",
    limbu: "ᤀᤥ",
    code: "U+1900 U+1925",
    relation: "carrier + vowel sign",
    hint: "Independent O",
  },
  {
    devanagari: "औ",
    limbu: "ᤀᤦ",
    code: "U+1900 U+1926",
    relation: "carrier + vowel sign",
    hint: "Independent AU",
  },
];

/**
 * ============================================================================
 * 5. MEDIAL CONSONANTS / SUBJOINTS MATRIX
 * ============================================================================
 * Applied to characters in the middle of consonant clusters.
 * शब्दको बीचमा जोडिएर आउने संयुक्त व्यञ्जन वा आधा अक्षरहरू।
 */

export const SUBJOINTS = [
  {
    roman: "y",
    devanagari: "्य",
    limbu: "ᤩ",
    code: "U+1929",
    hint: "Subjoint Medial Ya",
  },
  {
    roman: "r",
    devanagari: "्र",
    limbu: "ᤪ",
    code: "U+192A",
    hint: "Subjoint Medial Ra",
  },
  {
    roman: "w",
    devanagari: "्व",
    limbu: "ᤫ",
    code: "U+192B",
    hint: "Subjoint Medial Wa",
  },
];

/**
 * ============================================================================
 * 6. FINAL CONSONANTS / SMALL LETTERS MATRIX
 * ============================================================================
 * Handled exclusively as absolute end-of-syllable markers.
 * शब्द वा ध्वनिको अन्त्यमा आउने विशेष साना आधा अक्षरहरू।
 */

export const SMALL_LETTERS = [
  { devanagari: "क्", limbu: "ᤰ", code: "U+1930", hint: "Small Ka Final" },
  { devanagari: "ङ्", limbu: "ᤱ", code: "U+1931", hint: "Small Nga Final" },
  { devanagari: "ं", limbu: "ᤲ", code: "U+1932", hint: "Small Anusvara Sign" },
  { devanagari: "त्", limbu: "ᤳ", code: "U+1933", hint: "Small Ta Final" },
  { devanagari: "न्", limbu: "ᤴ", code: "U+1934", hint: "Small Na Final" },
  { devanagari: "प्", limbu: "ᤵ", code: "U+1935", hint: "Small Pa Final" },
  { devanagari: "म्", limbu: "ᤶ", code: "U+1936", hint: "Small Ma Final" },
  { devanagari: "र्", limbu: "ᤷ", code: "U+1937", hint: "Small Ra Final" },
  { devanagari: "ल्", limbu: "ᤸ", code: "U+1938", hint: "Small La Final" },
];

/**
 * ============================================================================
 * 7. MODIFIER SIGNS & PUNCTUATIONS MATRIX
 * ============================================================================
 * Contains glottalization modifiers, lengtheners, and script-specific punctuation marks.
 * वाक्य टुङ्ग्याउने विराम चिन्हहरू, विसर्ग र याक्थुङ लिपिका उच्चारण परिमार्जक संकेतहरू।
 */

export const SIGNS = [
  {
    roman: ".",
    devanagari: "।",
    limbu: "॥",
    code: "Sentence Ender",
    hint: "Double Danda",
  },
  {
    roman: "!",
    devanagari: "!",
    limbu: "᥄",
    code: "Exclamation",
    hint: "Limbu Exclamation Sign",
  },
  {
    roman: "?",
    devanagari: "?",
    limbu: "᥅",
    code: "Question",
    hint: "Limbu Question Sign",
  },
  {
    roman: "_sai",
    devanagari: "्",
    limbu: "᤻",
    code: "U+193B",
    hint: "Sa-I (Final-Consonant Vowel Killer)",
  },
  {
    roman: "_long",
    devanagari: "ः",
    limbu: "᤺",
    code: "U+193A",
    hint: "Kemphreng (Vowel Lengthener)",
  },
  {
    roman: "_sai",
    devanagari: "्",
    limbu: "᤻",
    code: "U+193B",
    hint: "Sa-I (Final-Consonant Vowel Killer)",
  },
  {
    roman: "_loo",
    devanagari: "लो! (punctuation mark)",
    limbu: "᥀",
    code: "U+1940",
    hint: "Loo (Exclamatory Particle)",
  },
];

/**
 * ============================================================================
 * 7. Developer's Implementation Tip (विकासकर्ताहरूका लागि CLI वा वेबसाइटमा प्रयोग गर्ने तरिका)
 * ============================================================================
 * यदि कुनै विकासकर्ताले आफ्नो वेबसाइट वा CLI एपमा त्रुटि सन्देश वा कुनै जानकारी देखाउन चाहन्छ भने, यो डेटा स्ट्रक्चरबाट सिधै भाषिक कारण वा संकेत तान्न सक्छन्:
 * If a developer wants to display an error message or any information on their website or CLI app, they can directly retrieve the linguistic reason or indicator from this data structure:
 * ```javascript
 * import { HINTS_AND_DOCS } from './mappings.js';
 *
 * // CLI वा UI मा कन्भर्सन म्यासेज वा चेतावनी देखाउन:
 * // To display a conversion message or warning in the CLI or UI:
 * console.log(HINTS_AND_DOCS.linguisticFallback.ne);
 *
 * // आउटपुट: "महत्त्वपूर्ण: लिम्बु भाषामा रैथाने रूपमा मूर्धन्य ध्वनिहरू (ट, ठ, ड...) हुँदैनन्..."
 * // Output: "Important: The Limbu language does not natively possess retroflex sounds (ṭ, ṭh, ḍ...)..."
 * console.log(HINTS_AND_DOCS.smallLetters.en);
 * // Output: "Unlike Devanagari which uses Halanta (्)... Limbu uses explicitly encoded 'Small Letters'..."
 */
