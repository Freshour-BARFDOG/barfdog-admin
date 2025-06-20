import { useState, useEffect } from "react";

type DeviceOS = 'iOS' | 'Android' | 'Other';

// 반환 타입 정의
interface DeviceState {
  isMobileWidth: boolean;
  isMobileDevice: boolean;
  deviceWidth: number;
  deviceOS: DeviceOS;
}

// Debounce 함수 추가
const debounce = (func: () => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
};

const getMobileOS = (): DeviceOS => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const hasMSStream = typeof (window as any).MSStream !== 'undefined';

  if (/android/i.test(userAgent)) return "Android";
  if (/iPad|iPhone|iPod/.test(userAgent) && !hasMSStream) return "iOS";
  return "Other";
}

export function useDeviceState(): DeviceState {
  const [deviceState, setDeviceState] = useState<DeviceState>({
    isMobileWidth: false,
    isMobileDevice: false,
    deviceWidth: 0,
    deviceOS: 'Other',
  });

  // 모바일 디바이스 여부 확인 함수
  const checkIsMobileDevice = (): boolean => {
    if ("userAgentData" in navigator) {
      return (navigator as any).userAgentData.mobile || navigator.maxTouchPoints > 0;
    }
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || navigator.maxTouchPoints > 0;
  };

  // 디바이스 상태 업데이트 함수
  const updateDeviceState = () => {
    const deviceWidth = window.innerWidth;
    setDeviceState({
      isMobileWidth: deviceWidth <= 600,
      isMobileDevice: checkIsMobileDevice(),
      deviceWidth,
      deviceOS: getMobileOS(),
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 초기 상태 설정
    updateDeviceState();

    // 리사이즈 이벤트 핸들러에 debounce 적용
    const debouncedUpdate = debounce(updateDeviceState, 100);
    window.addEventListener("resize", debouncedUpdate);

    return () => {
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, []);

  return deviceState;
}
