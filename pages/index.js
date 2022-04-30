import Head from "next/head";
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export default function Home({ pokemons }) {
  return (
    <div>
      <Head>
        <title>ポケモン一覧</title>
      </Head>

      <main>
        <div>
          <h1>ポケモン一覧</h1>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query GetPokemon {
        pokemon(name: "pikachu") {
          number
          name
          image
          classification
          types
          weaknesses
        }
      }
    `,
  });
  return {
    props: {
      pokemons: [],
    },
  };
}
