# GitHub Students Heroku로 AWS Practitioner 시험 준비 🎓

## Heroku 학생 혜택 활용 전략

### 📊 사용 가능한 리소스

```
GitHub Education Pack 혜택:
├── $13/월 Heroku 크레딧 (1년간)
├── 총 $156 상당 무료 사용
└── Eco Dynos로 2.6개월 연속 운영 가능
```

## 🚀 ChatDoge Heroku 배포 계획

### Phase 1: 즉시 배포 (1주)

1. **Heroku 앱 생성 및 배포**
2. **환경변수 설정** (OpenAI API Key)
3. **도메인 연결**
4. **모니터링 설정**

### Phase 2: AWS 개념 매핑 (2-3주)

1. **Heroku vs AWS 서비스 비교**
2. **클라우드 아키텍처 이해**
3. **AWS 시뮬레이터 활용**
4. **비용 최적화 학습**

### Phase 3: 시험 준비 완성 (1주)

1. **Mock 시험 풀이**
2. **실전 문제 연습**
3. **약점 보완**

## 🛠️ Heroku 배포 실습으로 배우는 AWS 개념

### 1. 컴퓨팅 서비스

```
Heroku Dynos              →    AWS 대응 서비스
├── Eco Dynos ($5/월)      →    EC2 t2.micro (무료 티어)
├── Web Process           →    Application Load Balancer
├── Worker Process        →    Lambda Functions
└── Dyno Scaling          →    Auto Scaling Groups
```

### 2. 배포 및 CI/CD

```
Heroku Git 배포           →    AWS 대응 서비스
├── git push heroku main  →    CodeCommit + CodePipeline
├── 자동 빌드              →    CodeBuild
├── 즉시 배포              →    CodeDeploy
└── 롤백 기능              →    Blue/Green Deployment
```

### 3. 모니터링 및 로그

```
Heroku 기능              →    AWS 대응 서비스
├── heroku logs          →    CloudWatch Logs
├── Metrics Dashboard    →    CloudWatch Metrics
├── 알림 설정             →    CloudWatch Alarms
└── 성능 모니터링          →    X-Ray Tracing
```

### 4. 데이터베이스 및 스토리지

```
Heroku Add-ons           →    AWS 대응 서비스
├── Heroku Postgres      →    RDS (PostgreSQL)
├── Redis To Go          →    ElastiCache Redis
├── 파일 저장             →    S3 Bucket
└── 백업                 →    RDS Automated Backups
```

## 📋 시험 준비 체크리스트

### 클라우드 개념 (26%)

- [ ] **PaaS vs IaaS 이해**: Heroku(PaaS) vs EC2(IaaS) 비교
- [ ] **클라우드 경제성**: Heroku vs AWS 비용 모델 분석
- [ ] **확장성**: Dyno 스케일링 vs Auto Scaling 비교
- [ ] **가용성**: Heroku 리전 vs AWS 글로벌 인프라

### 보안 및 규정준수 (25%)

- [ ] **환경변수 관리**: Heroku Config Vars vs AWS Systems Manager
- [ ] **SSL/TLS**: Heroku 자동 SSL vs AWS Certificate Manager
- [ ] **접근 제어**: Heroku Teams vs AWS IAM
- [ ] **규정 준수**: Heroku vs AWS 보안 책임 모델

### 기술 (33%)

- [ ] **컴퓨팅**: Dynos vs EC2/Lambda 비교
- [ ] **네트워킹**: Heroku Router vs Application Load Balancer
- [ ] **스토리지**: Add-ons vs S3/EBS 비교
- [ ] **데이터베이스**: Heroku Postgres vs RDS

### 요금 및 지원 (16%)

- [ ] **요금 모델**: Heroku vs AWS 과금 방식 이해
- [ ] **무료 티어**: GitHub 혜택 vs AWS 무료 티어 비교
- [ ] **지원 플랜**: Heroku vs AWS 지원 레벨

## 🎯 실습 프로젝트: ChatDoge 완전 배포

### 1. Heroku 백엔드 배포

```bash
# Heroku CLI 설치 후
heroku create chatdoge-backend-[your-name]
heroku config:set OPENAI_API_KEY=your_key
git push heroku main
```

### 2. 프론트엔드 연결

```javascript
// script.js 업데이트
const endpoint = isProduction
  ? "https://chatdoge-backend-[your-name].herokuapp.com/fortuneTell"
  : "http://localhost:3000/fortuneTell";
```

### 3. 모니터링 설정

```bash
# 로그 확인
heroku logs --tail --app chatdoge-backend-[your-name]

# 메트릭 확인
heroku ps --app chatdoge-backend-[your-name]
```

## 💡 AWS 시험 준비 효과

1. **실제 클라우드 경험**: 이론이 아닌 실습으로 클라우드 개념 체득
2. **서비스 매핑**: Heroku 경험을 AWS 서비스로 변환하며 자연스럽게 학습
3. **비용 의식**: 실제 과금을 경험하며 AWS 비용 최적화 개념 이해
4. **운영 경험**: 모니터링, 로그 분석 등 실제 서비스 운영 경험

## 🎉 시작하기

ChatDoge를 Heroku에 배포하면서 AWS Practitioner 시험을 준비해보세요!

1. **지금 바로 Heroku CLI 설치**
2. **ChatDoge 백엔드 배포**
3. **배포 과정을 AWS 관점에서 분석**
4. **시험 문제와 연결하여 학습**

$13 크레딧으로 충분히 2개월 이상 실습할 수 있어요! 🚀
