import { ChangeEvent, forwardRef, TextareaHTMLAttributes } from "react";
import {
  charCount, errorText,
  textareaBoxStyle,
  textareaStyle
} from "./Textarea.css";
import Text from "@/components/common/text/Text";
import { textStyles } from "@/components/common/text/Text.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  id: string;
  value: string;
  label?: string;
  error?: string;
  className?: string;
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  id,
  error,
  className,
  maxLength,
  value,
  ...rest
}, ref) => {
  const currentLength = typeof value === 'string' || Array.isArray(value) ? value.length : 0;

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (rest.onChange) {
      rest.onChange(e);
    }
  }
  return (
    <div className={className || ''}>
      <div className={textareaBoxStyle}>
        <textarea
          id={id}
          ref={ref}
          maxLength={maxLength}
          className={`${textareaStyle({ active: value?.length !== 0 })} ${textStyles.body3}`}
          onChange={handleInputChange}
          value={value}
          {...rest}
        />
        {maxLength && (
          <Text type='caption' color='gray500' className={charCount}>
            {currentLength} / {maxLength.toLocaleString()}
          </Text>
        )}
      </div>
      {error && <Text type='caption' color='red' align='left' className={errorText}>{error}</Text>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;