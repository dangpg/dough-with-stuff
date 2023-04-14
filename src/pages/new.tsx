import { Box, Flex, Heading, HStack, VStack, Icon } from "@chakra-ui/react";
import { useState } from "react";
import TableSelection from "../components/table-selection";
import Order from "../components/order";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";

type Step = "Select table" | "Create order";

const New = () => {
  const [tableNo, setTableNo] = useState<number | undefined>();
  const [step, setStep] = useState<Step>("Select table");

  const handleClickTable = (newTableNo: number) => {
    setTableNo(newTableNo);
  };

  const handleSubmitTable = () => {
    setStep("Create order");
  };

  const handleCancelOrder = () => {
    setStep("Select table");
  };

  return (
    <Flex h="100vh" direction="column" gap={0}>
      <Flex bg="blue.300" padding={2}>
        <HStack>
          {step === "Select table" ? (
            <Link to="/">
              <ChevronLeftIcon boxSize={6} aria-label="Back to Home" />
            </Link>
          ) : (
            <Icon
              as={ChevronLeftIcon}
              boxSize={6}
              onClick={handleCancelOrder}
              cursor="pointer"
            />
          )}
          <Heading whiteSpace="nowrap" size="lg">
            {`${
              step === "Select table"
                ? "Step 1 of 2: Select Table"
                : "Step 2 of 2: Create Order"
            }`}
          </Heading>
        </HStack>
      </Flex>
      <Box flex={1}>
        {step === "Create order" && tableNo !== undefined ? (
          <Order tableNo={tableNo} onCancelOrder={handleCancelOrder} />
        ) : (
          <TableSelection
            selectedTableNo={tableNo}
            onClickTable={handleClickTable}
            onSubmitTable={handleSubmitTable}
          />
        )}
      </Box>
    </Flex>
  );
};

export default New;
