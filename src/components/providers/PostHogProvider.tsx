"use client";

import React, { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (!key) return;

    posthog.init(key, {
      api_host: host || "https://us.i.posthog.com",
      capture_pageview: false, // we handle this manually on route change
      capture_pageleave: true,
      autocapture: true,
      session_recording: {
        maskAllInputs: false,
        maskInputFn: (text, element) => {
          const type = element?.getAttribute("type");
          if (type === "password") return "*".repeat(text.length);
          return text;
        },
      },
      enable_heatmaps: true,
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </PHProvider>
  );
}

function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) url += "?" + search;

      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams]);

  return null;
}
