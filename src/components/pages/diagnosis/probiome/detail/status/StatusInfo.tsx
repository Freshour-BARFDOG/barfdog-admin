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

interface StatusInfoProps {
  diagnosisData: DiagnosisInfo;
  onActions: () => void;
}

export default function StatusInfo({
  diagnosisData,
  onActions,
}: StatusInfoProps) {
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
          상태 : {DIAGNOSIS_STATUSES_LABEL[diagnosisData.status]}
        </Text>
        {PROBIOME_STATUS_CONFIG[diagnosisData.status].description && (
          <Text type="body3" color="gray700">
            <TextWithBreaks
              text={PROBIOME_STATUS_CONFIG[diagnosisData.status].description!}
            />
          </Text>
        )}
        {PROBIOME_STATUS_CONFIG[diagnosisData.status].description && (
          <Button buttonColor="gray800" size="sm" onClick={onActions}>
            {PROBIOME_STATUS_CONFIG[diagnosisData.status].buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
