import { Box } from "@chakra-ui/react";
import { useState } from "react";
import TableSelection from "../components/table-selection";
import Order from "../components/order";

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
    <Box h="100vh" padding={5}>
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
  );
};

export default New;
