import React from 'react';
import { Layout } from "@/components/Layout";
import { PollutionChart } from "@/components/PollutionChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_DATA, HISTORY_DATA } from "@/lib/mockData";
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Analytics() {
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
             <h1 className="text-3xl font-heading font-bold">Analytics & Reports</h1>
             <p className="text-muted-foreground mt-1">Detailed breakdown of environmental data across Cairo districts.</p>
          </div>
          <Button variant="outline">
             <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
           <PollutionChart 
              title="Risk Distribution by District" 
              description="Comparative analysis of risk scores based on school proximity to industrial zones."
              data={ANALYTICS_DATA} 
              type="bar" 
              dataKey="risk" 
              categoryKey="name" 
              color="hsl(var(--chart-1))"
           />
           <PollutionChart 
              title="Historical PM2.5 Trends" 
              description="Average particulate matter concentration over the last 6 months."
              data={HISTORY_DATA} 
              type="area" 
              dataKey="pm25" 
              categoryKey="month" 
              color="hsl(var(--chart-2))"
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Card className="col-span-1">
             <CardHeader>
               <CardTitle>Top At-Risk Areas</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 {ANALYTICS_DATA.slice(0, 3).sort((a,b) => b.risk - a.risk).map((item, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
                           <div className="h-full bg-destructive" style={{ width: `${item.risk}%` }} />
                        </div>
                        <span className="text-xs font-mono w-8 text-right">{item.risk}%</span>
                      </div>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>

           <Card className="col-span-1 md:col-span-2">
             <CardHeader>
               <CardTitle>School vs Factory Density</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                       <p className="text-sm text-muted-foreground mb-1">Total Schools</p>
                       <p className="text-2xl font-bold">142</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                       <p className="text-sm text-muted-foreground mb-1">Total Factories</p>
                       <p className="text-2xl font-bold text-destructive">28</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                       <p className="text-sm text-muted-foreground mb-1">Avg Distance</p>
                       <p className="text-2xl font-bold text-primary">4.2 km</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                       <p className="text-sm text-muted-foreground mb-1">Safe Zones</p>
                       <p className="text-2xl font-bold text-green-600">65%</p>
                    </div>
                 </div>
               </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </Layout>
  );
}
