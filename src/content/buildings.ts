import type { Building } from "../types/content";

/** 원본 홈페이지 순서. 홈페이지에 표시된 프로젝트 일곱 개를 원본 순서대로 관리합니다. */
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
  {
    id: "who-owns-the-space", name: "공간의 주인은 누구인가?", category: "03 / PROJECT", summary: "", description: "", image: { src: "/images/buildings/who-owns-the-space.jpg", alt: "공간의 주인은 누구인가? 건축 사진" }, href: "https://www.rieuldorang.com/who-owns-the-space", published: true,
  },
  {
    id: "aphae-de-sel", name: "아페드셀", category: "04 / PROJECT", summary: "", description: "", image: { src: "/images/buildings/aphae-de-sel.jpg", alt: "아페드셀 건축 사진" }, href: "https://www.rieuldorang.com/aphae-de-sel", published: true,
  },
  {
    id: "dorang-de-ville", name: "도랑드빌레", category: "05 / PROJECT", summary: "", description: "", image: { src: "/images/buildings/dorang-de-ville.jpg", alt: "도랑드빌레 건축 사진" }, href: "https://www.rieuldorang.com/dorang-de-ville", published: true,
  },
  {
    id: "maemisong", name: "매미성 카페", category: "06 / PROJECT", summary: "", description: "", image: { src: "/images/buildings/maemisong.png", alt: "매미성 카페 건축 사진" }, href: "https://www.rieuldorang.com/maemisong", published: true,
  },
  {
    id: "sea-essay", name: "씨에세이", category: "07 / PROJECT", summary: "", description: "", image: { src: "/images/buildings/sea-essay.jpg", alt: "씨에세이 건축 사진" }, href: "https://www.rieuldorang.com/sea-essay", published: true,
  },
];
