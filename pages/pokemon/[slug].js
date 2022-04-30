import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import Head from "next/head";

export default function Pokemon({ pokemon }) {
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <main>
        <p>
          <strong>No. {pokemon.number}</strong>
        </p>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.image} />
        <p>
          <strong>Classification: {pokemon.classification}</strong>
        </p>
        <p>
          <strong>Types: {pokemon.types}</strong>
        </p>
        <p>
          <strong>Weaknesses: {pokemon.weaknesses}</strong>
        </p>
      </main>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app",
    cache: new InMemoryCache(),
  });
  let slug = params.slug;
  const { data } = await client.query({
    query: gql`
      query GetPokemon {
        pokemon(name: "${slug}") {
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
      pokemon: data.pokemon,
    },
  };
}
