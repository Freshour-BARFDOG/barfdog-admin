import * as styles from './Table.css';
import Text from "@/components/common/text/Text";
import { TableColumn } from "@/types/common";

type TableProps<T> = {
	data: T[];
	columns: TableColumn<T>[];
	emptyText?: string;
};

export default function Table<T>({ data, columns, emptyText = 'No data available' }: TableProps<T>) {
	return (
		<div className={styles.tableWrapper}>
			<table className={styles.table}>
				<thead>
					<tr>
						{columns.map((col) => (
							<th
								key={col.key.toString()}
								className={styles.tableHead}
								style={{
									width: col.width,
									minWidth: col.width ?? '80px',
									maxWidth: col.width,
								}}
							>
								<Text type='headline2'>{col.header}</Text>
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
							<Text type='body2'>{emptyText}</Text>
						</td>
					</tr>
				) : (
					data.map((item, rowIndex) => (
						<tr key={rowIndex}>
							{columns.map((col) => {
								const isLastRow = rowIndex === data.length - 1;
								return (
									<td
										key={col.key.toString()}
										className={styles.tableCell({ isLastRow })}
									>
										<Text type='body3'>
											{col.render ? col.render(item) : String(item[col.key as keyof T])}
										</Text>
									</td>
								)
							})}
						</tr>
					))
				)}
				</tbody>
			</table>
		</div>
	);
}