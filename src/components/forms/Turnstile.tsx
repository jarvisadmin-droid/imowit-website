"use client";

import { useEffect, useRef } from "react";

// Cloudflare Turnstile widget. Rendered explicitly (not via Cloudflare's
// automatic scan) so it also works after client-side navigation. The widget
// adds a hidden "cf-turnstile-response" input to the surrounding form, which
// the Server Action verifies. Each new `resetSignal` value (the form's action
// state) resets the widget for a fresh token, since tokens are single-use.

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("turnstile script failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export default function Turnstile({ resetSignal }: { resetSignal: unknown }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, { sitekey: siteKey });
      })
      .catch(() => {
        // The Server Action rejects the submission without a token, and the
        // visitor sees the "complete the verification" message.
      });
    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [siteKey]);

  const firstSignal = useRef(resetSignal);
  useEffect(() => {
    if (resetSignal !== firstSignal.current && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetSignal]);

  if (!siteKey) return null;
  return <div ref={containerRef} className="min-h-[65px]" />;
}
