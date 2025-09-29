import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileAudio, Users, Clock, Database, Download, Play } from "lucide-react";

interface DatasetStats {
  totalRecordings: number;
  totalDuration: number;
  uniqueSpeakers: number;
  avgDuration: number;
  processedCount: number;
}

interface DatasetOverviewProps {
  stats: DatasetStats;
}

export const DatasetOverview = ({ stats }: DatasetOverviewProps) => {
  const processedPercentage = (stats.processedCount / stats.totalRecordings) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hindi ASR Dataset</h2>
          <p className="text-muted-foreground">
            Training data overview and preprocessing status
          </p>
        </div>
        <Button variant="neural" size="lg">
          <Download className="mr-2 h-4 w-4" />
          Export Preprocessed Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recordings</CardTitle>
            <FileAudio className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRecordings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Audio files ready for training
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(stats.totalDuration / 3600).toFixed(1)}h
            </div>
            <p className="text-xs text-muted-foreground">
              ~{Math.round(stats.totalDuration / 60)} minutes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Speakers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueSpeakers}</div>
            <p className="text-xs text-muted-foreground">
              Diverse voice profiles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgDuration.toFixed(1)}s</div>
            <p className="text-xs text-muted-foreground">
              Per recording
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Preprocessing Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {stats.processedCount} / {stats.totalRecordings} files processed
            </span>
            <Badge variant={processedPercentage === 100 ? "default" : "secondary"}>
              {processedPercentage.toFixed(1)}%
            </Badge>
          </div>
          <Progress value={processedPercentage} className="w-full" />
        </CardContent>
      </Card>

      <Tabs defaultValue="distribution" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="distribution">Duration Distribution</TabsTrigger>
          <TabsTrigger value="speakers">Speaker Distribution</TabsTrigger>
          <TabsTrigger value="quality">Audio Quality</TabsTrigger>
        </TabsList>
        
        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audio Duration Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-success">2,456</div>
                  <div className="text-sm text-muted-foreground">0-5s</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-info">3,721</div>
                  <div className="text-sm text-muted-foreground">5-10s</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-warning">1,892</div>
                  <div className="text-sm text-muted-foreground">10-15s</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-destructive">431</div>
                  <div className="text-sm text-muted-foreground">15s+</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="speakers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Speaker Contribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Top 10 speakers</span>
                  <span className="text-sm text-muted-foreground">65% of data</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gender distribution</span>
                  <span className="text-sm text-muted-foreground">52% F / 48% M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Age groups</span>
                  <span className="text-sm text-muted-foreground">18-65 years</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audio Quality Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Sample Rate</div>
                  <div className="text-2xl font-bold">16 kHz</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Bit Depth</div>
                  <div className="text-2xl font-bold">16-bit</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">SNR Range</div>
                  <div className="text-2xl font-bold">15-45 dB</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Format</div>
                  <div className="text-2xl font-bold">WAV</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};