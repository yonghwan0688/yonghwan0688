# 음식 추천 웹앱 - Copilot 지침

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## 프로젝트 개요

이 프로젝트는 귀찮은 현대인들의 "점심/저녁 뭐먹지?" 고민을 해결하는 React 기반 웹앱입니다.

## 핵심 기능

- BFS/DFS 알고리즘을 사용한 음식점 추천 시스템
- 지도 API (카카오맵) 연동으로 주변 음식점 표시
- 날씨 API 연동으로 날씨에 맞는 음식 추천
- 사용자 위치 기반 맞춤 추천
- DB 없이 로컬 JSON 데이터 활용

## 기술 스택

- React 18 with TypeScript
- Create React App (CRA)
- 카카오맵 API
- OpenWeatherMap API
- CSS Modules 또는 Styled Components

## 개발 가이드라인

1. TypeScript를 적극 활용하여 타입 안정성 확보
2. 컴포넌트는 함수형으로 작성
3. React Hooks 사용 (useState, useEffect, useCallback 등)
4. BFS/DFS 알고리즘은 별도 유틸리티 함수로 분리
5. API 호출은 커스텀 훅으로 추상화
6. 반응형 디자인 적용
7. 에러 핸들링 및 로딩 상태 관리

## 폴더 구조

```
src/
  components/     # 재사용 가능한 컴포넌트
  pages/         # 페이지 컴포넌트
  hooks/         # 커스텀 훅
  utils/         # 유틸리티 함수 (알고리즘 포함)
  types/         # TypeScript 타입 정의
  data/          # 로컬 JSON 데이터
  styles/        # 스타일 파일
```

## 주의사항

- API 키는 환경변수로 관리
- 사용자 위치 정보 사용 시 권한 요청
- 모바일 퍼스트 접근 방식
- 접근성(a11y) 고려
