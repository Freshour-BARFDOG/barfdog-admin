import React from "react";
import { divider } from "./Divider.css";

interface DividerProps {
  /** 1,2,4,8,12 중 하나 */
  thickness?: 1 | 2 | 4 | 8 | 12;
  /** CSS 변수에 매핑된 색상 키 */
  color?: "gray50" | "gray100" | "gray200" | "gray300" | "gray700"; // css.ts 에 등록한 키와 일치
}

export default function Divider({
  thickness = 8,
  color = "gray50",
}: DividerProps) {
  return <div className={divider({ thickness, color })} />;
}
