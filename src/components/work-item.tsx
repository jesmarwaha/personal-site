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
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                  className="shrink-0 w-48 h-32 rounded-sm overflow-hidden bg-muted"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
