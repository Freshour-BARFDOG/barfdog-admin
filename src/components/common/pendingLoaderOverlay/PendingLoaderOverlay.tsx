import Spinner from "../spinner/Spinner";
import Text from "../text/Text";
import { paymentLoaderContainer } from "./PendingLoaderOverlay.css";

interface PendingLoaderOverlayProps {
  text?: string;
}

export default function PendingLoaderOverlay({
  text,
}: PendingLoaderOverlayProps) {
  return (
    <div className={paymentLoaderContainer}>
      <Spinner />
      {text && (
        <Text type="body2" color="gray100">
          {text}
        </Text>
      )}
    </div>
  );
}
