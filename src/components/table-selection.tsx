import { Box, Button, Center, Circle, Square, VStack } from "@chakra-ui/react";
import { cloneElement } from "react";

interface Table {
  tableNo: number;
  element: React.ReactElement;
}

const TABLES: Table[] = [
  {
    tableNo: 1,
    element: <Center top="10%" left="10%" width="10%" height="30%" />,
  },
  {
    tableNo: 2,
    element: <Center top="50%" left="10%" width="10%" height="30%" />,
  },
  {
    tableNo: 3,
    element: <Circle top="10%" left="35%" size="20%" />,
  },
  {
    tableNo: 4,
    element: <Circle top="10%" left="70%" size="20%" />,
  },
  {
    tableNo: 5,
    element: <Square top="65%" left="30%" size="15%" />,
  },
  {
    tableNo: 6,
    element: <Square top="65%" left="55%" size="15%" />,
  },
  {
    tableNo: 7,
    element: <Square top="65%" left="80%" size="15%" />,
  },
];

interface Props {
  selectedTableNo?: number;
  onTableClick: (tableNo: number) => void;
  onTableSubmit: () => void;
}

const TableSelection = ({
  selectedTableNo,
  onTableClick,
  onTableSubmit,
}: Props) => {
  return (
    <VStack
      alignItems="stretch"
      gap={10}
      height="100%"
      justifyContent="space-between"
      padding={5}
    >
      <Box flex={1} border="5px solid" position="relative">
        {TABLES.map(({ tableNo, element }) =>
          cloneElement(
            element,
            {
              position: "absolute",
              bg: tableNo === selectedTableNo ? "secondary.500" : "dark.200",
              color: tableNo === selectedTableNo ? "white" : "black",
              border:
                tableNo === selectedTableNo
                  ? "2px solid black"
                  : "2px solid gray",
              onClick: () => onTableClick(tableNo),
              cursor: "pointer",
              fontSize: "2xl",
            },
            `#${tableNo}`
          )
        )}
      </Box>
      <Button
        colorScheme="primary"
        isDisabled={selectedTableNo === undefined}
        onClick={onTableSubmit}
        size="lg"
      >
        {selectedTableNo === undefined
          ? "Please select a table to continue"
          : `Create order for table #${selectedTableNo}`}
      </Button>
    </VStack>
  );
};

export default TableSelection;
