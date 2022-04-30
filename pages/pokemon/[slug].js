import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export default function Pokemon({ pokemon }) {
  console.log("pokemon: ", pokemon);
  return (
    <div>
      <div>
        <strong>No. {pokemon.number}</strong>
      </div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} />
      <div>
        <strong>classification: {pokemon.classification}</strong>
      </div>
      <div>
        <strong>Types: {pokemon.types}</strong>
      </div>
      <div>
        <strong>Weaknesses: {pokemon.weaknesses}</strong>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app",
    cache: new InMemoryCache(),
  });
  console.log(params.slug);
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
