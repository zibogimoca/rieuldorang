export interface NewsItem {
  id: string;
  title: string;
  image?: { src: string; alt: string };
  href: string;
  body?: { ko: string; en: string };
}

/** 원본 홈페이지에서 나타나는 순서입니다. */
export const news: NewsItem[] = [
  { id: 'architecture-of-survival', title: 'The Architecture of Survival', image: { src: '/images/news/architecture-of-survival.png', alt: 'The Architecture of Survival' }, href: 'https://www.rieuldorang.com/news' },
  { id: 'book-publication', title: 'Book Publication', image: { src: '/images/news/book.jpg', alt: 'Book Publication' }, href: 'https://www.rieuldorang.com/news' },
  { id: 'stay-collection', title: 'The Stay Collection', image: { src: '/images/news/stay.png', alt: 'The Stay Collection' }, href: 'https://www.rieuldorang.com/stay-collection' },
  { id: 'country-house', title: '전원속의 내집', image: { src: '/images/news/house.jpg', alt: '전원속의 내집' }, href: 'https://www.rieuldorang.com/news' },
  { id: 'stay-exhibition', title: 'The Stay Collection – Special Exhibition (Extended)', href: 'https://www.rieuldorang.com/news', body: {
    ko: '리을도랑은 스테이형 프로젝트를 소개하는 ‘특별한 쉼표’ 건축가 특별전에 참여합니다. 전시는 2주 연장되어 2025년 12월 7일까지 해운대 경동제이드 2층에서 경동건설(주)와 함께 진행됩니다.',
    en: 'Rieuldorang is participating in The Stay Collection, a special architectural exhibition showcasing selected stay-type projects. The exhibition has been extended by two weeks and now runs until December 7, 2025, at Haeundae Kyungdong Jade (2F), in collaboration with Kyungdong Construction Co., Ltd.'
  } },
  { id: 'wind-house', title: '바람을 살아내는 집', image: { src: '/images/news/wind.png', alt: '바람을 살아내는 집' }, href: 'https://www.rieuldorang.com/news' },
  { id: 'young-architect', title: 'Principal Kim Seongyoul Participates in 2024 Young Architect Award Review', image: { src: '/images/news/architect.png', alt: 'Young Architect Award' }, href: 'https://www.rieuldorang.com/news' },
  { id: 'top-100', title: 'Top 100 Projects', image: { src: '/images/news/top100.jpg', alt: 'Top 100 Projects' }, href: 'https://www.rieuldorang.com/news' },
  { id: 'ordinary-architect', title: '보통의 건축가', image: { src: '/images/news/ordinary.jpg', alt: '보통의 건축가' }, href: 'https://www.rieuldorang.com/news' },
];
