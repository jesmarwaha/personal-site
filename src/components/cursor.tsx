"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

export function Cursor() {
  const [visible, setVisible] = useState(false);
  const snappedRef = useRef(false);

  // Raw mouse — always up to date
  const rawX = useRef(-100);
  const rawY = useRef(-100);

  // Spring target — what the cursor chases when not snapped
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { stiffness: 1200, damping: 40, mass: 0.1 });
  const y = useSpring(mouseY, { stiffness: 1200, damping: 40, mass: 0.1 });

  // Shape / appearance
  const width  = useMotionValue(20);
  const height = useMotionValue(20);
  const radius = useMotionValue(999);
  const tx     = useMotionValue(-10);
  const ty     = useMotionValue(-10);

  const EASE = [0.25, 1, 0.5, 1] as const;
  const DUR  = 0.18;

  const snapTo = useCallback((el: Element) => {
    snappedRef.current = true;
    const r   = el.getBoundingClientRect();
    const pad = 6;
    const w   = r.width  + pad * 2;
    const h   = r.height + pad * 2;
    const cx  = r.left   + r.width  / 2;
    const cy  = r.top    + r.height / 2;
    const br  = parseFloat(getComputedStyle(el).borderRadius) || 4;

    // Snap position (animate x/y directly, bypassing spring)
    animate(x,      cx,       { duration: DUR, ease: EASE });
    animate(y,      cy,       { duration: DUR, ease: EASE });
    animate(width,  w,        { duration: DUR, ease: EASE });
    animate(height, h,        { duration: DUR, ease: EASE });
    animate(radius, br + pad, { duration: DUR, ease: EASE });
    animate(tx,     -w / 2,   { duration: DUR, ease: EASE });
    animate(ty,     -h / 2,   { duration: DUR, ease: EASE });
  }, [x, y, width, height, radius, tx, ty, DUR, EASE]);

  const unsnap = useCallback(() => {
    snappedRef.current = false;

    // Teleport spring target to current mouse so it re-engages from the right spot
    mouseX.jump(rawX.current);
    mouseY.jump(rawY.current);

    animate(width,  20,  { duration: DUR, ease: EASE });
    animate(height, 20,  { duration: DUR, ease: EASE });
    animate(radius, 999, { duration: DUR, ease: EASE });
    animate(tx,     -10, { duration: DUR, ease: EASE });
    animate(ty,     -10, { duration: DUR, ease: EASE });
  }, [mouseX, mouseY, width, height, radius, tx, ty, DUR, EASE]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.current = e.clientX;
      rawY.current = e.clientY;
      if (!visible) setVisible(true);
      // Only drive the spring when free — while snapped, position is held by animate()
      if (!snappedRef.current) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, [data-snap]");
      if (el) snapTo(el);
    };

    const onOut = (e: MouseEvent) => {
      const to = e.relatedTarget as HTMLElement | null;
      if (!to?.closest("a, button, [data-snap]")) unsnap();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout",  onOut);
    document.documentElement.addEventListener("mouseleave", () => setVisible(false));
    document.documentElement.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout",  onOut);
    };
  }, [visible, mouseX, mouseY, snapTo, unsnap]);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <motion.div
        style={{
          x, y,
          width, height,
          borderRadius: radius,
          translateX: tx,
          translateY: ty,
          backgroundColor: "color-mix(in oklch, var(--foreground) 18%, transparent)",
        }}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.15 } }}
      />
    </>
  );
}
