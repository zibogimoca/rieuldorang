# 리을도랑 웹사이트

건물·공간과 소개 자료를 데이터 파일로 관리하는 반응형 사이트입니다. 원본의 인트로·홈페이지와 프로젝트 목록 및 상세·소개·뉴스·문의 등 23개 페이지를 재구현합니다. 원본과의 세부 화면 및 동작 대조는 진행 중입니다. 전체 이관 대상은 [원본 자료 목록](docs/content-inventory.md)에 기록했습니다.

## 실행

Node.js 22.12 이상(현재 검증 환경: 24), npm이 필요합니다.

```sh
npm ci
npm run dev
```

`npm run build`는 타입 검사와 배포 파일 생성을 수행합니다. 결과는 `dist/`입니다. `npm run preview`로 빌드 결과를 확인할 수 있습니다.

## 문서

- [폴더 구조](docs/architecture.md)
- [개발 규칙](docs/development-rules.md)
- [건물·소개 자료 추가 방법](docs/content-guide.md)
- [콘텐츠·운영 정책](docs/policies.md)

환경변수와 데이터베이스는 필요하지 않습니다. 원본 영문 글꼴은 Wix 서버에서 불러오며 일부 뉴스 항목은 원본 외부 기사로 연결됩니다.
