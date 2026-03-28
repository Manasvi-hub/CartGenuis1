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
    setImageLoaded(true); // Stop showing skeleton
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass product-card-hover rounded-xl overflow-hidden cursor-pointer"
      onClick={() => onView(product.id)}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.06 }}
          className={`absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${badge.className}`}
        >
          <badge.icon className="w-3 h-3" />
          {product.badge}
        </motion.div>
      )}

      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div
            className="absolute inset-0 bg-muted animate-shimmer"
            style={{
              backgroundImage: "linear-gradient(90deg, transparent 25%, hsl(var(--muted-foreground) / 0.08) 50%, transparent 75%)",
              backgroundSize: "200% 100%",
            }}
          />
        )}

        {/* Fallback gradient when image fails */}
        {imageError ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: getFallbackGradient(product.id) }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <ImageOff className="w-8 h-8 text-white/50" />
            </div>
            <p className="text-white/70 text-sm font-medium text-center px-4 leading-snug">
              {product.name}
            </p>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onView(product.id); }}
            className="btn-glow flex items-center gap-2 bg-primary px-5 py-2.5 rounded-full text-primary-foreground font-medium text-sm"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onAddToCart(product.id); }}
            className="flex items-center gap-2 glass px-5 py-2.5 rounded-full text-foreground font-medium text-sm hover:bg-card/80 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-[11px] text-primary/80 font-semibold uppercase tracking-[0.15em] mb-1">
          {product.category}
        </p>
        <h3 className="font-display font-semibold text-base md:text-lg text-foreground mb-1.5 leading-tight line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg md:text-xl font-bold gradient-text">
            £{product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-star text-star" />
            <span className="text-xs text-muted-foreground font-medium">{product.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
