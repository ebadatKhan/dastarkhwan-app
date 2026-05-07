import { useState } from "react";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  CreditCard, 
  ChevronLeft, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { auth } from "../lib/firebase";
import { sendBookingEmail } from "../services/notificationService";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData || {};
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalCost = bookingData.totalCost || 0;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(async () => {
      setIsProcessing(false);
      setIsCompleted(true);
      
      // Send confirmation email
      if (auth.currentUser?.email) {
        await sendBookingEmail(auth.currentUser.email, {
          packageName: bookingData.packageName || "Standard Menu",
          date: bookingData.date,
          time: bookingData.time,
          guests: bookingData.guests,
          totalCost: totalCost,
          address: bookingData.address
        });
      }
    }, 2500);
  };

  if (isCompleted) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-brand-green text-brand-gold shadow-2xl"
          >
            <CheckCircle2 size={48} />
          </motion.div>
          
          <h2 className="font-display text-3xl font-black text-brand-charcoal mb-4">Order Confirmed!</h2>
          <p className="text-brand-charcoal/60 mb-8 max-w-xs mx-auto">
            Your booking for {bookingData.date} has been confirmed. You will receive an email confirmation at <span className="text-brand-green font-bold">{auth.currentUser?.email}</span> shortly.
          </p>

          <div className="w-full bg-brand-cream rounded-3xl p-6 mb-8 text-left border border-brand-beige">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-charcoal/40 mb-4">Summary</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-brand-charcoal/70">Plan</span>
                <span className="text-sm font-bold text-brand-charcoal">{bookingData.packageName || "Standard Menu"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-brand-charcoal/70">Guests</span>
                <span className="text-sm font-bold text-brand-charcoal">{bookingData.guests}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-brand-beige">
                <span className="font-bold text-brand-charcoal">Amount Paid</span>
                <span className="font-black text-brand-green text-lg">Rs. {totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate("/")}
            className="w-full bg-brand-green py-5 rounded-3xl font-black text-brand-gold shadow-lg active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-brand-cream">
      <header className="px-6 py-8 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-brand-beige"
        >
          <ChevronLeft size={24} className="text-brand-charcoal" />
        </button>
        <h1 className="font-display text-2xl font-black text-brand-charcoal">Secure Checkout</h1>
      </header>

      <div className="flex-1 px-6 pb-24 space-y-8">
        {/* Order Details */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-charcoal/40 px-2">Order Details</h3>
           <div className="bg-white rounded-[32px] p-6 shadow-sm border border-brand-beige space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-brand-green uppercase tracking-widest mb-1">Package</p>
                  <h4 className="font-bold text-brand-charcoal">{bookingData.packageName || "Selected Plan"}</h4>
                </div>
                <Users size={20} className="text-brand-gold" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-beige/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-cream text-brand-green">
                    <Calendar size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-bold text-brand-charcoal/40">Date</span>
                    <span className="text-xs font-bold text-brand-charcoal">{bookingData.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-cream text-brand-green">
                    <Clock size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-bold text-brand-charcoal/40">Time</span>
                    <span className="text-xs font-bold text-brand-charcoal">{bookingData.time}</span>
                  </div>
                </div>
              </div>
           </div>
        </section>

        {/* Payment Methods */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-charcoal/40 px-2">Payment Method</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-5 border-2 border-brand-green shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green text-brand-gold">
                  <CreditCard size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-brand-charcoal">Online Payment</span>
                  <span className="text-xs text-brand-charcoal/40">Pay via Card/Easypaisa</span>
                </div>
              </div>
              <div className="h-5 w-5 rounded-full border-4 border-brand-green" />
            </div>
            
            <div className="bg-white rounded-2xl p-5 border border-brand-beige opacity-60 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-beige text-brand-charcoal/40">
                  <MapPin size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-brand-charcoal">Cash Collection</span>
                  <span className="text-xs text-brand-charcoal/40">At your doorstep (+Rs. 200)</span>
                </div>
              </div>
              <div className="h-5 w-5 rounded-full border border-brand-beige" />
            </div>
          </div>
        </section>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-brand-green/60 py-4">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted Secure Checkout</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-brand-beige shadow-[0_-10px_30px_rgba(0,0,0,0.05)] max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase">Total Amount</span>
            <span className="text-2xl font-black text-brand-green">Rs. {totalCost.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-brand-gold uppercase block">Taxes included</span>
            <span className="text-xs font-medium text-brand-charcoal/60">Secure Payment</span>
          </div>
        </div>
        <button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-brand-green py-5 rounded-3xl font-black text-brand-gold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
        >
          {isProcessing ? (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 border-2 border-brand-gold border-t-transparent animate-spin rounded-full" />
              <span className="uppercase tracking-widest text-sm">Processing...</span>
            </div>
          ) : (
            <>
              <span className="uppercase tracking-widest text-sm">Confirm & Pay</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </footer>
    </div>
  );
}
