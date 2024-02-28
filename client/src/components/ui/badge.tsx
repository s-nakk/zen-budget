import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils/utils"

const badgeVariants = cva(
  "border-transparent inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow",
        secondary:
          "bg-secondary text-secondary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground shadow",
        edited:
          "bg-green-500 text-neutral-50 shadow dark:bg-green-900 shadow",
        added:
          "bg-blue-500 text-neutral-50 shadow dark:bg-blue-900 shadow",
        required:
          "bg-red-700 text-neutral-50 shadow dark:bg-red-900 shadow",
        optional:
          "bg-gray-700 text-neutral-50 shadow dark:bg-gray-900 shadow",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
}

function Badge({className, variant, ...props}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({variant}), className)} {...props} />
  )
}

export {Badge, badgeVariants}
