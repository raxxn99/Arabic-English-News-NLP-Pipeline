/**
 * NLP Pipeline Utilities
 * Based on the Arabic-English News NLP Pipeline Jupyter notebook
 */

// English stopwords (subset from NLTK)
const ENGLISH_STOPWORDS = new Set([
  "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours",
  "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself",
  "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which",
  "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be",
  "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an",
  "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by",
  "for", "with", "about", "against", "between", "into", "through", "during", "before",
  "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over",
  "under", "again", "further", "then", "once",
]);

// Arabic stopwords (subset)
const ARABIC_STOPWORDS = new Set([
  "في", "من", "إلى", "على", "عن", "هذا", "هذه", "ذلك", "التي", "الذي", "كان", "كانت",
  "يكون", "أن", "إن", "لم", "لن", "قد", "ما", "لا", "نعم", "كل", "بعض", "هل", "أم",
  "أو", "لكن", "بل", "حتى", "عند", "منذ", "بعد", "قبل", "مع", "ضد", "حول", "خلال",
  "أثناء", "فوق", "تحت", "أمام", "خلف", "بين", "داخل", "خارج", "عبر", "نحو", "لدى",
  "لدي", "له", "لها", "لهم", "لهما", "لنا", "لكم", "لكما", "لي", "لك", "هو", "هي",
  "هم", "هما", "نحن", "أنت", "أنتم", "أنتما", "أنا",
]);

export interface CleaningResult {
  original: string;
  cleaned: string;
  tokens: string[];
}

export interface POSTag {
  token: string;
  tag: string;
}

export interface NgramResult {
  model: string;
  perplexity: number;
  tokensUsed: number;
}

export interface NamedEntity {
  text: string;
  label: string;
  start: number;
  end: number;
}

export interface IEResult {
  PERS: string[];
  ORG: string[];
  LOC: string[];
  MISC: string[];
}

export interface PipelineResults {
  cleaning: CleaningResult;
  pos: POSTag[];
  ngram: NgramResult;
  ner: NamedEntity[];
  ie: IEResult;
}

/**
 * Clean text by removing HTML tags, punctuation, numbers, and stopwords
 * Based on the clean_text function from the notebook
 */
export function cleanText(text: string, language: "english" | "arabic"): CleaningResult {
  const original = text;
  
  // Remove HTML tags
  let cleaned = text.replace(/<[^>]*>/g, "");
  
  // Remove punctuation (keep Arabic letters for Arabic text)
  if (language === "arabic") {
    cleaned = cleaned.replace(/[^\u0600-\u06FF\s]/g, " ");
  } else {
    cleaned = cleaned.replace(/[^\w\s]/g, " ");
  }
  
  // Remove numbers
  cleaned = cleaned.replace(/\d+/g, "");
  
  // Normalize whitespace
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  
  // Lowercase for English
  if (language === "english") {
    cleaned = cleaned.toLowerCase();
  }
  
  // Tokenize
  const tokens = cleaned.split(/\s+/).filter(t => t.length > 0);
  
  // Remove stopwords
  const stopwords = language === "english" ? ENGLISH_STOPWORDS : ARABIC_STOPWORDS;
  const filteredTokens = tokens.filter(token => !stopwords.has(token.toLowerCase()));
  
  return {
    original,
    cleaned,
    tokens: filteredTokens,
  };
}

/**
 * Simple POS tagging
 * English: Basic rule-based tagger (simplified from NLTK)
 * Arabic: Rule-based pattern matching
 */
export function posTagging(tokens: string[], language: "english" | "arabic"): POSTag[] {
  if (language === "english") {
    return posTagEnglish(tokens);
  } else {
    return posTagArabic(tokens);
  }
}

function posTagEnglish(tokens: string[]): POSTag[] {
  const result: POSTag[] = [];
  
  // Common word lists for better tagging
  const modals = ["will", "would", "can", "could", "may", "might", "shall", "should", "must"];
  const baseVerbs = ["visit", "meet", "focus", "take", "place", "have", "make", "go", "come", "get", "give", "use", "find", "tell", "ask", "work", "seem", "feel", "try", "leave", "call"];
  const pastVerbs = ["announced", "expressed", "said", "went", "came", "got", "gave", "used", "found", "told", "asked", "worked", "seemed", "felt", "tried", "left", "called"];
  const beVerbs = ["is", "are", "was", "were", "be", "been", "being", "am"];
  const pronouns = ["i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them"];
  const prepositions = ["in", "on", "at", "by", "for", "with", "about", "to", "from", "of", "into", "through", "during", "before", "after", "above", "below", "between", "under", "over"];
  const determiners = ["the", "a", "an", "this", "that", "these", "those", "my", "your", "his", "her", "its", "our", "their"];
  const conjunctions = ["and", "or", "but", "nor", "yet", "so"];
  const adjectives = ["good", "new", "first", "last", "long", "great", "little", "own", "other", "old", "right", "big", "high", "different", "small", "large", "next", "early", "young", "important", "few", "public", "bad", "same", "able", "prime", "artificial", "global"];
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const lower = token.toLowerCase();
    const prev = i > 0 ? tokens[i - 1].toLowerCase() : "";
    let tag = "NN"; // Default to noun
    
    // Rule-based tagging with priority order
    if (determiners.includes(lower)) {
      tag = "DT";
    } else if (pronouns.includes(lower)) {
      tag = "PRP";
    } else if (modals.includes(lower)) {
      tag = "MD";
    } else if (beVerbs.includes(lower)) {
      tag = "VB";
    } else if (pastVerbs.includes(lower) || lower.endsWith("ed")) {
      tag = "VBD";
    } else if (lower.endsWith("ing")) {
      tag = "VBG";
    } else if (baseVerbs.includes(lower)) {
      // Check if preceded by modal or "to" for base verb
      if (modals.includes(prev) || prev === "to" || prev === "will") {
        tag = "VB";
      } else {
        tag = "NN"; // Could be noun form
      }
    } else if (adjectives.includes(lower)) {
      tag = "JJ";
    } else if (lower.endsWith("ly")) {
      tag = "RB";
    } else if (prepositions.includes(lower)) {
      tag = "IN";
    } else if (conjunctions.includes(lower)) {
      tag = "CC";
    } else if (lower.endsWith("tion") || lower.endsWith("ment") || lower.endsWith("ness") || lower.endsWith("ity")) {
      tag = "NN";
    } else if (lower.endsWith("s") && !lower.endsWith("ss") && !lower.endsWith("us")) {
      tag = "NNS";
    }
    
    result.push({ token, tag });
  }
  
  return result;
}

function posTagArabic(tokens: string[]): POSTag[] {
  const result: POSTag[] = [];
  
  // Arabic POS tagging - improved rule-based implementation
  // Returns standardized English-style labels: NOUN, VERB, ADJ, ADV, PRON, PREP, CONJ, DET
  
  // Expanded word lists for better accuracy
  const CONJ_LIST = ["و", "أو", "لكن", "ثم", "أم", "فإن", "إذا", "لو", "بل"];
  const PREP_LIST = ["في", "من", "إلى", "على", "عن", "بين", "تحت", "فوق", "بعد", "قبل", "ضد", "مع", "بدون"];
  const PRON_LIST = ["هو", "هي", "هم", "هن", "أنت", "أنا", "نحن", "أنتم", "أنتن", "هما", "هذا", "هذه", "ذلك", "تلك"];
  const VERB_LIST = ["قال", "كان", "أصبح", "ذهب", "جاء", "كتب", "قرأ", "أكل", "شرب", "فعل", "عمل", "أمر", "أعلن", "اتهم", "يهدف", "بثتها", "سيزور", "سيركز"];
  const ADJ_LIST = ["كبير", "صغير", "جديد", "قديم", "جميل", "حسن", "سيئ", "طويل", "قصير", "الفنزويلي", "الأميركية", "المركزية", "الرسمية", "العسكرية"];
  const ADV_LIST = ["اليوم", "غدا", "أمس", "الآن", "هنا", "هناك", "دائما", "أيضا", "جدا", "فقط", "أبدا"];
  
  for (const word of tokens) {
    let tag = "NOUN"; // Default to noun
    
    // Priority 1: Check specific word lists
    if (CONJ_LIST.includes(word)) {
      tag = "CONJ";
    } else if (PREP_LIST.includes(word)) {
      tag = "PREP";
    } else if (PRON_LIST.includes(word)) {
      tag = "PRON";
    } else if (ADV_LIST.includes(word)) {
      tag = "ADV";
    } else if (ADJ_LIST.includes(word)) {
      tag = "ADJ";
    } else if (VERB_LIST.includes(word)) {
      tag = "VERB";
    }
    // Priority 2: Definite article (strong noun indicator)
    else if (word.startsWith("ال") && word.length > 2) {
      // Check if it's an adjective ending
      if (word.endsWith("ي") || word.endsWith("ية")) {
        tag = "ADJ";
      } else {
        tag = "NOUN";
      }
    }
    // Priority 3: Attached prepositions (ب، ل، ك + noun)
    else if ((word.startsWith("ب") || word.startsWith("ل") || word.startsWith("ك")) && word.length > 2) {
      const root = word.substring(1);
      if (root.startsWith("ال")) {
        tag = "NOUN"; // Preposition + definite noun
      } else if (VERB_LIST.includes(root)) {
        tag = "VERB";
      } else {
        tag = "NOUN"; // Likely a noun with attached preposition
      }
    }
    // Priority 4: Attached conjunctions (و، ف + word)
    else if ((word.startsWith("و") || word.startsWith("ف")) && word.length > 2) {
      const root = word.substring(1);
      if (root.startsWith("ال")) {
        tag = "NOUN"; // Conjunction + definite noun
      } else if (VERB_LIST.includes(root)) {
        tag = "VERB";
      } else if (PREP_LIST.includes(root)) {
        tag = "PREP";
      } else {
        tag = "NOUN"; // Default for و/ف + word
      }
    }
    // Priority 5: Future tense marker (س + verb)
    else if (word.startsWith("س") && word.length > 3) {
      tag = "VERB";
    }
    // Priority 6: Noun endings (strong indicators)
    else if (word.endsWith("ة") || word.endsWith("ون") || word.endsWith("ين") || word.endsWith("ان") || word.endsWith("ات")) {
      tag = "NOUN";
    }
    // Priority 7: Adjective endings
    else if (word.endsWith("ي") && word.length > 3) {
      tag = "ADJ";
    }
    // Priority 8: Verb patterns (only if not already tagged)
    else if (word.length >= 3) {
      // Present tense prefixes (but be conservative)
      if ((word.startsWith("ي") || word.startsWith("ت") || word.startsWith("ن") || word.startsWith("أ")) && 
          (word.endsWith("ون") === false && word.endsWith("ين") === false)) {
        // Check if it's more likely a verb (has verb-like structure)
        if (word.length <= 5 || word.endsWith("وا")) {
          tag = "VERB";
        }
      }
    }
    
    result.push({ token: word, tag });
  }
  
  return result;
}

/**
 * Build bigram language model and calculate perplexity
 * Based on the n-gram LM implementation in the notebook
 */
export function calculateNgramPerplexity(tokens: string[]): NgramResult {
  if (tokens.length < 2) {
    return {
      model: "Bigram (Laplace smoothing)",
      perplexity: 0,
      tokensUsed: tokens.length,
    };
  }
  
  // Build bigram counts
  const bigramCounts: Map<string, Map<string, number>> = new Map();
  const unigramCounts: Map<string, number> = new Map();
  
  // Count unigrams
  for (const token of tokens) {
    unigramCounts.set(token, (unigramCounts.get(token) || 0) + 1);
  }
  
  // Count bigrams
  for (let i = 0; i < tokens.length - 1; i++) {
    const w1 = tokens[i];
    const w2 = tokens[i + 1];
    
    if (!bigramCounts.has(w1)) {
      bigramCounts.set(w1, new Map());
    }
    const w1Map = bigramCounts.get(w1)!;
    w1Map.set(w2, (w1Map.get(w2) || 0) + 1);
  }
  
  // Calculate perplexity with Laplace smoothing
  const vocabSize = unigramCounts.size;
  let logProb = 0;
  let count = 0;
  
  for (let i = 0; i < tokens.length - 1; i++) {
    const w1 = tokens[i];
    const w2 = tokens[i + 1];
    
    const w1Count = unigramCounts.get(w1) || 0;
    const bigramCount = bigramCounts.get(w1)?.get(w2) || 0;
    
    // Laplace smoothing: P(w2|w1) = (count(w1,w2) + 1) / (count(w1) + V)
    const prob = (bigramCount + 1) / (w1Count + vocabSize);
    logProb += Math.log2(prob);
    count++;
  }
  
  // Perplexity = 2^(-1/N * sum(log2(P)))
  const perplexity = count > 0 ? Math.pow(2, -logProb / count) : 0;
  
  return {
    model: "Bigram (Laplace smoothing)",
    perplexity,
    tokensUsed: tokens.length,
  };
}

/**
 * Simple Named Entity Recognition
 * This is a simplified version - in production, you'd use spaCy or transformers
 */
export function namedEntityRecognition(text: string, language: "english" | "arabic"): NamedEntity[] {
  const entities: NamedEntity[] = [];
  
  if (language === "english") {
    // Known entity lists for better recognition
    const personNames = ["tim cook", "rishi sunak", "antonio guterres", "biden", "trump", "obama", "clinton"];
    const orgNames = ["apple inc", "microsoft corporation", "google", "amazon", "united nations", "un", "microsoft", "apple"];
    const locNames = ["london", "washington", "new york city", "westminster", "downing street", "uk", "united kingdom", "united states"];
    const titles = ["president", "prime minister", "secretary general", "ceo", "minister", "director", "chairman"];
    
    const lowerText = text.toLowerCase();
    
    // First pass: Find known entities
    for (const name of personNames) {
      let index = lowerText.indexOf(name);
      while (index !== -1) {
        entities.push({
          text: text.substring(index, index + name.length),
          label: "PERSON",
          start: index,
          end: index + name.length,
        });
        index = lowerText.indexOf(name, index + 1);
      }
    }
    
    for (const name of orgNames) {
      let index = lowerText.indexOf(name);
      while (index !== -1) {
        // Check if not already covered
        if (!entities.some(e => index >= e.start && index < e.end)) {
          entities.push({
            text: text.substring(index, index + name.length),
            label: "ORG",
            start: index,
            end: index + name.length,
          });
        }
        index = lowerText.indexOf(name, index + 1);
      }
    }
    
    for (const name of locNames) {
      let index = lowerText.indexOf(name);
      while (index !== -1) {
        // Check if not already covered
        if (!entities.some(e => index >= e.start && index < e.end)) {
          entities.push({
            text: text.substring(index, index + name.length),
            label: "LOC",
            start: index,
            end: index + name.length,
          });
        }
        index = lowerText.indexOf(name, index + 1);
      }
    }
    
    // Second pass: Find capitalized sequences (potential entities)
    const words = text.split(/\s+/);
    let currentEntity = "";
    let startIdx = 0;
    let searchFrom = 0;
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i].replace(/[.,;:!?()]/g, ""); // Remove punctuation
      
      // Skip common words and titles
      if (["The", "A", "An", "In", "On", "At", "To", "For", "With", "From"].includes(word)) {
        if (currentEntity !== "") {
          // End current entity
          const entityStart = text.indexOf(currentEntity, searchFrom);
          if (entityStart !== -1 && !entities.some(e => entityStart >= e.start && entityStart < e.end)) {
            // Determine label based on context
            let label = "MISC";
            if (currentEntity.split(" ").length >= 2) {
              label = "PERSON"; // Multi-word capitalized = likely person
            }
            
            entities.push({
              text: currentEntity,
              label,
              start: entityStart,
              end: entityStart + currentEntity.length,
            });
          }
          currentEntity = "";
        }
        continue;
      }
      
      // Check if word starts with capital letter
      if (/^[A-Z]/.test(word) && word.length > 1) {
        if (currentEntity === "") {
          currentEntity = word;
          searchFrom = text.indexOf(word, searchFrom);
        } else {
          currentEntity += " " + word;
        }
      } else {
        if (currentEntity !== "") {
          // End current entity
          const entityStart = text.indexOf(currentEntity, searchFrom);
          if (entityStart !== -1 && !entities.some(e => entityStart >= e.start && entityStart < e.end)) {
            // Determine label
            let label = "MISC";
            if (currentEntity.split(" ").length >= 2) {
              label = "PERSON";
            }
            
            entities.push({
              text: currentEntity,
              label,
              start: entityStart,
              end: entityStart + currentEntity.length,
            });
          }
          currentEntity = "";
          searchFrom = entityStart + currentEntity.length;
        }
      }
    }
    
    // Add last entity if exists
    if (currentEntity !== "") {
      const entityStart = text.indexOf(currentEntity, searchFrom);
      if (entityStart !== -1 && !entities.some(e => entityStart >= e.start && entityStart < e.end)) {
        let label = "MISC";
        if (currentEntity.split(" ").length >= 2) {
          label = "PERSON";
        }
        entities.push({
          text: currentEntity,
          label,
          start: entityStart,
          end: entityStart + currentEntity.length,
        });
      }
    }
  } else {
    // Arabic NER (enhanced with more entities)
    // Expanded Arabic entity dictionaries for better NER coverage
    const arabicPersons = [
      // Political figures (full names first for better matching)
      "نيكولاس مادورو", "محمد بن سلمان", "أنطونيو غوتيريش", "تيم كوك", "ريشي سوناك",
      "جو بايدن", "دونالد ترامب", "باراك أوباما", "فلاديمير بوتين",
      "شي جين بينغ", "إيمانويل ماكرون", "بوريس جونسون",
      "عبد الفتاح السيسي", "رجب طيب أردوغان",
      // African leaders
      "سيريل رامافوزا", "نيلسون مانديلا", "ديزموند توتو",
      // Single names
      "مادورو", "بايدن", "ترامب", "أوباما", "بوتين",
      "السيسي", "أردوغان", "ماكرون", "رامافوزا", "مانديلا"
    ];
    
    const arabicOrgs = [
      // Intelligence & government agencies (longest first)
      "وكالة المخابرات المركزية الأميركية", "منظمة الصحة العالمية",
      "صندوق النقد الدولي", "البنك الدولي", "الأمم المتحدة",
      "مجلس الأمن", "البيت الأبيض", "وزارة الخارجية", "وزارة الدفاع",
      // International organizations
      "مجموعة الـ20", "مجموعة العشرين", "الاتحاد الأوروبي", "الاتحاد الأفريقي",
      "منظمة التجارة العالمية", "منظمة الأمم المتحدة",
      // Tech companies
      "مايكروسوفت", "الفيسبوك", "أمازون", "جوجل", "أبل", "تويتر",
      // Media
      "الجزيرة", "العربية", "بي بي سي", "سي إن إن",
      // Abbreviations
      "سي آي إيه"
    ];
    
    const arabicLocs = [
      // Countries (full names first)
      "الولايات المتحدة", "المملكة المتحدة", "المملكة العربية السعودية",
      "جنوب أفريقيا",
      // Major world cities
      "نيويورك", "واشنطن", "لندن", "باريس", "برلين", "طوكيو", "بكين", "موسكو",
      // African cities
      "جوهانسبرغ", "كيب تاون", "بريتوريا", "ديربان", "نيروبي", "أديس أبابا", "لاغوس", "أكرا",
      // Countries - Americas
      "فنزويلا", "أمريكا", "كندا", "البرازيل", "الأرجنتين", "المكسيك",
      // Countries - Europe
      "بريطانيا", "فرنسا", "ألمانيا", "إيطاليا", "إسبانيا", "روسيا",
      // Countries - Middle East & North Africa
      "السعودية", "مصر", "تركيا", "سوريا", "العراق", "الإمارات", "قطر",
      "الكويت", "البحرين", "عمان", "الأردن", "لبنان", "فلسطين", "إسرائيل",
      "اليمن", "ليبيا", "الجزائر", "تونس", "المغرب", "إيران",
      // Countries - Asia
      "الصين", "اليابان", "الهند", "باكستان", "أفغانستان", "كوريا",
      // Regions & continents
      "أفريقية", "أفريقيا",
      // Arab cities
      "القاهرة", "الرياض", "دبي", "أبوظبي", "الدوحة", "بيروت", "دمشق", "بغداد"
    ];
    
    // Find known Arabic entities - search for longest matches first to avoid partial matches
    // Sort by length descending
    const sortedPersons = [...arabicPersons].sort((a, b) => b.length - a.length);
    const sortedOrgs = [...arabicOrgs].sort((a, b) => b.length - a.length);
    const sortedLocs = [...arabicLocs].sort((a, b) => b.length - a.length);
    
    for (const name of sortedPersons) {
      let index = text.indexOf(name);
      while (index !== -1) {
        // Check if not already covered
        if (!entities.some(e => index >= e.start && index < e.end)) {
          entities.push({
            text: name,
            label: "PERSON",
            start: index,
            end: index + name.length,
          });
        }
        index = text.indexOf(name, index + 1);
      }
    }
    
    for (const name of sortedOrgs) {
      let index = text.indexOf(name);
      while (index !== -1) {
        if (!entities.some(e => index >= e.start && index < e.end)) {
          entities.push({
            text: name,
            label: "ORG",
            start: index,
            end: index + name.length,
          });
        }
        index = text.indexOf(name, index + 1);
      }
    }
    
    for (const name of sortedLocs) {
      let index = text.indexOf(name);
      while (index !== -1) {
        if (!entities.some(e => index >= e.start && index < e.end)) {
          entities.push({
            text: name,
            label: "LOC",
            start: index,
            end: index + name.length,
          });
        }
        index = text.indexOf(name, index + 1);
      }
    }
  }
  
  // Sort entities by start position
  entities.sort((a, b) => a.start - b.start);
  
  return entities;
}

/**
 * Information Extraction - group entities by type
 */
export function informationExtraction(entities: NamedEntity[]): IEResult {
  const result: IEResult = {
    PERS: [],
    ORG: [],
    LOC: [],
    MISC: [],
  };
  
  for (const entity of entities) {
    // Map PERSON label to PERS key
    let key = entity.label;
    if (key === "PERSON") {
      key = "PERS";
    }
    
    const resultKey = key as keyof IEResult;
    if (resultKey in result && !result[resultKey].includes(entity.text)) {
      result[resultKey].push(entity.text);
    }
  }
  
  return result;
}

/**
 * Run the complete NLP pipeline
 */
export function runPipeline(text: string, language: "english" | "arabic"): PipelineResults {
  // Step 1: Clean and tokenize
  const cleaning = cleanText(text, language);
  
  // Step 2: POS tagging
  const pos = posTagging(cleaning.tokens, language);
  
  // Step 3: N-gram and perplexity
  const ngram = calculateNgramPerplexity(cleaning.tokens);
  
  // Step 4: Named Entity Recognition
  const ner = namedEntityRecognition(text, language);
  
  // Step 5: Information Extraction
  const ie = informationExtraction(ner);
  
  return {
    cleaning,
    pos,
    ngram,
    ner,
    ie,
  };
}
