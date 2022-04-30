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
        {pokemons.map((pokemon) => {
          return (
            <a key={pokemon.id} href={`pokemon/${pokemon.name}`}>
              <p>
                <strong>{pokemon.number}</strong>
              </p>
              <p>
                <strong>{pokemon.name}</strong>
              </p>
              <img src={pokemon.image} />
            </a>
          );
        })}
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
      query pokemons {
        pokemons(first: 10) {
          id
          number
          name
          image
        }
      }
    `,
  });
  return {
    props: {
      pokemons: data.pokemons,
    },
  };
}
