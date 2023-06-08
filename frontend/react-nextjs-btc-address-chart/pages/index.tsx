import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import LineChart from "../components/LineChart";
import { useEffect, useState } from "react";
import { APIData, Filters } from "../types";
import Spinner from "../components/Spinner";

export default function Home() {
  const [data, setData] = useState({} as APIData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch("http://localhost:3000/api/btc-addresses")
        .then(async (response) => {
          const walletData: APIData = await response.json();
          setData(walletData);
          setIsLoading(false);
        })
        .catch((e) => {
          console.error(e);
        });
    };

    fetchData();
  }, []);

  return (
    <Layout home>
      <Head>
        <title>BTC Address Balances over Time</title>
      </Head>
      <section>
        <div className="max-w-2xl mx-auto p-8 text-center">
          {isLoading && <Spinner />}
          {!isLoading && <LineChart apiData={data} />}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
