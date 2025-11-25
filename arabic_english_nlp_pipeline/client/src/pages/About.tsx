import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">ℹ️ About & Methods</h1>
          <p className="text-muted-foreground">
            Learn about the datasets, preprocessing techniques, and NLP models used in this pipeline
          </p>
        </div>

        <div className="space-y-6">
          {/* Datasets */}
          <Card>
            <CardHeader>
              <CardTitle>📚 Datasets</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                This pipeline uses two carefully curated news datasets to support both Arabic and English text processing:
              </p>
              <ul className="space-y-2 mt-4">
                <li>
                  <strong>Arabic Dataset:</strong> Collected from the Kaggle Arabic News Dataset, containing news articles
                  from various categories including Politics, Business, Sports, and Technology.
                  <br />
                  <a
                    href="https://www.kaggle.com/datasets/asmaaabdelwahab/arabic-news-datase"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    View Dataset →
                  </a>
                </li>
                <li>
                  <strong>English Dataset:</strong> Sourced from Malaysia's biggest online news collection on Kaggle,
                  featuring diverse news articles across multiple topics.
                  <br />
                  <a
                    href="https://www.kaggle.com/datasets/azraimohamad/news-article-weekly-updated"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    View Dataset →
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                <strong>Total Size:</strong> Approximately 2,000 articles (balanced between Arabic and English)
                <br />
                <strong>Categories:</strong> Politics, Business, Sports, Technology
                <br />
                <strong>License:</strong> Open access for educational use
              </p>
            </CardContent>
          </Card>

          {/* Preprocessing */}
          <Card>
            <CardHeader>
              <CardTitle>🧹 Preprocessing & Data Cleaning</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                The text preprocessing pipeline applies several cleaning steps to prepare raw news articles for analysis:
              </p>
              <ol className="space-y-2 mt-4">
                <li>
                  <strong>HTML Tag Removal:</strong> Strips all HTML markup from the text to extract pure content.
                </li>
                <li>
                  <strong>Punctuation & Number Removal:</strong> Removes punctuation marks and numeric characters to focus
                  on linguistic content.
                </li>
                <li>
                  <strong>Text Normalization:</strong> Converts English text to lowercase for consistency.
                </li>
                <li>
                  <strong>Stopword Removal:</strong> Filters out common words (using NLTK stopword lists) that don't carry
                  significant meaning for both English and Arabic languages.
                </li>
              </ol>
              <p className="mt-4">
                After cleaning, the processed text is stored in a <code>clean_text</code> column and used for all
                subsequent NLP tasks.
              </p>
            </CardContent>
          </Card>

          {/* POS Tagging */}
          <Card>
            <CardHeader>
              <CardTitle>🏷️ Part-of-Speech (POS) Tagging</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                POS tagging assigns grammatical categories (noun, verb, adjective, etc.) to each word in the text:
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <strong>English POS Tagging:</strong>
                  <p className="mt-1">
                    Uses NLTK's pre-trained POS tagger based on the Penn Treebank tagset. The tagger applies statistical
                    models trained on large English corpora to accurately identify parts of speech.
                  </p>
                </div>
                <div>
                  <strong>Arabic POS Tagging:</strong>
                  <p className="mt-1">
                    Employs a rule-based approach tailored to Arabic morphology. The system uses pattern matching and
                    linguistic rules to identify common Arabic grammatical structures and assign appropriate tags.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* N-gram & Perplexity */}
          <Card>
            <CardHeader>
              <CardTitle>📊 N-gram Language Models & Perplexity</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Language models predict the probability of word sequences and measure text predictability:
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <strong>Bigram Model:</strong>
                  <p className="mt-1">
                    This pipeline uses bigram (2-gram) language models that predict each word based on the previous word.
                    The models are trained using Maximum Likelihood Estimation (MLE) with Laplace smoothing to handle
                    unseen word pairs.
                  </p>
                </div>
                <div>
                  <strong>Perplexity Calculation:</strong>
                  <p className="mt-1">
                    Perplexity measures how well the language model predicts the test data. Lower perplexity indicates
                    better prediction accuracy. The formula used is:
                  </p>
                  <div className="bg-muted p-3 rounded-md mt-2 font-mono text-sm">
                    Perplexity = 2^(-1/N * Σ log₂ P(wᵢ|wᵢ₋₁))
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    where N is the number of words and P(wᵢ|wᵢ₋₁) is the conditional probability of word wᵢ given wᵢ₋₁.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NER */}
          <Card>
            <CardHeader>
              <CardTitle>🔍 Named Entity Recognition (NER)</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                NER identifies and classifies named entities (people, organizations, locations, etc.) in the text:
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <strong>English NER:</strong>
                  <p className="mt-1">
                    Uses spaCy's <code>en_core_web_sm</code> model, a fast and accurate neural network-based NER system
                    trained on the OntoNotes 5 corpus. It recognizes entities such as PERSON, ORG, GPE (geopolitical
                    entity), DATE, and more.
                  </p>
                </div>
                <div>
                  <strong>Arabic NER:</strong>
                  <p className="mt-1">
                    Employs CAMeL-BERT (CAMeL-Lab/bert-base-arabic-camelbert-mix-ner), a state-of-the-art transformer
                    model fine-tuned specifically for Arabic NER tasks. The model recognizes Arabic-specific entity types
                    and handles the morphological complexity of the Arabic language.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Extraction */}
          <Card>
            <CardHeader>
              <CardTitle>📋 Information Extraction (IE)</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Information Extraction builds on NER results to extract structured information from unstructured text:
              </p>
              <ul className="space-y-2 mt-4">
                <li>
                  <strong>Entity Grouping:</strong> Groups recognized entities by type (PERSON, ORGANIZATION, LOCATION,
                  MISC) for easy analysis.
                </li>
                <li>
                  <strong>Frequency Analysis:</strong> Counts entity occurrences to identify the most mentioned people,
                  organizations, and places in the news articles.
                </li>
                <li>
                  <strong>Relationship Extraction:</strong> For English text, the system also extracts noun chunks and
                  basic Subject-Verb-Object (SVO) triples to understand relationships between entities.
                </li>
              </ul>
              <p className="mt-4">
                The extracted information provides a high-level summary of the key actors, organizations, and locations
                mentioned in the news content.
              </p>
            </CardContent>
          </Card>

          {/* Ethics & License */}
          <Card>
            <CardHeader>
              <CardTitle>⚖️ Ethics & Data Usage</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                All datasets used in this project are publicly available and anonymized. The data is used strictly for
                educational and research purposes. No personal information is collected or stored by this application.
              </p>
              <p className="mt-4">
                <strong>Note:</strong> This is a demonstration application. The NLP models and processing pipelines are
                simplified versions for educational purposes and may not reflect production-grade accuracy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
