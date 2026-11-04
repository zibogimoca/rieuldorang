# 폴더 구조

```text
src/
  main.ts                 페이지 조립과 내비게이션
  components/             재사용하는 화면 요소
    motion.ts             등장·사진·커서·스크롤 진행 효과
    dom.ts                안전한 DOM 생성
    building-list.ts      건물 카드와 상세 설명
  content/                운영자가 주로 수정하는 자료
    site.ts               사이트 이름·메인 문구·준비 안내
    buildings.ts          건물과 공간 목록
    about.ts              소개 자료
    news.ts               뉴스 자료
    translations.ts       한국어·영어 문구
  types/content.ts        콘텐츠 필드와 타입
  styles/main.css         반응형 스타일
  styles/motion.css       모션과 언어 버튼 스타일
public/images/
  logo.png                사이트 로고 및 파비콘 (기존 사이트)
  buildings/              건물별 사진
  about/                  소개용 이미지
  news/                   뉴스 이미지
docs/                     구조·규칙·운영·작성 안내
```

소개 항목은 선택적인 `image`와 `href`를 지원합니다. 뉴스 이미지는 `public/images/news/`에 넣고 `src/content/news.ts`에 등록합니다. 원본 순서와 남은 자료는 `docs/content-inventory.md`에서 관리합니다.

데이터 흐름은 `content → components → main.ts`입니다. 건물 추가 시 화면 코드를 수정하지 않습니다. 새 기능이 생기면 해당 역할의 컴포넌트를 만들고 `main.ts`에서는 조립만 합니다. 서버나 관리자 기능이 필요해질 때 별도 설계를 진행하며, 지금은 외부 서비스에 의존하지 않습니다.
