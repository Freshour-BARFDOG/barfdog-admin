import * as styles from "./Table.css";
import Text from "@/components/common/text/Text";
import { TableColumn } from "@/types/common";
import { CSSProperties, isValidElement } from "react";

type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  emptyText?: string;
  getRowStyle?: (row: T, rowIndex: number) => CSSProperties;
};

export default function Table<T>({
  data,
  columns,
  emptyText = "No data available",
  getRowStyle,
}: TableProps<T>) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, colIndex) => (
              <th
                key={`${col.key.toString()}-${colIndex}`}
                className={styles.tableHead}
                style={{
                  width: col.width,
                  minWidth: col.width ?? "40px",
                  maxWidth: col.width,
                }}
              >
                {/* ReactNode 헤더를 바로 렌더, 아니면 Text로 감싸기 */}
                {isValidElement(col.header) ? (
                  col.header
                ) : (
                  <Text type="headline2">{col.header}</Text>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={styles.tableCell({ isLastRow: true })}
              >
                <Text type="body2">{emptyText}</Text>
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr 
                key={rowIndex}
                style={getRowStyle ? getRowStyle(item, rowIndex) : undefined}
              >
                {columns.map((col, colIndex) => {
                  const isLastRow = rowIndex === data.length - 1;
                  return (
                    <td
                      key={`${col.key.toString()}-${rowIndex}-${colIndex}`}
                      className={styles.tableCell({ isLastRow })}
                    >
                      <Text type="body3">
                        {col.render
                          ? col.render(item, rowIndex)
                          : String(item[col.key as keyof T])}
                      </Text>
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
