# Arabic-English News NLP Pipeline

A comprehensive Natural Language Processing pipeline for analyzing Arabic and English newspaper articles. This web application demonstrates text cleaning, tokenization, POS tagging, language modeling, and entity recognition for both languages.

## Features

- **Bilingual Support**: Process both Arabic and English news articles
- **Text Cleaning**: Remove HTML tags, punctuation, numbers, and stopwords
- **Tokenization**: Split text into individual tokens for analysis
- **POS Tagging**: Identify parts of speech using NLTK for English and rule-based tagging for Arabic
- **N-gram Language Model**: Build bigram models and calculate perplexity
- **Named Entity Recognition**: Extract entities (PERSON, ORG, LOC) from text
- **Information Extraction**: Group and summarize entities by type

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **UI**: Tailwind CSS 4 + shadcn/ui components
- **Routing**: Wouter
- **Styling**: Inter font family

## Project Structure

```
client/
  ├── public/          # Static assets
  ├── src/
  │   ├── components/  # Reusable UI components
  │   ├── pages/       # Page components (Home, Demo, About)
  │   ├── lib/         # Utility functions and NLP pipeline
  │   ├── contexts/    # React contexts (Theme)
  │   └── hooks/       # Custom React hooks
  └── index.html       # Entry HTML file
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/arabic-english-nlp-pipeline.git
cd arabic-english-nlp-pipeline
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Navigate to the **NLP Demo** page
2. Select your language (English or Arabic)
3. Paste a news article in the text area
4. Click **Run Pipeline** to process the text
5. View the results:
   - Cleaning & Tokenization
   - POS Tagging
   - N-gram Language Model & Perplexity
   - Named Entity Recognition
   - Information Extraction Summary

## Implementation Notes

### Jupyter Notebook vs Web Demo

- **Jupyter Notebook**: Uses advanced ML models (CAMeLBERT for Arabic NER, NLTK for English POS tagging) for accurate natural language processing
- **Web Demo**: Uses a lighter rule-based approximation of the same pipeline because large transformer models cannot be loaded in the browser

The pipeline structure (tokenization → POS → n-gram/perplexity → NER/IE) remains identical between the notebook and web demo.

### Arabic NER Coverage

The Arabic NER includes dictionaries for:
- **Political figures**: World leaders, regional politicians
- **Organizations**: International organizations (UN, G20, WHO), tech companies, media outlets
- **Locations**: Countries, major cities, regions across the world
- **African entities**: African leaders (Cyril Ramaphosa, Nelson Mandela), cities (Johannesburg, Nairobi), and organizations

## License

MIT

## Acknowledgments

- Based on research in Arabic-English bilingual NLP
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
