import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const fileUploadContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '10px'
})

export const fileUploadLabel = style({
  width: '100%',
})

export const fileUploadButton = style({
  display: 'inline-block',
  padding: '4px 10px',
  borderRadius: '8px',
  cursor: 'pointer',
  marginRight: '8px',
  border: `1px solid ${themeVars.colors.gray.gray300}`,
})

export const imageFile = recipe({
  base: {
    display: 'block',
    marginBottom: '10px'
  },
  variants: {
    borderRadius: {
      true: {
        borderRadius: '50%'
      }
    },
    objectFit: {
      cover: {
        objectFit: 'cover',
      },
      contain: {
        objectFit: 'contain',
      }
    },
  }
})