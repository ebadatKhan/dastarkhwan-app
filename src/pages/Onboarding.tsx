import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ArrowRight, ChefHat, Calculator, CalendarCheck } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
  key?: string;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "Discover Top Caterers",
      description: "Browse verified, premium caterers in Karachi for every type of event.",
      icon: <ChefHat size={60} className="text-brand-green" />,
      bg: "bg-brand-cream",
      accent: "bg-brand-green",
    },
    {
      title: "Instant Event Pricing",
      description: "Calculate costs instantly. No more waiting for WhatsApp calls or quotes.",
      icon: <Calculator size={60} className="text-brand-green" />,
      bg: "bg-brand-beige",
      accent: "bg-brand-gold",
    },
    {
      title: "Custom Menus & Booking",
      description: "Mix & match dishes to create your perfect menu and book in minutes.",
      icon: <CalendarCheck size={60} className="text-brand-green" />,
      bg: "bg-brand-cream",
      accent: "bg-brand-green",
    }
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className={`fixed inset-x-0 inset-y-0 z-50 mx-auto flex w-full max-w-md flex-col transition-colors duration-500 shadow-2xl ${slides[step].bg}`}>
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="flex flex-col items-center"
          >
            <div className="mb-10 flex h-32 w-32 items-center justify-center rounded-[40px] bg-white shadow-2xl outline outline-brand-beige">
              {slides[step].icon}
            </div>
            <h1 className="font-display text-3xl font-bold leading-tight text-brand-charcoal">
              {slides[step].title}
            </h1>
            <p className="mt-4 text-brand-charcoal/60 font-medium leading-relaxed">
              {slides[step].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-10 pb-16 flex flex-col items-center">
        {/* Progress dots */}
        <div className="flex gap-2 mb-10">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-brand-green" : "w-1.5 bg-brand-charcoal/10"}`} 
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className={`flex w-full items-center justify-center gap-3 rounded-2xl py-5 font-bold text-white shadow-xl transition-all active:scale-95 ${slides[step].accent === "bg-brand-gold" ? "bg-brand-gold text-brand-green" : "bg-brand-green"}`}
        >
          {step === slides.length - 1 ? "Start Celebrating" : "Next Step"}
          <ArrowRight size={20} />
        </button>
        
        {step < slides.length - 1 && (
          <button 
            onClick={onComplete}
            className="mt-6 text-sm font-bold text-brand-charcoal/30 uppercase tracking-widest"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
};
