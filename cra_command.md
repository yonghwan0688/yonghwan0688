<!-- 기본명령 -->

npx create-react-app my-app --template typescript
cd my-app

<!-- # 폰트 및 유틸리티 설치 -->

npm install chance luxon @fontsource/material-icons
npm install -D @types/chance @types/luxon

<!-- # TailwindCSS v4 및 DaisyUI 구성 -->

npm install -D tailwindcss@3.4.17 postcss autoprefixer @tailwindcss/postcss daisyui@4.12.12 @tailwindcss/line-clamp

<!-- 비고
postcss.config.js
tailwind.config.js
위 두 파일을 복사하면 이전 프로젝트의 버전을 맞출 수 있음.  -->

<!-- index.css 상단에 넣기-->

@tailwind base;
@tailwind components;
@tailwind utilities;
