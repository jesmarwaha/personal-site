"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WorkItemProps {
  title: string;
  role: string;
  period: string;
  desc: string;
  images?: string[];
}

export function WorkItem({ title, role, period, desc, images = [] }: WorkItemProps) {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div>
      <button
        onClick={() => images.length > 0 && setOpen((o) => !o)}
        className={`w-full text-left space-y-1 group ${images.length > 0 ? "cursor-pointer" : "cursor-default"}`}
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm font-medium flex items-center gap-1.5">
            {title}
            {images.length > 0 && (
              <motion.span
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="text-muted-foreground inline-block"
              >
                ›
              </motion.span>
            )}
          </span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{period}</span>
        </div>
        <div className="text-xs text-muted-foreground">{role}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </button>

      {/* Inline gallery */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="gallery"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-1 flex gap-2 overflow-x-auto no-scrollbar">
              {images.map((src, i) => (
                <motion.button
                  key={src}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className="shrink-0 w-48 h-32 rounded-sm overflow-hidden bg-muted cursor-zoom-in"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    draggable={false}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            {/* Prev */}
            {lightbox > 0 && (
              <button
                className="absolute left-6 text-2xl text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
              >
                ‹
              </button>
            )}

            <motion.img
              key={lightbox}
              src={images[lightbox]}
              alt=""
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="max-w-[90vw] max-h-[85vh] rounded-sm object-contain shadow-2xl"
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            {lightbox < images.length - 1 && (
              <button
                className="absolute right-6 text-2xl text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
              >
                ›
              </button>
            )}

            {/* Counter */}
            <span className="absolute bottom-6 text-xs text-muted-foreground">
              {lightbox + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
