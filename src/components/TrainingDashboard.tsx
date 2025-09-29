import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Play, Pause, Square, Settings, TrendingUp } from "lucide-react";


interface TrainingMetrics {
  epoch: number;
  totalEpochs: number;
  loss: number;
  learningRate: number;
  timeElapsed: number;
  estimatedTimeRemaining: number;
  status: 'idle' | 'training' | 'paused' | 'completed';
}

interface TrainingDashboardProps {
  metrics: TrainingMetrics;
}

const lossData = [
  { epoch: 0, loss: 2.45, val_loss: 2.52 },
  { epoch: 1, loss: 1.89, val_loss: 1.95 },
  { epoch: 2, loss: 1.42, val_loss: 1.48 },
  { epoch: 3, loss: 1.18, val_loss: 1.25 },
  { epoch: 4, loss: 0.98, val_loss: 1.09 },
  { epoch: 5, loss: 0.85, val_loss: 0.96 },
];

export const TrainingDashboard = ({ metrics }: TrainingDashboardProps) => {
  const progress = (metrics.epoch / metrics.totalEpochs) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'training': return 'success';
      case 'paused': return 'warning';
      case 'completed': return 'default';
      default: return 'secondary';
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Whisper Fine-tuning</h2>
          <p className="text-muted-foreground">
            Training progress and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Config
          </Button>
          {metrics.status === 'training' ? (
            <Button variant="warning" size="sm">
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </Button>
          ) : metrics.status === 'paused' ? (
            <Button variant="success" size="sm">
              <Play className="mr-2 h-4 w-4" />
              Resume
            </Button>
          ) : (
            <Button variant="neural" size="sm">
              <Play className="mr-2 h-4 w-4" />
              Start Training
            </Button>
          )}
          <Button variant="destructive" size="sm">
            <Square className="mr-2 h-4 w-4" />
            Stop
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={getStatusColor(metrics.status) as any} className="mb-2">
              {metrics.status.toUpperCase()}
            </Badge>
            <p className="text-xs text-muted-foreground">
              Model: whisper-small
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Loss</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.loss.toFixed(4)}</div>
            <p className="text-xs text-muted-foreground">
              Training loss
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Rate</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.learningRate.toExponential(1)}</div>
            <p className="text-xs text-muted-foreground">
              Current LR
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Remaining</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTime(metrics.estimatedTimeRemaining)}
            </div>
            <p className="text-xs text-muted-foreground">
              Estimated
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Training Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Epoch {metrics.epoch} / {metrics.totalEpochs}
            </span>
            <Badge variant="outline">
              {progress.toFixed(1)}%
            </Badge>
          </div>
          <Progress value={progress} className="w-full" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Elapsed: {formatTime(metrics.timeElapsed)}</span>
            <span>Remaining: {formatTime(metrics.estimatedTimeRemaining)}</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="loss" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="loss">Loss Curves</TabsTrigger>
          <TabsTrigger value="hyperparams">Hyperparameters</TabsTrigger>
          <TabsTrigger value="logs">Training Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="loss" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training & Validation Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      Training Loss
                    </div>
                    <div className="text-2xl font-bold">0.85</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive"></div>
                      Validation Loss
                    </div>
                    <div className="text-2xl font-bold">0.96</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Loss progression over epochs:</div>
                  <div className="flex items-end gap-1 h-20">
                    {lossData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center gap-1 flex-1">
                        <div className="bg-primary rounded-t" style={{ height: `${(2.5 - data.loss) * 20}px`, minHeight: '4px' }}></div>
                        <div className="text-xs text-muted-foreground">{data.epoch}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hyperparams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Batch Size</div>
                  <div className="text-lg font-bold">16</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Learning Rate</div>
                  <div className="text-lg font-bold">1e-5</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Optimizer</div>
                  <div className="text-lg font-bold">AdamW</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Scheduler</div>
                  <div className="text-lg font-bold">Linear</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Warmup Steps</div>
                  <div className="text-lg font-bold">500</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Max Length</div>
                  <div className="text-lg font-bold">448</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Training Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm font-mono">
                <div className="text-success">[2024-01-15 14:32:15] Epoch 5/10 - Step 1250/2500</div>
                <div className="text-muted-foreground">[2024-01-15 14:32:10] Loss: 0.8524, Val Loss: 0.9612</div>
                <div className="text-muted-foreground">[2024-01-15 14:32:05] Learning rate: 8.5e-06</div>
                <div className="text-info">[2024-01-15 14:32:00] Saving checkpoint...</div>
                <div className="text-muted-foreground">[2024-01-15 14:31:55] Batch processed: 1249/2500</div>
                <div className="text-warning">[2024-01-15 14:31:50] GPU memory: 85% utilized</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};