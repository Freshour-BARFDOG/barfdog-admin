import { ChangeEvent, useState } from "react";
import { themeVars } from "@/styles/theme.css";
import { commonWrapper } from "@/styles/common.css";
import { X } from "lucide-react";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import Chips from "@/components/common/chips/Chips";
import Text from "@/components/common/text/Text";

interface AddEventInputProps {
  eventNameList: string[];
  setEventNameList: (value: string[]) => void;
  eventError: string;
  setEventError: (msg: string) => void;
  caption?: string;
}

export default function AddEventInput({
  eventNameList,
  setEventNameList,
  eventError,
  setEventError,
  caption,
}: AddEventInputProps) {
  const [eventValue, setEventValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEventError?.('');
    setEventValue(e.target.value);
  };

  const handleRemoveItem = (event: string) => {
    setEventNameList(eventNameList.filter(name => name !== event));
    setEventError?.('');
  }

  const handleAddEventName = () => {
    if (!eventNameList.some(event => event === eventValue)) {
      setEventNameList([...eventNameList, eventValue]);
      setEventValue('');
    } else {
      setEventError('이미 등록된 행사입니다. 다시 입력해 주세요.');
    }
  }
  return (
    <div className={commonWrapper({ direction: 'col', gap: 8, align: 'start' })}>
      <div className={commonWrapper({ gap: 4, justify: 'start' })}>
        <InputField
          name='eventName'
          value={eventValue}
          onChange={handleChange}
          width={350}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              if (!e.currentTarget.value) {
                setEventError('입력하지 않은 항목이 있습니다.');
                return;
              }
              handleAddEventName();
            }
          }}
        />
        <Button size='sm' variant='outline' type='assistive' onClick={handleAddEventName}>
          추가
        </Button>
      </div>
      {caption &&
        <Text type='caption'>{caption}</Text>
      }
      {eventError && (
        <div className={commonWrapper({ align: 'start', justify: 'start' })}>
          <X color={themeVars.colors.red.red} size={16} />
          <Text type='caption' color='red'>{eventError}</Text>
        </div>
      )}

      <div className={commonWrapper({ gap: 4, justify: 'start', wrap: 'wrap' })}>
        {eventNameList.map(event => (
          <Chips variant='solid' key={event} color='gray200' borderRadius='lg'>
            <div className={commonWrapper({ gap: 4 })}>
              <span>{event}</span>
              <button>
                <X onClick={() => handleRemoveItem(event)} size={16} />
              </button>
            </div>
          </Chips>
        ))}
      </div>
    </div>
  );
};