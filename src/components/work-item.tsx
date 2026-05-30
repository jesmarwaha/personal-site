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
  const [selected, setSelected] = useState(0);

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
                className="text-muted-foreground inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                ›
              </motion.span>
            )}
          </span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{period}</span>
        </div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </button>

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
            <div className="pt-4 pb-1 space-y-2">
              {/* Main image */}
              <motion.div
                layout
                className="w-full overflow-hidden rounded-sm bg-muted"
                style={{ aspectRatio: "16/9" }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selected}
                    src={images[selected]}
                    alt=""
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </AnimatePresence>
              </motion.div>

              {/* Thumbnail strip */}
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {images.map((src, i) => (
                  <motion.button
                    key={src}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25, ease: "easeOut" }}
                    onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                    className="relative shrink-0 w-16 h-10 rounded-sm overflow-hidden bg-muted transition-opacity duration-200"
                    style={{ opacity: selected === i ? 1 : 0.4 }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    {selected === i && (
                      <motion.div
                        layoutId={`thumb-indicator-${title}`}
                        className="absolute inset-0 ring-1 ring-foreground rounded-sm"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
