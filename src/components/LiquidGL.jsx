import { useEffect, useRef } from 'react';

// WebGL Liquid Glass Shader Component (LiquidGL)
// Provides authentic chromatic dispersion, fluid wave refraction, specular highlights, and Fresnel rim glow
export default function LiquidGL({ imageSrc, size = 110, className = '' }) {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 4px 18px rgba(0,0,0,0.6)',
        }}
      />
    );
  }

  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, hover: 0, targetHover: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    let disposed = false;
    let animId = null;

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader: Liquid Glass with Chromatic Dispersion & Fluid Normals
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_hover;
      uniform sampler2D u_texture;
      uniform float u_hasTex;

      // Harmonic fluid displacement
      float fluidHeight(vec2 p, float t) {
        float h = sin(p.x * 5.0 + t * 1.8) * cos(p.y * 5.0 + t * 1.5) * 0.035;
        h += sin(p.x * 10.0 - t * 2.2 + p.y * 8.0) * 0.02;
        // Mouse ripple
        vec2 mDist = p - (u_mouse - 0.5) * 1.5;
        float d = length(mDist);
        h += sin(d * 24.0 - t * 6.0) * exp(-d * 3.5) * 0.07 * u_hover;
        return h;
      }

      void main() {
        vec2 p = v_uv - 0.5;
        float dist = length(p);

        // Circular boundary with antialiased edge
        if (dist > 0.495) {
          discard;
        }

        float t = u_time * 0.9;
        float h = fluidHeight(p, t);

        // Surface normal from finite differences
        float eps = 0.015;
        float hx = fluidHeight(p + vec2(eps, 0.0), t);
        float hy = fluidHeight(p + vec2(0.0, eps), t);
        vec3 normal = normalize(vec3((hx - h) / eps, (hy - h) / eps, 0.45));

        // Glass sphere dome curvature normal
        float domeZ = sqrt(max(0.0, 0.25 - dist * dist));
        vec3 domeNormal = normalize(vec3(p * 1.4, domeZ));
        vec3 glassNormal = normalize(normal * 0.4 + domeNormal * 0.6);

        // Chromatic Dispersion (RGB refraction split)
        // Flip Y to correct WebGL upside-down texture sampling
        float refrStrength = 0.028;
        vec2 flippedUv = vec2(v_uv.x, 1.0 - v_uv.y);
        vec2 uvR = flippedUv + glassNormal.xy * refrStrength;
        vec2 uvG = flippedUv + glassNormal.xy * (refrStrength * 1.15);
        vec2 uvB = flippedUv + glassNormal.xy * (refrStrength * 1.35);

        vec3 texColor = vec3(0.0);
        if (u_hasTex > 0.5) {
          float r = texture2D(u_texture, clamp(uvR, 0.0, 1.0)).r;
          float g = texture2D(u_texture, clamp(uvG, 0.0, 1.0)).g;
          float b = texture2D(u_texture, clamp(uvB, 0.0, 1.0)).b;
          texColor = vec3(r, g, b);
        } else {
          texColor = vec3(0.12, 0.06, 0.08);
        }

        // Specular highlight from light source
        vec3 lightDir = normalize(vec3(u_mouse.x - 0.5, -(u_mouse.y - 0.5), 0.7));
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfVec = normalize(lightDir + viewDir);
        float spec = pow(max(dot(glassNormal, halfVec), 0.0), 28.0);
        float broadSpec = pow(max(dot(glassNormal, halfVec), 0.0), 7.0) * 0.25;

        // Fresnel amber edge glow
        float fresnel = pow(1.0 - max(dot(viewDir, glassNormal), 0.0), 2.8);
        vec3 amberRim = vec3(1.0, 0.62, 0.25) * fresnel * 1.8;

        // Reduced brightness for cinematic look
        vec3 boosted = pow(texColor, vec3(0.95)) * 0.88;
        float centerGlow = (1.0 - smoothstep(0.0, 0.48, dist)) * 0.12;

        // Golden liquid glass composition
        vec3 finalColor = boosted + vec3(1.0, 0.65, 0.2) * centerGlow;
        finalColor += amberRim * 0.28;
        finalColor += vec3(1.0, 0.88, 0.65) * (spec * 0.6 + broadSpec * 0.5);

        // Subtle outer bezel ring
        float rimBead = smoothstep(0.46, 0.485, dist) * (1.0 - smoothstep(0.485, 0.495, dist));
        finalColor += vec3(1.0, 0.8, 0.35) * rimBead * 1.8;

        // Antialiased alpha edge
        float alpha = 1.0 - smoothstep(0.485, 0.495, dist);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    function createShader(glCtx, type, src) {
      const shader = glCtx.createShader(type);
      glCtx.shaderSource(shader, src);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.warn(glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(prog));
      return;
    }

    gl.useProgram(prog);

    // Quad geometry
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uHover = gl.getUniformLocation(prog, 'u_hover');
    const uHasTex = gl.getUniformLocation(prog, 'u_hasTex');

    // Texture setup
    let texture = null;
    let hasLoadedTex = false;

    if (imageSrc) {
      texture = gl.createTexture();
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (disposed) return;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        hasLoadedTex = true;
      };
      img.src = imageSrc;
    }

    // Set canvas dimensions
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let startTime = performance.now();

    const render = (now) => {
      if (disposed) return;
      animId = requestAnimationFrame(render);

      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.1;
      m.y += (m.targetY - m.y) * 0.1;
      m.hover += (m.targetHover - m.hover) * 0.1;

      const elapsed = (now - startTime) / 1000;

      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, m.x, m.y);
      gl.uniform1f(uHover, m.hover);
      gl.uniform1f(uHasTex, hasLoadedTex ? 1.0 : 0.0);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animId = requestAnimationFrame(render);

    return () => {
      disposed = true;
      if (animId) cancelAnimationFrame(animId);
      if (texture) gl.deleteTexture(texture);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [imageSrc, size]);

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
    mouseRef.current.targetHover = 1;
  };

  const handlePointerLeave = () => {
    mouseRef.current.targetX = 0.5;
    mouseRef.current.targetY = 0.5;
    mouseRef.current.targetHover = 0;
  };

  return (
    <div
      className={`liquid-gl-wrap ${className}`}
      style={{ width: size, height: size, position: 'relative' }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}
