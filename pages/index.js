import Head from "next/head";
import Homepage from "../components/pages/Homepage";

export default function Home() {
  return (
    <>
      <Head>
        <title>한예종 컨버젼스 디자인 | K-Arts Convergence Design 3</title>
        <meta 
          name="description" 
          content="한국예술종합학교(Korea National University of Arts) 인터랙션디자인과 융합예술 포트폴리오 아카이브. 최고 수준의 웹 디자인 프로젝트들을 전시합니다." 
        />
        <meta property="og:title" content="한예종 컨버젼스 디자인 | K-Arts Convergence Design 3" />
        <meta property="og:description" content="한국예술종합학교(Korea National University of Arts) 인터랙션디자인과 융합예술 포트폴리오 아카이브. 최고 수준의 웹 디자인 프로젝트들을 전시합니다." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karts-convergence-design.vercel.app/" />
        <link rel="canonical" href="https://karts-convergence-design.vercel.app/" />
      </Head>
      <Homepage />
    </>
  );
}
