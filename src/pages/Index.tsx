import { useRef, useCallback } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RecommendationSection from "@/components/RecommendationSection";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import { products } from "@/data/products";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

const Index = () => {
  const productsRef = useRef<HTMLDivElement>(null);
  const { trackActivity, contentBased, collaborative, lastViewed } = useRecommendations();
  const cart = useCart();
  const auth = useAuth();

  const handleView = useCallback((id: string) => {
    trackActivity(id, "view");
    const product = products.find((p) => p.id === id);
    if (product) toast(`Viewed: ${product.name}`, { description: "Recommendations updated!" });
  }, [trackActivity]);

  const handleAddToCart = useCallback((id: string) => {
    trackActivity(id, "purchase");
    cart.addToCart(id);
    const product = products.find((p) => p.id === id);
    if (product) toast.success(`${product.name} added to cart!`);
  }, [trackActivity, cart.addToCart]);

  const handleCheckout = () => {
    if (!auth.user) {
      auth.setShowAuth(true);
      toast("Please sign in to continue", { description: "Login required for checkout" });
    } else {
      toast.success("Proceeding to checkout…");
      // Checkout flow would go here
    }
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cart.totalCount}
        onCartClick={() => cart.setIsOpen(true)}
        user={auth.user}
        onSignOut={auth.signOut}
        onSignIn={() => auth.setShowAuth(true)}
      />
      <HeroSection onExplore={scrollToProducts} />

      {/* All Products */}
      <section ref={productsRef} className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">All Products</h2>
            <p className="text-muted-foreground">Browse our curated collection</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onView={handleView}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
      <RecommendationSection
        title="Recommended For You"
        subtitle="Based on your recent activity"
        products={contentBased}
        reason={lastViewed ? `Because you viewed ${lastViewed.name}` : undefined}
        onView={handleView}
        onAddToCart={handleAddToCart}
      />

      {/* Collaborative */}
      {lastViewed && collaborative.length > 0 && (
        <RecommendationSection
          title="People Also Bought"
          subtitle="Popular picks from similar shoppers"
          products={collaborative}
          reason={`People who viewed ${lastViewed.name} also liked these`}
          onView={handleView}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p className="font-display text-lg font-semibold gradient-text mb-2">CartGenius</p>
          <p>AI-Powered Smart Shopping — Built for the future of e-commerce.</p>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        items={cart.items}
        subtotal={cart.subtotal}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
        onCheckout={handleCheckout}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={auth.showAuth}
        onClose={() => auth.setShowAuth(false)}
        onSignIn={auth.signIn}
      />
    </div>
  );
};

export default Index;
