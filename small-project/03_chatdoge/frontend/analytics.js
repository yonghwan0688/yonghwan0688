// 구글 애널리틱스 설정
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

// 이벤트 추적 함수들
const Analytics = {
  trackEvent: (eventName, eventCategory, eventLabel) => {
    if (typeof gtag !== "undefined") {
      gtag("event", eventName, {
        event_category: eventCategory,
        event_label: eventLabel,
      });
    }
    console.log(`Analytics: ${eventName} - ${eventCategory} - ${eventLabel}`);
  },

  trackPageView: (pageName) => {
    if (typeof gtag !== "undefined") {
      gtag("config", "GA_MEASUREMENT_ID", {
        page_title: pageName,
        page_location: window.location.href,
      });
    }
    console.log(`Page View: ${pageName}`);
  },

  trackConversion: (conversionType, value) => {
    if (typeof gtag !== "undefined") {
      gtag("event", "conversion", {
        event_category: "engagement",
        event_label: conversionType,
        value: value,
      });
    }
    console.log(`Conversion: ${conversionType} - ${value}`);
  },
};

// 사용자 행동 분석
const UserBehavior = {
  sessionStart: Date.now(),
  messageCount: 0,

  trackSession: () => {
    const sessionTime = Date.now() - UserBehavior.sessionStart;
    Analytics.trackEvent(
      "session_duration",
      "engagement",
      Math.floor(sessionTime / 1000)
    );
  },

  trackMessageSent: () => {
    UserBehavior.messageCount++;
    Analytics.trackEvent(
      "message_sent",
      "interaction",
      UserBehavior.messageCount
    );

    // 특정 메시지 수에서 프리미엄 유도
    if (UserBehavior.messageCount === 3) {
      Analytics.trackConversion("premium_prompt_shown", 1);
    }
  },
};

// 페이지 종료 시 세션 추적
window.addEventListener("beforeunload", () => {
  UserBehavior.trackSession();
});

// 전역으로 내보내기
window.Analytics = Analytics;
window.UserBehavior = UserBehavior;
