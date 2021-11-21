import Head from "next/head";
import { Chakra } from "../src/Chakra";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Verbs Forms</title>
      </Head>
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />
      </Chakra>
    </>
  );
}

export default MyApp;
