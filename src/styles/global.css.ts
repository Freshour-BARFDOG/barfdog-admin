import { globalStyle } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

globalStyle("*", {
  boxSizing: "border-box",
  fontFamily: 'inherit',
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  width: "100%",
});

globalStyle("button", {
  cursor: 'pointer',
});

globalStyle('.swiper-button-prev, .swiper-button-next', {
  color: `${themeVars.colors.gray.gray0} !important`,
})

globalStyle('.swiper-button-next:after, .swiper-button-prev:after', {
  fontSize: '30px !important',
})