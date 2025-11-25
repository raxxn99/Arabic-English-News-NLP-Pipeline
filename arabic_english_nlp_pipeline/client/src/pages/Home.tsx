import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Languages, Tag, BarChart3, Search, Database } from "lucide-react";
import { Link } from "wouter";
import { APP_TITLE } from "@/const";

export default function Home() {
  const features = [
    {
      icon: FileText,
      title: "Text Cleaning",
      description: "Remove HTML tags, punctuation, numbers, and stopwords to prepare text for analysis.",
    },
    {
      icon: Languages,
      title: "Tokenization",
      description: "Split text into individual tokens for both Arabic and English languages.",
    },
    {
      icon: Tag,
      title: "POS Tagging",
      description: "Identify parts of speech using NLTK for English and rule-based tagging for Arabic.",
    },
    {
      icon: BarChart3,
      title: "N-gram Language Model",
      description: "Build bigram models and calculate perplexity to measure text predictability.",
    },
    {
      icon: Search,
      title: "Named Entity Recognition",
      description: "Extract entities using spaCy for English and CAMeL-BERT for Arabic.",
    },
    {
      icon: Database,
      title: "Information Extraction",
      description: "Group and summarize entities by type (PERSON, ORG, LOC, MISC).",
    },
  ];

  const pipelineSteps = [
    { step: 1, title: "Input", description: "Paste news article text" },
    { step: 2, title: "Clean", description: "Remove noise and normalize" },
    { step: 3, title: "Tokenize", description: "Split into words" },
    { step: 4, title: "Analyze", description: "POS, N-gram, NER" },
    { step: 5, title: "Extract", description: "Generate insights" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Languages className="w-4 h-4" />
            Bilingual NLP Pipeline
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {APP_TITLE}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A comprehensive Natural Language Processing pipeline for analyzing Arabic and English newspaper articles.
            Process text through cleaning, tokenization, POS tagging, language modeling, and entity recognition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button size="lg" className="w-full sm:w-auto">
                Try the Demo
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pipeline Capabilities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our NLP pipeline offers a complete suite of text processing and analysis tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pipeline Steps */}
      <section className="container py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Follow these simple steps to process your news articles
            </p>
          </div>
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
              {pipelineSteps.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg relative z-10">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl my-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Process Your Articles?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Try our NLP pipeline with your own Arabic or English news articles and see the results in real-time.
          </p>
          <Link href="/demo">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
