import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import NextHead from "next/head";
import NextLink from "next/link";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function Pokemon({ pokemon }) {
  return (
    <div>
      <NextHead>
        <title>{pokemon.name}</title>
      </NextHead>
      <main>
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Flex direction="column">
            <Box
              borderWidth="1px"
              rounded="lg"
              flexBasis={["auto", "20%"]}
              m="2"
            >
              <Heading size="lg" mt="5" mb="5" mx="5">
                No.{pokemon.number}
              </Heading>
              <Image boxSize="500px" src={pokemon.image} />
              <Heading size="lg" mt="5" mb="5" mx="5">
                {pokemon.name}
              </Heading>
              <Flex direction="row">
                <Box rounded="lg" width="200px" bg="orange" m="5">
                  <Text fontSize="2xl" color="white" m="5">
                    {pokemon.classification}
                  </Text>
                </Box>
                <Box rounded="lg" width="200px" bg="royalblue" m="5">
                  <Text fontSize="2xl" color="white" m="5">
                    {pokemon.types}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <NextLink href="/">
              <Button colorScheme="teal" mt="5" mb="5" mx="5">
                <Text fontSize="lg" color="white" m="2">
                  一覧へ戻る
                </Text>
              </Button>
            </NextLink>
          </Flex>
        </Flex>
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
