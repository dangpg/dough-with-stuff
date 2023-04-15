import { Box, Flex, Heading, HStack, Icon } from "@chakra-ui/react";
import { useState } from "react";
import TableSelection from "../components/table-selection";
import Order from "../components/order";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { ReactComponent as DWS } from "../assets/dws.svg";

type Step = "Select table" | "Create order";

const New = () => {
  const [tableNo, setTableNo] = useState<number | undefined>();
  const [step, setStep] = useState<Step>("Select table");

  const handleTableClick = (newTableNo: number) => {
    setTableNo(newTableNo);
  };

  const handleTableSubmit = () => {
    setStep("Create order");
  };

  const handleOrderCancel = () => {
    setStep("Select table");
  };

  return (
    <Flex h="100vh" maxH="100vh" direction="column" gap={0}>
      <Flex bg="primary.500" padding={2} color="white">
        <HStack>
          {step === "Select table" ? (
            <Link to="/">
              <ChevronLeftIcon boxSize={6} aria-label="Back to Home" />
            </Link>
          ) : (
            <Icon
              as={ChevronLeftIcon}
              boxSize={6}
              onClick={handleOrderCancel}
              cursor="pointer"
            />
          )}
          <DWS height={40} />
          <Heading whiteSpace="nowrap" size="lg">
            {`${
              step === "Select table"
                ? "Step 1 of 2: Select Table"
                : "Step 2 of 2: Create Order"
            }`}
          </Heading>
        </HStack>
      </Flex>
      <Box flex={1} height={0} overflow="auto">
        {step === "Create order" && tableNo !== undefined ? (
          <Order tableNo={tableNo} onOrderCancel={handleOrderCancel} />
        ) : (
          <TableSelection
            selectedTableNo={tableNo}
            onTableClick={handleTableClick}
            onTableSubmit={handleTableSubmit}
          />
        )}
      </Box>
    </Flex>
  );
};

export default New;
