import { Box, Flex, Progress, Spinner, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const LoadingOverlay = ({ children }: Props) => {
  return (
    <Flex
      position="absolute"
      zIndex={500}
      height="100vh"
      width="100vw"
      backgroundColor="black"
      opacity="80%"
      justifyContent="center"
      alignItems="center"
      direction="column"
      gap={5}
    >
      <Text fontSize="2xl" color="white">
        {children}
      </Text>
      <Spinner color="white" size="xl" />
    </Flex>
  );
};

export default LoadingOverlay;
