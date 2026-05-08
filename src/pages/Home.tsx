import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Star, 
  CheckCircle2, 
  User,
  ChevronRight,
  Calculator as CalculatorIcon,
  Search,
  Utensils,
  LocateFixed
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { CatererCard } from "../components/CatererCard";
import { getCaterers } from "../services/firestoreService";

export const Home = () => {
  const navigate = useNavigate();
  const [caterers, setCaterers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userArea, setUserArea] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);

  // Auto-scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { name: "Dawat", image: "https://images.unsplash.com/photo-1601050638917-3f94ddb4931f?w=200&h=200&auto=format&fit=crop" },
    { name: "Mehndi", image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=200&h=200&auto=format&fit=crop" },
    { name: "BBQ", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&auto=format&fit=crop" },
    { name: "Corporate", image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=200&h=200&auto=format&fit=crop" },
    { name: "Birthday", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=200&h=200&auto=format&fit=crop" },
    { name: "Wedding", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=200&auto=format&fit=crop" },
    { name: "Ramadan", image: "https://images.unsplash.com/photo-1563379091339-03b21ce4a4f8?w=200&h=200&auto=format&fit=crop" },
    { name: "Hi-Tea", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&h=200&auto=format&fit=crop" },
    { name: "Dessert", image: "https://images.unsplash.com/photo-1551404973-7bb699f42f75?w=200&h=200&auto=format&fit=crop" },
  ];

  const allCaterers = [
    {
      id: "1",
      name: "Kitchen Cuisine",
      rating: 4.8,
      reviews: 124,
      price: 1200,
      specialty: "Traditional Biryani & BBQ",
      category: "Dawat",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ce4a4f8?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "2",
      name: "Abid Caterers",
      rating: 4.9,
      reviews: 540,
      price: 1500,
      specialty: "Authentic Mughlai Dawat",
      category: "Dawat",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "3",
      name: "Lal Qila Catering",
      rating: 4.7,
      reviews: 210,
      price: 1800,
      specialty: "Mughlai & Live BBQ",
      category: "BBQ",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "4",
      name: "Pie in the Sky",
      rating: 4.6,
      reviews: 89,
      price: 900,
      specialty: "Birthday Cakes & Hi-Tea",
      category: "Birthday",
      image: "https://images.unsplash.com/photo-1535141194574-8d6f19092400?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "5",
      name: "The Deli",
      rating: 4.8,
      reviews: 156,
      price: 2200,
      specialty: "Continental Corporate Lunch",
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "6",
      name: "Ghaffar Kabab House",
      rating: 4.9,
      reviews: 1200,
      price: 850,
      specialty: "Famous Seekh Kabab & Paratha",
      category: "BBQ",
      image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "7",
      name: "Student Biryani",
      rating: 4.5,
      reviews: 3200,
      price: 650,
      specialty: "Karachi's Original Biryani",
      category: "Dawat",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ce4a4f8?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "8",
      name: "Javed Nihari",
      rating: 4.8,
      reviews: 850,
      price: 950,
      specialty: "Authentic Nihari & Nalli",
      category: "Dawat",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "9",
      name: "Tayyabi Catering",
      rating: 4.7,
      reviews: 430,
      price: 1350,
      specialty: "Traditional Wedding Menu",
      category: "Mehndi",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "10",
      name: "Bundu Khan",
      rating: 4.6,
      reviews: 980,
      price: 1100,
      specialty: "Classic BBQ & Puri Paratha",
      category: "BBQ",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "11",
      name: "Mezab",
      rating: 4.7,
      reviews: 310,
      price: 1650,
      specialty: "Premium Arabic & Mughlai",
      category: "Dawat",
      image: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "12",
      name: "Okra Catering",
      rating: 4.9,
      reviews: 145,
      price: 3500,
      specialty: "High-End Mediterranean",
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "13",
      name: "Rehmat-e-Shereen",
      rating: 4.8,
      reviews: 2100,
      price: 450,
      specialty: "Traditional Sweets & Snacks",
      category: "Mehndi",
      image: "https://images.unsplash.com/photo-1589113155353-e3800681ae24?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "14",
      name: "Cafe Flo",
      rating: 4.7,
      reviews: 890,
      price: 2800,
      specialty: "French Formal Events",
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "15",
      name: "Hot n Spicy",
      rating: 4.4,
      reviews: 4500,
      price: 550,
      specialty: "Late Night BBQ & Rolls",
      category: "BBQ",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "16",
      name: "Hanifia",
      rating: 4.6,
      reviews: 670,
      price: 750,
      specialty: "Hunter Beef & Burgers",
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "17",
      name: "Zameer Ansari",
      rating: 4.9,
      reviews: 2100,
      price: 950,
      specialty: "Legendary BBQ & Malai Boti",
      category: "BBQ",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "18",
      name: "Kolachi",
      rating: 4.9,
      reviews: 8500,
      price: 2500,
      specialty: "Premium Seafront BBQ",
      category: "Dawat",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "19",
      name: "United Catering",
      rating: 4.7,
      reviews: 320,
      price: 1400,
      specialty: "Large Scale Wedding Events",
      category: "Mehndi",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "20",
      name: "Del Frio",
      rating: 4.5,
      reviews: 1200,
      price: 1250,
      specialty: "Desserts & Continental",
      category: "Birthday",
      image: "https://images.unsplash.com/photo-1551404973-7bb699f42f75?q=80&w=800&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const fetchCaterers = async () => {
      try {
        const data = await getCaterers();
        const initialList = data && data.length > 0 ? data : allCaterers;
        setCaterers(initialList);
      } catch (err) {
        console.error(err);
        setCaterers(allCaterers);
      } finally {
        setLoading(false);
      }
    };
    fetchCaterers();
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Mocking area detection based on coordinates for Karachi
        const { latitude, longitude } = position.coords;
        console.log(`Location: ${latitude}, ${longitude}`);
        
        // Simulating reverse geocoding delay
        setTimeout(() => {
          const areas = ["Gulberg", "DHA Phase 6", "North Nazimabad", "Clifton", "Johar"];
          const randomArea = areas[Math.floor(Math.random() * areas.length)];
          setUserArea(randomArea);
          setIsDetecting(false);
        }, 1500);
      },
      (error) => {
        console.error("Error detecting location:", error);
        setIsDetecting(false);
        alert("Could not detect location. Please try manually.");
      }
    );
  };

  const handleCategoryClick = (catName: string) => {
    navigate("/explore", { state: { category: catName } });
  };

  return (
    <div className="pb-32 pt-6">
      <header className="px-6 pb-6 pt-2">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green text-brand-gold shadow-[0_8px_20px_-6px_rgba(25,71,51,0.5)] border-b-4 border-brand-charcoal/20"
            >
              <Utensils size={24} />
            </motion.div>
            <div className="flex flex-col -gap-1">
              <h1 className="font-display text-2xl font-black text-brand-charcoal tracking-tighter leading-none">Dastarr<span className="text-brand-green">khwan.</span></h1>
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] pl-1">Premium Catch</p>
            </div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xl shadow-brand-beige/20 border border-brand-beige cursor-pointer"
          >
            <User size={24} className="text-brand-green" />
          </motion.div>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal/40 mb-1">Location Services</p>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={detectLocation}
              disabled={isDetecting}
              className="flex items-center gap-2 group cursor-pointer bg-white border border-brand-beige px-4 py-2 rounded-2xl shadow-sm hover:shadow-md transition-all active:bg-brand-cream"
            >
              <div className={`flex h-6 w-6 items-center justify-center rounded-lg ${isDetecting ? "bg-brand-gold animate-pulse" : "bg-brand-green/10 text-brand-green"}`}>
                <MapPin size={14} className={isDetecting ? "text-brand-green" : ""} />
              </div>
              <span className="font-bold text-sm">
                {isDetecting ? "Detecting area..." : userArea ? `Nearby ${userArea}` : "Explore in your area"}
              </span>
              <LocateFixed size={14} className={`text-brand-charcoal/20 group-hover:text-brand-green transition-colors ${userArea ? "text-brand-green" : ""}`} />
            </motion.button>
          </div>
        </div>

        {/* Search CTA */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/explore")}
            className="flex w-full items-center gap-4 rounded-[24px] border-2 border-brand-beige bg-white p-5 text-left transition-all hover:border-brand-green hover:shadow-xl hover:shadow-brand-green/5"
          >
            <Search size={22} className="text-brand-charcoal/30" />
            <span className="font-bold text-brand-charcoal/40">Search Mughlai, BBQ, Biryani...</span>
          </button>
        </div>

        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display mt-8 text-4xl font-bold leading-[1.1] tracking-tight"
        >
          Celebrate <br /> <span className="text-brand-green">Without Stress.</span>
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/calculator")}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-3xl bg-brand-gold p-6 text-brand-green shadow-[0_15px_30px_-10px_rgba(184,146,80,0.4)] relative overflow-hidden group border-b-4 border-brand-charcoal/10"
        >
          <div className="flex items-center gap-3 relative z-10 transition-transform group-hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10">
              <CalculatorIcon size={24} className="text-brand-green" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Instant Pricing</span>
              <span className="text-xl font-black tracking-tight">Generate Full Event Plan</span>
            </div>
            <ChevronRight size={24} />
          </div>
          <div className="absolute top-0 right-0 h-full w-32 bg-white/5 skew-x-[30deg] translate-x-12" />
        </motion.button>
      </header>

      {/* Categories */}
      <div className="no-scrollbar overflow-x-auto px-6 mt-4">
        <div className="flex gap-5 pb-4">
          {categories.map((cat) => {
            return (
              <button 
                key={cat.name} 
                onClick={() => handleCategoryClick(cat.name)}
                className="flex min-w-[76px] flex-col items-center gap-3 transition-all"
              >
                <div className="relative group">
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.08 }}
                    whileTap={{ y: 0, scale: 0.95 }}
                    className="flex h-[76px] w-[76px] items-center justify-center rounded-[28px] text-4xl transition-all duration-300 relative z-10 overflow-hidden bg-white border-b-4 border-brand-beige shadow-[0_8px_15_px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_20px_-5px_rgba(0,0,0,0.15)]"
                  >
                    {/* Realistic Category Photo */}
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="absolute inset-0 w-full h-full object-cover opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    {/* Glossy Overlay */}
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/10 rotate-45 pointer-events-none" />
                    <span className="relative z-10 font-black text-xs text-white uppercase drop-shadow-md">
                      {cat.name.charAt(0)}
                    </span>
                  </motion.div>
                </div>
                <span className="text-[12px] font-bold tracking-tight text-brand-charcoal/60">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommended Horizontal Section */}
      <section className="mt-10">
        <div className="px-6 mb-6 flex items-center justify-between">
          <h3 className="font-display text-2xl font-bold tracking-tight">Recommended <span className="text-brand-gold">for You</span></h3>
          <button onClick={() => navigate("/explore")} className="text-sm font-bold text-brand-green">See All</button>
        </div>
        <div className="no-scrollbar flex gap-6 overflow-x-auto px-6 pb-6">
          {caterers.slice(0, 5).map((cat) => (
            <motion.div 
              key={cat.id} 
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/caterer/${cat.id}`)}
              className="min-w-[280px] group relative overflow-hidden rounded-[32px] bg-white border border-brand-beige shadow-lg cursor-pointer"
            >
              <div className="h-40 overflow-hidden relative">
                <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star size={10} className="fill-brand-gold text-brand-gold" />
                  <span className="text-[10px] font-black">{cat.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-display text-lg font-bold text-brand-charcoal">{cat.name}</h4>
                <p className="text-xs text-brand-charcoal/40 font-medium mb-2">{cat.specialty}</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-green font-black text-sm">Rs. {cat.price}<span className="text-[10px] font-bold opacity-50 ml-1">/ head</span></span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Grid (Simplified) */}
      <div className="px-6 mt-10">
        <div className="mb-6">
           <h3 className="font-display text-2xl font-bold tracking-tight">Browse by <span className="text-brand-green">Event</span></h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {categories.slice(0, 6).map((cat) => (
            <button 
              key={cat.name} 
              onClick={() => handleCategoryClick(cat.name)}
              className="flex flex-col items-center gap-2"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-brand-beige group hover:border-brand-green transition-colors">
                <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-brand-charcoal/20" />
              </div>
              <span className="text-[11px] font-bold text-brand-charcoal/60 uppercase tracking-wider">{cat.name}</span>
            </button>
          ))}
        </div>
        <button 
          onClick={() => navigate("/explore")}
          className="mt-6 w-full py-4 rounded-2xl border border-brand-beige text-brand-green font-bold text-sm bg-white hover:bg-brand-cream/50"
        >
          View All Categories
        </button>
      </div>

      {/* Price Calculator Promo */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mx-6 mt-12 overflow-hidden rounded-[40px] bg-brand-green p-8 text-brand-cream shadow-2xl relative"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <CalculatorIcon size={120} />
        </div>
        <h4 className="font-display text-2xl font-bold leading-tight relative">Instant Event <br /> Cost Calculator</h4>
        <p className="mt-3 text-brand-beige/70 text-sm max-w-[200px] relative">Plan your event budget perfectly in seconds without any calls.</p>
        <button 
          onClick={() => navigate("/calculator")}
          className="mt-8 flex items-center gap-2 rounded-2xl bg-brand-gold px-6 py-3 font-bold text-brand-green shadow-xl active:scale-95 transition-transform relative"
        >
          Calculate Now <ChevronRight size={20} />
        </button>
      </motion.div>
    </div>
  );
};
