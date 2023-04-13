import { Button, Center, Grid, GridItem, Text, VStack } from "@chakra-ui/react";

interface Props {
  selectedTableNo?: number;
  onClickTable: (tableNo: number) => void;
  onSubmitTable: () => void;
}

const TableSelection = ({
  selectedTableNo,
  onClickTable,
  onSubmitTable,
}: Props) => {
  return (
    <VStack alignItems="stretch" gap={10}>
      <Grid
        gap={100}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(3, 1fr)"
      >
        {[1, 2, 3, 4, 5, 6].map((tableNo) => (
          <GridItem
            key={tableNo}
            bg="cadetblue"
            outline={tableNo === selectedTableNo ? "black solid 2px" : "none"}
            onClick={() => onClickTable(tableNo)}
            minHeight={200}
          >
            <Center height="100%">
              <Text fontSize="2xl">{tableNo}</Text>
            </Center>
          </GridItem>
        ))}
      </Grid>
      <Button
        isDisabled={selectedTableNo === undefined}
        onClick={onSubmitTable}
      >
        {selectedTableNo === undefined
          ? "Please select a table to continue"
          : `Create order for table ${selectedTableNo}`}
      </Button>
    </VStack>
  );
};

export default TableSelection;
