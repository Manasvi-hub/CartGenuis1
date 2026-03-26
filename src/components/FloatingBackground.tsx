import { useEffect, useRef } from "react";

const FloatingBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
      if (containerRef.current) {
        const dx = (mouseRef.current.x - 0.5) * 12;
        const dy = (mouseRef.current.y - 0.5) * 12;
        containerRef.current.style.setProperty("--mx", `${dx}px`);
        containerRef.current.style.setProperty("--my", `${dy}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ "--mx": "0px", "--my": "0px" } as React.CSSProperties}
    >
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[hsl(220,30%,6%)]" />

      {/* Aurora blob 1 - cyan */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.07] animate-aurora-1"
        style={{
          background: "radial-gradient(circle, hsl(195 100% 50%) 0%, transparent 70%)",
          top: "-20%",
          left: "10%",
          filter: "blur(100px)",
          transform: "translate(var(--mx), var(--my))",
        }}
      />

      {/* Aurora blob 2 - purple */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] animate-aurora-2"
        style={{
          background: "radial-gradient(circle, hsl(260 80% 60%) 0%, transparent 70%)",
          top: "30%",
          right: "-5%",
          filter: "blur(120px)",
          transform: "translate(calc(var(--mx) * -0.7), calc(var(--my) * -0.7))",
        }}
      />

      {/* Aurora blob 3 - deep blue */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.05] animate-aurora-3"
        style={{
          background: "radial-gradient(circle, hsl(210 100% 40%) 0%, transparent 70%)",
          bottom: "-10%",
          left: "30%",
          filter: "blur(110px)",
          transform: "translate(calc(var(--mx) * 0.5), calc(var(--my) * 0.5))",
        }}
      />

      {/* Light wave overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] animate-shimmer-slow"
        style={{
          background:
            "linear-gradient(110deg, transparent 25%, hsl(195 100% 50% / 0.4) 50%, transparent 75%)",
          backgroundSize: "300% 100%",
        }}
      />
    </div>
  );
};

export default FloatingBackground;
