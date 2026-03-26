import { useEffect, useRef } from "react";

const FloatingBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / w;
      mouseRef.current.y = e.clientY / h;
    };
    window.addEventListener("mousemove", handleMouse);

    // 3D grid points
    const cols = 28;
    const rows = 20;
    const spacing = 80;

    // Particles floating in 3D space
    const particles: { x: number; y: number; z: number; speed: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 1500,
        z: Math.random() * 1000,
        speed: 0.3 + Math.random() * 0.7,
      });
    }

    let time = 0;

    const draw = () => {
      time += 0.003;
      ctx.clearRect(0, 0, w, h);

      // Dark base
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, w * 0.8);
      bg.addColorStop(0, "hsl(220, 25%, 8%)");
      bg.addColorStop(1, "hsl(220, 20%, 4%)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Auto camera drift + mouse parallax
      const driftX = Math.sin(time * 0.7) * 0.06 + Math.cos(time * 0.3) * 0.03;
      const driftY = Math.cos(time * 0.5) * 0.04 + Math.sin(time * 0.2) * 0.02;
      const mx = (mouseRef.current.x - 0.5) * 0.15 + driftX;
      const my = (mouseRef.current.y - 0.5) * 0.1 + driftY;

      // === LAYER 1: Perspective grid ===
      ctx.save();
      const vanishX = w * 0.5 + mx * 200;
      const vanishY = h * 0.38 + my * 100;
      const fov = 500;

      // Draw horizontal grid lines with perspective
      for (let r = 0; r < rows; r++) {
        const worldZ = 100 + r * spacing;
        const wave = Math.sin(time * 2 + r * 0.3) * 8;

        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const worldX = (c - cols / 2) * spacing;
          const worldY = 200 + wave;

          const scale = fov / (fov + worldZ);
          const sx = vanishX + worldX * scale;
          const sy = vanishY + worldY * scale;

          if (c === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        const depth = 1 - r / rows;
        const alpha = depth * 0.12;
        ctx.strokeStyle = `hsla(195, 100%, 50%, ${alpha})`;
        ctx.lineWidth = depth * 1.5;
        ctx.stroke();
      }

      // Draw vertical grid lines with perspective
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const worldZ = 100 + r * spacing;
          const worldX = (c - cols / 2) * spacing;
          const wave = Math.sin(time * 2 + r * 0.3) * 8;
          const worldY = 200 + wave;

          const scale = fov / (fov + worldZ);
          const sx = vanishX + worldX * scale;
          const sy = vanishY + worldY * scale;

          if (r === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        const dist = Math.abs(c - cols / 2) / (cols / 2);
        const alpha = (1 - dist) * 0.08;
        ctx.strokeStyle = `hsla(195, 100%, 50%, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      // === LAYER 2: Floating 3D particles ===
      for (const p of particles) {
        p.z -= p.speed;
        if (p.z < 1) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * 2000;
          p.y = (Math.random() - 0.5) * 1500;
        }

        const scale = fov / (fov + p.z);
        const sx = w * 0.5 + (p.x + mx * 300) * scale;
        const sy = h * 0.5 + (p.y + my * 200) * scale;
        const radius = Math.max(0.5, 2.5 * scale);
        const alpha = Math.min(1, scale * 1.5) * 0.6;

        // Glow
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius * 6);
        glow.addColorStop(0, `hsla(195, 100%, 70%, ${alpha * 0.3})`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(sx - radius * 6, sy - radius * 6, radius * 12, radius * 12);

        // Core
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(195, 100%, 80%, ${alpha})`;
        ctx.fill();
      }

      // === LAYER 3: Large aurora glows ===
      const drawGlow = (
        cx: number, cy: number,
        r: number,
        hue: number,
        phase: number,
        intensity: number
      ) => {
        const pulse = 0.5 + 0.5 * Math.sin(time * 1.5 + phase);
        const gx = cx + mx * 80;
        const gy = cy + my * 50;
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
        const a = intensity * (0.06 + pulse * 0.04);
        grad.addColorStop(0, `hsla(${hue}, 80%, 55%, ${a})`);
        grad.addColorStop(0.5, `hsla(${hue}, 70%, 40%, ${a * 0.4})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(gx - r, gy - r, r * 2, r * 2);
      };

      drawGlow(w * 0.2, h * 0.25, w * 0.5, 195, 0, 1);
      drawGlow(w * 0.8, h * 0.6, w * 0.4, 260, 2, 0.8);
      drawGlow(w * 0.5, h * 0.8, w * 0.45, 210, 4, 0.6);

      // === LAYER 4: Horizon glow line ===
      const horizonY = vanishY + 20;
      const lineGrad = ctx.createLinearGradient(0, horizonY - 2, 0, horizonY + 2);
      lineGrad.addColorStop(0, "transparent");
      lineGrad.addColorStop(0.5, `hsla(195, 100%, 50%, ${0.08 + Math.sin(time * 3) * 0.03})`);
      lineGrad.addColorStop(1, "transparent");
      ctx.fillStyle = lineGrad;
      ctx.fillRect(w * 0.1, horizonY - 20, w * 0.8, 40);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default FloatingBackground;
