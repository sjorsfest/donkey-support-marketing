import { useEffect } from "react";

const WIDGET_BASE_URL = "https://app.donkey.support";

interface SupportWidgetProps {
  /** Your unique account ID from Donkey Support */
  accountId: string;
  /** Visitor's email address for identification */
  email?: string;
  /** Visitor's display name */
  name?: string;
  /** Custom data to attach to the conversation (e.g. userId, plan) */
  metadata?: Record<string, any>;
  /** Signed metadata JWT for verified context */
  metadataToken?: string;
  /** Set to true to hide the floating button and control the widget programmatically */
  controlledByHost?: boolean;
  /** When controlledByHost is true, use this to open/close the widget */
  widgetIsOpen?: boolean;
  /** Controls when the widget loader script gets injected */
  deferLoad?: "idle" | "interaction" | "immediate";
}

export function SupportWidget({
  accountId,
  email,
  name,
  metadata,
  metadataToken,
  controlledByHost,
  widgetIsOpen,
  deferLoad = "idle",
}: SupportWidgetProps) {
  useEffect(() => {
    if (controlledByHost && (window as any).SupportWidget) {
      (window as any).SupportWidget.widgetIsOpen = widgetIsOpen;
    }
  }, [controlledByHost, widgetIsOpen]);

  useEffect(() => {
    (window as any).SupportWidget = {
      accountId,
      email,
      name,
      metadata,
      metadataToken,
      controlledByHost,
      widgetIsOpen,
    };

    const scriptId = "support-widget-loader";
    if (document.getElementById(scriptId)) return;

    const loadScript = () => {
      if (document.getElementById(scriptId)) return;
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = WIDGET_BASE_URL + "/widget/loader.js";
      script.async = true;
      document.body.appendChild(script);
    };

    if (deferLoad === "immediate") {
      loadScript();
      return;
    }

    if (deferLoad === "interaction") {
      let loaded = false;
      const onInteraction = () => {
        if (loaded) return;
        loaded = true;
        loadScript();
        window.removeEventListener("pointerdown", onInteraction);
        window.removeEventListener("keydown", onInteraction);
      };

      const timeoutId = window.setTimeout(onInteraction, 6000);
      window.addEventListener("pointerdown", onInteraction, { passive: true });
      window.addEventListener("keydown", onInteraction);

      return () => {
        window.removeEventListener("pointerdown", onInteraction);
        window.removeEventListener("keydown", onInteraction);
        window.clearTimeout(timeoutId);
      };
    }

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      const idleId = idleWindow.requestIdleCallback(loadScript, { timeout: 4000 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = globalThis.setTimeout(loadScript, 1500);
    return () => globalThis.clearTimeout(timeoutId);
  }, [accountId, email, name, metadata, metadataToken, controlledByHost, widgetIsOpen, deferLoad]);

  return null;
}
