# Night Earth Hero — Design

**Date:** 2026-07-24
**Status:** Approved by user (conversation)

## Goal

Replace the hero section's static background image (`/images/solar_space.jpg`) with a live three.js scene: a slowly rotating night-side Earth viewed from orbit, its curved horizon rising from the bottom of the viewport. All existing hero text, badges, buttons, and gradient overlays stay exactly as they are, layered above the scene.

## Requirements

- **Placement:** Large sphere positioned mostly below the viewport. The lit horizon curve rises from the bottom, sweeping slightly higher on the right side (matching the old background image's composition). Camera is fixed; only the Earth rotates.
- **Rotation:** Continuous slow spin about the Earth's axis, ~one full revolution per 3–4 minutes. Frozen when the OS `prefers-reduced-motion` setting is on.
- **Night only:** No day side, no sun terminator. Surface shows city lights on dark continents/oceans.
- **Color:** City lights tinted toward the brand teal/emerald palette. Implemented so a single constant switches back to natural warm light colors.
- **Atmosphere:** Thin teal rim glow along the horizon edge (fresnel on a slightly larger back-facing sphere).
- **Stars:** Procedural starfield (~800 points) generated in code within the same 3D scene, subtle twinkle. No image assets for stars.
- **Texture:** NASA "Black Marble" public-domain night-lights texture, downloaded once into `public/images/` (~1–2 MB). No runtime CDN dependency.
- **Interaction:** None. Canvas is `pointer-events: none`; scroll and clicks pass through.
- **Responsive:** Renders on all screen sizes; canvas resizes with the window.
- **Lifecycle:** Renderer, geometries, materials, and textures disposed on unmount; animation loop cancelled.

## Architecture

- **Dependency:** add `three` (plus `@types/three` as dev dependency). No react-three-fiber — one static scene with a single mesh does not justify the extra reconciler and dependencies.
- **New component:** `src/components/EarthNight.tsx`
  - Owns a full-size `<canvas>` (`absolute inset-0`).
  - Builds the scene imperatively inside a `useEffect`: renderer, camera, Earth mesh (sphere + night texture + tint shader), atmosphere mesh, star points.
  - Handles resize via a `ResizeObserver`/window listener, reduced-motion via `matchMedia`, and full cleanup in the effect's return.
  - Exposes no props initially (YAGNI); tuning constants (rotation speed, tint color, tint on/off) live at the top of the file.
- **Changed component:** `src/components/sections/HeroSection.tsx`
  - Remove the `<img>` background block.
  - Render `<EarthNight />` in the same `absolute inset-0 z-0` layer.
  - Keep the existing gradient overlay divs and all content untouched.
- **Removed asset:** `/images/solar_space.jpg` reference (file may remain on disk; only the usage is removed).

## Error handling

- If WebGL context creation fails (old device/driver), the component renders nothing and the hero falls back to the existing `bg-slate-950` dark background — no crash, text remains readable.
- If the texture fails to load, the sphere still renders with atmosphere glow only (dark silhouette), since the texture is applied asynchronously.

## Testing / verification

- `npm run build` passes (TypeScript + Vite).
- Manual verification in dev server: horizon composition matches the screenshot reference, rotation is smooth, text legibility preserved, scroll unaffected, no console errors, no leak on unmount (navigate/HMR).
