import { Button, Center, Grid, GridItem, Text, VStack } from "@chakra-ui/react";

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
      bg="burlywood"
      height="100%"
      justifyContent="space-between"
    >
      <Grid
        gap={300}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(3, 1fr)"
        padding={10}
      >
        {[1, 2, 3, 4, 5, 6].map((tableNo) => (
          <GridItem
            key={tableNo}
            bg={tableNo === selectedTableNo ? "green.600" : "gray.600"}
            border={
              tableNo === selectedTableNo
                ? "2px solid white"
                : "2px solid transparent"
            }
            onClick={() => onTableClick(tableNo)}
            minHeight={200}
          >
            <Center height="100%">
              <Text color="white" fontSize="2xl">{`#${tableNo}`}</Text>
            </Center>
          </GridItem>
        ))}
      </Grid>
      <Button
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
