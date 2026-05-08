/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { 
  Home as HomeIcon, 
  Search, 
  User, 
  Calculator as CalculatorIcon, 
  PlusCircle,
  Menu,
  UtensilsCrossed,
  Timer
} from "lucide-react";
import { useStore } from "./store/useStore";
import { auth } from "./lib/firebase";

import { Home } from "./pages/Home";
import { Calculator } from "./pages/Calculator";
import { CatererDetail } from "./pages/CatererDetail";
import { Onboarding } from "./pages/Onboarding";
import { BookingFlow } from "./pages/BookingFlow";
import Checkout from "./pages/Checkout";
import { Profile } from "./pages/Profile";
import Explore from "./pages/Explore";

// --- Components ---

const SplashScreen = ({ onComplete }: { onComplete: () => void; key?: string }) => {
  const foodIcons = ["🍲", "🍢", "🍛", "🥘", "🍗", "🧋"];

  return (
      <motion.div 
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        transition={{ duration: 0.8 }}
        className="fixed inset-x-0 inset-y-0 z-50 mx-auto flex w-full max-w-md flex-col items-center justify-center bg-brand-green p-6 overflow-hidden shadow-2xl transition-all"
      >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {foodIcons.map((emoji, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 400 - 200, 
              y: Math.random() * 400 + 400,
              rotate: 0,
              opacity: 0 
            }}
            animate={{ 
              y: -800,
              rotate: 360,
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
            className="absolute text-5xl"
            style={{ left: `${(i / foodIcons.length) * 100}%` }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="mb-8 flex h-32 w-32 items-center justify-center rounded-[40px] bg-brand-gold shadow-[0_20px_50px_-15px_rgba(184,146,80,0.6)] border-b-8 border-brand-charcoal/20 relative"
        >
          <UtensilsCrossed size={64} className="text-brand-green" />
        </motion.div>

        <h1 className="font-display text-5xl font-black tracking-tight text-brand-cream text-center leading-none">
          Dastarr<span className="text-brand-gold">khwan.</span>
        </h1>
        <p className="mt-4 text-brand-beige font-black uppercase tracking-[0.4em] text-xs">Premium Pakistani Catering</p>
        
        <div className="mt-12 flex gap-1">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                backgroundColor: ["#F5F5F0", "#B89250", "#F5F5F0"]
              }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 rounded-full"
            />
          ))}
        </div>
      </motion.div>

      <motion.button
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="absolute bottom-16 rounded-3xl bg-brand-gold px-12 py-5 font-black text-brand-green shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)] border-b-4 border-brand-charcoal/20 uppercase tracking-widest text-sm"
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: <HomeIcon />, label: "Home", path: "/" },
    { icon: <Search />, label: "Explore", path: "/explore" },
    { icon: <PlusCircle size={32} />, label: "Book", path: "/book", primary: true },
    { icon: <CalculatorIcon />, label: "Calc", path: "/calculator" },
    { icon: <User />, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center bg-transparent px-4 pb-6">
      <div className="flex w-full max-w-md items-center justify-around rounded-3xl bg-brand-charcoal/95 px-4 py-3 shadow-2xl backdrop-blur-lg">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-all ${
                item.primary 
                  ? "flex h-14 w-14 -translate-y-6 items-center justify-center rounded-full bg-brand-gold text-brand-green shadow-xl active:scale-95" 
                  : isActive ? "text-brand-gold" : "text-brand-beige/50"
              }`}
            >
              <div className="transition-transform active:scale-90">{item.icon}</div>
              {!item.primary && <span className="text-[10px] font-medium tracking-wide uppercase">{item.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- App Root ---

const MobileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col bg-brand-cream shadow-2xl">
      <main className="flex-1 pb-24">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default function App() {
  const { isSplashComplete, setSplashComplete } = useStore();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-brand-green overflow-hidden">
      <div className="relative mx-auto w-full max-w-md flex min-h-screen flex-col items-center justify-center shadow-2xl">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -inset-8 bg-brand-gold/20 rounded-full blur-3xl opacity-50"
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="relative h-16 w-16 border-4 border-brand-gold/30 border-t-brand-gold rounded-full"
        />
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <UtensilsCrossed size={20} className="text-brand-gold" />
        </motion.div>
      </div>
    </div>
  );

  const handleSplashComplete = () => {
    setSplashComplete(true);
    setShowOnboarding(true);
  };

  return (
    <BrowserRouter>
      <AnimatePresence>
        {!isSplashComplete && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
        {showOnboarding && (
          <Onboarding key="onboarding" onComplete={() => setShowOnboarding(false)} />
        )}
      </AnimatePresence>
      
      <div className="h-full w-full">
        <MobileLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/caterer/:id" element={<CatererDetail />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/book" element={<BookingFlow />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </MobileLayout>
      </div>
    </BrowserRouter>
  );
}
