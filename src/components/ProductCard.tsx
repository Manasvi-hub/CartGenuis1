import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star, Award, TrendingUp, ImageOff } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
  onView: (id: string) => void;
  onAddToCart: (id: string) => void;
}

const badgeConfig: Record<string, { icon: typeof Award; className: string }> = {
  "Best Seller": { icon: Award, className: "bg-gradient-to-r from-amber-500 to-orange-500 text-white" },
  "Popular": { icon: TrendingUp, className: "bg-gradient-to-r from-primary to-accent text-white" },
};

// Deterministic gradient fallback based on product ID
const getFallbackGradient = (id: string) => {
  const hash = id.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 40) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 60%, 25%), hsl(${hue2}, 50%, 15%))`;
};

const ProductCard = ({ product, index, onView, onAddToCart }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const badge = product.badge ? badgeConfig[product.badge] : null;

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-subtle product-card-hover rounded-2xl overflow-hidden cursor-pointer border-white/5"
      onClick={() => onView(product.id)}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + index * 0.05 }}
          className={`absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl ${badge.className}`}
        >
          <badge.icon className="w-3 h-3" />
          {product.badge}
        </motion.div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse" />
        )}

        {imageError ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-secondary/30"
            style={{ background: getFallbackGradient(product.id) }}
          >
            <ImageOff className="w-10 h-10 text-white/20" />
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest px-6 text-center">
              Image Unvailable
            </p>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />
        )}

        {/* Sophisticated Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        
        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 p-6 translate-y-4 group-hover:translate-y-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onView(product.id); }}
            className="w-full py-3 rounded-full bg-white text-black font-bold text-sm flex items-center justify-center gap-2 shadow-xl hover:bg-primary hover:text-white transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onAddToCart(product.id); }}
            className="w-full py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-all duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 space-y-3 relative z-10 bg-gradient-to-b from-transparent to-card/50">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
              {product.category}
            </p>
            <h3 className="font-display font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
            <Star className="w-3 h-3 fill-star text-star" />
            <span className="text-[11px] font-bold text-muted-foreground">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-1">
          <span className="text-2xl font-bold tracking-tight text-white">
            £{product.price.toFixed(2)}
          </span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
            <TrendingUp className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
