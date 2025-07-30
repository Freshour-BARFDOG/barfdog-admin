import React from "react";
import { divider } from "./DividerVertical.css";

interface DividerProps {
  thickness?: 1 | 2 | 4 | 8 | 12;
  color?: "gray50" | "gray100" | "gray200" | "gray300" | "gray700";
}

export default function DividerVertical({
  thickness = 8,
  color = "gray50",
}: DividerProps) {
  return <div className={divider({ thickness, color })} />;
}
