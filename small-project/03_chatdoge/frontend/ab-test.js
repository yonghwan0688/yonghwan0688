// A/B 테스트 관리자
class ABTestManager {
  constructor() {
    this.tests = {
      welcome_message: {
        variants: ["default", "friendly", "professional"],
        current: this.getVariant("welcome_message"),
      },
      cta_button: {
        variants: ["start", "begin", "try_now"],
        current: this.getVariant("cta_button"),
      },
    };
  }

  getVariant(testName) {
    // 사용자 ID 기반으로 일관된 변형 할당
    const userId = this.getUserId();
    const hash = this.hashCode(userId + testName);
    const variants = this.tests[testName]?.variants || ["default"];
    return variants[Math.abs(hash) % variants.length];
  }

  getUserId() {
    let userId = localStorage.getItem("chatdoge_user_id");
    if (!userId) {
      userId = "user_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("chatdoge_user_id", userId);
    }
    return userId;
  }

  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // 32비트 정수로 변환
    }
    return hash;
  }

  trackConversion(testName, conversionType) {
    const variant = this.tests[testName]?.current;
    if (variant && window.Analytics) {
      window.Analytics.trackEvent(
        "ab_test_conversion",
        testName,
        `${variant}_${conversionType}`
      );
    }
  }

  getWelcomeMessage() {
    const variant = this.tests.welcome_message.current;
    const messages = {
      default: "안녕하세요! 전문 운세 상담사 챗도지입니다 ✨",
      friendly: "반가워요! 친구같은 운세 상담사 챗도지예요 😊",
      professional: "안녕하십니까. 전문 역술인 챗도지입니다 🔮",
    };
    return messages[variant] || messages.default;
  }

  getCtaButtonText() {
    const variant = this.tests.cta_button.current;
    const texts = {
      start: "운세 상담 시작하기",
      begin: "운세 보러가기",
      try_now: "지금 바로 시작",
    };
    return texts[variant] || texts.start;
  }
}

// 전역 인스턴스 생성
window.ABTest = new ABTestManager();
