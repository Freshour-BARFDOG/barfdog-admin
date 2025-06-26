import React from 'react';
import * as styles from './Divider.css';
import { COLORS } from '@/constants/style';


interface DividerProps {
  thickness?: 1 | 2 | 4 | 8 | 12;
  color?: keyof typeof COLORS;
  direction?: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
}


export default function Divider({
  thickness = 8,
  color = "gray50",
  direction = 'horizontal',
  style,
}: DividerProps) {
  const overrideColorStyle =
    direction === 'horizontal'
      ? { borderBottomColor: COLORS[color] }
      : { borderLeftColor: COLORS[color] };

  const dividerStyle = { ...style, ...overrideColorStyle };

  return (
    <div
      className={`
        ${styles.dividerBase[direction]} 
        ${styles.thicknessVariants[direction][thickness]}
      `}
      style={dividerStyle}
    />
  );
}