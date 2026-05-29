"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export function Cursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    // Only show on non-touch devices
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovered(!!el.closest("a, button, [role='button'], label, input, select, textarea"));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [x, y, visible]);

  if (isTouchDevice) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      <motion.div
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
