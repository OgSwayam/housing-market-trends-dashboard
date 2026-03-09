import { delay } from '../utils';

// Generate a larger, more realistic dataset for advanced visualizations
const ADVANCED_HOUSES = Array.from({ length: 800 }, (_, i) => {
  const zipcode = ['98052', '98101', '98122', '98004', '98039'][Math.floor(Math.random() * 5)];
  const bedrooms = Math.floor(Math.random() * 5) + 1;
  const sqft = Math.floor(Math.random() * 3000) + 800 + (bedrooms * 300);
  const year = 2010 + Math.floor(Math.random() * 15);
  
  let basePrice = 300000;
  let latBase = 47.5;
  let lngBase = -122.4;
  
  if (zipcode === '98004') { basePrice = 800000; latBase = 47.61; lngBase = -122.20; }
  if (zipcode === '98101') { basePrice = 600000; latBase = 47.60; lngBase = -122.33; }
  if (zipcode === '98122') { basePrice = 550000; latBase = 47.61; lngBase = -122.30; }
  if (zipcode === '98052') { basePrice = 450000; latBase = 47.67; lngBase = -122.12; }
  if (zipcode === '98039') { basePrice = 1200000; latBase = 47.62; lngBase = -122.23; }

  const price = basePrice + (sqft * 200) + (bedrooms * 25000) + (Math.random() * 150000);
  
  return {
    id: i,
    zipcode,
    bedrooms,
    sqft_living: sqft,
    price,
    year,
    latitude: latBase + (Math.random() * 0.05 - 0.025),
    longitude: lngBase + (Math.random() * 0.05 - 0.025),
  };
});

export const api = {
  async getAdvancedStats(filters: { zipcode: string, bedrooms: string }) {
    await delay(600);
    
    // Apply filters
    let filtered = ADVANCED_HOUSES;
    if (filters.zipcode !== 'all') {
      filtered = filtered.filter(h => h.zipcode === filters.zipcode);
    }
    if (filters.bedrooms !== 'all') {
      const beds = parseInt(filters.bedrooms);
      filtered = filtered.filter(h => beds === 5 ? h.bedrooms >= 5 : h.bedrooms === beds);
    }

    if (filtered.length === 0) {
      return { scatter: [], histogram: [], heatmap: [], boxplot: [], yearly: [] };
    }

    // 1. Scatter Plot (Price vs Sqft)
    const scatter = filtered.map(h => ({ sqft: h.sqft_living, price: h.price }));

    // 2. Histogram (Price Distribution)
    const bins = [0, 400000, 600000, 800000, 1000000, 1500000, 2000000];
    const histMap = new Map();
    bins.forEach(b => histMap.set(b, 0));
    filtered.forEach(h => {
      const bin = bins.slice().reverse().find(b => h.price >= b) || 0;
      histMap.set(bin, histMap.get(bin) + 1);
    });
    const histogram = Array.from(histMap.entries()).map(([bin, count]) => {
      let label = `$${bin/1000}k+`;
      if (bin === 0) label = '< $400k';
      return { binLabel: label, count };
    }).filter(b => b.count > 0);

    // 3. Heatmap
    const heatmap = filtered.map(h => ({ lat: h.latitude, lng: h.longitude, price: h.price }));

    // 4. Boxplot (Bedrooms vs Price)
    const bedsMap = new Map();
    filtered.forEach(h => {
      const key = h.bedrooms >= 5 ? '5+' : h.bedrooms.toString();
      if (!bedsMap.has(key)) bedsMap.set(key, []);
      bedsMap.get(key).push(h.price);
    });
    const boxplot = Array.from(bedsMap.entries()).map(([beds, prices]) => {
      prices.sort((a, b) => a - b);
      const min = prices[0];
      const max = prices[prices.length - 1];
      const q1 = prices[Math.floor(prices.length * 0.25)];
      const median = prices[Math.floor(prices.length * 0.5)];
      const q3 = prices[Math.floor(prices.length * 0.75)];
      return { 
        bedrooms: `${beds} Bed${beds === '1' ? '' : 's'}`, 
        min, q1, median, q3, max, 
        range: [min, max] // Needed for Recharts Bar to scale correctly
      };
    }).sort((a, b) => a.bedrooms.localeCompare(b.bedrooms));

    // 5. Yearly Trend
    const yearMap = new Map();
    filtered.forEach(h => {
      if (!yearMap.has(h.year)) yearMap.set(h.year, { sum: 0, count: 0 });
      const d = yearMap.get(h.year);
      d.sum += h.price;
      d.count += 1;
    });
    const yearly = Array.from(yearMap.entries()).map(([year, d]) => ({
      year: year.toString(), 
      avgPrice: d.sum / d.count
    })).sort((a, b) => parseInt(a.year) - parseInt(b.year));

    return { scatter, histogram, heatmap, boxplot, yearly };
  },

  // Keep existing methods for other pages
  async searchHouses(filters: { bedrooms?: string, zipcode?: string }) {
    await delay(600);
    let results = [...ADVANCED_HOUSES];
    if (filters.bedrooms && filters.bedrooms !== 'all') {
      const beds = parseInt(filters.bedrooms);
      results = results.filter(h => beds === 5 ? h.bedrooms >= 5 : h.bedrooms === beds);
    }
    if (filters.zipcode && filters.zipcode !== 'all') {
      results = results.filter(h => h.zipcode === filters.zipcode);
    }
    return results.slice(0, 50); // Limit for UI performance
  },

  async predictPrice(data: { bedrooms: number, bathrooms: number, sqft_living: number, zipcode: string }) {
    await delay(1200);
    const base = 200000;
    const bedVal = data.bedrooms * 50000;
    const bathVal = data.bathrooms * 25000;
    const sqftVal = data.sqft_living * 150;
    const zipMultiplier = data.zipcode === '98004' ? 1.5 : data.zipcode === '98039' ? 2.0 : 1.0;
    return (base + bedVal + bathVal + sqftVal) * zipMultiplier;
  },

  async uploadDataset(file: File) {
    await delay(2000);
    if (!file.name.endsWith('.csv')) throw new Error('Invalid file format. Please upload a CSV.');
    return { success: true, rowsProcessed: 21435 };
  }
};
