import { useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
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

  // Stagger variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30">
      <FloatingBackground />

      {/* Industrial loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 rounded-full border-[1px] border-primary/10 border-t-primary shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)]"
                />
                <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
              </div>
              <div className="text-center space-y-3">
                <h2 className="font-display text-2xl font-bold tracking-tighter gradient-text">CartGenius</h2>
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-1 h-1 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1 h-1 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1 h-1 rounded-full bg-primary animate-bounce" />
                </div>
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

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroSection onExplore={scrollToProducts} />

        <div className="container mx-auto px-6 relative z-10 space-y-32 pb-32">
          {/* Explore Collections */}
          <motion.div variants={itemVariants} ref={productsRef} className="scroll-mt-24">
            <ExploreVariants
              onView={handleView}
              onAddToCart={handleAddToCart}
              highlightBaseType={lastViewed?.category}
            />
          </motion.div>

          {/* AI Recommendations */}
          <motion.div variants={itemVariants} className="section-divider" />
          
          <motion.div variants={itemVariants}>
            <RecommendationSection
              title="Intelligence Curated"
              subtitle="Optimized for your unique profile"
              products={contentBased}
              reason={
                lastViewed
                  ? `Synergizing with ${lastViewed.category} preferences`
                  : undefined
              }
              onView={handleView}
              onAddToCart={handleAddToCart}
            />
          </motion.div>

          {/* Collaborative */}
          {lastViewed && collaborative.length > 0 && (
            <>
              <motion.div variants={itemVariants} className="section-divider" />
              <motion.div variants={itemVariants}>
                <RecommendationSection
                  title="Peer Trends"
                  subtitle="Collaborative filtering analysis"
                  products={collaborative}
                  reason={`Network analysis matches your browsing patterns`}
                  onView={handleView}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            </>
          )}
        </div>
      </motion.main>

      {/* Premium Footer */}
      <footer className="relative border-t border-white/5 py-24 bg-card/30 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            {/* Brand */}
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="font-display text-2xl font-bold tracking-tight gradient-text">CartGenius</span>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed max-w-sm font-medium opacity-70">
                Revolutionizing retail through industrial-grade AI. Delivering curated digital 
                experiences for the modern consumer.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="font-display font-bold text-foreground text-sm uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4 text-sm font-semibold text-muted-foreground/60">
                <li><button onClick={scrollToProducts} className="hover:text-primary transition-colors">Collections</button></li>
                <li><button className="hover:text-primary transition-colors">Intelligence</button></li>
                <li><button className="hover:text-primary transition-colors">Infrastructure</button></li>
                <li><button className="hover:text-primary transition-colors">Ecosystem</button></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-6">
              <h4 className="font-display font-bold text-foreground text-sm uppercase tracking-widest">Enterprise</h4>
              <ul className="space-y-4 text-sm font-semibold text-muted-foreground/60">
                <li><button className="hover:text-primary transition-colors">Solutions</button></li>
                <li><button className="hover:text-primary transition-colors">Architecture</button></li>
                <li><button className="hover:text-primary transition-colors">Documentation</button></li>
                <li><button className="hover:text-primary transition-colors">Security</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[13px] font-bold text-muted-foreground/40 uppercase tracking-widest">
              © 2026 CartGenius Industrial. All rights reserved.
            </p>
            <div className="flex items-center gap-8 text-[13px] font-bold text-muted-foreground/40 uppercase tracking-widest">
              <button className="hover:text-primary transition-colors">Privacy</button>
              <button className="hover:text-primary transition-colors">Terms</button>
              <button className="hover:text-primary transition-colors">Cookies</button>
            </div>
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
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="glass border border-primary/20 px-5 py-3 rounded-xl flex items-center gap-4 text-sm shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-muted-foreground font-bold uppercase tracking-widest text-[11px]">
                Active <span className="text-foreground">Demo Module</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
