"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export interface SidebarItem {
  id: string;
  label: string;
  number: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

export function Sidebar({ items }: SidebarProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(item.id);
            }
          });
        },
        {
          rootMargin: "-20% 0px -70% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      }
    },
    []
  );

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden lg:flex flex-col fixed left-0 top-[57px] bottom-0 w-[240px] border-r border-black/5 bg-white z-40">
        <div className="flex-1 overflow-y-auto py-8 px-6">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200",
                    "flex items-center gap-3",
                    activeId === item.id
                      ? "bg-black/[0.04] text-black font-medium"
                      : "text-black/40 hover:text-black/70 hover:bg-black/[0.02]"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[9px] tracking-wider w-4 shrink-0",
                      activeId === item.id ? "text-blue" : "text-black/25"
                    )}
                  >
                    {item.number}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-[57px] left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/5">
        <div className="flex items-center justify-between px-4 h-12">
          <span className="text-sm text-black/50">
            {items.find((i) => i.id === activeId)?.label ?? ""}
          </span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 -mr-2 text-black/50 hover:text-black transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="border-t border-black/5 bg-white px-4 py-3 shadow-lg">
            <ul className="space-y-0.5">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors",
                      "flex items-center gap-3",
                      activeId === item.id
                        ? "bg-black/[0.04] text-black font-medium"
                        : "text-black/40"
                    )}
                  >
                    <span className="font-mono text-[9px] tracking-wider w-4 text-black/25">
                      {item.number}
                    </span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
