import { motion, useScroll, useTransform } from "framer-motion";

const FloatingBackground = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background">
      {/* Mesh Gradient Orbs */}
      <motion.div
        style={{ y: y1 }}
        animate={{
          x: [0, 100, 0],
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px]"
      />
      
      <motion.div
        style={{ y: y2 }}
        animate={{
          x: [0, -80, 0],
          opacity: [0.1, 0.2, 0.1],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] -right-[5%] w-[50%] h-[50%] rounded-full bg-accent/15 blur-[100px]"
      />

      <motion.div
        style={{ y: y3 }}
        animate={{
          y: [0, 60, 0],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[90px]"
      />

      {/* Subtle Grid Pattern (Enterprise Standard) */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
    </div>
  );
};

export default FloatingBackground;
