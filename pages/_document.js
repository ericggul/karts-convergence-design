import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
          {/* Primary Meta Tags */}
          <title>한예종 컨버전스 디자인 | K-Arts Convergence Design 3</title>
          <meta name="title" content="한예종 컨버전스 디자인 | K-Arts Convergence Design 3" />
          <meta name="description" content="한국예술종합학교(Korea National University of Arts) 인터랙션디자인과 컨버전스 디자인 3 과목 Next.js 기반 웹 코딩 프로젝트 과제 모음. 교수자: 최정윤 (Jeanyoon Choi)" />
          <meta name="keywords" content="한예종, K-Arts, 한국예술종합학교, Korea National University of Arts, 융합예술, 컨버전스 디자인, Convergence Design, 인터랙션 디자인, 포트폴리오, 웹 디자인, 최정윤, Jeanyoon Choi" />
          <meta name="author" content="K-Arts Convergence Design Students" />
          <meta name="robots" content="index, follow" />
          <meta name="language" content="Korean" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://karts-convergence-design.vercel.app/" />
          <meta property="og:title" content="한예종 컨버전스 디자인 | K-Arts Convergence Design 3" />
          <meta property="og:description" content="한국예술종합학교(Korea National University of Arts) 인터랙션디자인과 컨버전스 디자인 3 과목 Next.js 기반 웹 코딩 프로젝트 과제 모음. 교수자: 최정윤 (Jeanyoon Choi)" />
          <meta property="og:image" content="https://karts-convergence-design.vercel.app/og-image.jpg" />
          <meta property="og:site_name" content="K-Arts Convergence Design" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:locale:alternate" content="en_US" />
          
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://karts-convergence-design.vercel.app/" />
          <meta property="twitter:title" content="한예종 컨버전스 디자인 | K-Arts Convergence Design 3" />
          <meta property="twitter:description" content="한국예술종합학교(Korea National University of Arts) 인터랙션디자인과 컨버전스 디자인 3 과목 Next.js 기반 웹 코딩 프로젝트 과제 모음. 교수자: 최정윤 (Jeanyoon Choi)" />
          <meta property="twitter:image" content="https://karts-convergence-design.vercel.app/og-image.jpg" />
          
          {/* Favicon and Icons */}
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          
          {/* Theme and App */}
          <meta name="theme-color" content="#000000" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          
          {/* Preconnect for Performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          
          {/* Schema.org structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                "name": "한국예술종합학교 융합예술과",
                "alternateName": "Korea National University of Arts - Convergence Design",
                "url": "https://karts-convergence-design.vercel.app",
                "description": "한국예술종합학교 인터랙션디자인과 컨버전스 디자인 3 과목 Next.js 기반 웹 코딩 프로젝트 과제 모음. 교수자: 최정윤 (Jeanyoon Choi)",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "KR",
                  "addressLocality": "서울특별시",
                  "addressRegion": "서초구"
                },
                "sameAs": [
                  "https://www.karts.ac.kr"
                ]
              })
            }}
          />
          
          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-60T946XN3E"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-60T946XN3E');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
