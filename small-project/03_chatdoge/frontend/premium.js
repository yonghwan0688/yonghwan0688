// 프리미엄 기능 관리
class PremiumManager {
  constructor() {
    this.plans = {
      free: {
        name: "무료",
        price: 0,
        features: ["일일 5회 운세 상담", "기본 운세 분석", "광고 포함"],
        limits: { daily: 5 },
      },
      premium: {
        name: "프리미엄",
        price: 9900,
        features: [
          "무제한 운세 상담",
          "상세한 사주 분석",
          "개인 맞춤 조언",
          "광고 없음",
          "운세 히스토리",
        ],
        limits: { daily: Infinity },
      },
    };
  }

  isPremiumUser() {
    const premium = localStorage.getItem("chatdoge_premium");
    if (!premium) return false;

    const premiumData = JSON.parse(premium);
    return premiumData.expiresAt > Date.now();
  }

  showPremiumModal() {
    if (document.getElementById("premium-modal")) return;

    const modal = document.createElement("div");
    modal.id = "premium-modal";
    modal.className = "premium-modal";
    modal.innerHTML = `
      <div class="premium-modal-content">
        <div class="premium-header">
          <h2>🌟 프리미엄으로 업그레이드</h2>
          <button class="close-modal" onclick="this.closest('.premium-modal').remove()">×</button>
        </div>
        
        <div class="premium-plans">
          <div class="plan free-plan">
            <h3>무료 플랜</h3>
            <div class="price">₩0</div>
            <ul>
              ${this.plans.free.features.map((f) => `<li>${f}</li>`).join("")}
            </ul>
            <div class="current-plan">현재 플랜</div>
          </div>
          
          <div class="plan premium-plan highlighted">
            <div class="popular-badge">인기</div>
            <h3>프리미엄 플랜</h3>
            <div class="price">₩${this.plans.premium.price.toLocaleString()}<span>/월</span></div>
            <ul>
              ${this.plans.premium.features
                .map((f) => `<li>✅ ${f}</li>`)
                .join("")}
            </ul>
            <button class="upgrade-btn" onclick="window.PremiumManager.handleUpgrade()">
              지금 업그레이드
            </button>
            <div class="guarantee">7일 무료 체험 • 언제든 취소 가능</div>
          </div>
        </div>
        
        <div class="premium-benefits">
          <h3>프리미엄 혜택</h3>
          <div class="benefits-grid">
            <div class="benefit">
              <i class="fas fa-infinity"></i>
              <span>무제한 이용</span>
            </div>
            <div class="benefit">
              <i class="fas fa-star"></i>
              <span>고급 분석</span>
            </div>
            <div class="benefit">
              <i class="fas fa-ad"></i>
              <span>광고 없음</span>
            </div>
            <div class="benefit">
              <i class="fas fa-history"></i>
              <span>히스토리 저장</span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // 애널리틱스 추적
    if (window.Analytics) {
      window.Analytics.trackEvent(
        "premium_modal_shown",
        "conversion",
        "upgrade_prompt"
      );
    }
  }

  handleUpgrade() {
    // 실제 결제 시스템 연동 (Stripe, Toss 등)
    if (window.Analytics) {
      window.Analytics.trackEvent(
        "upgrade_clicked",
        "conversion",
        "premium_purchase_intent"
      );
    }

    alert(
      "🚧 결제 시스템 준비 중입니다!\n\n곧 프리미엄 서비스를 만나보실 수 있어요. 조금만 기다려주세요! 😊"
    );

    // 임시로 7일 프리미엄 체험 제공
    this.grantPremiumTrial();
  }

  grantPremiumTrial() {
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7일 후
    const premiumData = {
      plan: "premium_trial",
      expiresAt: expiresAt,
      grantedAt: Date.now(),
    };

    localStorage.setItem("chatdoge_premium", JSON.stringify(premiumData));

    // 모달 닫기
    const modal = document.getElementById("premium-modal");
    if (modal) modal.remove();

    // 성공 메시지
    this.showSuccessMessage();

    if (window.Analytics) {
      window.Analytics.trackConversion("premium_trial_granted", 1);
    }
  }

  showSuccessMessage() {
    const message = document.createElement("div");
    message.className = "success-message";
    message.innerHTML = `
      <div class="success-content">
        <i class="fas fa-check-circle"></i>
        <h3>🎉 프리미엄 체험 시작!</h3>
        <p>7일간 모든 프리미엄 기능을 무료로 이용하실 수 있어요!</p>
        <button onclick="this.parentElement.parentElement.remove()">확인</button>
      </div>
    `;

    document.body.appendChild(message);

    setTimeout(() => {
      if (message.parentElement) {
        message.remove();
      }
    }, 5000);
  }

  getRemainingTrialDays() {
    if (!this.isPremiumUser()) return 0;

    const premium = JSON.parse(localStorage.getItem("chatdoge_premium"));
    const remaining = premium.expiresAt - Date.now();
    return Math.ceil(remaining / (24 * 60 * 60 * 1000));
  }
}

// 전역 인스턴스 생성
window.PremiumManager = new PremiumManager();
