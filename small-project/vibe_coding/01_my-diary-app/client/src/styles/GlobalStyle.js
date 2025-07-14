// 🎨 전역 스타일 정의
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  // 링크 스타일
  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  // 버튼 기본 스타일 리셋
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  // 입력 요소 기본 스타일
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: none;
    outline: none;
  }

  // 스크롤바 스타일
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.light};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.dark};
    }
  }

  // 선택 텍스트 스타일
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  // 이미지 기본 스타일
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  // 제목 태그 기본 스타일
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.3;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  h1 {
    font-size: 2.5rem;
    ${({ theme }) => theme.media.mobile} {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 2rem;
    ${({ theme }) => theme.media.mobile} {
      font-size: 1.75rem;
    }
  }

  h3 {
    font-size: 1.5rem;
    ${({ theme }) => theme.media.mobile} {
      font-size: 1.375rem;
    }
  }

  // 문단 기본 스타일
  p {
    margin-bottom: 1rem;
  }

  // 목록 기본 스타일
  ul, ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.25rem;
  }

  // 인용문 스타일
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: ${({ theme }) => theme.colors.gray};
  }

  // 코드 블록 스타일
  pre {
    background-color: ${({ theme }) => theme.colors.light};
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    margin: 1rem 0;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  }

  code {
    background-color: ${({ theme }) => theme.colors.light};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }

  pre code {
    background: none;
    padding: 0;
  }

  // 구분선 스타일
  hr {
    border: none;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.border};
    margin: 2rem 0;
  }

  // 테이블 스타일
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  th, td {
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 0.75rem;
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.colors.light};
    font-weight: 600;
  }

  // 포커스 스타일
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  // 애니메이션 클래스
  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }

  .slide-up {
    animation: slideUp 0.3s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default GlobalStyle;
