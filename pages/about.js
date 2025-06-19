import Head from "next/head";
import About from "../components/pages/About";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | 한예종 컨버전스 디자인 | K-Arts Convergence Design 3</title>
        <meta 
          name="description" 
          content="한국예술종합학교 융합예술과 컨버전스 디자인 III 과정 소개. 현대 디지털 미디어와 인터랙티브 디자인의 최전선에서 창조하는 9개의 혁신적인 웹 디자인 프로젝트들." 
        />
        <meta property="og:title" content="About | 한예종 컨버전스 디자인 | K-Arts Convergence Design 3" />
        <meta property="og:description" content="한국예술종합학교 융합예술과 컨버전스 디자인 III 과정 소개. 현대 디지털 미디어와 인터랙티브 디자인의 최전선에서 창조하는 9개의 혁신적인 웹 디자인 프로젝트들." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karts-convergence-design.vercel.app/about" />
        <link rel="canonical" href="https://karts-convergence-design.vercel.app/about" />
      </Head>
      <About />
    </>
  );
} 