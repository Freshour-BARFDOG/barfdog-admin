import React from "react";
import Card from "../card/Card";
import * as styles from "./DetailTable.css";

export interface TableItem {
  label: string;
  value: React.ReactNode;
  /** true 면 해당 페어(dt+dd)를 전체 폭으로 차지 */
  fullWidth?: boolean;
}

interface DetailTableProps {
  items: TableItem[];
  columns?: 1 | 2 | 3;
}

export default function DetailTable({ items, columns = 2 }: DetailTableProps) {
  return (
    <Card shadow="light">
      <dl className={styles.table({ columns })}>
        {items.map(({ label, value, fullWidth }) => (
          <React.Fragment key={label}>
            <dt className={`${styles.label} ${fullWidth && styles.fullRow}`}>
              {label}
            </dt>
            <dd className={`${styles.value}, ${fullWidth && styles.fullRow}`}>
              {value}
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </Card>
  );
}
