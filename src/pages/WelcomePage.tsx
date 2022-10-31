import { Box, Flex, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const WelcomePage = () => {
  return (
    <Flex
      as={"main"}
      className={"bg-slate-900 text-white"}
      pos={"relative"}
      h={"100vh"}
      w={"full"}
      justify={"center"}
      alignItems={"center"}
    >
      <Box className={"text-center"}>
        <Heading as="h1" mb="16" fontWeight="semibold" fontSize="5xl">
          Welcome to FullStack Chat!
        </Heading>
        <Heading
          as="h2"
          fontSize="xl"
          fontWeight="hairline"
          fontFamily="mono"
          mb="12"
        >
          Feel free to text with other roommates.
        </Heading>
        <NavLink
          to={"/login"}
          className={
            "rounded-md bg-slate-700 px-8 py-2 hover:bg-cyan-700 hover:scale-105 hover:-translate-y-1 transition duration-300"
          }
        >
          Start now!
        </NavLink>
      </Box>
    </Flex>
  );
};
