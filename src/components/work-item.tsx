"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setLightbox((i) => (i !== null && i < images.length - 1 ? i + 1 : i));
      if (e.key === "ArrowLeft")  setLightbox((i) => (i !== null && i > 0 ? i - 1 : i));
      if (e.key === "Escape")     setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <div className="-mx-3 px-3 py-2 rounded-sm hover:bg-muted/60 transition-colors duration-200">
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
                  style={{ visibility: lightbox === i ? "hidden" : "visible" }}
                >
                  <motion.img
                    layoutId={`img-${title}-${i}`}
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    draggable={false}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
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
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm"
              onClick={() => setLightbox(null)}
            />

            {/* Expanded image — shares layoutId with thumbnail */}
            <motion.img
              key={`lightbox-${lightbox}`}
              layoutId={`img-${title}-${lightbox}`}
              src={images[lightbox]}
              alt=""
              className="fixed z-50 rounded-sm object-contain shadow-2xl"
              style={{
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                maxWidth: "90vw",
                maxHeight: "85vh",
              }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              draggable={false}
              onClick={() => setLightbox(null)}
            />

            {/* Prev */}
            {lightbox > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed left-6 top-1/2 -translate-y-1/2 z-50 text-2xl text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
              >
                ‹
              </motion.button>
            )}

            {/* Next */}
            {lightbox < images.length - 1 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed right-6 top-1/2 -translate-y-1/2 z-50 text-2xl text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
              >
                ›
              </motion.button>
            )}

            {/* Counter */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-xs text-muted-foreground"
            >
              {lightbox + 1} / {images.length}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
