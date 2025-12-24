"use client";

import { useEffect, useState } from "react";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/moving-border";
import { X } from "lucide-react";

export function ScheduleCard() {
  const [isVisible, setIsVisible] = useState(true);

  // Store the Cal API instance
  const [calApi, setCalApi] = useState<any>(null);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
      setCalApi(() => cal);
    })();
  }, []);

  const handleSchedule = () => {
    if (calApi) {
      calApi("modal", {
        calLink: "mohammed-shemim-hdzel3/15min",
        config: { layout: "month_view" },
      });
    } else {
        console.error("Cal API not initialized yet");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button
        as="div"
        borderRadius="1.5rem"
        className="bg-black/40 backdrop-blur-xl text-white p-6 shadow-2xl border-white/5"
        containerClassName="h-auto w-auto p-[2px]"
        borderClassName="bg-[radial-gradient(#a855f7_40%,transparent_60%)]"
      >
        {/* Close Button wrapped in relative div to position correctly within the flex container if needed, 
            but Button's inner div is flex-center. We need to handle positioning. 
            The inner content should probably be a w-full h-full div. */}
        <div className="relative w-full max-w-sm">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute -top-2 -right-2 p-1 text-gray-400 hover:text-white transition-colors z-20"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-600">
              Let&apos;s Collaborate 🚀
            </h3>
            
            <p className="text-sm text-gray-300 leading-relaxed text-left">
              Let&apos;s discuss your project and how my expertise can help bring your vision to life.
            </p>

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={handleSchedule}
                className="px-4 py-2 text-sm font-bold bg-white text-black rounded-md hover:bg-gray-300 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      </Button>
    </div>
  );
}
