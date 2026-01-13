export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'school' | 'factory';
  district: string;
  riskLevel?: 'Low' | 'Medium' | 'High';
  pm25?: number; // Particulate Matter
  co2?: number;
  noise?: number; // dB
  description?: string;
}

export const CAIRO_CENTER = [30.0444, 31.2357];

export const DISTRICTS = [
  "Nasr City", "Maadi", "Zamalek", "Heliopolis", "Downtown", "Giza", "Dokki", "New Cairo"
];

// Helper to generate random coordinates around Cairo
const randomCoord = (center: number[], spread: number) => {
  return center[0] + (Math.random() - 0.5) * spread;
};

export const MOCK_SCHOOLS: Location[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `school-${i}`,
  name: `Green Valley School ${i + 1}`,
  lat: 30.0444 + (Math.random() - 0.5) * 0.2, // ~20km spread
  lng: 31.2357 + (Math.random() - 0.5) * 0.2,
  type: 'school',
  district: DISTRICTS[Math.floor(Math.random() * DISTRICTS.length)],
  riskLevel: Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low',
  pm25: Math.floor(Math.random() * 100),
  co2: 400 + Math.floor(Math.random() * 200),
  noise: 40 + Math.floor(Math.random() * 40),
  description: "A primary education institution focused on environmental awareness."
}));

export const MOCK_FACTORIES: Location[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `factory-${i}`,
  name: `Industrial Complex ${i + 1}`,
  lat: 30.0444 + (Math.random() - 0.5) * 0.25,
  lng: 31.2357 + (Math.random() - 0.5) * 0.25,
  type: 'factory',
  district: DISTRICTS[Math.floor(Math.random() * DISTRICTS.length)],
  riskLevel: 'High',
  pm25: 150 + Math.floor(Math.random() * 200),
  co2: 800 + Math.floor(Math.random() * 500),
  noise: 80 + Math.floor(Math.random() * 30),
  description: "Large scale manufacturing plant."
}));

export const ALL_LOCATIONS = [...MOCK_SCHOOLS, ...MOCK_FACTORIES];

export const ANALYTICS_DATA = [
  { name: 'Nasr City', risk: 65, schools: 12 },
  { name: 'Maadi', risk: 30, schools: 8 },
  { name: 'Zamalek', risk: 25, schools: 5 },
  { name: 'Heliopolis', risk: 45, schools: 10 },
  { name: 'Downtown', risk: 80, schools: 6 },
  { name: 'Giza', risk: 70, schools: 15 },
];

export const HISTORY_DATA = [
  { month: 'Jan', pm25: 45 },
  { month: 'Feb', pm25: 52 },
  { month: 'Mar', pm25: 48 },
  { month: 'Apr', pm25: 60 },
  { month: 'May', pm25: 55 },
  { month: 'Jun', pm25: 40 },
];
