"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InfoCircle, CloseCircle } from "iconsax-react";

/**
 * FRESROOT toast notification.
 * Pure presentational + auto-dismiss; controlled by the `open` prop.
 * Positioned top-center on mobile, top-end on desktop, with safe margins.
 */
export function Toast({
  open,
  onClose,
  title,
  message,
  duration = 3000,
  closeLabel = "Close notification",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  duration?: number;
  closeLabel?: string;
}) {
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (open) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(onClose, duration);
      return () => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = null;
      };
    }
  }, [open, duration, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.96 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed inset-x-4 top-4 z-[70] mx-auto w-auto max-w-sm sm:end-6 sm:start-auto sm:top-6 sm:mx-0"
        >
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-white/95 p-4 shadow-card backdrop-blur">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lightgreen text-primary">
              <InfoCircle size={17} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{title}</p>
              {message && <p className="mt-0.5 text-xs leading-snug text-muted">{message}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-primary/5 hover:text-ink"
            >
              <CloseCircle size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
