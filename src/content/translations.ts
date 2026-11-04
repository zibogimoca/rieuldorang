/** 번역은 이 파일에서 관리합니다. 건물을 추가하면 영어 제목도 함께 등록하세요. */
export type Locale = "ko" | "en";

export const translations = {
  ko: {
    skip: "본문으로 건너뛰기",
    menu: "주 메뉴",
    projects: "프로젝트",
    news: "소식",
    contact: "문의",
    eyebrow: "리을도랑 건축사사무소",
    description: "창의적, 다름, 시대를 초월한 가치",
    notice:
      "구조·디자인 검토용 시안 — 원본 순서를 유지하고 일부 자료만 사용했습니다.",
    recent: "최근 프로젝트",
    all: "모든 프로젝트",
    more: "자세히 보기",
    projectLink: "프로젝트 보기",
    principal: "대표 건축가",
    aboutLink: "리을도랑 소개",
    language: "언어 선택",
    principalText:
      "리을도랑은 기존의 관념을 넘어서는 시선으로 설계에 접근합니다. 창의성은 익숙한 틀을 단순히 부정하는 것이 아니라, 그것을 바라보는 방식을 새롭게 정의하는 데서 비롯된다고 믿습니다.",
    projectNames: {
      "ara-o-wall-house": "아라오월 주택",
      "oad-hotel": "OAD 호텔",
      "who-owns-the-space": "공간의 주인은 누구인가?",
      "aphae-de-sel": "아페드셀",
      "dorang-de-ville": "도랑드빌레",
      maemisong: "매미성 카페",
      "sea-essay": "씨에세이",
    } as Record<string, string>,
    newsNames: { "architecture-of-survival": "생존의 건축" } as Record<
      string,
      string
    >,
  },
  en: {
    skip: "Skip to content",
    menu: "Main navigation",
    projects: "Projects",
    news: "News",
    contact: "Contact",
    eyebrow: "RIEULDORANG ARCHITECTS",
    description: "Creative, Different, and Timeless",
    notice:
      "Design & structure study — selected original content, in its original order.",
    recent: "Recent Projects",
    all: "All Projects",
    more: "Read more",
    projectLink: "Explore project",
    principal: "Principal Architect",
    aboutLink: "About us",
    language: "Choose language",
    principalText:
      "Rieuldorang approaches design from a perspective that extends beyond conventional notions. We believe that creativity does not arise from simply rejecting familiar frameworks, but from redefining the way we perceive them.",
    projectNames: {
      "ara-o-wall-house": "Ara O Wall House",
      "oad-hotel": "OAD Hotel",
      "who-owns-the-space": "Who Owns the Space?",
      "aphae-de-sel": "Aphae de Sel",
      "dorang-de-ville": "Dorang de Ville",
      maemisong: "Maemiseong Cafe",
      "sea-essay": "Sea Essay",
    } as Record<string, string>,
    newsNames: {
      "architecture-of-survival": "The Architecture of Survival",
    } as Record<string, string>,
  },
};
