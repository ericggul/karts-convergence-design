import Head from "next/head";
import Homepage from "../components/pages/Homepage";

export default function Home() {
  return (
    <>
      <Head>
        <title>한예종 컨버전스 디자인 | K-Arts Convergence Design 3</title>
        <meta 
          name="description" 
          content="한국예술종합학교(Korea National University of Arts) 인터랙션디자인과 컨버전스 디자인과목 프로젝트 아카이브. Cursor AI와 Next.js를 통해 구현된 창의적인 웹 디자인 프로젝트를 소개합니다. 교수자: 최정윤." 
        />
        <meta property="og:title" content="한예종 컨버전스 디자인 | K-Arts Convergence Design 3" />
        <meta property="og:description" content="한국예술종합학교(Korea National University of Arts) 인터랙션디자인과 컨버전스 디자인과목 프로젝트 아카이브. Cursor AI와 Next.js를 통해 구현된 창의적인 웹 디자인 프로젝트를 소개합니다. 교수자: 최정윤." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karts-convergence-design.vercel.app/" />
        <link rel="canonical" href="https://karts-convergence-design.vercel.app/" />
      </Head>
      <Homepage />
    </>
  );
}
