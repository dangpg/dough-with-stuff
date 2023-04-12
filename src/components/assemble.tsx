import { useEffect, useState } from "react";
import { Box, Button, Text, VStack, Divider, Flex } from "@chakra-ui/react";
import { Pizza } from "../types/pizza";
import { Cheese, Crust, Sauce, Size, Topping } from "../enums";

interface Props {
  order?: Pizza;
  onUpdateOrder: (newOrder: Omit<Pizza, "tableNo">) => void;
}

const Assemble = ({ order, onUpdateOrder }: Props) => {
  const [size, setSize] = useState<Pizza["size"]>(order?.size);
  const [crust, setCrust] = useState<Pizza["crust"]>(order?.crust);
  const [sauce, setSauce] = useState<Pizza["flavor"]["sauce"]>(
    order?.flavor.sauce
  );
  const [cheese, setCheese] = useState<Pizza["flavor"]["cheese"]>(
    order?.flavor.cheese
  );
  const [vegetables, setVegetables] = useState<
    Pizza["flavor"]["toppings"]["vegetables"]
  >(order?.flavor.toppings.vegetables ?? []);
  const [meats, setMeats] = useState<Pizza["flavor"]["toppings"]["meats"]>(
    order?.flavor.toppings.meats ?? []
  );

  useEffect(() => {
    const newOrder = {
      size,
      crust,
      flavor: {
        sauce,
        cheese,
        toppings: {
          vegetables,
          meats,
        },
      },
    };

    onUpdateOrder(newOrder);
  }, [crust, size, sauce, cheese, vegetables, meats, onUpdateOrder]);

  return (
    <Box p={4}>
      {order ? (
        <VStack align={"flex-start"}>
          <Text>Size</Text>
          <Divider />
          <Flex gap={4}>
            {Object.values(Size).map((s, i) => (
              <Button
                key={i}
                variant={s === size ? "solid" : "outline"}
                onClick={() => setSize(s)}
              >
                {s}
              </Button>
            ))}
          </Flex>
          <Divider />
          <Text>Crust</Text>
          <Divider />
          <Flex gap={4}>
            {Object.values(Crust).map((c, i) => (
              <Button
                key={i}
                variant={c === crust ? "solid" : "outline"}
                onClick={() => setCrust(c)}
              >
                {c}
              </Button>
            ))}
          </Flex>
          <Divider />
          <Text>Sauce</Text>
          <Divider />
          <Flex gap={4}>
            {Object.values(Sauce).map((s, i) => (
              <Button
                key={i}
                variant={s === sauce ? "solid" : "outline"}
                onClick={() => setSauce(s)}
              >
                {s}
              </Button>
            ))}
          </Flex>
          <Divider />
          <Text>Cheese</Text>
          <Divider />
          <Flex gap={4}>
            {Object.values(Cheese).map((c, i) => (
              <Button
                key={i}
                variant={c === cheese ? "solid" : "outline"}
                onClick={() => setCheese(c)}
              >
                {c}
              </Button>
            ))}
          </Flex>
          <Divider />
          <Text>Vegetables</Text>
          <Divider />
          <Flex gap={4}>
            {Object.values(Topping.Vegetables).map((v, i) => (
              <Button
                key={i}
                variant={vegetables.includes(v) ? "solid" : "outline"}
                onClick={() =>
                  setVegetables((prevVeg) =>
                    prevVeg.includes(v)
                      ? prevVeg.filter((veg) => veg !== v)
                      : [...prevVeg, v]
                  )
                }
              >
                {v}
              </Button>
            ))}
          </Flex>
          <Divider />
          <Text>Meats</Text>
          <Divider />
          <Flex gap={4}>
            {Object.values(Topping.Meats).map((m, i) => (
              <Button
                key={i}
                variant={meats.includes(m) ? "solid" : "outline"}
                onClick={() =>
                  setMeats((prevMeats) =>
                    prevMeats.includes(m)
                      ? prevMeats.filter((meat) => meat !== m)
                      : [...prevMeats, m]
                  )
                }
              >
                {m}
              </Button>
            ))}
          </Flex>
        </VStack>
      ) : (
        <Text>Please select an order</Text>
      )}
    </Box>
  );
};

export default Assemble;
