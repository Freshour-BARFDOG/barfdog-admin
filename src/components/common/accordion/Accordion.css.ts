import { style } from '@vanilla-extract/css';
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const accordionButton = recipe({
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    width: '100%',
    padding: '20px',
    fontWeight: themeVars.fontSize["text-md"],
    fontSize: themeVars.fontWeight.bold,
    borderTop: `1px solid ${themeVars.colors.gray.gray200}`,
    cursor: 'pointer',
    transition: 'all .35s',
  },
    variants: {
      noChildren: {
        true: {
          cursor: 'default',
        }
      },
      isOpen: {
        true: {
          backgroundColor: themeVars.colors.gray.gray50,
        }
      }
    }
});

export const accordionIcon = recipe({
  base: {
    transition: 'all .35s',
  },
  variants: {
    isOpen: {
      true: {
        transform: 'rotate(-90deg)',
      },
      false: {
        transform: 'rotate(90deg)',
      }
    }
  }
});

export const accordionContent = style({
  padding: '0 20px 20px',
});

export const accordionMotionDiv = style({
  overflow: 'hidden',
});