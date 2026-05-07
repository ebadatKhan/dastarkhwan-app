import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  MapPin,
  ChevronRight, 
  Info,
  Layers,
  ChefHat,
  UtensilsCrossed,
  GlassWater,
  Cake,
  Search,
  ArrowRight,
  CheckCircle2,
  Music,
  Wind,
  Calculator as CalculatorIcon
} from "lucide-react";
import { getSmartMenuSuggestions } from "../services/geminiService";

export const Calculator = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState(100);
  const [budget, setBudget] = useState(100000);
  const [isLoadingSmart, setIsLoadingSmart] = useState(false);
  const [smartSuggestions, setSmartSuggestions] = useState<any[] | null>(null);
  
  const handleSmartPlan = async () => {
    setIsLoadingSmart(true);
    const suggestions = await getSmartMenuSuggestions(budget, guests);
    setSmartSuggestions(suggestions);
    setIsLoadingSmart(false);
  };

  const addOns = [
    { name: "Waiters", price: 5000, icon: <Users size={18} /> },
    { name: "Decor", price: 15000, icon: <Layers size={18} /> },
    { name: "Desserts", price: 200, perPerson: true, icon: <Cake size={18} /> },
    { name: "Drinks", price: 100, perPerson: true, icon: <GlassWater size={18} /> },
    { name: "Sound System", price: 8000, icon: <Music size={18} /> },
    { name: "Photography", price: 25000, icon: <Search size={18} /> },
    { name: "Live BBQ Stalls", price: 12000, icon: <UtensilsCrossed size={18} /> },
    { name: "Valet Parking", price: 10000, icon: <MapPin size={18} /> },
    { name: "Floral Decor", price: 20000, icon: <CheckCircle2 size={18} /> },
    { name: "Generator", price: 5000, icon: <Info size={18} /> },
    { name: "Security Gate", price: 3000, icon: <Info size={18} /> },
    { name: "Traditional Hookah", price: 5000, icon: <Wind size={18} /> },
  ];

  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Simple pricing logic
  const basePricePerPerson = 1200;
  const foodTotal = basePricePerPerson * guests;
  
  const addOnTotal = addOns.reduce((acc, addon) => {
    if (selectedAddOns.includes(addon.name)) {
      return acc + (addon.perPerson ? addon.price * guests : addon.price);
    }
    return acc;
  }, 0);

  const total = foodTotal + addOnTotal;
  const tax = total * 0.13; // 13% tax
  const finalTotal = total + tax;

  return (
    <div className="min-h-screen bg-brand-cream pb-32 pt-6">
      <div className="px-6">
        <h2 className="font-display text-2xl font-bold">Event Cost Calculator</h2>
        <p className="text-sm text-brand-charcoal/60">Estimate your event budget instantly</p>
      </div>

      {/* Smart Planner Section */}
      <section className="mt-8 px-6">
        <div className="rounded-3xl bg-brand-green p-6 text-brand-cream shadow-xl border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <CalculatorIcon size={20} className="text-brand-gold" />
            <h4 className="font-display font-bold text-lg">Smart Event Planner</h4>
          </div>
          <p className="text-xs text-brand-beige/60 mb-6 font-medium">Enter your total budget and we'll suggest the best menus for you.</p>
          
          <div className="space-y-4">
            <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between border border-white/5">
              <span className="text-xs font-bold text-brand-beige/50 uppercase">Total Budget</span>
              <input 
                type="number" 
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="bg-transparent text-right font-bold text-xl outline-none w-1/2"
                placeholder="Rs."
              />
            </div>
            
            <button 
              onClick={handleSmartPlan}
              disabled={isLoadingSmart}
              className="w-full bg-brand-gold py-4 rounded-xl font-bold text-brand-green flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoadingSmart ? (
                <div className="h-5 w-5 border-2 border-brand-green border-t-transparent animate-spin rounded-full" />
              ) : (
                <>
                  Generate Best Plan <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Suggested Plans Display */}
        <AnimatePresence>
          {smartSuggestions && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mt-6 space-y-4 overflow-hidden"
            >
              <div className="flex items-center justify-between px-2">
                <h5 className="text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-widest">Recommended for you</h5>
                <button onClick={() => setSmartSuggestions(null)} className="text-[10px] font-bold text-brand-green uppercase">Clear</button>
              </div>
              {smartSuggestions.map((suggestion, i) => (
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-white rounded-3xl p-6 shadow-sm border border-brand-beige group hover:border-brand-green/30 transition-all cursor-pointer relative overflow-hidden active:scale-95"
                  onClick={() => {
                    setGuests(guests);
                    // In a real app, we'd save this choice to a store/state
                    navigate("/book", { state: { suggestion } });
                  }}
                >
                  <div className="absolute top-0 right-0 p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 bg-brand-green/5 text-brand-green text-[10px] font-bold rounded-lg uppercase tracking-wider">{suggestion.vibe}</span>
                    <span className="font-bold text-brand-charcoal text-lg">Rs. {suggestion.pricePerHead}/head</span>
                  </div>
                  <h6 className="font-bold text-brand-charcoal mb-4 text-xl">{suggestion.packageName}</h6>
                  
                  <div className="space-y-2 mb-6">
                    {suggestion.dishes.slice(0, 3).map((dish: string, di: number) => (
                      <div key={di} className="flex items-center gap-2 text-sm text-brand-charcoal/70">
                        <CheckCircle2 size={14} className="text-brand-green" />
                        {dish}
                      </div>
                    ))}
                    {suggestion.dishes.length > 3 && (
                      <p className="text-xs text-brand-charcoal/40 font-medium pl-6">+{suggestion.dishes.length - 3} more items...</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-brand-beige/50">
                    <div className="flex items-center gap-1 text-brand-gold font-bold">
                      <CheckCircle2 size={14} />
                      <span className="text-xs uppercase tracking-tighter">Optimized Choice</span>
                    </div>
                    <span className="text-xs font-bold text-brand-green flex items-center gap-1">
                      Choose Plan <ChevronRight size={14} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Guest Count Slider */}
      <section className="mt-8 px-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold uppercase tracking-wider text-brand-charcoal/50">Guest Count</label>
          <span className="text-2xl font-bold text-brand-green">{guests}</span>
        </div>
        <input 
          type="range" 
          min="20" 
          max="1000" 
          step="10" 
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
          className="mt-4 h-2 w-full appearance-none rounded-lg bg-brand-beige accent-brand-green"
        />
        <div className="mt-2 flex justify-between text-[10px] font-bold text-brand-charcoal/30">
          <span>20 GUESTS</span>
          <span>1000 GUESTS</span>
        </div>
      </section>

      {/* Package Selection (Simulated) */}
      <section className="mt-8 px-6">
        <label className="text-sm font-semibold uppercase tracking-wider text-brand-charcoal/50">Selected Dishes</label>
        <div className="mt-4 grid gap-3">
          {["Chicken Biryani", "Seekh Kabab", "Gajar Ka Halwa", "Naan & Raita"].map((dish) => (
            <div key={dish} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm outline outline-brand-beige">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-beige/50 text-brand-green">
                  <ChefHat size={20} />
                </div>
                <span className="font-medium">{dish}</span>
              </div>
              <div className="h-5 w-5 rounded-full bg-brand-green flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full rounded-2xl border-2 border-dashed border-brand-green/30 py-4 text-sm font-bold text-brand-green">
          + Add more dishes
        </button>
      </section>

      {/* Add-ons */}
      <section className="mt-8 px-6">
        <label className="text-sm font-semibold uppercase tracking-wider text-brand-charcoal/50">Service Add-ons</label>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {addOns.map((addon) => {
            const isSelected = selectedAddOns.includes(addon.name);
            return (
              <button 
                key={addon.name}
                onClick={() => setSelectedAddOns(prev => isSelected ? prev.filter(a => a !== addon.name) : [...prev, addon.name])}
                className={`flex flex-col items-center gap-3 rounded-3xl p-4 text-center transition-all ${
                  isSelected ? "bg-brand-green text-brand-cream shadow-lg scale-[1.02]" : "bg-white text-brand-charcoal outline outline-brand-beige"
                }`}
              >
                <div className={`p-3 rounded-2xl ${isSelected ? "bg-brand-gold text-brand-green text-white" : "bg-brand-beige"}`}>
                  {addon.icon}
                </div>
                <div>
                  <p className="text-sm font-bold">{addon.name}</p>
                  <p className={`text-[10px] ${isSelected ? "text-brand-beige" : "text-brand-charcoal/40"}`}>
                    Rs. {addon.price}{addon.perPerson ? "/head" : ""}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Total Breakdown */}
      <section className="mt-10 px-6">
        <div className="rounded-[40px] bg-brand-charcoal p-8 text-brand-cream shadow-2xl">
          <h4 className="font-display text-xl font-bold">Cost Breakdown</h4>
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm text-brand-beige/50">
              <span>Food & Menu ({guests}x)</span>
              <span>Rs. {foodTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-brand-beige/50">
              <span>Add-ons</span>
              <span>Rs. {addOnTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-brand-beige/50">
              <span>Tax (13%)</span>
              <span>Rs. {Math.round(tax).toLocaleString()}</span>
            </div>
            <div className="pt-4 border-t border-brand-beige/10 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">Estimated Total</p>
                <p className="text-3xl font-bold">Rs. {Math.round(finalTotal).toLocaleString()}</p>
              </div>
              <p className="text-xs text-brand-gold">Rs. {Math.round(finalTotal/guests).toLocaleString()} / head</p>
            </div>
          </div>
          <button 
            onClick={() => navigate("/book")}
            className="mt-8 w-full rounded-2xl bg-brand-gold py-4 font-bold text-brand-green shadow-xl active:scale-95 transition-transform"
          >
            Book this Menu
          </button>
        </div>
      </section>
    </div>
  );
};
