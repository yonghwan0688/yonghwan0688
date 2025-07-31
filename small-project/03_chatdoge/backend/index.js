import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const cors = require("cors");
let corsOptions = {
  origin: "https://chatdoge-yonghwan0688.pages.dev",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204, // 구형 브라우저 호환성
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 모든 요청 로깅
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.post("/fortuneTell", async (req, res) => {
  // 프론트엔드에서 이전 대화 내용(userMessages, assistantMessages)을 받습니다.
  let { userMessages, assistantMessages } = req.body;

  console.log("userMessages:", userMessages);
  console.log("assistantMessages:", assistantMessages);
  console.log("Fortune tell request received");

  try {
    // OpenAI에 보낼 메시지 목록을 생성합니다.
    const messages = [
      {
        role: "system",
        content:
          "당신은 운세를 봐주는 챗봇 '챗도지'입니다. 사용자의 생년월일과 현재 날짜를 기반으로 운세를 점쳐주고, 사용자의 질문에 친절하고 재미있게 대답해주세요. 당신의 이름은 챗도지입니다.",
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

    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    const fortune = completion.choices[0].message.content;
    res.json({ fortune });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports.handler = serverless(app);

app.listen(3000);
