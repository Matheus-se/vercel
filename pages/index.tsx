import Head from "next/head";
import ExampleWrapper from "./example-wrapper";
import ApiService from "./api/api";
import Endpoints from "../helpers/endpoints";
import { GetStaticProps } from "next";
import Link from 'next/link';

const endpoints = Endpoints;

export default function Home({ user }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <ExampleWrapper userName='matheus-se'/> */}
      <ul>
        {user.map((data) => (
          <li key={data.id}>
            <Link href={data.name}>{data.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await ApiService.get(
    endpoints.getUser + "matheus-se" + "/repos"
  );
  const data = await response.data;

  return {
    props: {
      user: data,
    },

    revalidate: 10
  };
};
