import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User as UserIcon, 
  MapPin, 
  Tag, 
  Plus, 
  Image as ImageIcon, 
  Upload, 
  X, 
  CheckCircle2, 
  ChevronRight,
  LogOut,
  Store,
  Camera,
  UtensilsCrossed
} from "lucide-react";
import { auth, db } from "../lib/firebase";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

interface CatererProfile {
  id?: string;
  name: string;
  specialty: string;
  area: string;
  image: string;
  description: string;
  address: string;
  ownerId: string;
  rating: number;
  reviews: number;
  verified: boolean;
}

export const Profile = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [caterer, setCaterer] = useState<CatererProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    area: "",
    description: "",
    image: "",
    address: ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        fetchCatererProfile(u.uid);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchCatererProfile = async (uid: string) => {
    try {
      const q = query(collection(db, "caterers"), where("ownerId", "==", uid));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data() as CatererProfile;
        const profile = { ...docData, id: querySnapshot.docs[0].id };
        setCaterer(profile);
        setFormData({
          name: profile.name,
          specialty: profile.specialty,
          area: profile.area,
          description: profile.description,
          image: profile.image,
          address: profile.address || ""
        });
      }
    } catch (error) {
      console.error("Error fetching caterer profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload with FileReader (Base64)
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result as string }));
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        ownerId: user.uid,
        updatedAt: serverTimestamp()
      };

      if (caterer?.id) {
        await updateDoc(doc(db, "caterers", caterer.id), payload);
        setCaterer({ ...caterer, ...formData });
      } else {
        const newCaterer = {
          ...payload,
          rating: 0,
          reviews: 0,
          verified: false,
          createdAt: serverTimestamp()
        };
        const docRef = await addDoc(collection(db, "caterers"), newCaterer);
        setCaterer({ ...newCaterer, id: docRef.id } as CatererProfile);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !isEditing) return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-gold border-t-transparent" />
    </div>
  );

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="mb-8 p-6 rounded-full bg-brand-gold/10">
          <UserIcon size={48} className="text-brand-gold" />
        </div>
        <h2 className="text-3xl font-black text-brand-charcoal mb-2 font-display">My Profile</h2>
        <p className="text-brand-charcoal/50 mb-8 max-w-xs">Join our network of premium Pakistani caterers or track your event bookings.</p>
        <button 
          onClick={async () => {
            const { loginWithGoogle } = await import("../lib/firebase");
            loginWithGoogle();
          }}
          className="w-full flex items-center justify-center gap-3 rounded-3xl bg-brand-charcoal py-4 font-bold text-white shadow-xl active:scale-95 transition-all"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="mb-8 mt-4 flex items-center justify-between">
        <h1 className="font-display text-3xl font-black text-brand-charcoal">Profile</h1>
        <button 
          onClick={() => auth.signOut()}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-charcoal/5 text-brand-charcoal active:scale-90 transition-transform"
        >
          <LogOut size={20} />
        </button>
      </header>

      {/* User Info Card */}
      <div className="mb-8 flex items-center gap-4 bg-white p-4 rounded-[32px] border border-brand-beige shadow-sm">
        <div className="relative">
          <img 
            src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} 
            alt={user.displayName || ""} 
            className="h-20 w-20 rounded-[28px] object-cover ring-4 ring-brand-gold/10" 
          />
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-brand-green border-2 border-white flex items-center justify-center">
            <CheckCircle2 size={12} className="text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">{user.displayName}</h2>
          <p className="text-brand-charcoal/40 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Caterer Profile Section */}
      <section className="mb-32">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-brand-charcoal/30">Caterer Profile</h3>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-xs font-bold text-brand-gold underline underline-offset-4"
            >
              {caterer ? "Edit Listing" : "Join as Caterer"}
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!isEditing ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {caterer ? (
                <div className="group relative overflow-hidden rounded-[40px] bg-white border border-brand-beige p-2 shadow-xl">
                  <div className="h-48 overflow-hidden rounded-[32px] relative mb-4">
                    <img 
                      src={caterer.image || "https://images.unsplash.com/photo-1555244162-803834f70033?w=800"} 
                      alt={caterer.name} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                       {caterer.verified && (
                         <div className="bg-brand-green text-white text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                           <CheckCircle2 size={10} /> Verified
                         </div>
                       )}
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-2xl font-black text-brand-charcoal font-display">{caterer.name}</h4>
                      <div className="flex items-center gap-1 bg-brand-gold/10 px-2 py-1 rounded-lg">
                         <span className="text-brand-gold text-xs font-black">⭐ {caterer.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="flex items-center gap-1 rounded-full bg-brand-cream px-3 py-1 text-[10px] font-black uppercase tracking-wider text-brand-green border border-brand-green/10">
                        <Tag size={10} /> {caterer.specialty}
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-brand-cream px-3 py-1 text-[10px] font-black uppercase tracking-wider text-brand-charcoal/60 border border-brand-charcoal/5">
                        <MapPin size={10} /> {caterer.area}
                      </span>
                      {caterer.address && (
                        <span className="w-full mt-1 flex items-center gap-1 text-[10px] text-brand-charcoal/40 italic">
                          <MapPin size={10} /> {caterer.address}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-brand-charcoal/60 leading-relaxed line-clamp-2">
                      {caterer.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-[40px] border-2 border-dashed border-brand-beige p-12 text-center bg-white/50">
                   <div className="mb-4 h-16 w-16 rounded-3xl bg-brand-cream flex items-center justify-center text-brand-gold">
                      <Store size={32} />
                   </div>
                   <h4 className="text-lg font-bold mb-2">Are you a Caterer?</h4>
                   <p className="text-brand-charcoal/40 text-sm mb-6">List your services on Dastarrkhwan and reach thousands of event planners.</p>
                   <button 
                     onClick={() => setIsEditing(true)}
                     className="rounded-2xl bg-brand-gold px-8 py-3 font-bold text-brand-green shadow-lg active:scale-95 transition-transform"
                   >
                     Create Business Profile
                   </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="relative group">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="h-64 cursor-pointer overflow-hidden rounded-[40px] border-2 border-dashed border-brand-beige bg-white shadow-inner flex flex-col items-center justify-center relative group"
                >
                  {formData.image ? (
                    <>
                      <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 text-white">
                           <Camera size={24} />
                         </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, image: "" })); }}
                        className="absolute top-4 right-4 h-10 w-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-brand-charcoal shadow-lg hover:bg-brand-red hover:text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                       <div className="h-16 w-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-gold shadow-sm">
                         {isUploading ? (
                           <div className="h-6 w-6 animate-spin rounded-full border-3 border-brand-gold border-t-transparent" />
                         ) : (
                           <Upload size={32} />
                         )}
                       </div>
                       <p className="font-bold text-brand-charcoal">Upload Cover Photo</p>
                       <p className="text-xs text-brand-charcoal/40">Drag and drop or click to browse</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal/40 ml-4">Business Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Royal Mughal Catering"
                    className="w-full rounded-[24px] border-2 border-brand-beige bg-white p-4 font-bold outline-none focus:border-brand-gold transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal/40 ml-4">Specialty</label>
                    <input 
                      required
                      type="text" 
                      value={formData.specialty}
                      onChange={e => setFormData(p => ({ ...p, specialty: e.target.value }))}
                      placeholder="e.g. Mughal Buffet"
                      className="w-full rounded-[24px] border-2 border-brand-beige bg-white p-4 font-bold outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal/40 ml-4">Service Area</label>
                    <input 
                      required
                      type="text" 
                      value={formData.area}
                      onChange={e => setFormData(p => ({ ...p, area: e.target.value }))}
                      placeholder="e.g. Lahore, Gulberg"
                      className="w-full rounded-[24px] border-2 border-brand-beige bg-white p-4 font-bold outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal/40 ml-4">Full Business Address</label>
                  <input 
                    required
                    type="text" 
                    value={formData.address}
                    onChange={e => setFormData(p => ({ ...p, address: e.target.value }))}
                    placeholder="e.g. 42-C, Commercial Area, DHA Phase 6"
                    className="w-full rounded-[24px] border-2 border-brand-beige bg-white p-4 font-bold outline-none focus:border-brand-gold transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal/40 ml-4">Description</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                    placeholder="Describe your history, specialties, and service standards..."
                    className="w-full rounded-[24px] border-2 border-brand-beige bg-white p-4 font-bold outline-none focus:border-brand-gold transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 rounded-2xl bg-brand-charcoal/5 py-4 font-bold text-brand-charcoal active:scale-95 transition-transform"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-[2] rounded-2xl bg-brand-gold py-4 font-black text-brand-green shadow-xl active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? "Saving..." : caterer ? "Update Profile" : "Launch Listing"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </section>

      {/* Other Info */}
      <div className="space-y-3">
         <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-charcoal/30 ml-2">Quick Actions</h3>
         <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-brand-beige group active:bg-brand-cream transition-colors">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                  <UtensilsCrossed size={18} />
               </div>
               <span className="font-bold text-sm">Manage My Bookings</span>
            </div>
            <ChevronRight size={16} className="text-brand-charcoal/20 group-hover:text-brand-gold transition-colors" />
         </button>
         <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-brand-beige group active:bg-brand-cream transition-colors">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                  <Tag size={18} />
               </div>
               <span className="font-bold text-sm">Manage Packages</span>
            </div>
            <ChevronRight size={16} className="text-brand-charcoal/20 group-hover:text-brand-gold transition-colors" />
         </button>
      </div>
    </div>
  );
};
