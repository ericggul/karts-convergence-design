import Head from "next/head";
import Homepage from "../components/pages/Homepage";

export default function Home() {
  return (
    <>
      <Head>
        <title>K-Arts Convergence Design Archive</title>
        <meta 
          name="description" 
          content="Portfolio archive for Convergence Design students at K-Arts Interaction Design Department" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Homepage />
    </>
  );
}
