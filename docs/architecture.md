# 폴더 구조

```text
src/
  main.ts                 페이지 조립과 내비게이션
  components/             재사용하는 화면 요소
    intro.ts              원본 인트로 슬라이더
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
  intro/                  원본 인트로 슬라이더 사진
  about/                  소개용 이미지
  news/                   뉴스 이미지
docs/                     구조·규칙·운영·작성 안내
```

소개 항목은 선택적인 `image`와 `href`를 지원합니다. 뉴스 이미지는 `public/images/news/`에 넣고 `src/content/news.ts`에 등록합니다. 원본 순서와 남은 자료는 `docs/content-inventory.md`에서 관리합니다.

데이터 흐름은 `content → components → main.ts`입니다. 건물 추가 시 화면 코드를 수정하지 않습니다. 새 기능이 생기면 해당 역할의 컴포넌트를 만들고 `main.ts`에서는 조립만 합니다. 서버나 관리자 기능이 필요해질 때 별도 설계를 진행하며, 지금은 외부 서비스에 의존하지 않습니다.

## 원본 페이지 자료

- `src/content/pages/`: 원본 페이지별 텍스트와 사진 목록. 파일명은 원본 페이지 경로와 같습니다.
- `public/images/pages/<페이지 경로>/`: 원본 페이지 사진. 중복 사진은 한 번만 보관하고 JSON의 `file`이 실제 위치를 가리킵니다. 각 파일의 `source`는 원본 이미지 식별자입니다.
- `src/components/page.ts`: 프로젝트 목록·상세·소개·뉴스·문의 페이지 화면.
- `scripts/import-original-pages.py`: 수집한 원본 HTML에서 페이지 JSON을 만드는 도구.
- `scripts/download-original-images.py`: JSON에 기록된 원본 사진을 내려받는 도구.

원본 HTML은 별도 수집해야 하며 가져온 페이지는 공개 사이트 자료를 기준으로 합니다. 새 건물은 JSON과 이미지, 프로젝트 목록 연결을 함께 추가하고 `npm run build` 후 해당 경로를 직접 열어 확인합니다. 원본 자료의 사용 권한은 게시 전에 확인합니다.
