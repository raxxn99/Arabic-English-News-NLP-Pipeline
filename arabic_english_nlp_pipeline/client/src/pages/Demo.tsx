import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { runPipeline, type PipelineResults } from "@/lib/nlp-pipeline";

export default function Demo() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState<"english" | "arabic">("english");
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<PipelineResults | null>(null);

  const handleRunPipeline = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to process");
      return;
    }

    setIsProcessing(true);
    
    // Run the actual NLP pipeline
    setTimeout(() => {
      try {
        const pipelineResults = runPipeline(text, language);
        setResults(pipelineResults);
        toast.success("Pipeline completed successfully!");
      } catch (error) {
        toast.error("An error occurred while processing the text");
        console.error(error);
      } finally {
        setIsProcessing(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">📝 NLP Pipeline Demo</h1>
          <p className="text-muted-foreground mb-4">
            Paste a news article below and run the complete NLP pipeline
          </p>
          
          {/* Implementation Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <p className="text-blue-900 font-medium mb-2">💡 Implementation Note</p>
            <p className="text-blue-800 mb-2">
              The <strong>Jupyter notebook</strong> uses advanced ML models (CAMeLBERT for Arabic NER, NLTK for English POS tagging) for accurate natural language processing.
            </p>
            <p className="text-blue-800">
              This <strong>web demo</strong> uses a lighter rule-based approximation of the same pipeline because large transformer models cannot be loaded in the browser. The pipeline structure (tokenization → POS → n-gram/perplexity → NER/IE) remains identical to the notebook.
            </p>
          </div>
        </div>

        {/* Input Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Enter your news article text and select the language</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <Select value={language} onValueChange={(value) => setLanguage(value as "english" | "arabic")}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="arabic">Arabic (العربية)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Article Text</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your news article here..."
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            <Button
              onClick={handleRunPipeline}
              disabled={isProcessing}
              size="lg"
              className="w-full sm:w-auto"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Run Pipeline"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <div className="space-y-6">
            {/* Table 1: Cleaning & Tokens */}
            <Card>
              <CardHeader>
                <CardTitle>🧹 Cleaning & Tokenization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold bg-muted">Original Text</th>
                        <th className="text-left p-3 font-semibold bg-muted">Cleaned Text</th>
                        <th className="text-left p-3 font-semibold bg-muted">Tokens</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 text-sm max-w-xs truncate">{results.cleaning.original}</td>
                        <td className="p-3 text-sm max-w-xs truncate">{results.cleaning.cleaned}</td>
                        <td className="p-3 text-sm">{results.cleaning.tokens.length} tokens</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium mb-2">Token List:</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {results.cleaning.tokens.slice(0, 20).join(", ")}
                    {results.cleaning.tokens.length > 20 && "..."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Table 2: POS Tagging */}
            <Card>
              <CardHeader>
                <CardTitle>🏷️ POS Tagging</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold bg-muted">Token</th>
                        <th className="text-left p-3 font-semibold bg-muted">POS Tag</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.pos.map((item: any, idx: number) => (
                        <tr key={idx} className="border-b hover:bg-muted/50">
                          <td className="p-3 text-sm font-mono">{item.token}</td>
                          <td className="p-3 text-sm">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                              {item.tag}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Table 3: N-gram & Perplexity */}
            <Card>
              <CardHeader>
                <CardTitle>📊 N-gram Language Model & Perplexity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold bg-muted">Model Type</th>
                        <th className="text-left p-3 font-semibold bg-muted">Tokens Used</th>
                        <th className="text-left p-3 font-semibold bg-muted">Perplexity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 text-sm font-semibold">{results.ngram.model}</td>
                        <td className="p-3 text-sm">{results.ngram.tokensUsed}</td>
                        <td className="p-3 text-sm">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded font-semibold">
                            {results.ngram.perplexity.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Table 4: NER & IE */}
            <Card>
              <CardHeader>
                <CardTitle>🔍 Named Entity Recognition & Information Extraction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Named Entities</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-semibold bg-muted">Entity Text</th>
                          <th className="text-left p-3 font-semibold bg-muted">Label</th>
                          <th className="text-left p-3 font-semibold bg-muted">Start</th>
                          <th className="text-left p-3 font-semibold bg-muted">End</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.ner.map((entity: any, idx: number) => (
                          <tr key={idx} className="border-b hover:bg-muted/50">
                            <td className="p-3 text-sm font-mono">{entity.text}</td>
                            <td className="p-3 text-sm">
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                                {entity.label}
                              </span>
                            </td>
                            <td className="p-3 text-sm">{entity.start}</td>
                            <td className="p-3 text-sm">{entity.end}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Information Extraction Summary</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(results.ie).map(([type, entities]: [string, any]) => (
                      <div key={type} className="p-4 bg-muted rounded-lg">
                        <div className="text-sm font-semibold text-muted-foreground mb-2">{type}</div>
                        <div className="text-2xl font-bold text-foreground">{entities.length}</div>
                        {entities.length > 0 && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            {entities.slice(0, 2).join(", ")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
