import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const LoadingOverlay = ({ children }: Props) => {
  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      zIndex={500}
      height="100vh"
      width="100vw"
      backgroundColor="black"
      opacity="80%"
      justifyContent="center"
      alignItems="center"
      direction="column"
      gap={5}
      style={{ margin: 0 }}
    >
      <Text fontSize="2xl" color="white">
        {children}
      </Text>
      <Spinner color="white" size="xl" />
    </Flex>
  );
};

export default LoadingOverlay;
