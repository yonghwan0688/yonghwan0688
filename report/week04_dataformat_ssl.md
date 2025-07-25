# 📁 데이터 교환 포맷 및 보안 통신 이해하기

## 🔍 JSON, XML, YAML 비교

### 📝 간단 요약

컴퓨터들이 서로 정보를 주고받을 때 사용하는 3가지 언어입니다!

---

### 📊 JSON (제이슨)

> **"컴퓨터들이 가장 많이 쓰는 간단한 언어"**

**🎯 특징**

- 웹사이트와 앱에서 가장 많이 사용
- 읽기 쉽고 간단함

**👍 좋은 점**

- ✅ 사람이 읽기 쉬움
- ✅ 빠르게 처리됨
- ✅ 대부분의 프로그램에서 사용 가능

**👎 아쉬운 점**

- ❌ 메모(주석)를 쓸 수 없음
- ❌ 복잡한 정보는 정리하기 어려움

---

### 🏷️ XML (엑스엠엘)

> **"복잡한 정보도 정리할 수 있는 언어"**

**🎯 특징**

- 복잡한 데이터를 체계적으로 정리
- 문서나 설정 파일에 주로 사용

**👍 좋은 점**

- ✅ 복잡한 구조도 표현 가능
- ✅ 추가 정보(메타데이터)도 함께 저장
- ✅ 다양한 분야에서 활용

**👎 아쉬운 점**

- ❌ 문법이 복잡함
- ❌ 파일 크기가 큼
- ❌ 처리 속도가 느림

---

### 📋 YAML (야믈)

> **"사람이 읽기 가장 편한 언어"**

**🎯 특징**

- 사람이 읽기 쉽게 만들어짐
- 설정 파일에 주로 사용

**👍 좋은 점**

- ✅ 가장 읽기 쉬움
- ✅ 들여쓰기로 구조 표현
- ✅ 설정 파일 작성에 최적

**👎 아쉬운 점**

- ❌ 사용하는 곳이 적음
- ❌ 복잡해지면 느려짐

---

## 🔐 HTTPS와 SSL 인증서

### 🌐 HTTPS란?

> **"인터넷에서 안전하게 정보를 주고받는 방법"**

**🛡️ 왜 필요할까?**

- 개인정보(비밀번호, 카드번호)를 안전하게 보호
- 나쁜 사람들이 정보를 훔쳐보지 못하게 함
- 웹사이트가 진짜인지 확인

**🎯 주요 기능**

- 🔒 **암호화**: 정보를 암호로 바꿔서 전송
- 🛡️ **보안**: 해커들이 정보를 못 훔치게 함
- ✅ **신뢰**: 안전한 사이트라는 것을 알려줌
- 🔍 **검색 우선**: 구글에서 더 잘 검색됨

---

### 🏆 SSL 인증서란?

> **"웹사이트의 신분증"**

**📋 SSL 인증서가 하는 일**

1. **신분 확인**: "이 웹사이트는 진짜예요!"
2. **정보 암호화**: "여러분의 정보를 암호로 바꿔서 보내요!"
3. **신뢰 표시**: "브라우저에 🔒 자물쇠 표시를 보여줘요!"

**🏷️ SSL 인증서 종류**
| 종류 | 설명 | 확인 범위 |
|------|------|-----------|
| **DV** | 기본형 | 도메인만 확인 |
| **OV** | 향상형 | 도메인 + 회사 정보 |
| **EV** | 최고급형 | 모든 것을 자세히 확인 |

**⚖️ 법적 의무**

- 개인정보를 다루는 모든 웹사이트는 SSL 인증서가 필요해요!
- 안 하면 벌금을 내야 해요 💰

---

## 🎯 핵심 정리

### 📊 데이터 포맷 선택 가이드

- **JSON**: 웹사이트/앱 개발할 때
- **XML**: 복잡한 문서나 데이터 정리할 때
- **YAML**: 설정 파일 만들 때

### 🔐 웹 보안 필수사항

- **HTTPS**: 모든 웹사이트의 기본
- **SSL 인증서**: 웹사이트의 신분증
- **정기 갱신**: 1년마다 새로 발급받기

> 💡 **기억하세요!** 인터넷에서 개인정보를 입력할 때는 항상 주소창에 🔒 자물쇠 표시가 있는지 확인하세요!
