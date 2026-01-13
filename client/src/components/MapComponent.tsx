import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Location } from '@/lib/mockData';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, Factory as FactoryIcon, School as SchoolIcon, ArrowRight } from 'lucide-react';
import MarkerClusterGroup from 'react-leaflet-cluster';

// Custom Marker Creator with SVG
const createCustomIcon = (type: 'school' | 'factory', color: string) => {
  const iconHtml = type === 'school' 
    ? `<div class="marker-container school-marker" style="color: ${color}; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2))">
         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-5"/></svg>
       </div>`
    : `<div class="marker-container factory-marker" style="color: ${color}; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2))">
         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M3 21h18" />
           <path d="M7 21V7l5 3V7l5 3V4a2 2 0 0 1 2-2h1a1 1 0 0 1 1 1v18" />
           <path d="M3 21l2-9h3l2 9" />
           <rect x="14" y="15" width="2" height="2" />
         </svg>
       </div>`;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const getSchoolColor = (risk?: string) => {
  switch (risk) {
    case 'High': return '#ef4444'; // Red
    case 'Medium': return '#f59e0b'; // Yellow/Amber
    default: return '#10b981'; // Green
  }
};

const getFactoryColor = (pm25?: number) => {
  if (!pm25) return '#ef4444';
  if (pm25 > 250) return '#7f1d1d'; // Dark Red
  if (pm25 > 150) return '#ef4444'; // Red
  if (pm25 > 100) return '#f59e0b'; // Yellow
  return '#10b981'; // Light Green
};

interface MapComponentProps {
    center: [number, number];
    zoom: number;
    locations: Location[];
    showSchools: boolean;
    showFactories: boolean;
    range: number; // in km
}

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom, { duration: 1.5 });
    }, [center, zoom, map]);
    return null;
}

export function MapComponent({ center, zoom, locations, showSchools, showFactories, range }: MapComponentProps) {
    
    const visibleLocations = locations.filter(loc => {
        if (loc.type === 'school' && !showSchools) return false;
        if (loc.type === 'factory' && !showFactories) return false;
        return true;
    });

    return (
        <div className="h-full w-full rounded-2xl overflow-hidden border border-border shadow-inner bg-slate-100 relative z-0">
            <style>{`
                .marker-container {
                    transition: transform 0.2s ease-out;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .marker-container:hover {
                    transform: scale(1.2);
                    z-index: 1000 !important;
                }
                .cluster-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s ease-out;
                }
                .cluster-container:hover {
                    transform: scale(1.1);
                }
                .cluster-count {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: white;
                    color: currentColor;
                    border: 2px solid currentColor;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                    font-weight: bold;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                .custom-leaflet-marker, .custom-cluster-marker {
                    background: transparent;
                    border: none;
                }
            `}</style>
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="h-full w-full z-0">
                <MapController center={center} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                
                <MarkerClusterGroup 
                    chunkedLoading
                    iconCreateFunction={(cluster: any) => {
                        const markers = cluster.getAllChildMarkers();
                        const count = markers.length;
                        const firstMarker = markers[0];
                        const iconOptions = (firstMarker.options.icon as L.DivIcon).options;
                        const htmlContent = String(iconOptions.html || '');
                        const isSchool = htmlContent.includes('school-marker');
                        
                        // Determine predominant risk color for the cluster
                        let color = '#10b981'; // Green default
                        if (htmlContent.includes('#ef4444') || htmlContent.includes('#7f1d1d')) color = '#ef4444';
                        else if (htmlContent.includes('#f59e0b')) color = '#f59e0b';

                        const iconHtml = isSchool
                            ? `<div class="cluster-container school-cluster" style="color: ${color}; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-5"/></svg>
                                 <span class="cluster-count">${count}</span>
                               </div>`
                            : `<div class="cluster-container factory-cluster" style="color: ${color}; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                   <path d="M3 21h18" />
                                   <path d="M7 21V7l5 3V7l5 3V4a2 2 0 0 1 2-2h1a1 1 0 0 1 1 1v18" />
                                   <path d="M3 21l2-9h3l2 9" />
                                 </svg>
                                 <span class="cluster-count">${count}</span>
                               </div>`;

                        return L.divIcon({
                            html: iconHtml,
                            className: 'custom-cluster-marker',
                            iconSize: [40, 40],
                        });
                    }}
                >
                    {visibleLocations.map((loc) => (
                        <Marker 
                            key={loc.id}
                            position={[loc.lat, loc.lng]} 
                            icon={createCustomIcon(
                              loc.type, 
                              loc.type === 'school' ? getSchoolColor(loc.riskLevel) : getFactoryColor(loc.pm25)
                            )}
                        >
                            <Popup className="custom-popup">
                                <div className="p-1 min-w-[200px]">
                                    <div className="flex items-center gap-2 mb-2">
                                        {loc.type === 'school' ? <SchoolIcon className="w-4 h-4 text-primary" /> : <FactoryIcon className="w-4 h-4 text-destructive" />}
                                        <h3 className="font-heading font-semibold text-sm">{loc.name}</h3>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-3">{loc.district} District</p>
                                    
                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div className="bg-slate-50 p-2 rounded border border-border">
                                            <span className="text-[10px] text-muted-foreground block uppercase tracking-wider">
                                              {loc.type === 'school' ? 'Risk' : 'Pollution'}
                                            </span>
                                            <Badge variant={loc.riskLevel === 'High' || (loc.pm25 && loc.pm25 > 150) ? 'destructive' : loc.riskLevel === 'Medium' ? 'secondary' : 'default'} className="mt-1 h-5 text-[10px] px-1.5">
                                                {loc.type === 'school' ? loc.riskLevel : (loc.pm25 && loc.pm25 > 150 ? 'High' : 'Moderate')}
                                            </Badge>
                                        </div>
                                        <div className="bg-slate-50 p-2 rounded border border-border">
                                            <span className="text-[10px] text-muted-foreground block uppercase tracking-wider">PM 2.5</span>
                                            <span className="text-xs font-mono font-medium">{loc.pm25} µg/m³</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3 p-2 bg-primary/5 rounded border border-primary/10">
                                      <p className="text-[10px] font-medium text-primary uppercase mb-1">Recommendation</p>
                                      <p className="text-[11px] leading-tight">
                                        {loc.type === 'school' 
                                          ? "Plant green barriers around perimeter and monitor air quality during rush hours."
                                          : "Implement advanced filtration systems and schedule heavy production for low-traffic hours."}
                                      </p>
                                    </div>
                                    
                                    <Button size="sm" variant="outline" className="w-full text-xs h-7">
                                        Details <ArrowRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>

                {visibleLocations.filter(l => l.type === 'factory').map(loc => (
                    <Circle 
                        key={`circle-${loc.id}`}
                        center={[loc.lat, loc.lng]}
                        radius={range * 100}
                        pathOptions={{ 
                            color: getFactoryColor(loc.pm25), 
                            fillColor: getFactoryColor(loc.pm25), 
                            fillOpacity: 0.1, 
                            weight: 1,
                            dashArray: '5, 5'
                        }} 
                    />
                ))}
            </MapContainer>
        </div>
    );
}
