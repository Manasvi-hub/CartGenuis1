import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Zap, ShieldCheck, Truck } from "lucide-react";

const words = ["Home Decor", "Kitchen", "Vintage", "Gifts"];

const features = [
  { icon: Zap, label: "AI Recommendations" },
  { icon: ShieldCheck, label: "Secure Checkout" },
  { icon: Truck, label: "Free Delivery" },
];

const HeroSection = ({ onExplore }: { onExplore: () => void }) => {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 glass-subtle px-4 py-2 rounded-full mb-10 border-primary/20"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[13px] font-semibold tracking-wide uppercase text-primary/90">
            Powered by Next-Gen Intelligence
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-[100px] font-bold tracking-tight mb-8 leading-[0.95]"
        >
          Curating Your
          <br />
          <span className="relative inline-block min-w-[280px] md:min-w-[400px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, filter: "blur(15px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(15px)", y: -20 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="gradient-text text-glow pb-2"
              >
                {words[currentWord]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed font-medium opacity-80"
        >
          Experience a new era of personalized commerce. Curated collections 
          seamlessly integrated with industrial-grade AI recommendations.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-12"
        >
          <button
            onClick={onExplore}
            className="btn-premium group"
          >
            Explore Collections
            <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
          </button>

          {/* Features */}
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-3 text-muted-foreground/60 hover:text-primary/80 transition-colors duration-300"
              >
                <div className="p-2 rounded-lg bg-primary/5">
                  <feat.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-semibold tracking-wide uppercase">{feat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
