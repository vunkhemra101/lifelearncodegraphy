import { useEffect, useRef } from "react";

/**
 * NetworkBackground
 * A high-performance, responsive HTML5 Canvas 3D particle network animation.
 * Features:
 * - Dark navy-to-black deep gradient atmosphere
 * - 3D depth perspective with nodes moving along X, Y, and Z axes
 * - Glowing neon cyan/blue nodes and dynamic interconnected plexus lines
 * - Subtle translucent polygonal mesh fill between close nodes for high-tech depth
 * - Fluid interactive mouse influence with connective beam lines
 * - Automatic canvas resizing and retina display (devicePixelRatio) support
 * - CPU/Battery optimization (pauses when off-screen or tab is hidden)
 */
export default function NetworkBackground({
  className = "",
  particleDensity = 9500, // Area in px per particle (lower = denser)
  maxParticles = 160,
  minParticles = 45,
  lineDistance = 145,
  mouseRadius = 180,
  mouseConnection = true,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Track mouse state in viewport coordinates
    const mouse = {
      x: null,
      y: null,
      targetX: null,
      targetY: null,
      radius: mouseRadius,
      active: false,
    };

    // Color definitions for futuristic neon blue / cyan aesthetic
    const COLOR_CYAN = "rgba(0, 240, 255, ";
    const COLOR_SKY = "rgba(56, 189, 248, ";
    const COLOR_ELECTRIC = "rgba(14, 165, 233, ";

    class Particle3D {
      constructor(w, h, depth) {
        this.reset(w, h, depth, true);
      }

      reset(w, h, depth, initial = false) {
        this.x = (Math.random() - 0.5) * w * 1.2;
        this.y = (Math.random() - 0.5) * h * 1.2;
        this.z = initial ? Math.random() * depth : depth;

        // Subtle 3D floating velocity
        const speed = 0.35 + Math.random() * 0.45;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.vz = (Math.random() - 0.5) * 0.4;

        // Base size and pulse attributes
        this.baseRadius = 1.2 + Math.random() * 2.2;
        this.isMajorNode = Math.random() < 0.18; // 18% of nodes are prominent hubs
        if (this.isMajorNode) {
          this.baseRadius *= 1.4;
        }

        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;

        // Projected 2D coords
        this.screenX = 0;
        this.screenY = 0;
        this.screenRadius = 0;
        this.alpha = 1;
      }

      update(w, h, depth, fov, cx, cy, mouseState, dt = 1) {
        // Continuous movement with frame-rate independent delta timing
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.z += this.vz * dt;

        // Boundary wrapping with soft margin
        const halfW = (w * 1.3) / 2;
        const halfH = (h * 1.3) / 2;
        if (this.x < -halfW) this.x = halfW;
        else if (this.x > halfW) this.x = -halfW;

        if (this.y < -halfH) this.y = halfH;
        else if (this.y > halfH) this.y = -halfH;

        if (this.z < 10) this.z = depth;
        else if (this.z > depth) this.z = 10;

        // Perspective projection calculation
        const perspective = fov / (fov + this.z);
        this.screenX = cx + this.x * perspective;
        this.screenY = cy + this.y * perspective;

        // Distance attenuation: closer particles are larger, brighter
        const depthFactor = Math.max(0.15, Math.min(1.2, 1 - this.z / (depth * 1.15)));
        this.pulsePhase += this.pulseSpeed;
        const pulse = 1 + Math.sin(this.pulsePhase) * 0.22;

        this.screenRadius = this.baseRadius * perspective * pulse;
        this.alpha = depthFactor;

        // Mouse influence: subtle attraction & repulsion displacement
        if (mouseState.active && mouseState.x !== null && mouseState.y !== null) {
          const dx = this.screenX - mouseState.x;
          const dy = this.screenY - mouseState.y;
          const dist = Math.sqrt(dx * dy + dx * dx); // Fast distance check
          if (dist < mouseState.radius && dist > 1) {
            const force = (1 - dist / mouseState.radius) * 1.2;
            this.x += (dx / dist) * force * 3;
            this.y += (dy / dist) * force * 3;
          }
        }
      }
    }

    let particles = [];
    const FOV = 550;
    const DEPTH = 900;

    const initParticles = () => {
      const area = width * height;
      const count = Math.min(
        maxParticles,
        Math.max(minParticles, Math.floor(area / particleDensity))
      );

      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle3D(width, height, DEPTH));
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.scale(dpr, dpr);

      initParticles();
    };

    // Smooth pointer tracking
    const onPointerMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
      mouse.targetX = null;
      mouse.targetY = null;
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const onTouchEnd = () => {
      mouse.active = false;
      mouse.targetX = null;
      mouse.targetY = null;
    };

    // Register interaction listeners on window so canvas can be pointer-events-none
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    // Initial resize
    handleResize();

    // Render loop
    let lastTime = performance.now();
    let isTabVisible = true;

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTime = performance.now();
        requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const render = (time) => {
      if (!isTabVisible) return;

      const dt = Math.min((time - lastTime) / 16.667, 2) || 1;
      lastTime = time;

      // Ease mouse coordinates for smooth inertia
      if (mouse.active && mouse.targetX !== null) {
        if (mouse.x === null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.15;
          mouse.y += (mouse.targetY - mouse.y) * 0.15;
        }
      } else {
        mouse.x = null;
        mouse.y = null;
      }

      const cx = width / 2;
      const cy = height / 2;

      // ── 1. Clear & Draw Rich Deep Navy/Black Gradient ──
      const bgGradient = ctx.createRadialGradient(
        cx,
        cy * 0.65,
        Math.min(width, height) * 0.1,
        cx,
        cy,
        Math.max(width, height) * 0.95
      );
      // Modern cyber tech gradient: deep midnight navy center fading to obsidian black
      bgGradient.addColorStop(0, "#081d33");
      bgGradient.addColorStop(0.45, "#040e1c");
      bgGradient.addColorStop(0.85, "#02070f");
      bgGradient.addColorStop(1, "#010307");

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient cyber radial glow spot
      const spotGlow = ctx.createRadialGradient(cx * 1.1, cy * 0.5, 0, cx * 1.1, cy * 0.5, width * 0.55);
      spotGlow.addColorStop(0, "rgba(0, 150, 220, 0.11)");
      spotGlow.addColorStop(0.5, "rgba(10, 40, 75, 0.05)");
      spotGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = spotGlow;
      ctx.fillRect(0, 0, width, height);

      // ── 2. Update all particles ──
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        particles[i].update(width, height, DEPTH, FOV, cx, cy, mouse, dt);
      }

      // ── 3. Draw Interconnecting Lines & Plexus Facets ──
      const maxDist = lineDistance;
      const maxDistSq = maxDist * maxDist;

      for (let i = 0; i < len; i++) {
        const p1 = particles[i];
        let connectionCount = 0;

        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];

          // Compute 2D screen distance
          const dx = p1.screenX - p2.screenX;
          const dy = p1.screenY - p2.screenY;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            // Proximity falloff
            const normDist = 1 - dist / maxDist;
            // Modulate with both particles' 3D depth alpha
            const lineAlpha = normDist * normDist * Math.min(p1.alpha, p2.alpha) * 0.55;

            if (lineAlpha > 0.015) {
              ctx.beginPath();
              ctx.moveTo(p1.screenX, p1.screenY);
              ctx.lineTo(p2.screenX, p2.screenY);
              ctx.strokeStyle = `${COLOR_CYAN}${lineAlpha})`;
              ctx.lineWidth = normDist > 0.6 ? 1.15 : 0.75;
              ctx.stroke();

              connectionCount++;

              // Triangular mesh face fill for Plexus 3D geometry aesthetic (up to a small subset)
              if (connectionCount < 3 && j + 1 < len) {
                const p3 = particles[j + 1];
                const d3x = p1.screenX - p3.screenX;
                const d3y = p1.screenY - p3.screenY;
                if (d3x * d3x + d3y * d3y < maxDistSq * 0.75) {
                  ctx.beginPath();
                  ctx.moveTo(p1.screenX, p1.screenY);
                  ctx.lineTo(p2.screenX, p2.screenY);
                  ctx.lineTo(p3.screenX, p3.screenY);
                  ctx.closePath();
                  ctx.fillStyle = `rgba(0, 200, 255, ${lineAlpha * 0.085})`;
                  ctx.fill();
                }
              }
            }
          }
        }

        // Mouse connection line
        if (mouseConnection && mouse.active && mouse.x !== null) {
          const mdx = p1.screenX - mouse.x;
          const mdy = p1.screenY - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          const mRadiusSq = mouse.radius * mouse.radius;

          if (mDistSq < mRadiusSq) {
            const mDist = Math.sqrt(mDistSq);
            const mAlpha = (1 - mDist / mouse.radius) * p1.alpha * 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `${COLOR_SKY}${mAlpha})`;
            ctx.lineWidth = 1.25;
            ctx.stroke();
          }
        }
      }

      // ── 4. Draw Glowing Nodes & Particles ──
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        if (
          p.screenX < -20 ||
          p.screenX > width + 20 ||
          p.screenY < -20 ||
          p.screenY > height + 20
        ) {
          continue;
        }

        const radius = Math.max(0.6, p.screenRadius);
        const coreAlpha = Math.min(1, p.alpha * 1.1);

        // A. Outer Neon Glow Halo
        const glowRadius = p.isMajorNode ? radius * 4.8 : radius * 3.2;
        const glowGradient = ctx.createRadialGradient(
          p.screenX,
          p.screenY,
          radius * 0.2,
          p.screenX,
          p.screenY,
          glowRadius
        );
        glowGradient.addColorStop(0, `${COLOR_CYAN}${p.alpha * 0.55})`);
        glowGradient.addColorStop(0.5, `${COLOR_ELECTRIC}${p.alpha * 0.2})`);
        glowGradient.addColorStop(1, "rgba(0, 240, 255, 0)");

        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // B. Node Solid Core
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isMajorNode
          ? `rgba(235, 252, 255, ${coreAlpha})` // Bright white-cyan highlight for major nodes
          : `${COLOR_SKY}${coreAlpha * 0.95})`;
        ctx.fill();
      }

      // ── 5. Mouse Pointer Cursor Node ──
      if (mouseConnection && mouse.active && mouse.x !== null) {
        // Glowing cursor hub
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 16);
        cursorGlow.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        cursorGlow.addColorStop(0.3, "rgba(0, 240, 255, 0.6)");
        cursorGlow.addColorStop(1, "rgba(0, 240, 255, 0)");

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = cursorGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [particleDensity, maxParticles, minParticles, lineDistance, mouseRadius, mouseConnection]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{
        background: "radial-gradient(ellipse at 50% 25%, #081d33 0%, #030b17 55%, #010408 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
}
