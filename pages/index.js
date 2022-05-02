import NextHead from "next/head";
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function Home({ pokemons }) {
  return (
    <div>
      <NextHead>
        <title>ポケモン一覧</title>
      </NextHead>

      <main>
        <Container maxW="2000px" mt="50px">
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
                  rounded="md"
                  flexBasis={["auto", "20%"]}
                  m="3"
                >
                  <Flex direction="row" ml="5">
                    <Text fontSize="xl" mt="5">
                      {pokemon.number}
                    </Text>
                    <Image boxSize="50px" src={pokemon.image} m="2" />
                    <Heading size="lg" mt="4">
                      {pokemon.name}
                    </Heading>
                  </Flex>
                </Box>
              );
            })}
          </Flex>
        </Container>
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
