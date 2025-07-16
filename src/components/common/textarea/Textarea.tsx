import { ChangeEvent, forwardRef, TextareaHTMLAttributes } from "react";
import {
  charCount,
  errorText,
  textareaBoxStyle,
  textareaStyle,
  textareaBaseStyle,
} from "./Textarea.css";
import Text from "@/components/common/text/Text";
import { textStyles } from "@/components/common/text/Text.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  label?: string;
  error?: string;
  className?: string;
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, maxLength, value, ...rest }, ref) => {
    const currentLength =
      typeof value === "string" || Array.isArray(value) ? value.length : 0;

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (rest.onChange) {
        rest.onChange(e);
      }
    };
    return (
      <div className={`${textareaBaseStyle} ${className || ""}`}>
        <div className={textareaBoxStyle}>
          <textarea
            ref={ref}
            maxLength={maxLength}
            className={`${textareaStyle({ active: value?.length !== 0 })} ${
              textStyles.body3
            }`}
            onChange={handleInputChange}
            value={value}
            {...rest}
          />
          {maxLength && (
            <Text type="caption" color="gray500" className={charCount}>
              {currentLength} / {maxLength.toLocaleString()}
            </Text>
          )}
        </div>
        {error && (
          <Text type="caption" color="red" align="left" className={errorText}>
            {error}
          </Text>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
