import { create } from "zustand";

type ToastPosition = 'bottom' | 'top';

interface ToastItem {
  id: string;
  message: string;
  duration?: number;
  position?: ToastPosition;
  closeButton?: boolean;
}

interface ToastStore {
  queue: ToastItem[];
  currentToast: ToastItem | null;
  addToast: (message: string, position?: ToastPosition, duration?: number) => void;
  removeToast: () => void;
  processNextToast: () => void;
}

export const useToastStore = create<ToastStore>()((set, get) => ({
  queue: [],
  currentToast: null,
  addToast: (message, position = 'top', duration = 1500, closeButton = false) => {
    const id = Date.now().toString();
    const newToast = { id, message, position, duration, closeButton };

    set((state) => ({
      queue: [...state.queue, newToast],
    }));

    // 새로운 Toast가 추가되었을 때, 현재 Toast가 없으면 실행
    if (!get().currentToast) {
      get().processNextToast();
    }
  },

  removeToast: () => {
    set(() => ({
      currentToast: null,
    }));

    // 현재 Toast 제거 후 다음 Toast 처리
    setTimeout(() => {
      get().processNextToast();
    }, 300);
  },

  processNextToast: () => {
    const state = get();
    if (state.queue.length === 0 || state.currentToast) return;

    const nextToast = state.queue[0];

    set(() => ({
      currentToast: nextToast,
      queue: state.queue.slice(1),
    }));

    setTimeout(() => {
      get().removeToast();
    }, nextToast.duration);
  },
}))