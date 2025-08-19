import { MenuItem } from "@/types/common";
import {
  BadgeDollarSign,
  BadgePercent,
  CalendarCheck,
  ClipboardList,
  Dog,
  GalleryVertical,
  LayoutDashboard,
  SendToBack,
  Settings,
  ShoppingBasket,
  Star,
  Users,
  Stethoscope,
} from "lucide-react";

export const MENU_ITEMS: MenuItem[] = [
  {
    key: "dashboard",
    label: "대시보드",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    key: "member",
    label: "회원 관리",
    href: "/member",
    icon: Users,
  },
  {
    key: "rewards",
    label: "혜택 관리",
    icon: BadgePercent,
    children: [
      {
        key: "coupon",
        label: "쿠폰 관리",
        children: [
          {
            key: "search",
            label: "쿠폰 조회",
            href: "/coupons",
          },
          {
            key: "create",
            label: "쿠폰 생성",
            href: "/coupons/create",
          },
          {
            key: "release",
            label: "쿠폰 발행",
            href: "/coupons/release",
          },
          {
            key: "usage",
            label: "쿠폰 사용 현황",
            href: "/coupons/usage",
          },
        ],
      },
      {
        key: "reward",
        label: "적립금 관리",
        children: [
          {
            key: "search",
            label: "적립금 조회",
            href: "/rewards",
          },
          {
            key: "release",
            label: "적립금 발행",
            href: "/rewards/release",
          },
        ],
      },
      {
        key: "promotions",
        label: "프로모션 관리",
        children: [
          {
            key: "search",
            label: "프로모션 관리",
            href: "/promotions",
          },
          {
            key: "create",
            label: "프로모션 생성",
            href: "/promotions/create",
          },
        ],
      },
    ],
  },
  {
    key: "sales",
    label: "판매 관리",
    icon: SendToBack,
    children: [
      {
        key: "search",
        label: "통합 검색",
        href: "/sales/search",
      },
      {
        key: "sales",
        label: "주문 관리",
        href: "/sales/orders",
      },
      {
        key: "delivery",
        label: "배송 관리",
        href: "/sales/delivery",
      },
    ],
  },
  {
    key: "products",
    label: "상품 관리",
    icon: ShoppingBasket,
    children: [
      {
        key: "general",
        label: "일반 상품 관리",
        href: "/products/general",
      },
      {
        key: "create",
        label: "일반 상품 등록",
        href: "/products/general/create",
      },
      {
        key: "raw",
        label: "레시피 관리",
        href: "/products/raw",
      },
      {
        key: "create",
        label: "레시피 등록",
        href: "/products/raw/create",
      },
    ],
  },
  {
    key: "dogs",
    label: "반려견 관리",
    href: "/dogs",
    icon: Dog,
  },
  {
    key: "subscribe",
    label: "구독 관리",
    icon: CalendarCheck,
    children: [
      {
        key: "history",
        label: "히스토리",
        href: "/subscribe/history",
      },
    ],
  },
  {
    key: "banners",
    label: "배너 및 팝업 관리",
    icon: GalleryVertical,
    children: [
      {
        key: "main",
        label: "메인 배너",
        href: "/banners/main",
      },
      {
        key: "mypage",
        label: "마이페이지 배너",
        href: "/banners/mypage",
      },
      {
        key: "top",
        label: "최상단 띠 배너",
        href: "/banners/top",
      },
      {
        key: "popup",
        label: "팝업",
        href: "/banners/popup",
      },
    ],
  },
  {
    key: "community",
    label: "게시판 관리",
    icon: ClipboardList,
    children: [
      {
        key: "notice",
        label: "공지사항",
        href: "/community/notice",
      },
      {
        key: "event",
        label: "이벤트",
        href: "/community/event",
      },
      {
        key: "article",
        label: "아티클",
        href: "/community/article",
      },
      {
        key: "inquiry",
        label: "1:1 문의",
        href: "/community/inquiry",
      },
    ],
  },
  {
    key: "review",
    label: "리뷰 관리",
    icon: Star,
    children: [
      {
        key: "review",
        label: "리뷰 조회",
        href: "/review",
      },
      {
        key: "create",
        label: "리뷰 생성",
        href: "/review/create",
      },
      {
        key: "bestReview",
        label: "베스트 리뷰",
        href: "/review/best-review",
      },
    ],
  },
  {
    key: "diagnosis",
    label: "진단 관리",
    icon: Stethoscope,
    children: [
      {
        key: "probiome",
        label: "장내 미생물 진단",
        href: "/diagnosis/probiome",
      },
      {
        key: "kit",
        label: "진단 키트 관리",
        href: "/diagnosis/kit",
      },
    ],
  },
  {
    key: "alliance",
    label: "제휴사 관리",
    icon: BadgeDollarSign,
    children: [
      {
        key: "coupon",
        label: "난수 쿠폰 관리",
        children: [
          {
            key: "create",
            label: "쿠폰 생성",
            href: "/alliance/coupon/create",
          },
          {
            key: "coupon-list",
            label: "쿠폰 내역",
            href: "/alliance/coupon",
          },
        ],
      },
      {
        key: "overview",
        label: "제휴사 현황",
        children: [
          {
            key: "alliance-list",
            label: "제휴사 목록",
            href: "/alliance/management",
          },
          {
            key: "member",
            label: "가입자 내역",
            href: "/alliance/member",
          },
          {
            key: "sales",
            label: "매출 내역",
            href: "/alliance/sales",
          },
        ],
      },
    ],
  },
  {
    key: "policies",
    label: "정책 관리",
    icon: Settings,
    children: [
      {
        key: "algorithm",
        label: "알고리즘 설정",
        href: "/policies/algorithm",
      },
      {
        key: "delivery-fee",
        label: "배송비 정책",
        href: "/policies/delivery-fee",
      },
      {
        key: "coupon",
        label: "쿠폰 정책",
        href: "/policies/coupon",
      },
      {
        key: "discount",
        label: "할인 정책",
        href: "/policies/discount",
      },
      {
        key: "orderDeadline",
        label: "주문 마감일 정책",
        href: "/policies/order-deadline",
      },
    ],
  },
];
