import { MenuItem } from "@/types/common";
import {
  BadgeDollarSign,
  BadgePercent,
  CalendarCheck,
  ClipboardList,
  Dog,
  GalleryVertical,
  LayoutDashboard,
  MessageCircle,
  Puzzle,
  SendToBack,
  Settings,
  ShoppingBasket,
  Star,
  Users,
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
      // {
      //   key: "cancels",
      //   label: "취소 관리",
      //   href: "/sales/cancels",
      // },
      // {
      //   key: "exchanges",
      //   label: "교환 관리",
      //   href: "/sales/exchanges",
      // },
      // {
      //   key: "confirmations",
      //   label: "구매 확정",
      //   href: "/sales/confirmations",
      // },
    ],
  },
  {
    key: "product",
    label: "상품 관리",
    icon: ShoppingBasket,
    children: [
      {
        key: "general",
        label: "일반 상품 관리",
        href: "/product/general",
      },
      {
        key: "create",
        label: "일반 상품 등록",
        href: "/product/general/create",
      },
      {
        key: "recipe",
        label: "레시피 관리",
        href: "/product/recipe",
      },
      {
        key: "create",
        label: "레시피 등록",
        href: "/product/recipe/create",
      },
    ],
  },
  {
    key: "dog",
    label: "반려견 관리",
    href: "/dog",
    icon: Dog,
  },
  {
    key: "subscription",
    label: "구독 히스토리",
    href: "/subscription",
    icon: CalendarCheck,
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
        label: "최상단 배너",
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
        key: "bestReview",
        label: "베스트 리뷰",
        href: "/review/bestReview",
      },
      {
        key: "review",
        label: "리뷰",
        href: "/review",
      },
      {
        key: "create",
        label: "리뷰 생성",
        href: "/review/create",
      },
    ],
  },
  {
    key: "allianceCoupon",
    label: "제휴사 쿠폰 관리",
    icon: Puzzle,
    children: [
      {
        key: "alliance",
        label: "제휴사 관리",
        href: "/alliance",
      },
      {
        key: "coupon",
        label: "제휴사 쿠폰 내역",
        href: "/alliance/coupon",
      },
      {
        key: "create",
        label: "제휴사 쿠폰 생성",
        href: "/alliance/coupon/create",
      },
    ],
  },
  {
    key: "allianceSales",
    label: "제휴사 매출 관리",
    icon: BadgeDollarSign,
    children: [
      {
        key: "member",
        label: "제휴사 유입 가입자",
        href: "/alliance/sales/member",
      },
      {
        key: "sales",
        label: "제휴사 매출",
        href: "/alliance/sales",
      },
    ],
  },
  {
    key: "messenger",
    label: "메신저 관리",
    icon: MessageCircle,
    children: [
      {
        key: "friendTalk",
        label: "친구톡",
        href: "/messenger/friendTalk",
      },
      {
        key: "channelTalk",
        label: "채널톡",
        href: "/messenger/channelTalk",
      },
    ],
  },
  {
    key: "settings",
    label: "설정",
    icon: Settings,
    children: [
      {
        key: "algorithm",
        label: "알고리즘",
        href: "/settings/algorithm",
      },
      {
        key: "delivery",
        label: "배송 정책",
        href: "/settings/delivery",
      },
      {
        key: "coupon",
        label: "쿠폰 정책",
        href: "/settings/coupon",
      },
      {
        key: "price",
        label: "가격 정책",
        href: "/settings/price",
      },
      {
        key: "orderDeadline",
        label: "주문 마감일 변경",
        href: "/settings/order-deadline",
      },
    ],
  },
];
