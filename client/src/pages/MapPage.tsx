import React, { useState } from 'react';
import { Layout } from "@/components/Layout";
import { MapComponent } from "@/components/MapComponent";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CAIRO_CENTER, ALL_LOCATIONS } from "@/lib/mockData";
import { RefreshCcw, Layers, Filter, Map as MapIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function MapPage() {
  const [range, setRange] = useState([5]); // km
  const [showSchools, setShowSchools] = useState(true);
  const [showFactories, setShowFactories] = useState(true);
  const [showTraffic, setShowTraffic] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  
  // Reset Function
  const handleReset = () => {
    setRange([5]);
    setShowSchools(true);
    setShowFactories(true);
    setShowTraffic(false);
    // Force map re-render or flyTo center (handled by prop change)
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-8rem)] gap-4 relative">
        {/* Floating Controls Panel */}
        <div className="absolute top-4 left-4 z-10 w-80 max-h-[calc(100%-2rem)] flex flex-col gap-2">
           <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen} className="space-y-2">
             <Card className="border-border shadow-lg bg-background/95 backdrop-blur-sm">
                <div className="p-4 flex items-center justify-between border-b border-border">
                   <div className="flex items-center gap-2 font-heading font-semibold text-sm">
                      <Filter className="w-4 h-4 text-primary" />
                      Map Filters
                   </div>
                   <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {isFiltersOpen ? "−" : "+"}
                      </Button>
                   </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent>
                  <CardContent className="space-y-6 pt-4">
                    {/* Layer Toggles */}
                    <div className="space-y-4">
                      <Label className="text-xs uppercase text-muted-foreground font-semibold tracking-wider flex items-center gap-2">
                        <Layers className="w-3 h-3" /> Layers
                      </Label>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="schools" className="flex items-center gap-2 cursor-pointer">
                           <span className="h-2 w-2 rounded-full bg-green-500 block"></span>
                           Schools
                        </Label>
                        <Switch id="schools" checked={showSchools} onCheckedChange={setShowSchools} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="factories" className="flex items-center gap-2 cursor-pointer">
                           <span className="h-2 w-2 rounded-full bg-red-500 block"></span>
                           Factories
                        </Label>
                        <Switch id="factories" checked={showFactories} onCheckedChange={setShowFactories} />
                      </div>

                      <div className="flex items-center justify-between opacity-50 cursor-not-allowed" title="Coming soon">
                        <Label htmlFor="traffic" className="flex items-center gap-2">
                           <span className="h-2 w-2 rounded-full bg-orange-400 block"></span>
                           Traffic (Beta)
                        </Label>
                        <Switch id="traffic" checked={showTraffic} onCheckedChange={setShowTraffic} disabled />
                      </div>
                    </div>

                    <Separator />

                    {/* Distance Filter */}
                    <div className="space-y-4">
                       <div className="flex items-center justify-between">
                          <Label className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">
                            Pollution Range
                          </Label>
                          <Badge variant="outline">{range[0]} km</Badge>
                       </div>
                       <Slider 
                          value={range} 
                          onValueChange={setRange} 
                          max={20} 
                          step={1} 
                          className="py-4"
                       />
                       <p className="text-[10px] text-muted-foreground">
                         Visualizes the impact zone of industrial areas.
                       </p>
                    </div>

                    <Separator />

                    <Button variant="secondary" size="sm" className="w-full" onClick={handleReset}>
                       <RefreshCcw className="w-3 h-3 mr-2" /> Reset View
                    </Button>
                  </CardContent>
                </CollapsibleContent>
             </Card>
           </Collapsible>
        </div>

        {/* The Map */}
        <div className="flex-1 h-full rounded-2xl overflow-hidden shadow-sm border border-border">
           <MapComponent 
              center={CAIRO_CENTER as [number, number]} 
              zoom={11}
              locations={ALL_LOCATIONS}
              showSchools={showSchools}
              showFactories={showFactories}
              range={range[0]}
           />
        </div>
      </div>
    </Layout>
  );
}
