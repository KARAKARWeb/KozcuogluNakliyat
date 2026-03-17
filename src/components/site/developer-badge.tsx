"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DeveloperBadge() {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="https://karakar.web.tr"
            target="_blank"
            rel="noopener noreferrer"
            title="web tasarım"
            className="flex items-center gap-1.5 text-xs transition hover:text-white"
          >
            <img
              src="https://karakar.web.tr/KARAKAR-Web-Logo-2.webp"
              alt="KARAKAR Web"
              width="164"
              height="20"
              className="h-5"
            />
          </a>
        </TooltipTrigger>
        <TooltipContent side="top" align="center" sideOffset={8} className="w-64 border-none bg-white p-4 text-center text-[#122032] shadow-xl" hideArrow>
          <p className="text-sm font-black tracking-wide">KARAKAR</p>
          <p className="text-[10px] font-medium text-muted-foreground">Web Tasarım ve Yazılım Ajansı</p>
          <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">Tarafından; Kozcuoğlu İçin Özel Olarak Geliştirildi ve Devam Ediyor...</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
