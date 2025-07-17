import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";

export default function Content() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeContext not found");

  const { theme } = context;

  const languageContext = useContext(LanguageContext);
  if (!languageContext) throw new Error("LanguageContext not found");

  const { language } = languageContext;

  return (
    <main
      style={{
        backgroundColor: theme === "light" ? "#f0f0f0" : "#222",
        color: theme === "light" ? "#333" : "#fff",
        padding: "1rem",
      }}
    >
      <p>현재테마: {theme}</p>
      <p>현재언어: {language}</p>
    </main>
  );
}
