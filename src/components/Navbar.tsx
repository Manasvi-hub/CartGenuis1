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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border/50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-xl font-display font-bold gradient-text">CartGenius</span>
        </div>

        <div className="hidden md:flex items-center gap-1 glass-subtle rounded-full px-4 py-2 w-80">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1 ml-2"
          />
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-muted-foreground">
                Hi, <span className="text-foreground font-medium">{user.name}</span>
              </span>
              <button
                onClick={onSignOut}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-subtle text-sm text-foreground hover:bg-card/60 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          <button
            onClick={onCartClick}
            className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium"
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
