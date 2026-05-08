import React, { useState, useEffect } from "react";
import { 
  Search, 
  MapPin, 
  Star, 
  ChevronRight, 
  Filter,
  ArrowLeft,
  X
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Explore() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCategory = location.state?.category || "";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [caterers, setCaterers] = useState<any[]>([]);
  const [filteredCaterers, setFilteredCaterers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    const mockCaterers = [
      { id: "1", name: "Kitchen Cuisine", rating: 4.8, reviews: 124, price: 1200, specialty: "Traditional Biryani & BBQ", category: "Dawat", area: "DHA Phase 6", image: "https://images.unsplash.com/photo-1563379091339-03b21ce4a4f8?q=80&w=800&auto=format&fit=crop" },
      { id: "2", name: "Abid Caterers", rating: 4.9, reviews: 540, price: 1500, specialty: "Authentic Mughlai Dawat", category: "Dawat", area: "Clifton", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop" },
      { id: "3", name: "Lal Qila Catering", rating: 4.7, reviews: 210, price: 1800, specialty: "Mughlai & Live BBQ", category: "BBQ", area: "SMCHS", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" },
      { id: "4", name: "Pie in the Sky", rating: 4.6, reviews: 89, price: 900, specialty: "Birthday Cakes & Hi-Tea", category: "Birthday", area: "Gulshan", image: "https://images.unsplash.com/photo-1535141194574-8d6f19092400?q=80&w=800&auto=format&fit=crop" },
      { id: "9", name: "Tayyabi Catering", rating: 4.7, reviews: 430, price: 1350, specialty: "Traditional Wedding Menu", category: "Mehndi", area: "North Nazimabad", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop" }
    ];
    setCaterers(mockCaterers);
    
    // Initial filter if category exists
    if (initialCategory) {
      const filtered = mockCaterers.filter(c => c.category === initialCategory);
      setFilteredCaterers(filtered);
    } else {
      setFilteredCaterers(mockCaterers);
    }
    setLoading(false);
  }, [initialCategory]);

  const handleSearch = (query: string, category: string) => {
    setSearchQuery(query);
    let result = caterers;
    
    if (category) {
      result = result.filter(c => c.category === category);
    }
    
    if (query) {
      result = result.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) || 
        c.specialty.toLowerCase().includes(query.toLowerCase()) ||
        c.area.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredCaterers(result);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setFilteredCaterers(caterers);
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-32">
      {/* Header */}
      <header className="bg-white px-6 pt-12 pb-6 border-b border-brand-beige sticky top-0 z-30">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate("/")} className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-charcoal/5">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-display text-2xl font-black text-brand-charcoal">Explore <span className="text-brand-green">Services</span></h1>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search size={20} className="text-brand-charcoal/30" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value, selectedCategory)}
            placeholder="Search Mughlai, BBQ, Biryani..."
            className="w-full rounded-[24px] border-2 border-brand-beige bg-white p-4 pl-12 font-bold text-brand-charcoal outline-none focus:border-brand-green focus:shadow-lg transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => handleSearch("", selectedCategory)}
              className="absolute inset-y-0 right-12 flex items-center text-brand-charcoal/20 hover:text-brand-charcoal"
            >
              <X size={16} />
            </button>
          )}
          <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-brand-green">
            <Filter size={20} />
          </button>
        </div>

        {selectedCategory && (
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="flex items-center gap-2 rounded-full bg-brand-green/10 px-4 py-2 border border-brand-green/20">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-green">{selectedCategory}</span>
              <button 
                onClick={clearFilters}
                className="text-brand-green hover:bg-brand-green/20 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </div>
            {(searchQuery || selectedCategory) && (
              <button 
                onClick={clearFilters}
                className="text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-widest hover:text-brand-charcoal"
              >
                Clear All
              </button>
            )}
          </div>
        )}
      </header>

      {/* Results */}
      <main className="px-6 mt-8 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal/40">
            Showing {filteredCaterers.length} {filteredCaterers.length === 1 ? 'Caterer' : 'Caterers'}
          </p>
        </div>

        {filteredCaterers.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => navigate(`/caterer/${cat.id}`)}
            className="group relative overflow-hidden rounded-[40px] bg-white border border-brand-beige shadow-sm hover:shadow-xl transition-all"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="relative h-48 w-full sm:w-40 shrink-0 overflow-hidden">
                <img src={cat.image} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-6 flex-grow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-brand-charcoal">{cat.name}</h3>
                    <div className="mt-1 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-brand-charcoal/40">
                      <MapPin size={10} className="text-brand-green" />
                      {cat.area}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-brand-gold/10 px-2 py-1">
                    <Star size={12} className="fill-brand-gold text-brand-gold" />
                    <span className="text-xs font-black">{cat.rating}</span>
                  </div>
                </div>

                <p className="mt-2 text-sm text-brand-charcoal/60 line-clamp-2">{cat.specialty}</p>

                <div className="mt-4 pt-4 border-t border-brand-beige/50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase">Starting from</span>
                    <span className="font-black text-brand-green">Rs. {cat.price} <span className="text-[10px] opacity-40">/ head</span></span>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-green text-brand-gold shadow-lg shadow-brand-green/20 group-hover:translate-x-1 transition-transform">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredCaterers.length === 0 && (
          <div className="py-20 text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-brand-charcoal/5 flex items-center justify-center text-brand-charcoal/20 mb-4">
              <Search size={40} />
            </div>
            <h3 className="font-display text-xl font-bold text-brand-charcoal">No caterers found</h3>
            <p className="text-sm text-brand-charcoal/40 mt-1">Try searching for something else like "BBQ"</p>
          </div>
        )}
      </main>
    </div>
  );
}
