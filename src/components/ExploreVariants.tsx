import { motion } from "framer-motion";
import { Layers, TrendingUp } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";
import { productGroups } from "@/data/products";

interface ExploreVariantsProps {
  onView: (id: string) => void;
  onAddToCart: (id: string) => void;
  highlightBaseType?: string;
}

const ExploreVariants = ({ onView, onAddToCart, highlightBaseType }: ExploreVariantsProps) => {
  const groupEntries = Object.entries(productGroups);

  // If a baseType is highlighted, show it first
  const sorted = highlightBaseType
    ? [
        ...groupEntries.filter(([key]) => key === highlightBaseType),
        ...groupEntries.filter(([key]) => key !== highlightBaseType),
      ]
    : groupEntries;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Explore Variants</h2>
            <span className="inline-flex items-center gap-1.5 glass-subtle px-3 py-1 rounded-full text-xs font-medium text-primary">
              <Layers className="w-3.5 h-3.5" />
              Smart Browse
            </span>
          </div>
          <p className="text-muted-foreground">
            Compare styles and find your perfect match
          </p>
        </motion.div>

        <div className="space-y-14">
          {sorted.map(([baseType, variants], groupIdx) => (
            <motion.div
              key={baseType}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIdx * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground">
                  {baseType}
                </h3>
                <span className="text-xs text-muted-foreground glass-subtle px-2.5 py-1 rounded-full">
                  {variants.length} variants
                </span>
                {highlightBaseType === baseType && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary animate-pulse">
                    <TrendingUp className="w-3.5 h-3.5" />
                    More like this
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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
