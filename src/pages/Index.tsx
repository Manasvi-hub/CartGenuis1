import { useRef, useCallback } from "react";
import { toast } from "sonner";
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
    }
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingBackground />
      <Navbar
        cartCount={cart.totalCount}
        onCartClick={() => cart.setIsOpen(true)}
        user={auth.user}
        onSignOut={auth.signOut}
        onSignIn={() => auth.setShowAuth(true)}
      />
      <HeroSection onExplore={scrollToProducts} />

      {/* Explore Variants */}
      <div ref={productsRef}>
        <ExploreVariants
          onView={handleView}
          onAddToCart={handleAddToCart}
          highlightBaseType={lastViewed?.baseType}
        />
      </div>

      {/* AI Recommendations */}
      <RecommendationSection
        title="Recommended For You"
        subtitle="Based on your recent activity"
        products={contentBased}
        reason={
          lastViewed
            ? `More like ${lastViewed.baseType} · Other styles you may like`
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

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p className="font-display text-lg font-semibold gradient-text mb-2">CartGenius</p>
          <p>AI-Powered Smart Shopping — Built for the future of e-commerce.</p>
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
    </div>
  );
};

export default Index;
