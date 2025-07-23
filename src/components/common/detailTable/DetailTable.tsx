import React from "react";
import * as styles from "./DetailTable.css";
import Text from "../text/Text";
import { TableItem } from "@/types/common";

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
      {title && (
        <Text type="title4" block className={styles.tableTitle}>
          {title}
        </Text>
      )}
      <dl className={styles.table({ columns })}>
        {items.map(({ label, value, fullWidth }, idx) => (
          <React.Fragment key={`${label}-${idx}`}>
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
