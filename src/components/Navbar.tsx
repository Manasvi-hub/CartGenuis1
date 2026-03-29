import { ShoppingCart, Sparkles, Search, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import type { User as UserType } from "@/hooks/useAuth";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  user: UserType | null;
  onSignOut: () => void;
  onSignIn: () => void;
}

const Navbar = ({ cartCount, onCartClick, user, onSignOut, onSignIn }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 backdrop-blur-2xl"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight gradient-text">
            CartGenius
          </span>
        </div>

        {/* Improved Search Bar */}
        <div className="hidden lg:flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-full px-5 py-2.5 w-[400px] transition-all duration-300 focus-within:w-[450px] focus-within:bg-white/[0.06] focus-within:border-primary/30 group">
          <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search products, styles, collections..."
            className="bg-transparent border-none outline-none text-[14px] text-foreground placeholder:text-muted-foreground/50 flex-1 font-medium"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">Member</span>
                <span className="text-sm font-semibold text-foreground">{user.name}</span>
              </div>
              <button
                onClick={onSignOut}
                className="p-2.5 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300 text-muted-foreground hover:text-foreground"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-primary hover:text-white transition-all duration-300"
            >
              <User className="w-4 h-4" />
              Sign In
            </button>
          )}

          <div className="h-8 w-px bg-white/10 hidden md:block" />

          <button
            onClick={onCartClick}
            className="relative p-2.5 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all duration-300 group"
          >
            <ShoppingCart className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold border-2 border-background"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
