import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import React, {ReactNode} from "react";

interface ToolTipProps {
  description: string;
  children: ReactNode; // childrenを受け取るために追加
}

export const WrappedTooltip: React.FC<ToolTipProps> = ({description, children}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};