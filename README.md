# 리을도랑 웹사이트

건물·공간과 소개 자료를 데이터 파일로 관리하는 반응형 사이트입니다. 현재는 원본 홈페이지의 프로젝트 7개, 대표 소개, 뉴스 1개를 사용하는 구조 확인용 시안입니다. 전체 이관 대상은 [원본 자료 목록](docs/content-inventory.md)에 기록했습니다.

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

환경변수, 데이터베이스, 외부 API 없이 동작합니다. 실제 공개 전에는 남은 콘텐츠 이관과 운영 정보 확인이 필요합니다.
