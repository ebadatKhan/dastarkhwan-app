import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Plus, 
  Minus,
  ChefHat,
  ChevronRight,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

export const CatererDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guests, setGuests] = useState(50);
  
  // Mock detailed data
  const caterer = {
    name: "Kitchen Cuisine",
    rating: 4.8,
    reviews: 124,
    address: "42-C, Commercial Lane, DHA Phase 6, Karachi",
    description: "Serving authentic Pakistani cuisine since 1995. Known for the best Biryani in Karachi and premium BBQ setups for events.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ce4a4f8?q=80&w=800&auto=format&fit=crop",
    packages: [
      {
        id: "p1",
        name: "Standard Mehndi Package",
        price: 1200,
        items: ["Chicken Biryani", "Seekh Kabab", "Gajar Ka Halwa", "Naan", "Raita", "Fresh Salad", "Mint Margrita"],
        image: "https://images.unsplash.com/photo-1545243191-203b22e1caec?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "p2",
        name: "Premium Wedding Feast",
        price: 2500,
        items: ["Mutton Pulao", "Beef Nihari", "Chicken Tikka", "Kulfi", "Sheermal", "Cold Drinks", "Tea & Coffee"],
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "p3",
        name: "Royal Mughlai Dawat",
        price: 3500,
        items: ["Mutton Qorma", "Zafrani Pulao", "Paneer Reshmi", "Shahi Tukray", "Kashmiri Chai", "Fruit Chaat", "Dahi Phulki"],
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "p4",
        name: "BBQ Extravaganza",
        price: 1800,
        items: ["Malai Boti", "Bihari Kabab", "Grilled Fish", "Puri Paratha", "Imli Chutney", "Kulfi Falooda"],
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "p5",
        name: "Executive Hi-Tea",
        price: 1500,
        items: ["Mini Sliders", "Spring Rolls", "Chicken Strips", "Pastries", "Unlimited Tea", "Club Sandwiches"],
        image: "https://images.unsplash.com/photo-1517093157656-b9424f461507?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "p6",
        name: "Valima Grand Menu",
        price: 2800,
        items: ["Mutton Kunna", "Chicken Karahi", "Zarda", "Kachumar Salad", "Cold Drinks", "Mineral Water"],
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "p7",
        name: "Kid's Birthday Menu",
        price: 900,
        items: ["Nuggets", "French Fries", "Mini Pizza", "Juice Boxes", "Birthday Cake Slice", "Ice Cream"],
        image: "https://images.unsplash.com/photo-1535124406821-d2848dfbb25c?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "p8",
        name: "Budget Corporate Lunch",
        price: 850,
        items: ["Chicken Pulao", "Aloo Gosht", "Raita", "Supper Cold Drink", "Suji Ka Halwa"],
        image: "https://images.unsplash.com/photo-1563379091339-03b21ce4a4f8?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "p9",
        name: "Elite Seafood Platter",
        price: 4500,
        items: ["Fried Prawns", "Grilled Lobster", "Finger Fish", "Tarter Sauce", "Lemon Juice", "Steamed Rice"],
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "p10",
        name: "Traditional Breakfast",
        price: 700,
        items: ["Halwa Puri", "Chana Masala", "Aloo Bhujia", "Lassi", "Omelette", "Paratha"],
        image: "https://images.unsplash.com/photo-1589113155353-e3800681ae24?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "p11",
        name: "Ramadan Iftar Box",
        price: 1100,
        items: ["Dates", "Pakora", "Samosa", "Rooh Afza", "Fruit Chaat", "Chicken Roll"],
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "p12",
        name: "Dessert Lovers Dream",
        price: 1400,
        items: ["Gulab Jamun", "Ras Malai", "Chocolate Mousse", "Tiramisu", "Ice Cream Parlor"],
        image: "https://images.unsplash.com/photo-1551404973-7bb699f42f75?q=80&w=800&auto=format&fit=crop"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-32">
      {/* Header Image */}
      <div className="relative h-80 w-full overflow-hidden">
        <img src={caterer.image} alt={caterer.name} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 bg-gradient-to-b from-black/50 to-transparent">
          <button 
            onClick={() => navigate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex gap-2">
             <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30">
               <ShieldCheck size={24} />
             </button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="relative -mt-12 rounded-t-[40px] bg-brand-cream px-6 pt-10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-3xl bg-brand-green px-6 py-2 text-xs font-bold text-white shadow-xl flex items-center gap-2">
           <CheckCircle2 size={16} className="text-brand-gold" />
           VERIFIED PREMIUM CATERER
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-brand-charcoal leading-tight">{caterer.name}</h2>
            <div className="mt-2 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-charcoal/40">
                <MapPin size={14} className="text-brand-green" />
                <span>DHA Phase 6 • 4.2km away</span>
              </div>
              {caterer.address && (
                <p className="text-[10px] text-brand-charcoal/30 italic ml-5">{caterer.address}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end bg-white px-4 py-2 rounded-2xl shadow-sm border border-brand-beige">
            <div className="flex items-center gap-1 font-bold text-brand-gold">
              <Star size={18} fill="currentColor" />
              <span className="text-xl">{caterer.rating}</span>
            </div>
            <span className="text-[10px] text-brand-charcoal/30 uppercase tracking-widest font-bold">{caterer.reviews} EVENTS</span>
          </div>
        </div>

        <p className="mt-6 text-sm font-medium text-brand-charcoal/70 leading-relaxed">
          {caterer.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button 
            onClick={() => navigate("/book")}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-brand-green py-4 font-bold text-brand-cream shadow-xl active:scale-95 transition-transform"
          >
             Book Event
          </button>
          <button className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white border-2 border-brand-green/10 text-brand-green shadow-sm active:scale-95 transition-transform">
             <MessageCircle size={24} />
          </button>
        </div>

        {/* Packages */}
        <section className="mt-12 overflow-visible">
          <h3 className="font-display text-2xl font-bold">Menu Packages</h3>
          <div className="mt-6 grid gap-6">
            {caterer.packages.map((pkg) => (
              <motion.div 
                key={pkg.id}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-[32px] bg-white p-4 shadow-md border border-brand-beige"
              >
                <div className="flex gap-4">
                   <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl cursor-pointer" onClick={() => navigate("/book", { state: { suggestion: { ...pkg, packageName: pkg.name } } })}>
                      <img src={pkg.image} alt={pkg.name} className="h-full w-full object-cover" />
                   </div>
                   <div className="flex flex-1 flex-col justify-between">
                      <div className="cursor-pointer" onClick={() => navigate("/book", { state: { suggestion: { ...pkg, packageName: pkg.name } } })}>
                        <h4 className="font-bold text-brand-charcoal leading-tight">{pkg.name}</h4>
                        <p className="mt-1 text-xs text-brand-charcoal/40 font-semibold line-clamp-1">
                          {pkg.items.join(" • ")}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                           <span className="text-lg font-bold text-brand-green">Rs. {pkg.price}</span>
                           <span className="text-[10px] text-brand-charcoal/40 ml-1 font-bold">/HEAD</span>
                        </div>
                        <button 
                          onClick={() => navigate("/book", { state: { suggestion: { ...pkg, packageName: pkg.name } } })}
                          className="rounded-xl bg-brand-beige p-2 text-brand-green"
                        >
                           <Plus size={20} />
                        </button>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Calculator View */}
        <footer className="mt-12 mb-10 p-6 rounded-3xl bg-brand-beige/50 border border-brand-gold/20">
           <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-brand-charcoal text-sm uppercase tracking-wide">Quick Estimates</h4>
              <div className="flex items-center gap-4 bg-white rounded-full px-3 py-1 shadow-sm border border-brand-beige">
                 <button onClick={() => setGuests(Math.max(20, guests - 10))} className="text-brand-green"><Minus size={16} /></button>
                 <span className="text-sm font-bold w-12 text-center">{guests}</span>
                 <button onClick={() => setGuests(guests + 10)} className="text-brand-green"><Plus size={16} /></button>
              </div>
           </div>
           <div className="flex items-center justify-between">
              <p className="text-xs text-brand-charcoal/60 font-semibold italic">Standard Package for {guests} guests</p>
              <p className="text-xl font-bold text-brand-green">Rs. {(guests * 1200).toLocaleString()}</p>
           </div>
        </footer>
      </div>
    </div>
  );
};
