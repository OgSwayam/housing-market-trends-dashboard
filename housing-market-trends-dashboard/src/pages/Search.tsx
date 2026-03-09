import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Filter, MapPin, Bed, Bath, Square, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function Search() {
  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ bedrooms: 'all', zipcode: 'all' });

  const fetchHouses = async () => {
    setLoading(true);
    try {
      const data = await api.searchHouses(filters);
      setHouses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, [filters]);

  return (
    <div className="flex flex-col h-full">
      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-end">
        <div className="w-full sm:flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-slate-700 mb-1">Bedrooms</label>
          <select 
            value={filters.bedrooms}
            onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Any Bedrooms</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>
        
        <div className="w-full sm:flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-slate-700 mb-1">Location (Zipcode)</label>
          <select 
            value={filters.zipcode}
            onChange={(e) => setFilters({ ...filters, zipcode: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Locations</option>
            <option value="98004">98004 (Bellevue)</option>
            <option value="98101">98101 (Downtown)</option>
            <option value="98052">98052 (Redmond)</option>
            <option value="98122">98122 (Capitol Hill)</option>
          </select>
        </div>

        <button 
          onClick={fetchHouses}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <SearchIcon className="w-4 h-4" />
          Search
        </button>
      </div>

      {/* Results Grid */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
            <p className="font-medium">Searching properties...</p>
          </div>
        ) : houses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500">
            <SearchIcon className="w-12 h-12 text-slate-300 mb-4" />
            <p className="font-medium text-lg">No properties found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
            {houses.map((house) => (
              <div key={house.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
                <div className="h-48 bg-slate-200 relative">
                  <img 
                    src={`https://picsum.photos/seed/house${house.id}/600/400`} 
                    alt="House" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-800 shadow-sm">
                    ${house.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    Zipcode: {house.zipcode}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-4">
                    <div className="flex flex-col items-center justify-center">
                      <Bed className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-sm font-semibold text-slate-700">{house.bedrooms}</span>
                      <span className="text-xs text-slate-500">Beds</span>
                    </div>
                    <div className="flex flex-col items-center justify-center border-l border-r border-slate-100">
                      <Bath className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-sm font-semibold text-slate-700">{house.bathrooms}</span>
                      <span className="text-xs text-slate-500">Baths</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <Square className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-sm font-semibold text-slate-700">{house.sqft_living}</span>
                      <span className="text-xs text-slate-500">SqFt</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
