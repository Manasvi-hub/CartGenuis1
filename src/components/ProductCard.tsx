import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star, Award, TrendingUp } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
  onView: (id: string) => void;
  onAddToCart: (id: string) => void;
}

const badgeConfig = {
  "Best Seller": { icon: Award, className: "bg-primary/90 text-primary-foreground" },
  "Popular Variant": { icon: TrendingUp, className: "bg-accent/90 text-accent-foreground" },
};

const ProductCard = ({ product, index, onView, onAddToCart }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const badge = product.badge ? badgeConfig[product.badge] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative glass product-card-hover rounded-xl overflow-hidden cursor-pointer"
      onClick={() => onView(product.id)}
    >
      {/* Badge */}
      {badge && (
        <div className={`absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${badge.className}`}>
          <badge.icon className="w-3 h-3" />
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-shimmer" style={{
            backgroundImage: "linear-gradient(90deg, transparent, hsl(var(--muted-foreground) / 0.05), transparent)",
            backgroundSize: "200% 100%",
          }} />
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button
            onClick={(e) => { e.stopPropagation(); onView(product.id); }}
            className="btn-glow flex items-center gap-2 bg-primary px-5 py-2.5 rounded-full text-primary-foreground font-medium text-sm"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product.id); }}
            className="flex items-center gap-2 glass px-5 py-2.5 rounded-full text-foreground font-medium text-sm hover:bg-card/80 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs text-primary font-medium uppercase tracking-wider">
            {product.category}
          </p>
          {product.variant && (
            <span className="text-xs text-muted-foreground glass-subtle px-1.5 py-0.5 rounded">
              {product.variant}
            </span>
          )}
        </div>
        <h3 className="font-display font-semibold text-lg text-foreground mb-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold gradient-text">₹{product.price.toLocaleString()}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-star text-star" />
            <span className="text-sm text-muted-foreground">{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
