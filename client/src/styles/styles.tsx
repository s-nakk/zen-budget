import {Inter, Lusitana} from 'next/font/google';
import {cva} from "class-variance-authority";

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin'],
});


export const statusVariants = cva(
  "flex justify-center items-center",
  {
    variants: {
      variant: {
        default: "text-white",
        removed: "text-red-900",
        added: "",
        edited: "text-green",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
