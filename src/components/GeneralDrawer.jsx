import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function GeneralDrawer({
  isOpen,
  onClose,
  children,
  width = 600,
}) {
  const panelRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Click outside to close
  const handleBackdropClick = (e) => {
    // If click is on the backdrop (not inside the panel)
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } z-[1000]`}
        onClick={handleBackdropClick}
      />

      {/* Drawer panel with spacing from edges */}
      <aside
        aria-hidden={!isOpen}
  className={`fixed inset-y-0 right-0 z-[1010] flex transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        ref={panelRef}
        style={{ width: `${width}px` }}
      >
        {/* Outer spacer to create 16px inset from top/bottom/right */}
        <div className="pointer-events-none flex h-full w-full p-4">
          {/* Actual card-like drawer; children render their own header */}
          <div className="pointer-events-auto flex h-full w-full flex-col rounded-xl border border-gray-200 bg-white shadow-xl">
            {/* Content area scrollable with required padding and gap */}
            <div className="min-h-0 flex-1 overflow-auto p-4">
              <div className="flex flex-col gap-4">
                {children}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
