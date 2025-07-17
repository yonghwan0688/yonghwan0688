import ThemeProvider from "../contexts/ThemeContext";
import LanguageProvider from "../contexts/LanguageContext";
import Header from "../components/Header";
import Content from "../components/content";

export default function ThemeTest() {
  return (
    <div>
      <h2>테마테스트</h2>
      <ThemeProvider>
        <LanguageProvider>
          <Header />
          <Content />
        </LanguageProvider>
      </ThemeProvider>
    </div>
  );
}
