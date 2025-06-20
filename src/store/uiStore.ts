import { create } from 'zustand';

interface UIState {
	sidebarCollapsed: boolean;         // 데스크탑용
	sidebarOpenOnMobile: boolean;      // 모바일용
	toggleSidebarCollapsed: () => void;
	openSidebarMobile: () => void;
	closeSidebarMobile: () => void;
}

export const useUIStore = create<UIState>((set) => ({
	sidebarCollapsed: false,
	sidebarOpenOnMobile: false,
	toggleSidebarCollapsed: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
	openSidebarMobile: () => set({ sidebarOpenOnMobile: true }),
	closeSidebarMobile: () => set({ sidebarOpenOnMobile: false }),
}));