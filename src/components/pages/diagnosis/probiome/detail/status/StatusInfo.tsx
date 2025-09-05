import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import * as styles from "../ProbiomeDetail.css";
import InfoIcon from "public/images/icons/info.svg";
import Text from "@/components/common/text/Text";
import { DiagnosisInfo } from "@/types/diagnosis";
import {
  DIAGNOSIS_STATUSES_LABEL,
  PROBIOME_STATUS_CONFIG,
} from "@/constants/diagnosis";
import { commonWrapper } from "@/styles/common.css";
import TextWithBreaks from "@/components/common/textWithBreaks/TextWithBreaks";
import Button from "@/components/common/button/Button";
import { useCallback, useMemo, useRef } from "react";

interface StatusInfoProps {
  diagnosisData: DiagnosisInfo;
  memberName: string;
  onActions: () => void;
  onUploadReport: (file: File) => void;
  onReportDownload: (url: string, memberName: string) => void;
}

export default function StatusInfo({
  diagnosisData,
  memberName,
  onActions,
  onUploadReport,
  onReportDownload,
}: StatusInfoProps) {
  const { status } = diagnosisData;
  const rawUrl = diagnosisData.downloadReport?.url ?? null;

  const fixedReportUrl = useMemo(() => {
    if (!rawUrl) return null;
    try {
      const u = new URL(rawUrl);
      u.pathname = decodeURIComponent(u.pathname);
      return u.toString();
    } catch {
      return rawUrl;
    }
  }, [rawUrl]);

  const cfg = PROBIOME_STATUS_CONFIG[status];

  const inputRef = useRef<HTMLInputElement>(null);
  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) onUploadReport(file);
    // 동일 파일 재업로드 가능하도록 리셋
    e.currentTarget.value = "";
  };

  const isStatusUpdateStep =
    status === "KIT_PICKUP_REQUESTED" || status === "KIT_PICKUP_COMPLETED";
  const isUploadStep =
    status === "ANALYSIS_IN_PROGRESS" || status === "REPORT_COMPLETED";

  return (
    <div className={styles.probiomeStatusContainer}>
      <div className={styles.iconWrapper}>
        <SvgIcon src={InfoIcon} color="blue600" size={20} />
      </div>
      <div
        className={commonWrapper({
          gap: 8,
          direction: "col",
          align: "start",
          justify: "start",
        })}
      >
        <Text type="headline3" color="blue600" applyLineHeight={false}>
          상태 : {DIAGNOSIS_STATUSES_LABEL[status]}
        </Text>
        {cfg.description && (
          <Text type="body3" color="gray700">
            <TextWithBreaks text={cfg.description} />
          </Text>
        )}
        {fixedReportUrl && (
          <Button
            variant="text"
            size="sm"
            onClick={() => onReportDownload(fixedReportUrl, memberName)}
          >
            <Text
              type="body3"
              color="blue500"
              className={styles.fileDownloadLink}
            >
              Report_{memberName}.pdf
            </Text>
          </Button>
        )}
        {isStatusUpdateStep && (
          <Button buttonColor="gray800" size="sm" onClick={onActions}>
            {PROBIOME_STATUS_CONFIG[status].buttonText}
          </Button>
        )}
        {isUploadStep && (
          <>
            <Button variant="outline" size="sm" onClick={openFilePicker}>
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                onChange={onFileChange}
                className={styles.fileUploadInput}
              />
              {PROBIOME_STATUS_CONFIG[status].buttonText}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
