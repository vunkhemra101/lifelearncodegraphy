import { useEffect, useRef, useState, useCallback } from "react";

/**
 * HalftoneHeroImage
 *
 * Interactive Halftone Dot Matrix effect that reveals LOCALLY ONLY where you hover ("a little on image").
 *
 * Behavior:
 * - Hovering reveals a soft, localized circular lens (~95px radius) around your mouse pointer.
 * - The rest of the portrait remains your normal photograph.
 * - As you move your mouse across the image, only that little area under the cursor reveals the halftone matrix.
 * - Scrolling down the page does NOT trigger the halftone effect; it only transitions the normal poses.
 * - Leaves 0% halftone when the mouse is away.
 */
export default function HalftoneHeroImage({
  normalSrc,
  foldedSrc,
  scrollProgress = 0,
  className = "",
  alt = "Programmer Portrait",
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imgNormalRef = useRef(null);
  const imgFoldedRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);

  // Keep scrollProgress ref updated so WebGL pose matches current scroll position
  const scrollProgressRef = useRef(scrollProgress);
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  // WebGL animation and interaction state
  const stateRef = useRef({
    hoverProgress: 0,
    targetHover: 0,
    mouse: { x: -1000, y: -1000, active: false },
    time: 0,
    animId: null,
    gl: null,
    program: null,
    uniforms: {},
    textures: { normal: null, folded: null },
    isDestroyed: false,
  });

  // Sync hover state: 1 when hovering, 0 when left
  useEffect(() => {
    stateRef.current.targetHover = isHovered ? 1 : 0;
  }, [isHovered]);

  // Pointer tracking
  const updatePointer = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Invert Y for WebGL coordinates (origin at bottom-left)
    const x = (clientX - rect.left) * dpr;
    const y = (rect.bottom - clientY) * dpr;
    stateRef.current.mouse = { x, y, active: true };
  }, []);

  const handleMouseMove = useCallback((e) => {
    updatePointer(e.clientX, e.clientY);
  }, [updatePointer]);

  const handleMouseEnter = useCallback((e) => {
    setIsHovered(true);
    updatePointer(e.clientX, e.clientY);
  }, [updatePointer]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    stateRef.current.mouse.active = false;
  }, []);

  // Touch tracking for mobile
  const handleTouchMove = useCallback((e) => {
    if (e.touches && e.touches[0]) {
      setIsHovered(true);
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [updatePointer]);

  const handleTouchEnd = useCallback(() => {
    setIsHovered(false);
    stateRef.current.mouse.active = false;
  }, []);

  // WebGL Lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const state = stateRef.current;
    if (!canvas || !container) return;

    let gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) {
      gl = canvas.getContext("experimental-webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      });
    }

    if (!gl) {
      console.warn("WebGL unavailable for Halftone Effect.");
      return;
    }

    state.gl = gl;
    state.isDestroyed = false;

    // Vertex Shader: full-screen quad
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Localized spotlight reveal ("hover a little on image")
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;

      uniform sampler2D u_texNormal;
      uniform sampler2D u_texFolded;
      uniform float u_scrollProgress;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_mouseActive;
      uniform float u_hover;
      uniform float u_time;
      uniform float u_cellSize;

      // Sample blended poses based on current scroll position
      vec4 sampleBlended(vec2 uv) {
        if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
          return vec4(0.0);
        }
        vec4 c1 = texture2D(u_texNormal, uv);
        vec4 c2 = texture2D(u_texFolded, uv);
        return mix(c1, c2, u_scrollProgress);
      }

      void main() {
        // ONLY active on hover and when mouse is active
        if (u_hover <= 0.001 || u_mouseActive < 0.5) {
          gl_FragColor = vec4(0.0);
          return;
        }

        vec2 fragPx = gl_FragCoord.xy;

        // Localized Spotlight: ONLY reveal "a little" right where the cursor hovers
        float distToMouse = length(fragPx - u_mouse);
        // Spotlight radius (~95px in CSS coordinates, soft feathered edge)
        float spotRadius = u_cellSize * 11.5;
        float spotInner = u_cellSize * 2.5;
        float spotlight = smoothstep(spotRadius, spotInner, distToMouse);

        // Outside the spotlight circle, don't draw anything (normal photo is visible)
        if (spotlight <= 0.001) {
          gl_FragColor = vec4(0.0);
          return;
        }

        vec2 uv = fragPx / u_resolution;
        vec2 texUV = vec2(uv.x, 1.0 - uv.y);

        vec4 baseSample = sampleBlended(texUV);
        if (baseSample.a < 0.02) {
          gl_FragColor = vec4(0.0);
          return;
        }

        float cellSize = u_cellSize;
        vec2 cellCoord = floor(fragPx / cellSize);

        float maxWhite = 0.0;
        float maxBlue = 0.0;
        float maxCyan = 0.0;
        float bloom = 0.0;
        float maxAlpha = 0.0;

        // Evaluate 3x3 neighborhood so overlapping large dots fuse into smooth lobes
        for (int dy = -1; dy <= 1; dy++) {
          for (int dx = -1; dx <= 1; dx++) {
            vec2 neighborCell = cellCoord + vec2(float(dx), float(dy));
            vec2 centerPx = (neighborCell + 0.5) * cellSize;
            vec2 centerTexUV = vec2(centerPx.x / u_resolution.x, 1.0 - centerPx.y / u_resolution.y);

            vec4 samp = sampleBlended(centerTexUV);
            float a = samp.a;
            if (a < 0.03) continue;
            maxAlpha = max(maxAlpha, a);

            // Perceived luminance
            float lum = dot(samp.rgb, vec3(0.299, 0.587, 0.114)) * a;

            // Subtle energy shimmer across dots
            float shimmer = sin(centerPx.x * 0.09 + centerPx.y * 0.07 + u_time * 2.2) * 0.02;
            lum = clamp(lum + shimmer * (0.4 + 0.6 * lum), 0.0, 1.0);

            // Contrast enhancement curve
            float normLum = clamp((lum - 0.02) / 0.88, 0.0, 1.0);
            normLum = pow(normLum, 0.76);

            // Max radius: cellSize * 0.74 allows adjacent dots to touch and merge into lobes
            float maxR = cellSize * 0.74;
            // Dots gracefully taper down at the spotlight perimeter
            float radius = max(normLum * maxR, normLum > 0.05 ? 1.0 : 0.0) * sqrt(spotlight);

            float dist = length(fragPx - centerPx);

            // Diffuse cyan bloom halo around bright dots
            if (dist < radius * 1.55) {
              float b = smoothstep(radius * 1.55, radius * 0.6, dist) * normLum * 0.42;
              bloom = max(bloom, b);
            }

            // Dot body
            if (dist < radius + 1.25) {
              float edgeAlpha = smoothstep(radius + 0.85, radius - 0.65, dist);

              // Brilliant White core appears at center of bright dots
              if (normLum > 0.32) {
                float coreRadius = radius * (normLum - 0.24) * 1.20;
                float white = smoothstep(coreRadius + 0.8, coreRadius - 0.6, dist) * edgeAlpha;
                maxWhite = max(maxWhite, white);
              }

              // Cyan midtone
              float cyan = smoothstep(radius * 0.82, 0.0, dist) * normLum * edgeAlpha;
              maxCyan = max(maxCyan, cyan);

              maxBlue = max(maxBlue, edgeAlpha);
            }
          }
        }

        // Deep navy-black silhouette base (#010408)
        vec3 col = vec3(0.005, 0.02, 0.04) * maxAlpha;

        // Rich sapphire blue body
        col += vec3(0.03, 0.38, 0.96) * maxBlue;
        // Electric cyan gradient
        col += vec3(0.22, 0.58, 0.12) * maxCyan;
        // Atmospheric blue/cyan bloom
        col += vec3(0.00, 0.46, 0.92) * bloom;

        // Pure white core highlights
        col = mix(col, vec3(1.0, 1.0, 1.0), maxWhite);

        // Alpha calculation: ONLY inside the localized spotlight on hover
        float finalAlpha = clamp(maxBlue + bloom + maxAlpha * 0.94, 0.0, 1.0);
        gl_FragColor = vec4(col, finalAlpha * spotlight * u_hover);
      }
    `;

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    state.program = program;
    gl.useProgram(program);

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uniforms = {
      u_texNormal: gl.getUniformLocation(program, "u_texNormal"),
      u_texFolded: gl.getUniformLocation(program, "u_texFolded"),
      u_scrollProgress: gl.getUniformLocation(program, "u_scrollProgress"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_mouse: gl.getUniformLocation(program, "u_mouse"),
      u_mouseActive: gl.getUniformLocation(program, "u_mouseActive"),
      u_hover: gl.getUniformLocation(program, "u_hover"),
      u_time: gl.getUniformLocation(program, "u_time"),
      u_cellSize: gl.getUniformLocation(program, "u_cellSize"),
    };
    state.uniforms = uniforms;

    // Helper to upload texture
    const setupTexture = (img, unit) => {
      const tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      return tex;
    };

    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) {
        state.textures.normal = setupTexture(imgNormal, 0);
        state.textures.folded = setupTexture(imgFolded, 1);
      }
    };

    const imgNormal = new Image();
    imgNormal.crossOrigin = "anonymous";
    imgNormal.onload = checkAllLoaded;
    imgNormal.src = normalSrc;

    const imgFolded = new Image();
    imgFolded.crossOrigin = "anonymous";
    imgFolded.onload = checkAllLoaded;
    imgFolded.src = foldedSrc;

    // Canvas sizing
    const resizeCanvas = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);

      if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const ro = new ResizeObserver(() => {
      resizeCanvas();
    });
    ro.observe(container);
    resizeCanvas();

    // Render loop
    let lastTime = performance.now();
    const render = (now) => {
      if (state.isDestroyed) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      state.time += dt;

      // Smooth hover lerp
      const speed = state.targetHover > state.hoverProgress ? 9.0 : 6.0;
      state.hoverProgress += (state.targetHover - state.hoverProgress) * Math.min(dt * speed, 1.0);

      // Render WebGL frame ONLY when hovering
      if (state.hoverProgress > 0.001 && state.mouse.active && state.textures.normal && state.textures.folded) {
        resizeCanvas();

        gl.useProgram(program);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, state.textures.normal);
        gl.uniform1i(uniforms.u_texNormal, 0);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, state.textures.folded);
        gl.uniform1i(uniforms.u_texFolded, 1);

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const cssWidth = canvas.width / dpr;
        const baseCellSize = Math.max(7.5, Math.min(10.0, cssWidth / 42));
        const cellSizePx = baseCellSize * dpr;

        gl.uniform1f(uniforms.u_scrollProgress, scrollProgressRef.current);
        gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
        gl.uniform2f(uniforms.u_mouse, state.mouse.x, state.mouse.y);
        gl.uniform1f(uniforms.u_mouseActive, state.mouse.active ? 1.0 : 0.0);
        gl.uniform1f(uniforms.u_hover, state.hoverProgress);
        gl.uniform1f(uniforms.u_time, state.time);
        gl.uniform1f(uniforms.u_cellSize, cellSizePx);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } else {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }

      state.animId = requestAnimationFrame(render);
    };

    state.animId = requestAnimationFrame(render);

    return () => {
      state.isDestroyed = true;
      if (state.animId) cancelAnimationFrame(state.animId);
      ro.disconnect();
      if (gl) {
        if (state.textures.normal) gl.deleteTexture(state.textures.normal);
        if (state.textures.folded) gl.deleteTexture(state.textures.folded);
        if (program) gl.deleteProgram(program);
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
      }
    };
  }, [normalSrc, foldedSrc]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative flex justify-center items-end select-none ${className}`}
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 bg-cyan-400/10 blur-3xl rounded-full -z-10 scale-95 pointer-events-none" />

      {/* Normal Standing Pose (Initial State - Arms at sides) */}
      <img
        ref={imgNormalRef}
        src={normalSrc}
        alt={`${alt} - Standing`}
        style={{
          opacity: 1 - scrollProgress,
          transform: `scale(${1 + scrollProgress * 0.012})`,
        }}
        className="w-auto max-h-[380px] sm:max-h-[460px] md:max-h-[500px] lg:max-h-[540px] xl:max-h-[580px] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] pointer-events-none transition-all duration-150 ease-out"
      />

      {/* Folded Arms Pose (Crossfades as user scrolls down) */}
      <img
        ref={imgFoldedRef}
        src={foldedSrc}
        alt={`${alt} - Arms Folded`}
        style={{
          opacity: scrollProgress,
          transform: `scale(${0.988 + scrollProgress * 0.012}) translateY(${(1 - scrollProgress) * 6}px)`,
        }}
        className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] pointer-events-none transition-all duration-150 ease-out"
      />

      {/* WebGL Halftone Dot Matrix Canvas Overlay - Localized Spotlight on Hover */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none drop-shadow-[0_0_20px_rgba(0,210,255,0.35)]"
      />
    </div>
  );
}
