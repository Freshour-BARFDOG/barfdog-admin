import Link from "next/link";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import TableSection from "@/components/common/tableSection/TableSection";
import useItemSelection from "@/hooks/useItemSelection";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import {
	AllianceCouponData,
	AllianceCouponListResponse,
	AllianceCouponListSearchParams,
	AllianceCouponStatus
} from "@/types/alliance";
import { TableColumn } from "@/types/common";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { downloadBlobFile } from "@/utils/downloadBlobFile";
import { useExcelDownloadAllianceCoupon } from "@/api/alliance/mutations/useExcelDownloadAllianceCoupon";
import { useDeleteAllianceCouponList } from "@/api/alliance/mutations/useDeleteAllianceCouponList";

interface AllianceCouponTableProps {
	data: AllianceCouponListResponse;
	page: number;
	onChangePage: (page: number) => void;
	status: AllianceCouponStatus;
	submittedValues: AllianceCouponListSearchParams;
}

export default function AllianceCouponTable({
	data,
	page,
	onChangePage,
	status,
	submittedValues,
}: AllianceCouponTableProps) {
	const queryClient = useQueryClient();
	const { addToast } = useToastStore();
	const {
		selectedIds: deleteSelectedBundles,
		toggleSelect,
		selectAll,
		isSelected,
		allSelected,
	} = useItemSelection(data?.couponList ?? [], (data) => data.bundle, [] );

	const { mutate } = useDeleteAllianceCouponList();
	const { mutate: excelDownload, isPending: isExcelDownloading } = useExcelDownloadAllianceCoupon();

	// 다중 삭제
	const handleDeleteSelectedBundles = () => {
		const confirmed = window.confirm(`선택하신 ${deleteSelectedBundles.length}개의 항목을 삭제하시겠습니까?`);
		if (!confirmed) return;

		mutate({
			couponBundleList: deleteSelectedBundles as string[]
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.ALLIANCE.BASE, queryKeys.ALLIANCE.GET_ALLIANCE_COUPON_LIST, page, submittedValues],
				});
				addToast('쿠폰 삭제가 완료되었습니다!');
				selectAll(false);
			},
			onError: (error) => {
				console.log(error)
				addToast('쿠폰 삭제에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		})
	}

	// 쿠폰 엑셀 다운로드
	const handleExcelDownload = (row: AllianceCouponData) => {
		const body = {
			allianceCouponBundle: row.bundle,
			couponStatus: status,
		};
		excelDownload(body, {
			onSuccess: (data) => {
				const formatDateForFilename = (dateStr: string) => format(new Date(dateStr), 'yyyyMMdd');
				const formatStartDate = formatDateForFilename(row.useStartDate);
				const formatEndDate = formatDateForFilename(row.useExpiredDate);

				const filename = `바프독_${row.couponName}_${formatStartDate}_${formatEndDate}_${row.couponCount.toLocaleString()}건.xlsx`;
				downloadBlobFile(data as Blob, filename);
			},
			onError: (error) => {
				addToast('엑셀 다운로드에 실패했습니다.\n관리자에게 문의해주세요.')
				console.log(error)
			}
		})
	}

	const columns: TableColumn<AllianceCouponData>[] = [
		status === 'ACTIVE' && {
			key: 'bundle',
			header: (
				<LabeledCheckbox
					value={allSelected}
					isChecked={allSelected}
					onToggle={(value) => {
						selectAll(!value)
					}}
				/>
			),
			width: '60px',
			render: (row: AllianceCouponData) => (
				<LabeledCheckbox
					value={row.bundle}
					isChecked={isSelected(row.bundle)}
					onToggle={() => toggleSelect(row.bundle)}
				/>
			),
		},
		{
			key: "id",
			header: "번호",
			width: "60px",
			render: (_: AllianceCouponData, index: number) =>
				getTableRowNumber({
					totalElements: data?.page.totalElements as number,
					currentPage: data?.page.number as number,
					pageSize: data?.page.size as number,
					index,
				}).toString(),
		},
		{
			key: 'bundle-id',
			header: '상세보기',
			render: (row: AllianceCouponData) => (
				<Link href={`/alliance/coupon/${row.bundle}`} target='_blank'>
					<Text type='body3' color='red'>상세보기</Text>
				</Link>
			),
		},
		{ key: 'allianceName', header: '제휴사' },
		{ key: 'eventName', header: '행사', render: (row: AllianceCouponData) => row.eventName ?? '-' },
		{ key: 'couponName', header: '쿠폰 이름' },
		{ key: 'discountDegree', header: '할인' },
		{ key: 'couponCount', header: '생성 개수' },
		{
			key: 'expiredDate',
			header: '쿠폰 사용 기한',
			render: (row: AllianceCouponData) => (
				<>
					<Text type='body3' block>
						{format(new Date(row.useStartDate), 'yyyy-MM-dd HH:mm:ss')} ~
					</Text>
					<Text type='body3' block>
						{format(new Date(row.useExpiredDate), 'yyyy-MM-dd HH:mm:ss')}
					</Text>
				</>
			)
		},
		{ key: 'registrationCount', header: '발급' },
		{ key: 'usedCount', header: '사용' },
		{
			key: 'excelDownload',
			header: '재다운',
			render: (row: AllianceCouponData) => (
				<Button
					variant='outline'
					type='assistive'
					size='sm'
					onClick={() => handleExcelDownload(row)}
					disabled={isExcelDownloading}
				>
					Excel 파일 다운로드
				</Button>
			),
		},
	].filter(Boolean) as TableColumn<AllianceCouponData>[];;;

	return (
		<TableSection
			data={data?.couponList}
			columns={columns}
			page={page ?? 0}
			onPageChange={(page: number) => {
				onChangePage(page);
				selectAll(false);
			}}
			totalPages={data?.page?.totalPages ?? 0}
			title='쿠폰 목록'
			emptyText='쿠폰 목록 데이터가 없습니다.'
			action={status === 'ACTIVE' ? (
				<Button
					onClick={handleDeleteSelectedBundles}
					variant='outline' type='assistive' size='sm'
					disabled={deleteSelectedBundles.length === 0}
				>
					쿠폰 삭제
				</Button>
			) : undefined}
			borderRadius='none'
		/>
	);
}