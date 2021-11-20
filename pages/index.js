import { useState } from "react";
import {
  Flex,
  Container,
  Heading,
  Box,
  VStack,
  Input,
  SimpleGrid,
  Text,
  Divider,
  Stack,
} from "@chakra-ui/react";
import verbs from "../db/verbs.json";

const Header = () => (
  <Flex
    align="center"
    justify="space-between"
    wrap="wrap"
    as="header"
    py={4}
    px={6}
    bg="yellow.300"
    color="black"
  >
    <Heading as="h1" size="lg" letterSpacing={"tighter"}>
      Verbs
    </Heading>
    <Box display={{ base: "block", md: "block" }} mt={{ base: 4, md: 0 }}>
      <a
        href="https://github.com/lavaldi/verbs"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </Box>
  </Flex>
);

const Footer = () => (
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
);

const Element = ({ verb }) => (
  <Box
    key={verb.id}
    p="6"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
  >
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

export default function Home({ verbs }) {
  const [filteredVerbs, setFilteredVerbs] = useState(verbs);

  const onChange = (e) => {
    const newVerbs = verbs.filter((verb) =>
      verb.baseForm.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredVerbs(newVerbs);
  };

  return (
    <>
      <Header />
      <Container maxW="container.sm">
        <VStack spacing={4} align="stretch" py={6}>
          <Input
            onChange={onChange}
            placeholder="Search"
            type="search"
            size="lg"
          />
          {filteredVerbs.map((verb) => {
            if (verb.baseForm.trim() === "") return null;
            return <Element verb={verb} />;
          })}
        </VStack>
      </Container>
      <Divider />
      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: { verbs },
  };
}
