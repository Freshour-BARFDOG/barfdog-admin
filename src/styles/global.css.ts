import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  width: "100%",
  height: "100%",
});
