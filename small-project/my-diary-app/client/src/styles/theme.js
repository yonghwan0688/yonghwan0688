// 🎨 테마 설정
const theme = {
  // 색상 팔레트
  colors: {
    // 기본 색상
    primary: '#3B82F6',      // 파란색
    primaryDark: '#2563EB',  // 진한 파란색
    secondary: '#8B5CF6',    // 보라색
    success: '#10B981',      // 초록색
    warning: '#F59E0B',      // 주황색
    error: '#EF4444',        // 빨간색
    
    // 중성 색상
    white: '#FFFFFF',
    light: '#F8FAFC',        // 연한 회색
    lightGray: '#F3F4F6',    // 더 연한 회색
    gray: '#64748B',         // 회색
    dark: '#1E293B',         // 진한 회색
    black: '#000000',
    
    // 텍스트 색상
    text: '#1F2937',         // 기본 텍스트
    textLight: '#6B7280',    // 연한 텍스트
    
    // 배경 색상
    background: '#FFFFFF',
    backgroundAlt: '#F9FAFB',
    
    // 테두리 색상
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    
    // 그라데이션
    gradient: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    }
  },

  // 폰트 크기
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },

  // 폰트 굵기
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // 간격
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },

  // 둥근 모서리
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '50%',
  },

  // 그림자
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // Z-인덱스
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },

  // 브레이크포인트 (반응형)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // 미디어 쿼리
  media: {
    mobile: '@media (max-width: 767px)',
    tablet: '@media (min-width: 768px) and (max-width: 1023px)',
    desktop: '@media (min-width: 1024px)',
    large: '@media (min-width: 1280px)',
  },

  // 트랜지션
  transition: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  },

  // 컨테이너 최대 너비
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export default theme;
