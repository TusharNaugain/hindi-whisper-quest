import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatasetOverview } from "@/components/DatasetOverview";
import { TrainingDashboard } from "@/components/TrainingDashboard";
import { EvaluationResults } from "@/components/EvaluationResults";
import { Brain, Database, Target } from "lucide-react";

const Index = () => {
  // Mock data for demonstration
  const datasetStats = {
    totalRecordings: 8500,
    totalDuration: 36000, // 10 hours in seconds
    uniqueSpeakers: 125,
    avgDuration: 4.2,
    processedCount: 8500
  };

  const trainingMetrics = {
    epoch: 5,
    totalEpochs: 10,
    loss: 0.85,
    learningRate: 1e-5,
    timeElapsed: 18000, // 5 hours
    estimatedTimeRemaining: 18000, // 5 hours
    status: 'training' as const
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-neural">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Hindi ASR Research Dashboard</h1>
              <p className="text-xs text-muted-foreground">
                Whisper Fine-tuning & Evaluation Platform
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Training Active</span>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="dataset" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="dataset" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Dataset Overview
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Training Dashboard
            </TabsTrigger>
            <TabsTrigger value="evaluation" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Evaluation Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dataset" className="mt-6">
            <DatasetOverview stats={datasetStats} />
          </TabsContent>
          
          <TabsContent value="training" className="mt-6">
            <TrainingDashboard metrics={trainingMetrics} />
          </TabsContent>
          
          <TabsContent value="evaluation" className="mt-6">
            <EvaluationResults />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;