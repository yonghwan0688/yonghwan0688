# CORS 정책과 웹 보안 기본 개념

이 문서는 CORS를 아주 쉽게 설명합니다. 어려운 말은 최대한 빼고, 꼭 필요한 포인트만 담았습니다.

## 한눈에 보기

- 브라우저는 “같은 출처”만 자유롭게 요청합니다. 다른 출처면 기본적으로 막아요.
- 서버가 “허용할게요”라고 알려주면, 브라우저가 그때 통과시킵니다. 이것이 CORS입니다.
- 사전 확인(Preflight)은 “이 요청 보내도 되나요?”라고 먼저 물어보는 OPTIONS 요청입니다.

## 출처(Origin)란?

- 구성: 프로토콜 + 호스트 + 포트
  - 예) https://example.com:443
- 같은 출처 예시
  - https://example.com:443 와 https://example.com:443 → 같음
- 다른 출처 예시
  - http://example.com (http) vs https://example.com (https)
  - https://api.example.com (서브도메인 다름)
  - https://example.com:3000 (포트 다름)

## 동일 출처 정책(Same-Origin Policy)

- 브라우저 보안 규칙: 다른 출처로의 민감한 접근을 기본 차단
- 그래서 프론트(웹)에서 다른 출처의 서버로 요청할 때, 그냥은 안 되고 “허용” 표시가 필요합니다.

## CORS란?

- Cross-Origin Resource Sharing의 줄임말
- 서버가 응답 헤더로 “이 출처는 허용해요”라고 알려주는 방식
- 브라우저는 이 응답을 보고, 결과를 프론트에 넘길지 말지 결정합니다.

## 어떻게 동작할까?

1. 간단 요청(Simple Request)

- 주로 GET/POST(특정 단순 헤더만 포함)일 때
- 브라우저가 요청에 Origin 헤더를 붙임 → 서버는 응답에 허용 헤더를 넣어줌
- 핵심 응답 헤더: Access-Control-Allow-Origin

2. 사전 확인 요청(Preflight, OPTIONS)

- 아래 조건 중 하나라도 해당하면, 먼저 OPTIONS로 “허락?”을 물어봅니다.
  - 메서드가 GET/POST/HEAD 이외(예: PUT/DELETE)
  - Content-Type이 application/json 등 단순 타입이 아님
  - 커스텀 헤더 사용(예: X-Token 등)
- 서버가 허용 범위를 응답하면, 그 다음에 실제 요청을 보냅니다.

## 자주 보는 CORS 헤더 (핵심만)

- 요청(Request)
  - Origin: 요청을 보낸 웹의 출처
- 응답(Response)
  - Access-Control-Allow-Origin: 허용할 출처 (예: https://example.com 또는 \*)
  - Access-Control-Allow-Methods: 허용할 메서드 목록 (예: GET, POST, PUT)
  - Access-Control-Allow-Headers: 허용할 요청 헤더 목록
  - Access-Control-Max-Age: Preflight 결과를 캐시할 시간(초)
  - Access-Control-Allow-Credentials: 인증정보(쿠키 등) 포함 허용 여부(true/false)
  - Vary: Origin 헤더에 따라 응답 달라짐을 표시(캐시 안전성)

## 쿠키/인증과 CORS

- 쿠키를 함께 보내려면 양쪽 설정이 맞아야 합니다.
  - 프론트: fetch(..., { credentials: 'include' }) 또는 XHR withCredentials = true
  - 서버: Access-Control-Allow-Credentials: true
  - 주의: 이 경우 Access-Control-Allow-Origin에 \*를 쓸 수 없습니다. 정확한 출처를 써야 합니다.

## 개발 중 자주 만나는 오류와 팁

- “No 'Access-Control-Allow-Origin' header” → 서버가 허용 헤더를 안 보냄
- Preflight(OPTIONS)가 404/405 → 서버가 OPTIONS 라우트를 처리하지 않음
- Allow-Origin에 여러 값을 콤마로 나열 → 잘못된 설정 (요청 Origin 하나만 정확히 지정하거나 동적으로 설정)
- http/https 섞임 → 프로토콜이 달라 다른 출처가 됩니다

## 서버에서 간단 설정 예

- Node/Express
  - 라이브러리 사용: cors 미들웨어
  - 예) origin: 'http://localhost:3000', credentials: true
- Nginx (개념)
  - OPTIONS 요청 허용 + Access-Control-\* 헤더 추가
  - 실제 운영에서는 허용 출처를 명확히 제한하세요(와일드카드 남용 금지)

## CORS는 만능 보안이 아님

- CORS는 “브라우저가 다른 출처 응답을 사용할 수 있는지”를 결정하는 규칙입니다.
- 인증/인가(로그인, 권한 체크)는 여전히 서버 로직으로 따로 해야 합니다.

## 웹 보안 기본 개념(아주 짧게)

- CSRF: 사용자가 모르는 사이 다른 사이트로 요청 보내기
  - 대책: SameSite 쿠키, CSRF 토큰
- XSS: 악성 스크립트를 페이지에 삽입
  - 대책: 입력 검증, 출력 인코딩, CSP 설정
- HTTPS: 통신 암호화(도청/변조 방지)
- CSP: 스크립트/리소스 출처를 제한하는 보안 헤더

## 체크리스트

- 프론트
  - 요청이 진짜 다른 출처인가? (프로토콜/호스트/포트 확인)
  - 쿠키가 필요하면 credentials 설정을 했는가?
- 백엔드
  - Access-Control-Allow-Origin을 정확히 설정했는가? (와일드카드 남용 금지)
  - OPTIONS(Preflight) 라우트가 응답하는가?
  - 필요한 메서드/헤더만 좁게 허용했는가?

---

핵심 요약: “다른 출처면 브라우저가 막는다 → 서버가 CORS 헤더로 허용을 알려준다 → 필요하면 Preflight로 먼저 묻는다.” 이것만 기억하면 됩니다.
