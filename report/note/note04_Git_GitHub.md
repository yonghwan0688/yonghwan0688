# 🐙 Git & GitHub 기초 정리

## 🎯 Git이란?

**Git = 코드 백업하고 관리하는 도구!** 💾

쉽게 말해서:

- 내 코드를 **안전하게 보관**해주는 도구예요
- 언제든지 **이전 버전으로 되돌아갈** 수 있어요
- **여러 사람이 함께** 작업할 수 있게 해줘요

### 🎮 게임 세이브로 비유하면...

```
게임 세이브 1 (레벨 1) ← Git Commit 1 (첫 번째 코드)
게임 세이브 2 (레벨 5) ← Git Commit 2 (기능 추가한 코드)
게임 세이브 3 (레벨 10) ← Git Commit 3 (버그 수정한 코드)
```

실수하면 언제든지 이전 세이브로 돌아갈 수 있어요!

---

## 🌐 GitHub란?

**GitHub = 코드를 저장하는 온라인 창고!** ☁️

쉽게 말해서:

- Git으로 관리하는 코드를 **인터넷에 저장**하는 곳
- 다른 사람들과 **코드를 공유**할 수 있어요
- **무료로 사용**할 수 있어요 (공개 프로젝트)

---

## 🚀 Git 시작하기

### Git 설치 확인

```bash
git --version
```

### 처음 설정하기 (한 번만!)

```bash
git config --global user.name "내이름"
git config --global user.email "내이메일@gmail.com"
```

---

## 📝 기본 Git 명령어

### 1. 새 저장소 만들기

```bash
cd 내프로젝트폴더
git init
```

### 2. 파일 상태 확인하기

```bash
git status
```

### 3. 파일 추가하기 (스테이지)

```bash
git add 파일명.txt        # 특정 파일만
git add .                # 모든 파일
```

### 4. 저장하기 (커밋)

```bash
git commit -m "첫 번째 커밋"
git commit -m "로그인 기능 추가"
git commit -m "버그 수정"
```

### 5. 히스토리 보기

```bash
git log                  # 자세히 보기
git log --oneline        # 간단히 보기
```

---

## 🔄 Git 워크플로우 (일하는 순서)

### 매일 하는 작업 순서

```bash
# 1. 상태 확인
git status

# 2. 변경된 파일들 추가
git add .

# 3. 메시지와 함께 저장
git commit -m "오늘 작업한 내용"

# 4. 온라인에 업로드 (나중에 배움)
git push
```

### 실제 예시

```bash
# HTML 파일을 수정했다면...
git add index.html
git commit -m "메인 페이지 디자인 수정"

# CSS 파일을 수정했다면...
git add style.css
git commit -m "버튼 색깔 변경"

# 모든 변경사항을 한 번에
git add .
git commit -m "회원가입 기능 완성"
```

---

## 🌐 GitHub 사용하기

### 1. GitHub에서 저장소 만들기

1. GitHub.com 가입
2. "New repository" 클릭
3. 저장소 이름 입력
4. "Create repository" 클릭

### 2. 로컬과 GitHub 연결하기

```bash
git remote add origin https://github.com/내아이디/내저장소.git
```

### 3. GitHub에 업로드하기

```bash
git push origin main
```

### 4. GitHub에서 다운로드하기

```bash
git pull origin main
```

---

## 📥 GitHub에서 프로젝트 받아오기

### 다른 사람 프로젝트 복사하기

```bash
git clone https://github.com/다른사람/프로젝트이름.git
```

### 내 프로젝트 다운로드하기

```bash
git clone https://github.com/내아이디/내프로젝트.git
```

---

## 🔧 자주 사용하는 명령어들

### 파일 변경 내용 보기

```bash
git diff                 # 현재 변경사항 보기
git diff 파일명          # 특정 파일 변경사항
```

### 이전 버전으로 되돌리기

```bash
git checkout 커밋ID      # 특정 커밋으로 이동
git checkout main        # 최신 버전으로 돌아오기
```

### 파일 상태 되돌리기

```bash
git restore 파일명       # 파일 변경사항 취소
git restore .            # 모든 변경사항 취소
```

---

## 🌿 브랜치 - 새로운 작업 공간

### 브랜치란?

- **메인 코드를 건드리지 않고** 새로운 기능을 만드는 공간
- 실험해도 안전해요!

### 브랜치 명령어

```bash
# 현재 브랜치 확인
git branch

# 새 브랜치 만들기
git branch 새기능

# 브랜치 이동하기
git checkout 새기능

# 브랜치 만들고 바로 이동
git checkout -b 새기능

# 메인으로 돌아가기
git checkout main

# 브랜치 합치기 (메인에서 실행)
git merge 새기능
```

---

## 🤝 협업하기

### 팀 프로젝트 순서

```bash
# 1. 프로젝트 받아오기
git clone https://github.com/팀장/프로젝트.git

# 2. 새 브랜치에서 작업
git checkout -b 내이름-기능

# 3. 작업하고 커밋
git add .
git commit -m "내가 만든 기능"

# 4. GitHub에 업로드
git push origin 내이름-기능

# 5. Pull Request 만들기 (GitHub 웹사이트에서)
```

---

## 🎯 실습해보기

### 나만의 첫 번째 저장소 만들기

```bash
# 1. 폴더 만들고 이동
mkdir 내첫프로젝트
cd 내첫프로젝트

# 2. Git 시작
git init

# 3. README 파일 만들기
echo "# 내 첫 번째 프로젝트" > README.md

# 4. 파일 추가하고 커밋
git add README.md
git commit -m "첫 번째 커밋: README 추가"

# 5. GitHub 저장소 만든 후 연결
git remote add origin https://github.com/내아이디/내첫프로젝트.git

# 6. 업로드
git push origin main
```

---

## 🎯 단계별 학습하기

### 🥉 1단계: 기초 (1주)

- [ ] Git 설치하고 설정하기
- [ ] add, commit 연습하기
- [ ] GitHub 가입하고 저장소 만들기
- [ ] push로 업로드해보기

### 🥈 2단계: 중급 (2주)

- [ ] 브랜치 만들고 사용하기
- [ ] 다른 사람 프로젝트 clone하기
- [ ] README.md 예쁘게 작성하기
- [ ] Pull Request 만들어보기

### 🥇 3단계: 고급 (3주)

- [ ] 팀 프로젝트 참여하기
- [ ] 충돌(Conflict) 해결하기
- [ ] GitHub Pages로 웹사이트 만들기

---

## 💡 꿀팁들

### ✅ 이렇게 하세요

- **자주 커밋하기** - 작은 단위로 나누어서
- **의미있는 커밋 메시지** - "버그 수정" 보다 "로그인 버튼 클릭 안 되는 문제 수정"
- **README.md 잘 쓰기** - 프로젝트 설명, 사용법 적기
- **브랜치 이름 의미있게** - "feature/login", "fix/button-bug"

### ❌ 이건 피하세요

- 커밋 메시지를 "ㅁㅁㅁ", "수정" 같이 대충 쓰기
- 너무 큰 단위로 커밋하기 (한 번에 100개 파일)
- 비밀번호, API 키 같은 민감한 정보 올리기
- 바이너리 파일 (이미지, 동영상) 너무 많이 올리기

---

## 🆘 자주 하는 실수들

### 문제: 커밋 메시지 잘못 썼어요

```bash
git commit --amend -m "올바른 메시지"
```

### 문제: 파일을 빼먹고 커밋했어요

```bash
git add 빼먹은파일.txt
git commit --amend --no-edit
```

### 문제: 잘못된 파일을 add했어요

```bash
git restore --staged 파일명
```

### 문제: GitHub 비밀번호가 안 돼요

- Personal Access Token을 사용해야 해요
- GitHub Settings → Developer settings → Personal access tokens

---

## 🌟 마무리

**Git & GitHub 핵심 3가지:**

1. 💾 **커밋** = 작업 내용을 저장하기
2. ☁️ **푸시** = GitHub에 업로드하기
3. 🌿 **브랜치** = 안전하게 새 기능 만들기

**기억하세요:**

- Git은 **개발자의 필수 도구**예요
- 처음엔 어려워도 계속 쓰다 보면 익숙해져요
- 실수해도 괜찮아요, 다시 되돌릴 수 있어요
- 포트폴리오로 GitHub를 잘 관리해보세요!

**화이팅! 🚀✨**
