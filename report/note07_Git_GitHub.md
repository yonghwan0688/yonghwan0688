# Git & GitHub 완전 정복 가이드

## 목차

1. [Git이란 무엇인가?](#1-git이란-무엇인가)
2. [Git 기본 개념](#2-git-기본-개념)
3. [Git 설치 및 설정](#3-git-설치-및-설정)
4. [Git 기본 명령어](#4-git-기본-명령어)
5. [브랜치와 병합](#5-브랜치와-병합)
6. [GitHub 활용하기](#6-github-활용하기)
7. [협업하기](#7-협업하기)
8. [Git 고급 기능](#8-git-고급-기능)
9. [실전 워크플로우](#9-실전-워크플로우)
10. [팁과 모범 사례](#10-팁과-모범-사례)
11. [학습 로드맵](#11-학습-로드맵)

---

## 1. Git이란 무엇인가?

### 🎯 Git의 정의

**Git**은 분산 버전 관리 시스템입니다. 파일의 변경 사항을 추적하고, 여러 개발자가 협업할 수 있게 도와줍니다.

### 📚 비유로 이해하기

```
Git = 문서의 '변경 내역' + '백업' + '협업 도구'

예시:
- 문서 작성 → 저장 → 수정 → 저장 → 수정...
- Git: 모든 변경사항을 기록하고 언제든 이전 버전으로 돌아갈 수 있음
```

### ✨ Git의 장점

- **버전 관리**: 모든 변경사항 추적
- **협업**: 여러 개발자가 동시 작업 가능
- **백업**: 분산 저장으로 안전함
- **브랜치**: 기능별로 분리 개발 가능

---

## 2. Git 기본 개념

### 🏗️ Git 저장소 구조

```
Working Directory (작업 디렉토리)
    ↓ git add
Staging Area (스테이징 영역)
    ↓ git commit
Repository (저장소)
    ↓ git push
Remote Repository (원격 저장소)
```

### 📋 핵심 용어

```bash
# Repository (저장소)
- 프로젝트의 모든 파일과 변경 이력을 저장하는 공간

# Commit (커밋)
- 특정 시점의 프로젝트 상태를 저장하는 것

# Branch (브랜치)
- 독립적인 개발 라인

# Merge (병합)
- 다른 브랜치의 변경사항을 현재 브랜치에 합치는 것

# Clone (클론)
- 원격 저장소를 로컬로 복사하는 것
```

---

## 3. Git 설치 및 설정

### 💻 Git 설치

```bash
# Windows
# Git 공식 웹사이트에서 다운로드
# https://git-scm.com/

# macOS (Homebrew)
brew install git

# Ubuntu/Debian
sudo apt-get install git
```

### ⚙️ 기본 설정

```bash
# 사용자 정보 설정
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 기본 에디터 설정
git config --global core.editor "code"  # VS Code

# 설정 확인
git config --list
```

---

## 4. Git 기본 명령어

### 🚀 저장소 초기화

```bash
# 새 저장소 만들기
git init

# 기존 저장소 복제하기
git clone https://github.com/username/repository.git
```

### 📁 기본 작업 흐름

```bash
# 1. 상태 확인
git status

# 2. 파일 추가 (스테이징)
git add filename.txt        # 특정 파일
git add .                   # 모든 파일
git add *.js               # 특정 확장자

# 3. 커밋하기
git commit -m "커밋 메시지"

# 4. 히스토리 확인
git log
git log --oneline          # 간단히 보기
```

### 📊 상태 확인

```bash
# 현재 상태
git status

# 변경사항 확인
git diff                   # 작업 디렉토리 vs 스테이징
git diff --staged         # 스테이징 vs 마지막 커밋

# 커밋 히스토리
git log --graph --oneline  # 그래프로 보기
```

---

## 5. 브랜치와 병합

### 🌿 브랜치 기본

```bash
# 브랜치 목록
git branch

# 새 브랜치 만들기
git branch feature-login

# 브랜치 이동
git checkout feature-login

# 브랜치 만들고 이동 (한 번에)
git checkout -b feature-signup
```

### 🔀 병합하기

```bash
# main 브랜치로 이동
git checkout main

# feature 브랜치 병합
git merge feature-login

# 브랜치 삭제
git branch -d feature-login
```

### 🎯 실전 브랜치 전략

```bash
# GitFlow 예시
main          # 배포용
develop       # 개발용
feature/*     # 기능별
hotfix/*      # 긴급 수정
release/*     # 배포 준비
```

---

## 6. GitHub 활용하기

### 🌐 원격 저장소 연결

```bash
# 원격 저장소 추가
git remote add origin https://github.com/username/repo.git

# 원격 저장소 확인
git remote -v

# 업로드 (처음)
git push -u origin main

# 업로드 (이후)
git push
```

### 📥 변경사항 가져오기

```bash
# 가져오기만 하기
git fetch

# 가져와서 병합하기
git pull

# 특정 브랜치에서
git pull origin main
```

### 🔧 GitHub 고급 기능

````markdown
# README.md 작성 예시

# 프로젝트 제목

## 설명

프로젝트에 대한 간단한 설명

## 설치 방법

```bash
npm install
```
````

## 사용 방법

```bash
npm start
```

## 기여하기

1. Fork 하기
2. 브랜치 만들기
3. 커밋하기
4. Push 하기
5. Pull Request 만들기

````

---

## 7. 협업하기

### 👥 Pull Request 워크플로우
```bash
# 1. 저장소 포크
# GitHub에서 Fork 버튼 클릭

# 2. 로컬에 클론
git clone https://github.com/yourusername/project.git

# 3. 새 브랜치 만들기
git checkout -b feature-awesome

# 4. 작업 후 커밋
git add .
git commit -m "Add awesome feature"

# 5. 푸시
git push origin feature-awesome

# 6. Pull Request 생성
# GitHub에서 Pull Request 생성
````

### 🔄 충돌 해결

```bash
# 충돌 발생 시
git merge feature-branch

# 충돌 파일 수동 편집
<<<<<<< HEAD
현재 브랜치의 내용
=======
병합하려는 브랜치의 내용
>>>>>>> feature-branch

# 충돌 해결 후
git add .
git commit -m "Resolve merge conflict"
```

---

## 8. Git 고급 기능

### 🔧 유용한 명령어

```bash
# 커밋 수정
git commit --amend

# 스테이징 취소
git reset HEAD filename

# 커밋 되돌리기
git revert HEAD

# 히스토리 정리
git rebase -i HEAD~3

# 임시 저장
git stash
git stash pop
```

### 📋 .gitignore 파일

```gitignore
# Node.js
node_modules/
npm-debug.log*

# 환경 변수
.env
.env.local

# 빌드 폴더
dist/
build/

# IDE
.vscode/
.idea/

# 운영체제
.DS_Store
Thumbs.db
```

---

## 9. 실전 워크플로우

### 🚀 개인 프로젝트

```bash
# 1. 저장소 초기화
git init
git add .
git commit -m "Initial commit"

# 2. GitHub에 업로드
git remote add origin <repository-url>
git push -u origin main

# 3. 기능 개발
git checkout -b feature-new
# 작업...
git add .
git commit -m "Add new feature"
git push origin feature-new

# 4. 메인에 병합
git checkout main
git merge feature-new
git push origin main
```

### 👥 팀 프로젝트

```bash
# 1. 프로젝트 클론
git clone <repository-url>

# 2. 최신 상태 유지
git pull origin main

# 3. 기능 브랜치 생성
git checkout -b feature/user-login

# 4. 작업 후 푸시
git push origin feature/user-login

# 5. Pull Request 생성
# GitHub에서 PR 생성 및 코드 리뷰 진행
```

---

## 10. 팁과 모범 사례

### ✅ 좋은 커밋 메시지

```bash
# 좋은 예시
git commit -m "Add user authentication feature"
git commit -m "Fix header responsive design bug"
git commit -m "Update README with installation guide"

# 나쁜 예시
git commit -m "fix"
git commit -m "update"
git commit -m "asdf"
```

### 📝 커밋 메시지 규칙

```
타입(범위): 제목

본문 (선택사항)

푸터 (선택사항)

예시:
feat(auth): add user login functionality

- Add login form component
- Implement JWT authentication
- Add login validation

Closes #123
```

### ⚠️ 주의사항

- **민감한 정보 커밋 금지** (비밀번호, API 키 등)
- **자주 커밋하기** (작은 단위로)
- **의미있는 커밋 메시지** 작성
- **브랜치 정리** (사용 완료된 브랜치 삭제)

---

## 11. 학습 로드맵

### 📚 단계별 학습

```
1주차: Git 기초
- Git 설치 및 설정
- 기본 명령어 (add, commit, push)
- 저장소 만들기

2주차: 브랜치와 병합
- 브랜치 생성/이동
- 병합하기
- 충돌 해결

3주차: GitHub 활용
- 원격 저장소 연결
- Pull Request
- 협업 기초

4주차: 고급 기능
- Rebase, Stash
- 히스토리 관리
- 워크플로우 최적화
```

### 🎯 실습 프로젝트

1. **개인 포트폴리오 사이트**: Git으로 버전 관리
2. **To-Do 앱**: 브랜치별 기능 개발
3. **팀 프로젝트**: Pull Request 워크플로우
4. **오픈소스 기여**: 실제 프로젝트에 기여하기

### 🔗 참고 자료

- [Git 공식 문서](https://git-scm.com/doc)
- [GitHub 가이드](https://guides.github.com/)
- [Learn Git Branching](https://learngitbranching.js.org/)
- [Atlassian Git 튜토리얼](https://www.atlassian.com/git/tutorials)

---

## 마무리

Git과 GitHub는 현대 개발에 필수적인 도구입니다. 처음에는 복잡해 보일 수 있지만, 꾸준히 사용하다 보면 자연스럽게 익숙해집니다.

**핵심은 자주 커밋하고, 의미있는 메시지를 작성하며, 브랜치를 활용해 안전하게 개발하는 것입니다!**

💡 **팁**: Git을 배우는 가장 좋은 방법은 실제 프로젝트에 적용해보는 것입니다. 작은 프로젝트부터 시작해서 점진적으로 고급 기능을 익혀나가세요!
