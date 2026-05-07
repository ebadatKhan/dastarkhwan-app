import { motion } from "motion/react";
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
} from "lucide-react";

export const CatererCard = ({ id, name, rating, reviews, price, specialty, image, onClick }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group flex flex-col gap-4 cursor-pointer transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[40px] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] group-hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.2)] border border-brand-beige transition-all duration-500">
        <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-6 right-6 rounded-2xl bg-white/95 px-5 py-3 text-sm font-black shadow-2xl backdrop-blur-md text-brand-green border-b-4 border-brand-beige">
          Rs. {price.toLocaleString()}/head
        </div>
        <div className="absolute top-6 left-6 flex items-center gap-2 rounded-2xl bg-brand-green/90 px-4 py-2.5 text-[11px] font-black text-white uppercase tracking-widest backdrop-blur-sm border-b-4 border-brand-charcoal/20">
          <CheckCircle2 size={14} className="text-brand-gold" />
          Verified
        </div>
      </div>
      <div className="px-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-display text-2xl font-bold text-brand-charcoal leading-tight">{name}</h4>
            <p className="text-base text-brand-charcoal/60 font-medium">{specialty}</p>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-brand-gold bg-brand-gold/10 px-3 py-1.5 rounded-xl">
            <Star size={18} fill="currentColor" />
            <span className="text-lg">{rating}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm text-brand-charcoal/40 font-semibold">
           <MapPin size={14} />
           <span>Karachi, Pakistan</span>
           <span className="h-1 w-1 rounded-full bg-brand-beige" />
           <span>{reviews} reviews</span>
        </div>
      </div>
    </motion.div>
  );
};
