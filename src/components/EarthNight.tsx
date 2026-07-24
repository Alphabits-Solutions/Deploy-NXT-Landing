import { useEffect, useRef } from "react";
import * as THREE from "three";

// ── Tuning constants ──────────────────────────────────────────────
// Set TINT_STRENGTH to 0 for natural warm city-light colors.
const TINT_STRENGTH = 0.5;
const TINT_COLOR = new THREE.Color(0x2dd4bf); // brand teal-400
const ROTATION_SPEED = (2 * Math.PI) / 210; // one revolution ≈ 3.5 min
const EARTH_RADIUS = 2.7;
const EARTH_POSITION = new THREE.Vector3(-1.7, -1.2, -1.4);
const SCENE_TILT_Z = 0; // radians; tilts the horizon line
const STAR_COUNT = 1000;
const AURA_COLOR = new THREE.Color(0x2dd4bf); // rim glow around the limb
// - 0xffd27f — lighter, softer golden glow
// - 0xffb347 — deeper orange-amber, more sunset-like
// - 0xf5e050 — brighter true yellow, more vivid/stylized

const EARTH_FRAGMENT = `
  uniform sampler2D uMap;
  uniform float uHasMap;
  uniform vec3 uTint;
  uniform float uTintStrength;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vec3 tex = texture2D(uMap, vUv).rgb * uHasMap;
    float lum = dot(tex, vec3(0.299, 0.587, 0.114));
    vec3 tinted = uTint * lum * 3.0;
    vec3 lights = mix(tex * 1.9, tinted, uTintStrength);

    // Ambient night-side fill so sparse regions (oceans) never go black,
    // brightened toward the limb so the sphere keeps its 3D shading
    float rim = 1.0 - abs(dot(normalize(vNormal), normalize(-vPos)));
    vec3 nightBase = mix(vec3(0.09, 0.15, 0.22), uTint * 0.22, uTintStrength);
    vec3 base = nightBase * (0.45 + 0.65 * pow(rim, 1.5));

    gl_FragColor = vec4(lights + base, 1.0);
  }
`;

const ATMOSPHERE_VERTEX = `
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Halo on a back-facing shell: strongest at the planet's limb,
// fading smoothly to nothing at the shell's outer silhouette.
const ATMOSPHERE_FRAGMENT = `
  uniform vec3 uGlowColor;
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    float facing = dot(normalize(vNormal), normalize(-vPos));
    float glow = smoothstep(0.0, 0.5, -facing);
    glow = pow(glow, 1.8) * 1.0;
    gl_FragColor = vec4(uGlowColor * glow, glow);
  }
`;

const EARTH_VERTEX = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export function EarthNight() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // no WebGL — hero keeps its dark background
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      200,
    );
    camera.position.set(0, 0, 2.2);

    // Group tilted so the horizon sweeps slightly higher on the right
    const group = new THREE.Group();
    group.rotation.z = SCENE_TILT_Z;
    scene.add(group);

    // Earth — starts black (uHasMap=0) until the texture arrives
    const placeholder = new THREE.DataTexture(
      new Uint8Array([0, 0, 0, 255]),
      1,
      1,
    );
    placeholder.needsUpdate = true;

    const earthUniforms = {
      uMap: { value: placeholder as THREE.Texture },
      uHasMap: { value: 0 },
      uTint: { value: TINT_COLOR },
      uTintStrength: { value: TINT_STRENGTH },
    };
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS, 96, 96),
      new THREE.ShaderMaterial({
        uniforms: earthUniforms,
        vertexShader: EARTH_VERTEX,
        fragmentShader: EARTH_FRAGMENT,
      }),
    );
    earth.position.copy(EARTH_POSITION);
    group.add(earth);

    const loader = new THREE.TextureLoader();
    loader.load("/images/earth_night.jpg", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      earthUniforms.uMap.value = tex;
      earthUniforms.uHasMap.value = 1;
    });

    // Atmosphere rim glow (aura)
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS * 1.09, 96, 96),
      new THREE.ShaderMaterial({
        uniforms: { uGlowColor: { value: AURA_COLOR } },
        vertexShader: ATMOSPHERE_VERTEX,
        fragmentShader: ATMOSPHERE_FRAGMENT,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    );
    atmosphere.position.copy(EARTH_POSITION);
    group.add(atmosphere);

    // Procedural starfield on a far shell
    const starPositions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 40 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = -Math.abs(r * Math.cos(phi)) - 5;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.45,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const start = performance.now();
    let last = start;
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = (now - last) / 1000;
      const t = (now - start) / 1000;
      last = now;
      if (!reducedMotion.matches) {
        earth.rotation.y += ROTATION_SPEED * delta;
        starMaterial.opacity = 0.85 + 0.15 * Math.sin(t * 0.6); // subtle twinkle
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      earth.geometry.dispose();
      (earth.material as THREE.ShaderMaterial).dispose();
      atmosphere.geometry.dispose();
      (atmosphere.material as THREE.ShaderMaterial).dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      (earthUniforms.uMap.value as THREE.Texture).dispose();
      placeholder.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
