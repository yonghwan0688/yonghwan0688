import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 모든 요청 로깅
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get("/fortuneTell", async (req, res) => {
  console.log("Fortune tell request received");
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "간단히 인사해주세요",
        },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 50,
    });

    const fortune = completion.choices[0].message.content;
    res.json({ fortune });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("챗도지 서버가 실행 중입니다!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
