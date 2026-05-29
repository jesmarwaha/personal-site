"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, { stiffness: 1200, damping: 40, mass: 0.1 });
  const y = useSpring(mouseY, { stiffness: 1200, damping: 40, mass: 0.1 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const clickable = el.closest("a, button, [role='button'], label, input, select, textarea");
      setHovered(!!clickable);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [mouseX, mouseY, visible]);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      <motion.div
        ref={cursorRef}
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.15 } }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width:  hovered ? 14 : 20,
            height: hovered ? 14 : 20,
            backgroundColor: hovered
              ? "var(--foreground)"
              : "color-mix(in oklch, var(--foreground) 25%, transparent)",
            x: hovered ? -7 : -10,
            y: hovered ? -7 : -10,
          }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.div>
    </>
  );
}
