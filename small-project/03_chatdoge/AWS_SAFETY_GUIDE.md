# AWS 과금 방지 안전 가이드 🛡️

## 1. 비용 알림 설정 (필수!)

```
AWS Console → Billing → Budgets
- 예산: $1 설정
- 알림: 80%, 100% 초과 시 이메일 발송
```

## 2. 무료 티어 모니터링

```
AWS Console → Billing → Free Tier
- 실시간 사용량 확인
- 무료 한도 초과 예상 시 알림
```

## 3. 리소스 자동 종료 설정

```javascript
// Lambda 함수에 타임아웃 설정
exports.handler = async (event) => {
  // 최대 실행 시간: 30초로 제한
  const timeout = setTimeout(() => {
    throw new Error("Function timeout");
  }, 30000);

  try {
    // 실제 로직...
    return response;
  } finally {
    clearTimeout(timeout);
  }
};
```

## 4. 개발 환경별 분리

```
✅ 로컬 개발: localhost (무료)
✅ 스테이징: AWS 무료 티어
✅ 프로덕션: 필요시에만 활성화
```

## 5. 일일 체크리스트

- [ ] 사용하지 않는 EC2 인스턴스 종료
- [ ] Lambda 함수 실행 횟수 확인
- [ ] S3 불필요한 파일 삭제
- [ ] 비용 대시보드 확인

## 6. 긴급 상황 대응

```
과금 발생 시 즉시 조치:
1. 모든 리소스 일시 중단
2. AWS Support 문의
3. 무료 티어 한도 재확인
```

## 7. 시험 준비용 최소 구성

```
ChatDoge 프로젝트 → AWS 서비스 매핑
├── Frontend (S3) → 무료 5GB
├── Backend (Lambda) → 무료 100만 요청
├── API (API Gateway) → 무료 100만 호출
└── Database (DynamoDB) → 무료 25GB
```

> 💡 **팁**: 시험 합격 후 불필요한 리소스는 즉시 삭제하세요!
