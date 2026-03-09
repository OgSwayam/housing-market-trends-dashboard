import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis, Cell
} from 'recharts';
import { AlertCircle, Loader2, Filter } from 'lucide-react';
import { api } from '../services/api';

const formatCurrency = (val: number) => `$${(val / 1000).toFixed(0)}k`;

// Custom Shape for Box Plot using Recharts Bar
const BoxPlotShape = (props: any) => {
  const { x, y, width, height, payload } = props;
  const { min, q1, median, q3, max } = payload;
  
  if (max === min) return null;
  
  const scale = height / (max - min);
  const q3Y = y + (max - q3) * scale;
  const medY = y + (max - median) * scale;
  const q1Y = y + (max - q1) * scale;
  const minY = y + height;
  const maxY = y;
  const center = x + width / 2;

  return (
    <g>
      {/* Top Whisker */}
      <line x1={center - width/4} y1={maxY} x2={center + width/4} y2={maxY} stroke="#6366f1" strokeWidth={2} />
      {/* Bottom Whisker */}
      <line x1={center - width/4} y1={minY} x2={center + width/4} y2={minY} stroke="#6366f1" strokeWidth={2} />
      {/* Vertical Line */}
      <line x1={center} y1={maxY} x2={center} y2={minY} stroke="#6366f1" strokeWidth={2} strokeDasharray="3 3" />
      {/* IQR Box */}
      <rect x={x} y={q3Y} width={width} height={Math.max(q1Y - q3Y, 2)} fill="#818cf8" fillOpacity={0.7} stroke="#4f46e5" strokeWidth={2} />
      {/* Median Line */}
      <line x1={x} y1={medY} x2={x + width} y2={medY} stroke="#1e1b4b" strokeWidth={3} />
    </g>
  );
};

// Custom Tooltip for Box Plot
const BoxPlotTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg text-sm min-w-[150px]">
        <p className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">{label}</p>
        <div className="flex justify-between mb-1"><span className="text-slate-500">Max:</span> <span className="font-medium">{formatCurrency(data.max)}</span></div>
        <div className="flex justify-between mb-1"><span className="text-slate-500">Q3:</span> <span className="font-medium">{formatCurrency(data.q3)}</span></div>
        <div className="flex justify-between mb-1"><span className="text-indigo-600 font-semibold">Median:</span> <span className="font-bold text-indigo-600">{formatCurrency(data.median)}</span></div>
        <div className="flex justify-between mb-1"><span className="text-slate-500">Q1:</span> <span className="font-medium">{formatCurrency(data.q1)}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">Min:</span> <span className="font-medium">{formatCurrency(data.min)}</span></div>
      </div>
    );
  }
  return null;
};

const getHeatmapColor = (price: number) => {
  if (price > 1200000) return '#9f1239'; // rose-800
  if (price > 900000) return '#e11d48';  // rose-600
  if (price > 700000) return '#f59e0b';  // amber-500
  if (price > 500000) return '#10b981';  // emerald-500
  return '#3b82f6';                      // blue-500
};

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ zipcode: 'all', bedrooms: 'all' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await api.getAdvancedStats(filters);
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  return (
    <div className="space-y-6">
      
      {/* Dynamic Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2 text-slate-700 font-medium sm:mr-2">
          <Filter className="w-5 h-5 text-indigo-500" />
          Global Filters:
        </div>
        <select 
          value={filters.zipcode}
          onChange={(e) => setFilters(prev => ({ ...prev, zipcode: e.target.value }))}
          className="w-full sm:w-auto bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="all">All Zipcodes</option>
          <option value="98004">98004 (Bellevue)</option>
          <option value="98101">98101 (Downtown)</option>
          <option value="98052">98052 (Redmond)</option>
          <option value="98122">98122 (Capitol Hill)</option>
          <option value="98039">98039 (Medina)</option>
        </select>
        <select 
          value={filters.bedrooms}
          onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
          className="w-full sm:w-auto bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="all">Any Bedrooms</option>
          <option value="1">1 Bed</option>
          <option value="2">2 Beds</option>
          <option value="3">3 Beds</option>
          <option value="4">4 Beds</option>
          <option value="5">5+ Beds</option>
        </select>
      </div>

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
          <p className="font-medium">Updating visualizations...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-lg mb-1">Error Loading Dashboard</h3>
            <p>{error}</p>
          </div>
        </div>
      ) : data.scatter.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-sm text-center">
          <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800">No Data Found</h3>
          <p className="text-slate-500">Try adjusting your filters to see results.</p>
        </div>
      ) : (
        <>
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. Scatter Plot */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">1. Price vs Square Footage</h2>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis type="number" dataKey="sqft" name="SqFt" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis type="number" dataKey="price" name="Price" tickFormatter={formatCurrency} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }} 
                      formatter={(value: number, name: string) => name === 'Price' ? `$${value.toLocaleString()}` : value} 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Scatter name="Properties" data={data.scatter} fill="#6366f1" fillOpacity={0.5} />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 2. Histogram */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">2. Price Distribution</h2>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.histogram} margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="binLabel" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{fill: '#f1f5f9'}} 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Bar dataKey="count" name="Properties" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 4. Box Plot */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">4. Price by Bedrooms (Box Plot)</h2>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.boxplot} margin={{ top: 10, right: 10, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="bedrooms" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tickFormatter={formatCurrency} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<BoxPlotTooltip />} cursor={{fill: '#f1f5f9'}} />
                    <Bar dataKey="range" shape={<BoxPlotShape />} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 5. Yearly Trend */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">5. Yearly Price Trends</h2>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.yearly} margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tickFormatter={formatCurrency} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Avg Price']} 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Line type="monotone" dataKey="avgPrice" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Row 3: Heatmap */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-lg font-semibold text-slate-800">3. Location Price Heatmap</h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <span>$300k</span>
                <div className="w-24 sm:w-32 h-2.5 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 to-rose-800"></div>
                <span>$1.2M+</span>
              </div>
            </div>
            <div className="h-72 sm:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="lng" name="Longitude" domain={['dataMin', 'dataMax']} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis type="number" dataKey="lat" name="Latitude" domain={['dataMin', 'dataMax']} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <ZAxis type="number" dataKey="price" range={[40, 400]} name="Price" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(value: number, name: string, props: any) => {
                      if (name === 'Price') return [`$${value.toLocaleString()}`, 'Price'];
                      return [value.toFixed(4), name];
                    }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Scatter name="Properties" data={data.heatmap} fillOpacity={0.8}>
                    {data.heatmap.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={getHeatmapColor(entry.price)} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
