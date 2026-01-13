import React from 'react';
import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { PollutionChart } from "@/components/PollutionChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_SCHOOLS, MOCK_FACTORIES, ANALYTICS_DATA, HISTORY_DATA } from "@/lib/mockData";
import { AlertTriangle, School, Factory, Wind, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';

export default function Dashboard() {
  const highRiskSchools = MOCK_SCHOOLS.filter(s => s.riskLevel === 'High').length;
  const mediumRiskSchools = MOCK_SCHOOLS.filter(s => s.riskLevel === 'Medium').length;
  
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Cairo Environmental Dashboard</h1>
            <p className="text-muted-foreground mt-1">Real-time overview of school safety and industrial impact.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/map">
               <Button>
                 View Live Map <ExternalLink className="w-4 h-4 ml-2" />
               </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Schools Monitored" 
            value={MOCK_SCHOOLS.length} 
            icon={<School className="w-5 h-5" />}
            description="Across 8 districts"
            trend="up"
            trendValue="+2"
          />
          <StatsCard 
            title="High Risk Schools" 
            value={highRiskSchools} 
            icon={<AlertTriangle className="w-5 h-5" />}
            description="Requires immediate attention"
            trend="down"
            trendValue="-5%"
            className="border-destructive/20 bg-destructive/5"
          />
          <StatsCard 
            title="Active Factories" 
            value={MOCK_FACTORIES.length} 
            icon={<Factory className="w-5 h-5" />}
            description="Industrial zones mapped"
            trend="neutral"
            trendValue="0"
          />
          <StatsCard 
            title="Avg PM2.5 Level" 
            value="42 µg/m³" 
            icon={<Wind className="w-5 h-5" />}
            description="Moderate air quality today"
            trend="up"
            trendValue="+4%"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Main Chart */}
          <div className="lg:col-span-2 h-[400px]">
            <PollutionChart 
              title="Pollution Risk by District" 
              description="Average risk score (0-100) calculated from proximity to factories and sensor data."
              data={ANALYTICS_DATA} 
              type="bar" 
              dataKey="risk" 
              categoryKey="name" 
              color="hsl(var(--primary))"
            />
          </div>

          {/* Side Panels */}
          <div className="space-y-6">
             <Card>
                <CardHeader>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>High pollution events detected</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                      <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">High PM2.5 at Nasr City</p>
                        <p className="text-xs text-muted-foreground">2 hours ago • Near Factory Zone A</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
             </Card>

             <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-none">
                <CardContent className="pt-6">
                   <h3 className="font-heading font-semibold text-lg mb-2">Green Initiative</h3>
                   <p className="text-sm text-muted-foreground mb-4">
                     Join our campaign to plant 10,000 trees around high-risk schools in Cairo.
                   </p>
                   <Button variant="outline" className="w-full bg-background/50 backdrop-blur-sm">Learn More</Button>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
