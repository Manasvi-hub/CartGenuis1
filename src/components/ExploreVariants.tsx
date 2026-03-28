import { motion } from "framer-motion";
import { Layers, TrendingUp, Globe } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";
import { productGroups, categoryIcons } from "@/data/products";

interface ExploreVariantsProps {
  onView: (id: string) => void;
  onAddToCart: (id: string) => void;
  highlightBaseType?: string;
}

const ExploreVariants = ({ onView, onAddToCart, highlightBaseType }: ExploreVariantsProps) => {
  const groupEntries = Object.entries(productGroups);

  const sorted = highlightBaseType
    ? [
        ...groupEntries.filter(([key]) => key === highlightBaseType),
        ...groupEntries.filter(([key]) => key !== highlightBaseType),
      ]
    : groupEntries;

  return (
    <section className="py-20 section-divider">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Curated Collections
            </h2>
            <span className="inline-flex items-center gap-1.5 glass-subtle px-3 py-1.5 rounded-full text-xs font-medium text-primary">
              <Globe className="w-3.5 h-3.5" />
              {sorted.length} Categories
            </span>
          </div>
          <p className="text-muted-foreground text-lg max-w-xl">
            Hand-picked retail treasures organized into curated collections for effortless discovery.
          </p>
        </motion.div>

        <div className="space-y-16">
          {sorted.map(([category, variants], groupIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: groupIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{categoryIcons[category] || "📦"}</span>
                <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground">
                  {category}
                </h3>
                <span className="text-xs text-muted-foreground glass-subtle px-2.5 py-1 rounded-full">
                  {variants.length} {variants.length === 1 ? "item" : "items"}
                </span>
                {highlightBaseType === category && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    Trending for you
                  </motion.span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {variants.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={i}
                    onView={onView}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreVariants;
