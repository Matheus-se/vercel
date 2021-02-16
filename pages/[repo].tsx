import Endpoints from "../helpers/endpoints";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ApiService from "./api/api";

const endpoints = Endpoints;

export default function Repo({ user, lang }) {
  const { query } = useRouter();

  return (
    <div>
      <img src={user.owner.avatar_url} width={100} height={100} />
      <p>{user.owner.login}</p>
      <p>{query.repo}</p>
      <ul>
        Languages
        {Object.keys(lang).map((lang) => (
          <li>{lang}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await ApiService.get(
    endpoints.getUser + "matheus-se/" + "repos"
  );
  const data = await response.data;

  const paths = data.map((x) => {
    return { params: { repo: x.name } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { repo } = ctx.params;

  const response = await ApiService.get(
    endpoints.getRepo + "matheus-se/" + repo
  );
  const data = await response.data;

  const responseLanguages = await ApiService.get(
    endpoints.getRepo + "matheus-se/" + repo + "/languages"
  );
  const dataLanguages = await responseLanguages.data;

  return {
    props: {
      user: data,
      lang: dataLanguages,
    },

    // revalidate: 10
  };
};
