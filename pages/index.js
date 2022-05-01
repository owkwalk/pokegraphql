import NextHead from "next/head";
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";

export default function Home({ pokemons }) {
  return (
    <div>
      <NextHead>
        <title>ポケモン一覧</title>
      </NextHead>

      <main>
        <Flex
          flexWrap="wrap"
          // alignItems="center"
          justifyContent="center"
        >
          {pokemons.map((pokemon) => {
            return (
              <Box
                as="a"
                key={pokemon.id}
                href={`pokemon/${pokemon.name}`}
                borderWidth="1px"
                rounded="lg"
                flexBasis={["auto", "20%"]}
                m="2"
              >
                <Flex direction="row">
                  <Heading size="md" m="2">
                    {pokemon.number}
                  </Heading>
                  <Image boxSize="50px" src={pokemon.image} m="2" />
                  <Heading size="xl" m="2">
                    {pokemon.name}
                  </Heading>
                </Flex>
              </Box>
            );
          })}
        </Flex>
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
      query GetPokemons {
        pokemons(first: 150) {
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
