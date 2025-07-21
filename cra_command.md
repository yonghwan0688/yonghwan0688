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

<!-- tailwind.config.js -->

/** @type {import('tailwindcss').Config} \*/
module.exports = {
content: ["./src/**/\*.{js,jsx,ts,tsx}"],
theme: {
extend: {},
},
plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
};

<!-- postcss.config.js -->

module.exports = {
plugins: {
tailwindcss: {},
autoprefixer: {},
},
}

<!-- src/index.tsx -->

import "@fontsource/material-icons";

<!-- 깃허브 초기세팅 -->

mkdir my-first-repo
cd my-first-repo
git init
git config --global user.name "학생이름"
git config --global user.email "학생이메일"
touch index.html
