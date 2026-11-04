# 건물과 소개 자료 추가 방법

## 건물 추가

1. 사용 권한을 확인한 사진을 `public/images/buildings/`에 넣습니다. 파일명은 `garden-house-exterior.webp`처럼 영문 소문자와 하이픈을 사용하세요. 웹용으로 압축하고 원본 대용량 파일은 별도 보관합니다.
2. `src/content/buildings.ts`의 배열 끝에 다음 항목을 추가합니다. 쉼표를 빠뜨리지 마세요.

```ts
{
  id: 'garden-house', // 기존 항목과 겹치지 않는 고유 이름
  name: '실제 건물 이름',
  category: '공간',
  summary: '목록에 보이는 한 문장 소개입니다.',
  description: '상세 설명입니다. 확인된 건물 특징과 배경을 작성하세요.',
  image: {
    src: '/images/buildings/garden-house-exterior.webp',
    alt: '사진에 실제로 보이는 건물 외관을 설명하세요.',
  },
  href: 'https://www.rieuldorang.com/원본-프로젝트-경로', // 상세 페이지 링크 (선택)
  published: true,
},
```

3. `npm run build`를 실행하고 개발 화면에서 사진과 설명을 확인합니다. 배열 순서가 표시 순서입니다.

사진이 없으면 `image` 필드를 생략하세요. 기본 그래픽을 표시합니다. `src`에 `public/`을 넣지 않습니다. `published: false`는 목록에서 숨기지만 **보안을 제공하지 않습니다**. 비공개 자료는 코드나 public 폴더에 넣지 마세요. 삭제할 때는 항목을 지우고 다른 곳에서 쓰지 않는 사진만 제거합니다.

## 소개 추가

`src/content/about.ts`의 `introductions` 배열에 항목을 추가합니다.

```ts
{
  id: 'our-process',
  title: '우리가 공간을 만드는 과정',
  paragraphs: [
    '첫 번째 문단입니다.',
    '두 번째 문단입니다. 문단마다 배열 항목을 나누세요.',
  ],
},
```

배열 순서대로 제목과 문단이 표시됩니다. HTML이나 Markdown은 해석하지 않고 글자로 표시합니다. `image: { src, alt }`와 `href`를 선택적으로 추가할 수 있습니다.

`id`는 사이트 전체에서 고유하게 작성하며 `main`, `spaces`, `about`, `news`는 사용하지 않습니다.

## 뉴스 추가

`src/content/news.ts` 배열에 고유한 `id`, `title`, `image: { src, alt }`, `href`를 추가합니다. 사진은 `public/images/news/`에 보관합니다. 원본 순서를 유지하고 이관 상태를 `docs/content-inventory.md`에 갱신합니다.

## 한국어·영어 번역

기본 언어는 한국어입니다. 상단 KO / EN 버튼으로 전환하며 `?lang=en` 주소로 영어 버전을 직접 열 수 있습니다. `src/content/translations.ts`의 `ko`와 `en`에 메뉴·소개·버튼 문구를 함께 관리합니다. 건물을 추가하면 두 언어의 `projectNames`에 건물 id와 제목을, 뉴스를 추가하면 `newsNames`에 id와 제목을 함께 등록하세요. 번역이 없으면 원본 제목이 표시되므로 공개 전 두 언어를 모두 확인합니다. 한국어 대표 소개와 뉴스 제목은 원문을 바탕으로 한 번역 초안이므로 검토가 필요합니다.

## 로고와 파비콘

`public/images/logo.png`를 사이트 상단 로고와 브라우저 탭 아이콘에서 함께 사용합니다. 로고를 교체할 때는 이 파일의 사용 권한을 확인하고 같은 이름의 PNG로 바꾼 뒤 브라우저 캐시를 새로고침해 확인하세요.

## 공통 문구 수정

`src/content/site.ts`에서 이름, 메인 문구, 설명을 바꿉니다. 실제 자료 검토가 끝나면 `notice`의 준비 안내도 수정하세요. 검색 결과에 쓰이는 제목과 설명은 `index.html`에서 함께 변경합니다. 연락처, 위치, 방문 시간은 사실을 확인한 뒤 필요한 데이터 필드와 화면을 추가하세요.

## 공개 전 확인

- 원본 목록과 비교해 이관 대상과 두 언어의 번역을 확인했나요?
- 이름·설명·사진의 저작권과 공개 동의를 확인했나요?
- 이미지 경로와 대체 텍스트가 올바른가요?
- 모바일 화면과 상세 설명을 확인했나요?
- `npm run build`가 성공했나요?

## 건물 상세 페이지 추가

1. `src/content/pages/`에 영문 경로를 파일명으로 하는 JSON을 추가합니다. `text` 배열은 원본 순서대로 한글 제목, 영문 제목, 건물 정보, 본문을 넣습니다. `images` 배열에는 `file`(이미지 폴더 내부 경로), `alt`(대체 텍스트), `source`(원본 파일 식별자)를 기록합니다. 기존 JSON을 참고하세요.
2. 사진을 `public/images/pages/건물-경로/`에 보관하고 JSON의 `file`에 `건물-경로/01.jpg`처럼 적습니다. `file`은 실제 파일과 대소문자까지 같아야 합니다.
3. 프로젝트 목록에서 보이도록 `src/content/project-index.ts`의 `projectIndex`에 경로와 목록에서 나타날 `subtitle`을 추가합니다. `thumbnailId`를 생략하면 상세 페이지의 첫 사진을 대표 사진으로 사용합니다. 홈페이지 최근 프로젝트에도 표시하려면 `src/content/buildings.ts`와 `src/content/translations.ts`에도 항목을 추가합니다.
4. `npm run build` 후 `dist/건물-경로/index.html`이 생성되는지, 프로젝트 목록에서 들어가기와 새로고침이 되는지 확인합니다. 원본 자료를 자동 수집하는 스크립트는 관리용 보조 도구이며 일반 자료 추가에는 필요하지 않습니다.
