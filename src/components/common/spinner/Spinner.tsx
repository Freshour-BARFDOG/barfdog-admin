import SvgIcon from "../svgIcon/SvgIcon";
import * as styles from "./Spinner.css";
import SpinnerInIcon from "/public/images/spinner/spinner-in.svg";
import SpinnerOutIcon from "/public/images/spinner/spinner-out.svg";

interface SpinnerProps {
  className?: string;
  fullscreen?: boolean;
  size?: "md" | "sm";
}

const SPINNER_SIZES = {
  md: { outer: 64, inner: 24 },
  sm: { outer: 56, inner: 16 },
} as const;

export default function Spinner({
  className,
  fullscreen,
  size = "md",
}: SpinnerProps) {
  const { outer, inner } = SPINNER_SIZES[size];
  return (
    <div className={styles.spinnerContainer({ fullscreen })}>
      <div
        className={[styles.spinner({ size }), className]
          .filter(Boolean)
          .join(" ")}
        role="status"
        aria-label="로딩 중"
      >
        <SvgIcon
          src={SpinnerOutIcon}
          className={styles.spinnerOuter}
          size={outer}
        />
        <SvgIcon
          src={SpinnerInIcon}
          className={styles.spinnerInner({ size })}
          size={inner}
        />
      </div>
    </div>
  );
}
