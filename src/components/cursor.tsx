"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.2 });
  const y = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.2 });

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
      {/* Hide the native cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>

      <motion.div
        ref={cursorRef}
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.15 } }}
      >
        {/* Outer ring — appears on hover */}
        <motion.div
          className="absolute inset-0 rounded-full border border-foreground -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: hovered ? 32 : 0,
            height: hovered ? 32 : 0,
            opacity: hovered ? 0.4 : 0,
          }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ left: "50%", top: "50%" }}
        />

        {/* Inner dot */}
        <motion.div
          className="rounded-full bg-foreground"
          animate={{
            width: hovered ? 4 : 5,
            height: hovered ? 4 : 5,
            opacity: hovered ? 0.6 : 1,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </motion.div>
    </>
  );
}
