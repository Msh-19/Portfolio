"use client";

import { useState } from "react";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/moving-border";
import { CalendarDays, Loader2, X } from "lucide-react";

export function ScheduleCard() {
  const [isVisible, setIsVisible] = useState(true);
  const [calApi, setCalApi] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSchedule = async () => {
    try {
      setIsLoading(true);
      const api =
        calApi ||
        (await getCalApi({ namespace: "booking" }).then((cal) => {
          cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
          setCalApi(() => cal);
          return cal;
        }));

      // Profile link (no event slug) lets visitors pick 15 or 30 minutes
      api("modal", {
        calLink: "mohammed-shemim-hdzel3",
        config: { layout: "month_view" },
      });
    } catch (error) {
      console.error("Failed to initialize Cal.com", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    // z-40: sits below the fixed header / mobile menu (z-50)
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button
        as="div"
        borderRadius="9999px"
        duration={6000}
        // Solid background: a translucent + backdrop-blur fill flickers during
        // the entrance fade and lets the moving-border blob show through
        className="bg-background text-foreground shadow-lg border-foreground/10"
        containerClassName="h-auto w-auto p-[1.5px]"
        borderClassName="bg-[radial-gradient(var(--foreground)_40%,transparent_60%)]"
      >
        <button
          type="button"
          onClick={handleSchedule}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium disabled:opacity-70 disabled:cursor-wait"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <CalendarDays className="w-4 h-4" aria-hidden="true" />
          )}
          Book a meeting
        </button>
      </Button>

      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="grid place-items-center w-8 h-8 rounded-full bg-background border border-foreground/10 text-muted-foreground hover:text-foreground shadow-lg transition-colors"
        aria-label="Dismiss booking button"
      >
        <X className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
