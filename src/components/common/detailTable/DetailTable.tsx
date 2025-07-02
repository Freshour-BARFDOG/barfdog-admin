import React from "react";
import * as styles from "./DetailTable.css";
import Text from "../text/Text";

export interface TableItem {
  label: string;
  value: React.ReactNode;
  /** true 면 해당 페어(dt+dd)를 전체 폭으로 차지 */
  fullWidth?: boolean;
}

interface DetailTableProps {
  items: TableItem[];
  columns?: 1 | 2 | 3;
  title?: string;
}

export default function DetailTable({
  items,
  columns = 2,
  title,
}: DetailTableProps) {
  return (
    <section className={styles.tableContainer}>
      {title && <Text type="title4">{title}</Text>}
      <dl className={styles.table({ columns })}>
        {items.map(({ label, value, fullWidth }) => (
          <React.Fragment key={label}>
            <dt className={`${styles.label} ${fullWidth && styles.fullLabel}`}>
              {label}
            </dt>
            <dd className={`${styles.value} ${fullWidth && styles.fullValue}`}>
              {value}
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </section>
  );
}
