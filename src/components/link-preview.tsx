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
              style={{ left: pos.x + 16, top: pos.y - 80 }}
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="w-48 h-32 rounded-sm overflow-hidden shadow-lg border border-border">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover"
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
