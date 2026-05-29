"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

type SnapTarget = { x: number; y: number; width: number; height: number; radius: number } | null;

export function Cursor() {
  const [visible, setVisible] = useState(false);
  const [snapped, setSnapped] = useState(false);
  const snapRef = useRef<SnapTarget>(null);
  const rafRef = useRef<number>(0);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring-follow for the dot
  const x = useSpring(mouseX, { stiffness: 1200, damping: 40, mass: 0.1 });
  const y = useSpring(mouseY, { stiffness: 1200, damping: 40, mass: 0.1 });

  // Morphable properties
  const width  = useMotionValue(20);
  const height = useMotionValue(20);
  const radius = useMotionValue(999);
  const tx     = useMotionValue(-10); // translate offset to keep centred
  const ty     = useMotionValue(-10);
  const bg     = useMotionValue("color-mix(in oklch, var(--foreground) 25%, transparent)");

  const snapTo = useCallback((el: Element) => {
    const r = el.getBoundingClientRect();
    const pad = 6;
    const w = r.width  + pad * 2;
    const h = r.height + pad * 2;
    const cx = r.left  + r.width  / 2;
    const cy = r.top   + r.height / 2;
    const br = parseFloat(getComputedStyle(el).borderRadius) || 4;

    snapRef.current = { x: cx, y: cy, width: w, height: h, radius: br + pad };
    setSnapped(true);

    const ease = [0.25, 1, 0.5, 1] as const;
    const dur  = 0.2;
    animate(x,      cx,          { duration: dur, ease });
    animate(y,      cy,          { duration: dur, ease });
    animate(width,  w,           { duration: dur, ease });
    animate(height, h,           { duration: dur, ease });
    animate(radius, br + pad,    { duration: dur, ease });
    animate(tx,     -w  / 2,     { duration: dur, ease });
    animate(ty,     -h  / 2,     { duration: dur, ease });
    animate(bg,     "color-mix(in oklch, var(--foreground) 8%, transparent)", { duration: dur });
  }, [x, y, width, height, radius, tx, ty, bg]);

  const unsnap = useCallback(() => {
    snapRef.current = null;
    setSnapped(false);

    const ease = [0.25, 1, 0.5, 1] as const;
    const dur  = 0.2;
    animate(width,  20,  { duration: dur, ease });
    animate(height, 20,  { duration: dur, ease });
    animate(radius, 999, { duration: dur, ease });
    animate(tx,     -10, { duration: dur, ease });
    animate(ty,     -10, { duration: dur, ease });
    animate(bg, "color-mix(in oklch, var(--foreground) 25%, transparent)", { duration: dur });
  }, [width, height, radius, tx, ty, bg]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      // While snapped, keep in sync with live element position (handles scroll/resize)
      if (snapRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          const target = (e.target as HTMLElement).closest("a, button, [data-snap]");
          if (target) {
            const r = target.getBoundingClientRect();
            const pad = 6;
            const cx = r.left + r.width  / 2;
            const cy = r.top  + r.height / 2;
            animate(x, cx, { duration: 0.1 });
            animate(y, cy, { duration: 0.1 });
          }
        });
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, [data-snap]");
      if (el) {
        snapTo(el);
      }
    };

    const onOut = (e: MouseEvent) => {
      const to = e.relatedTarget as HTMLElement | null;
      const stillInside = to?.closest("a, button, [data-snap]");
      if (!stillInside) unsnap();
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mouseover",  onOver);
    window.addEventListener("mouseout",   onOut);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseover",  onOver);
      window.removeEventListener("mouseout",   onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY, visible, x, y, snapTo, unsnap]);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      <motion.div
        style={{ x, y, width, height, borderRadius: radius, translateX: tx, translateY: ty, backgroundColor: bg as unknown as string }}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.15 } }}
      />
    </>
  );
}
