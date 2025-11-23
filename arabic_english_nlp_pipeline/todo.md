# Project TODO

## Design & Styling
- [x] Set up professional color palette (blue, gray, white tones)
- [x] Configure global fonts and typography
- [x] Add custom CSS variables for consistent theming

## Navigation & Structure
- [x] Create top navigation bar with logo and menu items
- [x] Implement Home/Overview page
- [x] Implement NLP Pipeline Demo page
- [x] Implement About/Methods page
- [x] Add routing between pages

## Home/Overview Page
- [x] Add project title and description
- [x] List pipeline capabilities (cleaning, tokenization, POS, n-gram, NER, IE)
- [x] Add pipeline steps diagram or explanation

## NLP Pipeline Demo Page
- [x] Create text input area for news article
- [x] Add language dropdown (Arabic/English)
- [x] Add "Run Pipeline" button
- [x] Implement text cleaning function
- [x] Implement tokenization function
- [x] Implement POS tagging (NLTK for English, rule-based for Arabic)
- [x] Implement n-gram (bigram) language model
- [x] Calculate perplexity
- [x] Implement NER (spaCy for English, CAMeL-BERT for Arabic)
- [x] Implement Information Extraction based on NER

## Results Display (Tables)
- [x] Create Table 1: Cleaning & Tokens (Original text, Cleaned text, Tokens)
- [x] Create Table 2: POS Tagging (Token, POS tag)
- [x] Create Table 3: n-gram & Perplexity (Tokens, Model type, Perplexity value)
- [x] Create Table 4: NER & IE (Entity text, Label, Start, End)
- [x] Create IE summary table (grouped entities by type)

## About/Methods Page
- [x] Describe datasets (Arabic + English news sources)
- [x] Explain preprocessing approach (cleaning, stopwords)
- [x] Explain POS tagging methodology
- [x] Explain n-gram & perplexity calculation
- [x] Explain NER models used (spaCy/CAMeLBERT)

## Testing & Deployment
- [x] Test with sample English article
- [x] Test with sample Arabic article
- [x] Verify all tables display correctly
- [x] Check responsive design
- [x] Create checkpoint for deployment

## Bug Fixes
- [x] Fix POS tagging - improve accuracy for verbs, modals, and other parts of speech
- [x] Fix NER - correctly identify PERSON entities (Tim Cook, Rishi Sunak)
- [x] Fix NER - correctly identify LOC entities (London, Westminster)
- [x] Fix NER - prevent incorrect entity grouping (e.g., "Prime Minister Rishi Sunak. The")
- [x] Fix NER - filter out non-entities like standalone "The"
- [x] Test fixes with sample articles
- [x] Create new checkpoint with fixes

## Additional Fixes
- [x] Fix Information Extraction summary to properly count PERSON entities

## Arabic NER Enhancement
- [x] Expand Arabic person name dictionary (add political figures, common Arabic names)
- [x] Expand Arabic location dictionary (add countries, cities, regions)
- [x] Expand Arabic organization dictionary (add government agencies, international orgs)
- [ ] Add pattern-based detection for Arabic entity structures
- [ ] Test with Venezuelan president news article

## Arabic Label Standardization
- [x] Update Arabic POS tagging to use English labels (NOUN, VERB, ADJ, etc.) instead of Arabic labels (فعل, اسم, حرف)
- [x] Ensure Arabic NER uses same labels as English (PERSON, ORG, LOC, MISC)
- [x] Review notebook code to ensure web demo matches the original implementation
- [x] Test Arabic pipeline to verify labels match English format

## Arabic POS/NER Improvements
- [x] Improve Arabic POS tagging rules to reduce incorrect VERB tags
- [x] Standardize Arabic POS labels to match English style (NOUN, VERB, ADJ, ADV, PRON, PREP, CONJ, DET, etc.)
- [x] Expand Arabic NER dictionaries with more entities (persons, organizations, locations)
- [x] Ensure Arabic NER returns entities instead of empty results
- [x] Add UI disclaimer explaining notebook uses ML models (CAMeLBERT) while web demo uses rule-based approximation
- [x] Test improved Arabic POS and NER with sample articles

## Verification & Final Fixes
- [x] Test live website with Arabic text to verify POS tags display in English
- [x] Test live website with Arabic text to verify NER entities are detected
- [x] Verify Arabic POS uses short English labels (NOUN, VERB, ADJ, ADV, PREP, CONJ, PRON)
- [x] Verify Arabic NER uses same labels as notebook (PERSON, ORG, LOC, MISC → PERS, ORG, LOC, MISC in IE)
- [x] Fix any remaining issues with country names being tagged as VERB
- [x] Ensure IE Summary shows proper counts for Arabic entities

## Arabic NER Dictionary Expansion
- [x] Add African leaders (سيريل رامافوزا / Cyril Ramaphosa, etc.)
- [x] Add African cities (جوهانسبرغ / Johannesburg, etc.)
- [x] Add international organizations (مجموعة الـ20 / G20, etc.)
- [x] Test with G20 summit article
