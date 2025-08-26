# AWS Lambda 이미지 최적화 서비스 트러블슈팅 가이드

## 프로젝트 개요

S3에 이미지 업로드 시 자동으로 최적화된 이미지를 생성하는 서버리스 애플리케이션

## 발생한 문제들과 해결 과정

### 1. Sharp 모듈 Linux 런타임 오류

#### 문제 상황

```
Error: Could not load the "sharp" module using the linux-x64 runtime
Possible solutions:
- Ensure optional dependencies can be installed:
    npm install --include=optional sharp
- Ensure your package manager supports multi-platform installation:
- Add platform-specific dependencies:
    npm install --os=linux --cpu=x64 sharp
```

#### 원인

- macOS에서 개발하면서 Darwin용 Sharp 바이너리가 설치됨
- AWS Lambda는 Linux 환경에서 실행되므로 Linux용 바이너리가 필요

#### 해결 방법

1. **package.json에 Linux용 Sharp 의존성 추가**

```json
{
  "dependencies": {
    "sharp": "^0.32.6"
  },
  "optionalDependencies": {
    "@img/sharp-linux-x64": "^0.32.6"
  }
}
```

2. **기존 node_modules 삭제 후 재설치**

```bash
rm -rf node_modules package-lock.json
npm install --platform=linux --arch=x64 sharp
npm install
```

3. **serverless.yml에 패키지 최적화 설정**

```yaml
package:
  patterns:
    - "!node_modules/sharp/vendor/8.*"
    - "!node_modules/sharp/vendor/lib"
    - "node_modules/sharp/lib/**"
    - "node_modules/sharp/vendor/**"
```

### 2. Serverless Plugin 오류

#### 문제 상황

```
ServerlessError2: Serverless plugin "serverless-plugin-optimize" not found
```

#### 원인

- 존재하지 않는 플러그인을 serverless.yml에 설정

#### 해결 방법

serverless.yml에서 해당 플러그인 설정 제거:

```yaml
# 제거된 부분
# plugins:
#   - serverless-plugin-optimize
#
# custom:
#   optimize:
#     external: ["sharp"]
```

### 3. AWS SDK 모듈 오류

#### 문제 상황

```
Runtime.ImportModuleError: Error: Cannot find module 'aws-sdk'
```

#### 원인

- Node.js 20 런타임에서는 AWS SDK v2가 기본 제공되지 않음
- AWS SDK v3 사용이 권장됨

#### 해결 방법

1. **AWS SDK v3 설치**

```bash
npm install @aws-sdk/client-s3
```

2. **handler.js 코드 수정**

**Before (AWS SDK v2):**

```javascript
const AWS = require("aws-sdk");
const S3 = new AWS.S3();

// 사용법
const originalImage = await S3.getObject({
  Bucket: srcBucket,
  Key: srcKey,
}).promise();

await S3.putObject({
  Bucket: destBucket,
  Key: destKey,
  Body: optimizedImage,
  ContentType: "image/jpeg",
}).promise();
```

**After (AWS SDK v3):**

```javascript
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-northeast-2",
});

// 사용법
const originalImageResponse = await s3Client.send(
  new GetObjectCommand(getObjectParams)
);
const originalImageBuffer = Buffer.concat(
  await originalImageResponse.Body.toArray()
);

await s3Client.send(new PutObjectCommand(putObjectParams));
```

### 4. NPM 캐시 권한 문제

#### 문제 상황

```
Your cache folder contains root-owned files, due to a bug in
previous versions of npm which has since been addressed.
```

#### 해결 방법

```bash
sudo chown -R $(whoami) "/Users/yonghwanjin/.npm"
```

## 최종 아키텍처

### S3 버킷 구조

- **업로드 버킷**: `photo-optimize-students17-upload-bucket-dev-{accountId}`
- **최적화 버킷**: `photo-optimize-students17-optimized-bucket-dev-{accountId}`

### Lambda 함수 설정

- **런타임**: Node.js 20.x
- **메모리**: 1024 MB
- **타임아웃**: 10초
- **트리거**: S3 업로드 이벤트 (s3:ObjectCreated:\*)

### 이미지 최적화 설정

- **리사이즈**: 800x600 픽셀
- **포맷**: JPEG
- **품질**: 80%
- **출력 파일명**: `optimized-{원본파일명}`

## 테스트 결과

### 성공적인 배포 확인

```bash
sls deploy
# ✔ Service deployed to stack photo-optimize-students17-dev (25s)
# functions:
#   optimize: photo-optimize-students17-dev-654654611599-optimize (13 MB)
```

### 이미지 최적화 테스트

```bash
# 이미지 업로드
aws s3 cp test-image.jpeg s3://photo-optimize-students17-upload-bucket-dev-654654611599/

# 최적화된 이미지 확인
aws s3 ls s3://photo-optimize-students17-optimized-bucket-dev-654654611599/
# 2025-08-26 18:33:53      43587 optimized-test-image.jpeg
```

## 학습한 핵심 포인트

1. **크로스 플랫폼 의존성 관리**: macOS에서 개발할 때 Linux용 바이너리 설치의 중요성
2. **AWS SDK 버전 호환성**: Node.js 런타임 버전에 따른 SDK 선택
3. **서버리스 패키지 최적화**: 불필요한 파일 제외로 배포 크기 최적화
4. **이벤트 기반 아키텍처**: S3 이벤트 트리거를 통한 자동화 구현

## 향후 개선 방안

1. **다양한 이미지 포맷 지원**: PNG, WebP 등
2. **동적 리사이즈**: 파일명 또는 메타데이터 기반 크기 조정
3. **에러 처리 강화**: 재시도 로직 및 Dead Letter Queue 추가
4. **모니터링**: CloudWatch 대시보드 및 알람 설정
