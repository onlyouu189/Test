# 지뢰찾기 웹앱

브라우저에서 바로 플레이할 수 있는 초보자용 지뢰찾기 게임입니다.

## 설치해야 하나요?

아니요. 게임을 하는 것만이라면 따로 설치할 것은 없습니다.

## 내 컴퓨터에서 바로 열기

가장 쉬운 방법은 아래 순서입니다.

1. 이 프로젝트 폴더를 엽니다.
2. `index.html` 파일을 더블 클릭합니다.
3. 브라우저가 열리면 바로 지뢰찾기를 플레이합니다.

터미널 사용이 괜찮다면 아래 방법도 가능합니다.

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

그 다음 브라우저에서 아래 주소로 접속합니다.

```text
http://127.0.0.1:4173/index.html
```

## 친구에게 보낼 수 있는 진짜 웹 링크 만들기

`index.html`을 더블 클릭하는 방법은 내 컴퓨터에서만 열립니다. 친구에게 보낼 수 있는 인터넷 링크가 필요하면 GitHub에 올리고 GitHub Pages를 켜야 합니다.

추가 프로그램 설치는 필요 없습니다. 아래 순서대로 GitHub 웹사이트에서 진행하면 됩니다.

### 1단계: GitHub 계정 만들기

1. 브라우저에서 `https://github.com`에 접속합니다.
2. 계정이 없다면 **Sign up**을 눌러 가입합니다.
3. 계정이 있다면 **Sign in**을 눌러 로그인합니다.

### 2단계: 새 저장소 만들기

1. GitHub 오른쪽 위의 **+** 버튼을 누릅니다.
2. **New repository**를 누릅니다.
3. **Repository name**에 원하는 이름을 적습니다. 예: `minesweeper`
4. 공개 링크로 친구에게 보여줄 예정이면 **Public**을 선택합니다.
5. **Create repository**를 누릅니다.

### 3단계: 파일 올리기

1. 새로 만든 저장소 화면에서 **uploading an existing file** 또는 **Add file → Upload files**를 누릅니다.
2. 이 프로젝트의 파일과 폴더를 올립니다.
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `.github/workflows/pages.yml`
3. 아래쪽의 **Commit changes** 버튼을 누릅니다.

### 4단계: GitHub Pages 켜기

1. 저장소 화면 위쪽의 **Settings**를 누릅니다.
2. 왼쪽 메뉴에서 **Pages**를 누릅니다.
3. **Build and deployment** 영역에서 **Source**를 **GitHub Actions**로 선택합니다.
4. 저장소 위쪽의 **Actions** 탭을 누릅니다.
5. `Deploy Minesweeper to GitHub Pages` 작업이 초록색 체크로 끝날 때까지 기다립니다.

### 5단계: 링크 확인하기

작업이 성공하면 보통 아래 같은 주소로 접속할 수 있습니다.

```text
https://<GitHub사용자명>.github.io/<저장소이름>/
```

예를 들어 GitHub 사용자명이 `myname`, 저장소 이름이 `minesweeper`라면 링크는 보통 아래처럼 됩니다.

```text
https://myname.github.io/minesweeper/
```

그 링크를 친구에게 보내면 친구도 브라우저에서 지뢰찾기를 플레이할 수 있습니다.

> 제가 이 환경에서 직접 GitHub 계정을 만들거나 사용자님의 저장소에 파일을 올릴 수는 없습니다. 현재 이 프로젝트에는 GitHub 원격 저장소 주소도 연결되어 있지 않습니다. 대신 GitHub에 올리기만 하면 자동으로 웹 링크가 만들어지도록 설정 파일은 이미 준비해 두었습니다.

## 게임 방법

- 왼쪽 클릭: 칸 열기
- 오른쪽 클릭: 깃발 꽂기/해제
- 모바일 길게 누르기: 깃발 꽂기/해제
- 모든 안전한 칸을 열면 승리합니다.
