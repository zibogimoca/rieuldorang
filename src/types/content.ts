/** 이미지 경로는 public을 제외한 /images/... 형태로 작성합니다. */
export interface Building {
  id: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  image?: { src: string; alt: string };
  published: boolean;
  href?: string;
}

export interface Introduction {
  id: string;
  title: string;
  paragraphs: string[];
  image?: { src: string; alt: string };
  href?: string;
}
