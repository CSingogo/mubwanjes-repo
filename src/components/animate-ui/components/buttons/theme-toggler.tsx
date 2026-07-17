"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import {
  ThemeToggler as ThemeTogglerPrimitive,
  type ThemeTogglerProps as ThemeTogglerPrimitiveProps,
  type ThemeSelection,
  type Resolved,
} from "@/components/animate-ui/primitives/effects/theme-toggler";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-xs outline-none transition-colors hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ink/20 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-ink text-surface hover:bg-ink/90 border-transparent",
        accent: "bg-accent text-surface border-transparent hover:bg-accent/90",
        destructive:
          "bg-red-600 text-white border-transparent hover:bg-red-600/90",
        outline: "border-line bg-transparent hover:bg-surface-muted",
        secondary: "bg-surface-muted text-ink border-transparent",
        ghost: "border-transparent bg-transparent hover:bg-surface-muted",
        link: "border-transparent bg-transparent underline-offset-4 hover:underline",
      },
      size: {
        default: "size-9",
        sm: "size-8",
        lg: "size-10",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
);

const getIcon = (
  effective: ThemeSelection,
  resolved: Resolved,
  modes: ThemeSelection[]
) => {
  const theme = modes.includes("system") ? effective : resolved;
  if (theme === "system") return <Monitor />;
  if (theme === "dark") return <Moon />;
  return <Sun />;
};

const getNextTheme = (
  effective: ThemeSelection,
  modes: ThemeSelection[]
): ThemeSelection => {
  const i = modes.indexOf(effective);
  if (i === -1) return modes[0];
  return modes[(i + 1) % modes.length];
};

export type ThemeTogglerButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    modes?: ThemeSelection[];
    onImmediateChange?: ThemeTogglerPrimitiveProps["onImmediateChange"];
    direction?: ThemeTogglerPrimitiveProps["direction"];
  };

export function ThemeTogglerButton({
  variant = "outline",
  size = "default",
  modes = ["light", "dark"],
  direction = "ltr",
  onImmediateChange,
  onClick,
  className,
  ...props
}: ThemeTogglerButtonProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={cn(buttonVariants({ variant, size, className }))}
        disabled
      >
        <Sun />
      </button>
    );
  }

  return (
    <ThemeTogglerPrimitive
      theme={(theme as ThemeSelection) ?? "light"}
      resolvedTheme={(resolvedTheme as Resolved) ?? "light"}
      setTheme={setTheme}
      direction={direction}
      onImmediateChange={onImmediateChange}
    >
      {({ effective, resolved, toggleTheme }) => (
        <button
          type="button"
          data-slot="theme-toggler-button"
          aria-label={`Switch theme (current: ${effective})`}
          className={cn(buttonVariants({ variant, size, className }))}
          onClick={(e) => {
            onClick?.(e);
            toggleTheme(getNextTheme(effective, modes));
          }}
          {...props}
        >
          {getIcon(effective, resolved, modes)}
        </button>
      )}
    </ThemeTogglerPrimitive>
  );
}
