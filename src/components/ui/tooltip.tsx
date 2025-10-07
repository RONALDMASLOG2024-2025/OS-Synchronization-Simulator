import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

export function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className={cn(
          "absolute z-50 px-3 py-1.5 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-lg",
          "bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap",
          "animate-in fade-in-0 zoom-in-95"
        )}>
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
          </div>
        </div>
      )}
    </div>
  );
}
