import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";
import serverless from "serverless-http";

dotenv.config();

const app = express();

// OpenAI 클라이언트 초기화 (API 키가 있는 경우에만)
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
} else {
  console.log(
    "⚠️ OPENAI_API_KEY가 설정되지 않았습니다. 데모 모드로 실행됩니다."
  );
}
let corsOptions = {
  origin: [
    "https://chatdoge-yonghwan0688.pages.dev",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API 비용 및 보안 제어 설정
const API_COST_CONTROL = {
  maxDailyRequests: 50, // 일일 최대 요청 수 (현실적 시작)
  maxMonthlyRequests: 1000, // 월간 최대 요청 수 (월 1,000회)
  maxDailyCost: 1000, // 일일 최대 비용 1,000원
  maxMonthlyCost: 20000, // 월간 최대 비용 2만원 (안전)
  avgCostPerRequest: 15, // 요청당 평균 비용 (원)
  emergencyStopEnabled: true, // 긴급 중단 기능
};

// 사용량 추적을 위한 저장소
const usageTracker = {
  daily: new Map(), // date -> { requests: number, cost: number }
  monthly: new Map(), // month -> { requests: number, cost: number }
  lastReset: {
    daily: new Date().toDateString(),
    monthly: new Date().toISOString().slice(0, 7), // YYYY-MM
  },
};

// 요청 제한 미들웨어 (rate limiting)
const requestCounts = new Map();
const RATE_LIMIT = 10; // 분당 요청 제한
const RATE_WINDOW = 60 * 1000; // 1분

// API 비용 제어 미들웨어
const costControlMiddleware = (req, res, next) => {
  const today = new Date().toDateString();
  const currentMonth = new Date().toISOString().slice(0, 7);

  // 일일/월간 데이터 초기화
  if (usageTracker.lastReset.daily !== today) {
    usageTracker.daily.clear();
    usageTracker.lastReset.daily = today;
  }

  if (usageTracker.lastReset.monthly !== currentMonth) {
    usageTracker.monthly.clear();
    usageTracker.lastReset.monthly = currentMonth;
  }

  // 현재 사용량 확인
  const dailyUsage = usageTracker.daily.get(today) || { requests: 0, cost: 0 };
  const monthlyUsage = usageTracker.monthly.get(currentMonth) || {
    requests: 0,
    cost: 0,
  };

  // 긴급 중단 체크
  if (API_COST_CONTROL.emergencyStopEnabled) {
    if (dailyUsage.requests >= API_COST_CONTROL.maxDailyRequests) {
      return res.status(429).json({
        error: "일일 API 사용 한도에 도달했습니다. 내일 다시 시도해주세요.",
        code: "DAILY_LIMIT_EXCEEDED",
      });
    }

    if (monthlyUsage.requests >= API_COST_CONTROL.maxMonthlyRequests) {
      return res.status(429).json({
        error:
          "월간 API 사용 한도에 도달했습니다. 다음 달에 다시 시도해주세요.",
        code: "MONTHLY_LIMIT_EXCEEDED",
      });
    }

    if (dailyUsage.cost >= API_COST_CONTROL.maxDailyCost) {
      return res.status(429).json({
        error: "일일 비용 한도에 도달했습니다. 서비스가 일시 중단됩니다.",
        code: "DAILY_COST_EXCEEDED",
      });
    }
  }

  // 경고 메시지 (80% 도달 시)
  if (dailyUsage.requests >= API_COST_CONTROL.maxDailyRequests * 0.8) {
    console.warn(
      `⚠️ 일일 API 사용량 80% 도달: ${dailyUsage.requests}/${API_COST_CONTROL.maxDailyRequests}`
    );
  }

  if (monthlyUsage.cost >= API_COST_CONTROL.maxMonthlyCost * 0.8) {
    console.warn(
      `⚠️ 월간 비용 80% 도달: ${monthlyUsage.cost}원/${API_COST_CONTROL.maxMonthlyCost}원`
    );
  }

  next();
};

// 사용량 추적 함수
const trackAPIUsage = (tokens = 0) => {
  const today = new Date().toDateString();
  const currentMonth = new Date().toISOString().slice(0, 7);
  const estimatedCost = API_COST_CONTROL.avgCostPerRequest;

  // 일일 사용량 업데이트
  const dailyUsage = usageTracker.daily.get(today) || { requests: 0, cost: 0 };
  dailyUsage.requests += 1;
  dailyUsage.cost += estimatedCost;
  usageTracker.daily.set(today, dailyUsage);

  // 월간 사용량 업데이트
  const monthlyUsage = usageTracker.monthly.get(currentMonth) || {
    requests: 0,
    cost: 0,
  };
  monthlyUsage.requests += 1;
  monthlyUsage.cost += estimatedCost;
  usageTracker.monthly.set(currentMonth, monthlyUsage);

  // 로깅
  console.log(
    `📊 API 사용량 - 일일: ${dailyUsage.requests}회 (${dailyUsage.cost}원), 월간: ${monthlyUsage.requests}회 (${monthlyUsage.cost}원)`
  );

  return { daily: dailyUsage, monthly: monthlyUsage };
};

const rateLimiter = (req, res, next) => {
  const clientIp = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!requestCounts.has(clientIp)) {
    requestCounts.set(clientIp, { count: 1, resetTime: now + RATE_WINDOW });
    return next();
  }

  const clientData = requestCounts.get(clientIp);

  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + RATE_WINDOW;
    return next();
  }

  if (clientData.count >= RATE_LIMIT) {
    return res.status(429).json({
      error: "너무 많은 요청입니다. 잠시 후 다시 시도해주세요.",
    });
  }

  clientData.count++;
  next();
};

// 모든 요청 로깅
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.post(
  "/fortuneTell",
  rateLimiter,
  costControlMiddleware,
  async (req, res) => {
    let { userMessages, assistantMessages, birthDate, birthTime } = req.body;

    // 입력 검증
    if (!userMessages || !Array.isArray(userMessages)) {
      return res.status(400).json({ error: "유효하지 않은 요청입니다." });
    }

    console.log("userMessages:", userMessages);
    console.log("assistantMessages:", assistantMessages);
    console.log("Fortune tell request received");

    try {
      // 시스템 프롬프트 개선
      const systemPrompt = `당신은 전문적인 운세 상담사 '챗도지'입니다. 

사용자 정보:
- 생년월일: ${birthDate || "미제공"}
- 출생시간: ${birthTime || "미제공"}
- 현재 날짜: ${new Date().toLocaleDateString("ko-KR")}

역할과 특징:
1. 따뜻하고 친근한 톤으로 대화합니다
2. 구체적이고 실용적인 조언을 제공합니다
3. 긍정적인 메시지를 포함시킵니다
4. 사용자의 고민을 공감하며 들어줍니다
5. 한국의 전통 역학과 현대적 해석을 조화롭게 활용합니다

답변 구조:
- 오늘의 운세 (종합운, 애정운, 직업운, 건강운)
- 구체적인 조언과 행동 지침
- 긍정적인 격려 메시지

항상 정중하고 전문적으로 답변해주세요.`;

      const messages = [
        {
          role: "system",
          content: systemPrompt,
        },
      ];

      // 이전 대화 내용을 messages 배열에 추가하여 대화의 맥락을 유지합니다.
      while (userMessages.length != 0 || assistantMessages.length != 0) {
        if (userMessages.length != 0) {
          const userMessage = userMessages.shift();
          messages.push({ role: "user", content: userMessage });
        }
        if (assistantMessages.length != 0) {
          const assistantMessage = assistantMessages.shift();
          messages.push({ role: "assistant", content: assistantMessage });
        }
      }

      // OpenAI API 호출 (개선된 설정)
      if (!openai) {
        // 데모 모드: 가상의 운세 메시지 반환
        const demoFortunes = [
          "🌟 오늘은 새로운 기회가 찾아올 좋은 날입니다. 긍정적인 마음가짐으로 하루를 시작해보세요!",
          "💫 연애운이 상승하고 있어요. 새로운 만남이나 기존 관계에서 좋은 변화가 있을 것 같습니다.",
          "🍀 직장에서 좋은 소식이 들려올 예정입니다. 계획했던 일들이 순조롭게 진행될 거예요.",
          "🌙 건강에 조금 더 신경 쓰시기 바랍니다. 충분한 휴식과 균형 잡힌 식단이 중요해요.",
          "✨ 재물운이 좋아 보입니다. 하지만 무리한 투자는 피하시고 신중하게 결정하세요.",
        ];

        const randomFortune =
          demoFortunes[Math.floor(Math.random() * demoFortunes.length)];
        const fortune = `${randomFortune}\n\n🔮 챗도지 데모 버전입니다. 더 정확한 운세를 원하신다면 프리미엄 버전을 이용해보세요!`;

        // 실제 API 응답처럼 약간의 지연 추가
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 데모 모드에서도 사용량 추적 (테스트용)
        trackAPIUsage(0);

        res.json({ fortune });
        return;
      }

      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-4o-mini", // 더 효율적이고 저렴한 모델
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });

      const fortune = completion.choices[0].message.content;

      // 응답 로깅 및 사용량 추적
      const usage = trackAPIUsage(completion.usage?.total_tokens);
      console.log(
        `✅ 응답 생성 완료. 토큰 사용량: ${completion.usage?.total_tokens || "unknown"}. 일일 누적: ${usage.daily.requests}회`
      );

      res.json({ fortune });
    } catch (error) {
      console.error("Error:", error.message);

      // 더 구체적인 에러 처리
      if (error.code === "insufficient_quota") {
        res.status(503).json({
          error: "서비스 사용량이 초과되었습니다. 잠시 후 다시 시도해주세요.",
        });
      } else if (error.code === "rate_limit_exceeded") {
        res
          .status(429)
          .json({ error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." });
      } else {
        res.status(500).json({
          error: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
      }
    }
  }
);

// 사용량 통계 확인 엔드포인트 (관리자용)
app.get("/admin/usage", (req, res) => {
  const today = new Date().toDateString();
  const currentMonth = new Date().toISOString().slice(0, 7);

  const dailyUsage = usageTracker.daily.get(today) || { requests: 0, cost: 0 };
  const monthlyUsage = usageTracker.monthly.get(currentMonth) || {
    requests: 0,
    cost: 0,
  };

  res.json({
    daily: {
      ...dailyUsage,
      percentage: (
        (dailyUsage.requests / API_COST_CONTROL.maxDailyRequests) *
        100
      ).toFixed(1),
    },
    monthly: {
      ...monthlyUsage,
      percentage: (
        (monthlyUsage.requests / API_COST_CONTROL.maxMonthlyRequests) *
        100
      ).toFixed(1),
    },
    limits: API_COST_CONTROL,
    lastReset: usageTracker.lastReset,
  });
});

// 건강 체크 엔드포인트
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// 프리미엄 기능을 위한 엔드포인트 (추후 구현)
app.post("/premium-fortune", rateLimiter, async (req, res) => {
  // 프리미엄 사용자를 위한 더 상세한 운세
  res.status(501).json({ error: "프리미엄 기능은 곧 출시될 예정입니다." });
});

// Serverless 핸들러
export const handler = serverless(app);

// 로컬 개발용 서버
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 챗도지 백엔드 서버가 포트 ${PORT}에서 실행 중입니다!`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`🔮 운세 상담 준비 완료!`);
  });
}
