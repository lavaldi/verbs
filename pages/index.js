import { useState } from "react";
import {
  Grid,
  Flex,
  Container,
  Heading,
  Box,
  VStack,
  Input,
  SimpleGrid,
  Text,
  GridItem,
  Divider,
  Stack,
} from "@chakra-ui/react";
import verbs from "../db/verbs.json";

const Header = () => (
  <Box bg="yellow.300">
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      as="header"
      py={4}
      px={6}
      color="black"
      maxW="7xl"
      mx="auto"
    >
      <Heading as="h1" size="lg" letterSpacing={"tighter"}>
        Verbs
      </Heading>
      <a
        href="https://github.com/lavaldi/verbs"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </Flex>
  </Box>
);

const Footer = () => (
  <GridItem as="footer" rowStart={2} rowEnd={3}>
    <Divider />
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="7xl"
      py="6"
      px={{ base: "4", md: "8" }}
    >
      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <Text fontSize="sm" alignSelf={{ base: "center", sm: "start" }}>
          &copy; {new Date().getFullYear()} lavaldi.com. All rights reserved.
        </Text>
        <a
          href="https://github.com/lavaldi/verbs"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </Stack>
    </Box>
  </GridItem>
);

const Element = ({ verb }) => (
  <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
    <Heading
      mb="1"
      fontWeight="semibold"
      as="h2"
      size="md"
      textTransform="uppercase"
    >
      {verb.baseForm}
    </Heading>
    <SimpleGrid columns={2}>
      <Box display="flex" alignItems="baseline">
        <Text color="gray.500" fontWeight="semibold">
          Past Form:
        </Text>
        <Text ml="1">{verb.pastForm}</Text>
      </Box>
      <Box display="flex" alignItems="baseline">
        <Text color="gray.500" fontWeight="semibold">
          s/es/ies:
        </Text>
        <Text ml="1">{verb.sEsIesForm}</Text>
      </Box>
      <Box display="flex" alignItems="baseline">
        <Text color="gray.500" fontWeight="semibold">
          Past Participle Form:
        </Text>
        <Text ml="1">{verb.pastParticipleForm}</Text>
      </Box>
      <Box display="flex" alignItems="baseline">
        <Text color="gray.500" fontWeight="semibold">
          ing Form:
        </Text>
        <Text ml="1">{verb.ingForm}</Text>
      </Box>
    </SimpleGrid>
  </Box>
);

export default function Home() {
  const [search, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVerbs = search
    ? verbs.filter((verb) =>
        verb.baseForm.toLowerCase().includes(search.toLocaleLowerCase())
      )
    : verbs;

  return (
    <Grid h="100vh" templateRows="1fr auto">
      <Box>
        <Header />
        <Container maxW="container.sm">
          <VStack spacing={4} align="stretch" py={6}>
            <Input
              onChange={handleChange}
              value={search}
              placeholder="Search"
              type="search"
              size="lg"
            />
            {filteredVerbs.map((verb) => {
              if (verb.baseForm.trim() === "") return null;
              return <Element key={verb.id} verb={verb} />;
            })}
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Grid>
  );
}
