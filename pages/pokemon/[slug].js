import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import NextHead from "next/head";
import NextLink from "next/link";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

export default function Pokemon({ pokemon }) {
  return (
    <div>
      <NextHead>
        <title>{pokemon.name}</title>
      </NextHead>
      <main>
        <Container mt="60px">
          <Flex alignItems="center" justifyContent="center">
            <Flex direction="column">
              <Box
                width="700px"
                borderWidth="1px"
                rounded="lg"
                flexBasis={["auto", "20%"]}
                m="2"
              >
                <Text fontSize="25px" mt="5" mb="5" mx="5" fontWeight="bold">
                  No.{pokemon.number}
                </Text>
                <Flex
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image width="300px" objectFit="cover" src={pokemon.image} />
                </Flex>
                <Heading size="2xl" mx="5">
                  {pokemon.name}
                </Heading>
                <Flex direction="row" height="80px">
                  <Box rounded="lg" bg="#50C241" m="5">
                    <Text fontSize="25px" ml="5" mr="5" mb="5" color="white">
                      {pokemon.classification}
                    </Text>
                  </Box>
                  <Box rounded="lg" bg="#813EA2" m="5">
                    <Text fontSize="25px" ml="5" mr="5" mb="5" color="white">
                      {pokemon.types}
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Flex justifyContent="center">
                <NextLink href="/">
                  <Button colorScheme="blue" height="50px" width="150px" m="5">
                    <Text fontSize="xl" color="white">
                      一覧へ戻る
                    </Text>
                  </Button>
                </NextLink>
              </Flex>
            </Flex>
          </Flex>
        </Container>
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
