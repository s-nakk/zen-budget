import * as React from "react"

import {cn} from "@/lib/utils/utils"
import {MdError} from "react-icons/md";
import {FaRegCheckCircle} from "react-icons/fa";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean; // errorプロパティを追加
  isDirty?: boolean; // isDirtyプロパティを追加
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, error, isDirty, ...rest}, ref) => {
    return (
      <div className={cn("relative", className)}>
        <input
          type={type}
          autoComplete={"on"}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm" +
            " file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          )}
          ref={ref}
          {...rest}
        />
        {error && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <MdError className="ml-1 animate-pulse" color="rgb(234, 45, 72)" aria-hidden="true"/>
        </div>}
        {!error && isDirty && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FaRegCheckCircle className="ml-1 text-ring" aria-hidden="true"/>
        </div>}
      </div>
    )
  }
)
Input.displayName = "Input"

export {Input}
