# 원본 콘텐츠와 시안 범위

2026-11-04에 https://www.rieuldorang.com/ 의 공개 HTML을 확인했습니다. 처음 접근은 실패했으나 재시도에서 HTTP 200으로 확인했습니다. 홈페이지 기준 목록이며, 하위 페이지 전체 이관은 아직 진행하지 않았습니다.

## 유지할 순서

1. 헤더: Projects / News / Contact
2. CREATIVE / DIFFERENT / TIMELESS
3. Recent Projects: 영문·국문 소개 → 프로젝트 목록 → All Projects
4. Kim, Seongyoul / Principal Architect / 영문 소개 / About us
5. News
6. 푸터

원본 HTML의 반복 제목과 중복 인물명은 같은 콘텐츠의 중복 표시로 취급합니다. 원본 브라우저 화면을 대조하여 세 이미지 인트로와 프로젝트 순서를 반영했습니다. 원본의 모든 애니메이션을 그대로 재현한 것은 아닙니다. 시안에는 opacity·transform 기반의 타이포 마스크 등장, 사진 마스크·확대, 프로젝트 커서, 읽기 진행 효과를 적용합니다. 스크롤 강제 제어와 반복 움직임은 사용하지 않으며 모션 축소 설정을 존중합니다.

## 프로젝트 원본 순서

| 순서 | 제목                    | 원본 경로           | 현재 시안 |
| ---- | ----------------------- | ------------------- | --------- |
| 1    | 아라오월 주택           | /ara-o-wall-house   | 표시      |
| 2    | OAD 호텔                | /oad-hotel          | 표시      |
| 3    | 공간의 주인은 누구인가? | /who-owns-the-space | 표시      |
| 4    | 아페드셀                | /aphae-de-sel       | 표시      |
| 5    | 도랑드빌레              | /dorang-de-ville    | 표시      |
| 6    | 매미성 카페             | /maemisong          | 표시      |
| 7    | 씨에세이                | /sea-essay          | 표시      |

## 뉴스 원본 순서

1. The Architecture of Survival — 표시
2. Book Publication
3. The Stay Collection
4. 전원속의 내집
5. The Stay Collection – Special Exhibition (Extended) / 특별한 쉼표 – 건축가 특별전 (2주 연장): 영문·국문 본문 및 2025-12-07 종료일
6. 바람을 살아내는 집
7. Principal Kim Seongyoul Participates in 2024 Young Architect Award Review
8. Top 100 Projects
9. 보통의 건축가

홈페이지 뉴스 제목과 이미지, 전시 소개를 표시합니다. 전체 이관 시 제목뿐 아니라 본문·날짜·링크·사진·출처를 각 하위 페이지와 대조해야 합니다. 현재 일부 자료 사용은 구조 확인용 범위이며 전체 콘텐츠 이관 완료를 의미하지 않습니다.

## 시안 이미지 출처

원본 홈페이지의 `https://static.wixstatic.com/media/` 이미지를 사용했습니다.

- 아라오월 주택: `a965e7_5227967650974906a2dd8c4a88131c57~mv2.jpg`
- OAD 호텔: `a965e7_5f8c884273834554aaecaaa2b0136cf6~mv2.jpg`
- 로고: `a965e7_d29bb0698b3f40eebcea3c6fd55d5e51~mv2.png`
- 파비콘 및 Apple 아이콘: `a965e7_66c6925dedc94cbd8602d60a4f4fd8b0~mv2.png`
- 공간의 주인은 누구인가?: `a965e7_92f2dfb9d9ad4ae68910a6eaf4aea16f~mv2.jpg`
- 아페드셀: `a965e7_15296a0fa5494e69820dc8d8fcff0bbc~mv2.jpg`
- 도랑드빌레: `a965e7_15ec05856f154281b97dfc26234d57a7~mv2.jpg`
- 매미성 카페: `a965e7_dbe3c5497ff44033ae33e207e8262176~mv2.png`
- 씨에세이: `a965e7_dbe88140465947b09fb2c4acbef1b289~mv2.jpg`
- 대표 소개: `a965e7_0690b07580774edb935fa5ff99e24f3e~mv2.jpg`
- 뉴스: `d64a16_f4a8675cca7b417d8e5e03ca3ab1eb04~mv2.png`

상세·전체 프로젝트·문의 링크는 기존 사이트로 연결합니다. 새 상세 페이지가 만들어지면 데이터의 href를 교체합니다.
