import { Button } from "@/components/ui/button";
import { Gem } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const AnimatedBorderButton = ({ children, className, ...props }: ComponentProps<typeof Button>) => {
  return (
    <div className="w-fit h-fit relative inline-flex rounded-md overflow-hidden">
      {/* Animated gradient border */}
      <span className="absolute inset-0 rounded-md pointer-events-none overflow-hidden">
        <span className="absolute -inset-full animate-spin motion-reduce:animate-none [animation-duration:4s] bg-[conic-gradient(from_0deg,_var(--coral,#2b7fff)_0deg,_var(--coral,#2b7fff)_40deg,_transparent_60deg)]" />
      </span>

      {/* Button */}
      <Button
        variant="outline"
        className={cn("relative z-10 m-[1px] rounded-md bg-background dark:bg-background hover:bg-background dark:hover:bg-background shadow-none cursor-pointer", className)}
        {...props}>
        {children ?? <><Gem className="size-4" aria-hidden="true" />Get Pro</>}
      </Button>
    </div>
  );
};

export default AnimatedBorderButton;

