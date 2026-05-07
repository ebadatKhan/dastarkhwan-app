import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  Users, 
  MapPin, 
  CreditCard, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Clock,
  MessageSquare,
  UtensilsCrossed
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { createBooking } from "../services/firestoreService";
import { auth } from "../lib/firebase";

export const BookingFlow = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const suggestion = location.state?.suggestion;
  
  const [formData, setFormData] = useState({
    date: "",
    time: "07:00 PM (Dinner)",
    guests: 50,
    address: "",
    notes: "",
  });

  useEffect(() => {
    if (suggestion) {
      setFormData(prev => ({ ...prev, guests: suggestion.guests || 50 }));
    }
  }, [suggestion]);

  const nextStep = async () => {
    // ... same as before but adding suggestion info if exists
    if (step === 2) {
      if (!auth.currentUser) {
        alert("Please login to complete your booking.");
        navigate("/profile");
        return;
      }
      setIsSubmitting(true);
      try {
        const bookingInfo = {
          ...formData,
          catererId: suggestion ? "smart-suggested" : "mock-caterer-1",
          packageName: suggestion?.packageName || "Standard Menu",
          totalCost: formData.guests * (suggestion?.pricePerHead || 1200),
          items: suggestion?.dishes || []
        };
        
        await createBooking(bookingInfo);
        
        navigate("/checkout", { state: { bookingData: bookingInfo } });
      } catch (err) {
        console.error(err);
        alert("Failed to create booking. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const Step1 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <header>
        <h2 className="font-display text-3xl font-bold">Event Details</h2>
        <p className="text-brand-charcoal/50 font-medium">When and how many guests?</p>
      </header>

      <div className="space-y-6">
        {suggestion && (
          <div className="rounded-2xl bg-brand-green/5 p-4 border border-brand-green/10 flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green text-brand-gold">
               <UtensilsCrossed size={18} />
             </div>
             <div>
               <p className="text-[10px] font-bold text-brand-green uppercase tracking-widest">Selected Custom Plan</p>
               <h4 className="font-bold text-brand-charcoal">{suggestion.packageName}</h4>
             </div>
          </div>
        )}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40">Select Date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-green" size={20} />
            <input 
              type="date" 
              className="w-full rounded-2xl bg-white p-4 pl-12 shadow-sm outline outline-brand-beige font-medium"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40">Select Time</label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-green" size={20} />
            <select 
              className="w-full appearance-none rounded-2xl bg-white p-4 pl-12 shadow-sm outline outline-brand-beige font-medium"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
            >
              <option>08:00 AM (Breakfast)</option>
              <option>10:00 AM (Brunch)</option>
              <option>12:00 PM (Lunch)</option>
              <option>01:00 PM (Lunch)</option>
              <option>02:00 PM (Lunch)</option>
              <option>04:00 PM (Hi-Tea)</option>
              <option>05:00 PM (Hi-Tea)</option>
              <option>07:00 PM (Dinner)</option>
              <option>08:00 PM (Dinner)</option>
              <option>09:00 PM (Dinner)</option>
              <option>10:00 PM (Late Night)</option>
              <option>12:00 AM (Midnight BBQ)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40">Guest Count</label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-green" size={20} />
            <input 
              type="number" 
              placeholder="e.g 100"
              className="w-full rounded-2xl bg-white p-4 pl-12 shadow-sm outline outline-brand-beige font-medium"
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const Step2 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <header>
        <h2 className="font-display text-3xl font-bold">Venue & Notes</h2>
        <p className="text-brand-charcoal/50 font-medium">Where should we deliver?</p>
      </header>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40">Delivery Address</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-5 text-brand-green" size={20} />
            <textarea 
              rows={3}
              placeholder="House #, Street, Area, Karachi"
              className="w-full rounded-2xl bg-white p-4 pl-12 shadow-sm outline outline-brand-beige font-medium"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40">Additional Notes</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-5 text-brand-green" size={20} />
            <textarea 
              rows={3}
              placeholder="Anything else we should know?"
              className="w-full rounded-2xl bg-white p-4 pl-12 shadow-sm outline outline-brand-beige font-medium"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const Success = () => (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-brand-green text-brand-gold shadow-2xl"
      >
        <CheckCircle2 size={48} />
      </motion.div>
      <h2 className="font-display text-3xl font-bold text-brand-charcoal">Booking Request Sent!</h2>
      <p className="mt-4 text-brand-charcoal/60 px-6">
        We've sent your request to <span className="font-bold text-brand-green">Kitchen Cuisine</span>. They will confirm availability within 30 minutes.
      </p>
      <button 
        onClick={() => navigate("/")}
        className="mt-10 rounded-2xl bg-brand-green px-8 py-4 font-bold text-brand-cream shadow-xl"
      >
        Back to Home
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-cream pb-32 pt-6 px-6">
      {step < 3 && (
        <div className="mb-10 flex items-center justify-between">
           <button onClick={step === 1 ? () => navigate(-1) : prevStep} className="text-brand-charcoal/30">
              <ArrowLeft size={24} />
           </button>
           <div className="flex gap-2 text-[10px] font-bold tracking-widest text-brand-charcoal uppercase">
              <span className={step === 1 ? "text-brand-green" : ""}>01 INFO</span>
              <span className="text-brand-beige">/</span>
              <span className={step === 2 ? "text-brand-green" : ""}>02 VENUE</span>
           </div>
           <div className="w-6" />
        </div>
      )}

      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}

      {step < 3 && (
        <div className="fixed bottom-32 left-0 right-0 z-40 px-6 pointer-events-none">
           <div className="mx-auto max-w-md pointer-events-auto">
             <button 
               onClick={nextStep}
               disabled={isSubmitting}
               className={`flex w-full items-center justify-center gap-3 rounded-3xl py-5 font-bold shadow-2xl active:scale-95 transition-all ${isSubmitting ? "bg-brand-gold/50 cursor-not-allowed" : "bg-brand-gold text-brand-green"}`}
             >
               {isSubmitting ? "Processing..." : step === 2 ? "Proceed to Checkout" : "Continue"}
               {!isSubmitting && <ArrowRight size={20} />}
             </button>
           </div>
        </div>
      )}
    </div>
  );
};
