import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";

interface RecommendationSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  reason?: string;
  onView: (id: string) => void;
  onAddToCart: (id: string) => void;
}

const RecommendationSection = ({
  title,
  subtitle,
  products,
  reason,
  onView,
  onAddToCart,
}: RecommendationSectionProps) => {
  if (products.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-3xl md:text-4xl font-display font-bold">{title}</h2>
            <span className="inline-flex items-center gap-1.5 glass-subtle px-3 py-1 rounded-full text-xs font-medium text-primary">
              <Brain className="w-3.5 h-3.5" />
              AI Powered
            </span>
          </div>
          <p className="text-muted-foreground">{subtitle}</p>
          {reason && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mt-3 text-sm text-primary/80"
            >
              <Sparkles className="w-4 h-4" />
              <span>{reason}</span>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onView={onView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
