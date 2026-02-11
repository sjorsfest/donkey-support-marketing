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
}

export function SupportWidget({
  accountId,
  email,
  name,
  metadata,
  metadataToken,
  controlledByHost,
  widgetIsOpen,
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

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = WIDGET_BASE_URL + "/widget/loader.js";
    script.async = true;
    document.body.appendChild(script);
  }, [accountId, email, name, metadata, metadataToken, controlledByHost, widgetIsOpen]);

  return null;
}
