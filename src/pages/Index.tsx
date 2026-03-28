import { useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Sparkles, Github, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RecommendationSection from "@/components/RecommendationSection";
import ExploreVariants from "@/components/ExploreVariants";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import { products } from "@/data/products";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import FloatingBackground from "@/components/FloatingBackground";

const Index = () => {
  const productsRef = useRef<HTMLDivElement>(null);
  const { trackActivity, contentBased, collaborative, lastViewed, isLoading, error } = useRecommendations();
  const cart = useCart();
  const auth = useAuth();

  const handleView = useCallback((id: string) => {
    trackActivity(id, "view");
    const product = products.find(p => p.id === id);
    toast(`Viewing: ${product?.name || "Product"}`, {
      description: "Your recommendations are updating…",
      icon: <Sparkles className="w-4 h-4 text-primary" />,
    });
  }, [trackActivity]);

  const handleAddToCart = useCallback((id: string) => {
    trackActivity(id, "purchase");
    cart.addToCart(id);
    const product = products.find(p => p.id === id);
    toast.success(`${product?.name || "Item"} added to cart!`, {
      description: `£${product?.price.toFixed(2)} · Free delivery`,
    });
  }, [trackActivity, cart.addToCart]);

  const handleCheckout = () => {
    if (!auth.user) {
      auth.setShowAuth(true);
      toast("Please sign in to continue", { description: "Login required for checkout" });
    } else {
      toast.success("Proceeding to checkout…");
    }
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingBackground />

      {/* Enterprise loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Animated logo */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary"
                />
                <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="font-display text-xl font-semibold gradient-text">CartGenius</h2>
                <p className="text-sm text-muted-foreground animate-pulse">Loading your personalized experience…</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar
        cartCount={cart.totalCount}
        onCartClick={() => cart.setIsOpen(true)}
        user={auth.user}
        onSignOut={auth.signOut}
        onSignIn={() => auth.setShowAuth(true)}
      />
      <HeroSection onExplore={scrollToProducts} />

      {/* Explore Collections */}
      <div ref={productsRef}>
        <ExploreVariants
          onView={handleView}
          onAddToCart={handleAddToCart}
          highlightBaseType={lastViewed?.category}
        />
      </div>

      {/* AI Recommendations */}
      <RecommendationSection
        title="Recommended For You"
        subtitle="Based on your recent activity"
        products={contentBased}
        reason={
          lastViewed
            ? `More like ${lastViewed.category} · Other styles you may like`
            : undefined
        }
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

      {/* Premium Footer */}
      <footer className="relative border-t border-border/50 py-16 mt-8">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-display text-xl font-bold gradient-text">CartGenius</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                AI-powered smart shopping platform. Discover curated products tailored to your unique taste.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={scrollToProducts} className="hover:text-primary transition-colors">Collections</button></li>
                <li><button className="hover:text-primary transition-colors">New Arrivals</button></li>
                <li><button className="hover:text-primary transition-colors">Best Sellers</button></li>
                <li><button className="hover:text-primary transition-colors">About Us</button></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-primary transition-colors">Help Center</button></li>
                <li><button className="hover:text-primary transition-colors">Shipping Info</button></li>
                <li><button className="hover:text-primary transition-colors">Returns Policy</button></li>
                <li><button className="hover:text-primary transition-colors">Contact Us</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2026 CartGenius. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-destructive fill-destructive" /> using React & AI
            </p>
          </div>
        </div>
      </footer>

      <CartDrawer
        isOpen={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        items={cart.items}
        subtotal={cart.subtotal}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
        onCheckout={handleCheckout}
      />

      <AuthModal
        isOpen={auth.showAuth}
        onClose={() => auth.setShowAuth(false)}
        onSignIn={auth.signIn}
      />

      {/* Demo Mode indicator */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div className="glass-subtle border border-primary/20 px-4 py-2.5 rounded-lg flex items-center gap-3 text-sm shadow-lg">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-muted-foreground">
                Running in <span className="font-semibold text-foreground">Demo Mode</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
