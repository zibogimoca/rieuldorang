import type { Building } from "../types/content";

/** 원본 홈페이지 순서. 현재 시안은 앞의 두 프로젝트만 표시합니다. */
export const buildings: Building[] = [
  {
    id: "ara-o-wall-house",
    name: "아라오월 주택",
    category: "01 / PROJECT",
    summary: "Ara O Wall House",
    description: "프로젝트 상세 내용은 기존 사이트에서 확인할 수 있습니다.",
    image: {
      src: "/images/buildings/ara-o-wall-house.jpg",
      alt: "아라오월 주택 건축 사진",
    },
    href: "https://www.rieuldorang.com/ara-o-wall-house",
    published: true,
  },
  {
    id: "oad-hotel",
    name: "OAD 호텔",
    category: "02 / PROJECT",
    summary: "OAD Hotel",
    description: "프로젝트 상세 내용은 기존 사이트에서 확인할 수 있습니다.",
    image: {
      src: "/images/buildings/oad-hotel.jpg",
      alt: "OAD 호텔 건축 사진",
    },
    href: "https://www.rieuldorang.com/oad-hotel",
    published: true,
  },
];
