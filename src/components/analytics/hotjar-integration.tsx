"use client";

import { useEffect } from "react";
import Script from "next/script";

interface HotjarConfig {
  hjid: number;
  hjsv: number;
}

export function HotjarScript({ hjid, hjsv }: HotjarConfig) {
  return (
    <>
      <Script
        id="hotjar-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${hjid},hjsv:${hjsv}};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />
    </>
  );
}

export function useHotjar() {
  useEffect(() => {
    // Hotjar initialization check
  }, []);

  return {
    trigger: (eventName: string) => {
      if (typeof window !== "undefined" && (window as any).hj) {
        (window as any).hj("trigger", eventName);
      }
    },
    identify: (userId: string, attributes?: Record<string, any>) => {
      if (typeof window !== "undefined" && (window as any).hj) {
        (window as any).hj("identify", userId, attributes);
      }
    },
    tagRecording: (tags: string[]) => {
      if (typeof window !== "undefined" && (window as any).hj) {
        (window as any).hj("tagRecording", tags);
      }
    },
  };
}

// Heatmap Trigger Component
export function HeatmapTrigger({ eventName }: { eventName: string }) {
  const { trigger } = useHotjar();

  useEffect(() => {
    trigger(eventName);
  }, [eventName, trigger]);

  return null;
}

// User Feedback Widget
export function UserFeedbackWidget() {
  const { trigger } = useHotjar();

  const showFeedback = () => {
    trigger("feedback_widget");
  };

  return (
    <button
      onClick={showFeedback}
      className="fixed bottom-4 right-4 z-50 rounded-full bg-primary px-6 py-3 text-white shadow-lg hover:bg-primary/90 transition-colors"
    >
      Geri Bildirim
    </button>
  );
}
