import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Target, TrendingDown, Award, FileText, Download } from "lucide-react";

interface WERResult {
  model: string;
  wer: number;
  cer: number;
  bleu: number;
  samples: number;
  duration: string;
}

const werResults: WERResult[] = [
  {
    model: "Whisper-small (Baseline)",
    wer: 24.8,
    cer: 12.3,
    bleu: 71.2,
    samples: 500,
    duration: "2h 15m"
  },
  {
    model: "Whisper-small (Fine-tuned)",
    wer: 18.6,
    cer: 9.1,
    bleu: 78.4,
    samples: 500,
    duration: "2h 15m"
  }
];

const errorBreakdown = [
  { category: "Substitution", baseline: 45, finetuned: 32 },
  { category: "Deletion", baseline: 28, finetuned: 22 },
  { category: "Insertion", baseline: 27, finetuned: 18 }
];

const domainPerformance = [
  { domain: "Conversational", baseline_wer: 28.5, finetuned_wer: 20.3 },
  { domain: "Read Speech", baseline_wer: 18.2, finetuned_wer: 14.1 },
  { domain: "Spontaneous", baseline_wer: 32.1, finetuned_wer: 24.8 },
  { domain: "Noisy", baseline_wer: 41.3, finetuned_wer: 29.7 }
];



export const EvaluationResults = () => {
  const improvement = ((werResults[0].wer - werResults[1].wer) / werResults[0].wer * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Evaluation Results</h2>
          <p className="text-muted-foreground">
            Performance comparison on FLEURS Hindi test set
          </p>
        </div>
        <Button variant="neural" size="lg">
          <Download className="mr-2 h-4 w-4" />
          Export Results
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best WER</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{werResults[1].wer}%</div>
            <p className="text-xs text-muted-foreground">
              Fine-tuned model
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">-{improvement.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              WER reduction
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best BLEU</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{werResults[1].bleu}</div>
            <p className="text-xs text-muted-foreground">
              BLEU score
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Test Samples</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{werResults[0].samples}</div>
            <p className="text-xs text-muted-foreground">
              FLEURS test set
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Model Comparison Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>WER (%)</TableHead>
                <TableHead>CER (%)</TableHead>
                <TableHead>BLEU</TableHead>
                <TableHead>Test Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {werResults.map((result, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{result.model}</TableCell>
                  <TableCell>
                    <Badge variant={index === 1 ? "success" : "secondary"}>
                      {result.wer}%
                    </Badge>
                  </TableCell>
                  <TableCell>{result.cer}%</TableCell>
                  <TableCell>{result.bleu}</TableCell>
                  <TableCell>{result.duration}</TableCell>
                  <TableCell>
                    <Badge variant={index === 1 ? "success" : "outline"}>
                      {index === 1 ? "Best" : "Baseline"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Tabs defaultValue="domain" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="domain">Domain Analysis</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
          <TabsTrigger value="examples">Sample Outputs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="domain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Domain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {domainPerformance.map((domain, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{domain.domain}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">Baseline: {domain.baseline_wer}%</span>
                        <span className="text-success font-medium">Fine-tuned: {domain.finetuned_wer}%</span>
                      </div>
                    </div>
                    <div className="flex gap-2 h-4">
                      <div 
                        className="bg-muted rounded-l"
                        style={{ width: `${domain.baseline_wer}%` }}
                      ></div>
                      <div 
                        className="bg-primary rounded-r"
                        style={{ width: `${domain.finetuned_wer}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Error Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {errorBreakdown.map((error, index) => {
                    const total = errorBreakdown.reduce((sum, item) => sum + item.finetuned, 0);
                    const percentage = (error.finetuned / total * 100);
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{error.category}</span>
                          <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${index === 0 ? 'bg-primary' : index === 1 ? 'bg-success' : 'bg-warning'}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Reduction by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {errorBreakdown.map((error, index) => {
                    const reduction = ((error.baseline - error.finetuned) / error.baseline * 100);
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{error.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{error.baseline} → {error.finetuned}</span>
                          <Badge variant="success">-{reduction.toFixed(1)}%</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sample Transcription Comparisons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Sample 1</div>
                  <div className="grid gap-2 text-sm">
                    <div><span className="font-medium">Reference:</span> मैं आज बाजार जा रहा हूँ</div>
                    <div><span className="font-medium">Baseline:</span> मैं आज बाज़ार जा रहा हु</div>
                    <div><span className="font-medium text-success">Fine-tuned:</span> मैं आज बाजार जा रहा हूँ</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Sample 2</div>
                  <div className="grid gap-2 text-sm">
                    <div><span className="font-medium">Reference:</span> यह किताब बहुत अच्छी है</div>
                    <div><span className="font-medium">Baseline:</span> यह किताब बहुत अछी है</div>
                    <div><span className="font-medium text-success">Fine-tuned:</span> यह किताब बहुत अच्छी है</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Sample 3</div>
                  <div className="grid gap-2 text-sm">
                    <div><span className="font-medium">Reference:</span> क्या आप हिंदी बोल सकते हैं</div>
                    <div><span className="font-medium">Baseline:</span> क्या आप हिन्दी बोल सकते है</div>
                    <div><span className="font-medium text-success">Fine-tuned:</span> क्या आप हिंदी बोल सकते हैं</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};