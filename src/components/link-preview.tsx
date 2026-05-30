"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface LinkPreviewProps {
  href: string;
  src: string;
  alt?: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function LinkPreview({ href, src, alt = "", children, className, target, rel }: LinkPreviewProps) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const onMove = (e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <a
        href={href}
        target={target}
        rel={rel}
        className={className}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={onMove}
      >
        {children}
      </a>

      {mounted && createPortal(
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="fixed z-[9998] pointer-events-none"
              style={{ left: pos.x + 16, top: pos.y - 100 }}
              initial={{ opacity: 0, scale: 0.85, rotate: -6, y: 12 }}
              animate={{ opacity: 1, scale: 1, rotate: 2, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: -6, y: 12 }}
              transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="w-48 h-32 rounded-sm overflow-hidden shadow-xl p-1.5 bg-background border border-border/60">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover rounded-[2px]"
                  draggable={false}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
