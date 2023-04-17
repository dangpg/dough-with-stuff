import { Box } from "@chakra-ui/react";
import { ReactComponent as Circle } from "../assets/circle.svg";
import { ReactComponent as Bacon } from "../assets/bacon.svg";
import { ReactComponent as Cheddar } from "../assets/cheddar.svg";
import { ReactComponent as Ricotta } from "../assets/ricotta.svg";
import { ReactComponent as Mozzarella } from "../assets/mozzarella.svg";
import { ReactComponent as Tomato } from "../assets/tomato.svg";
import { ReactComponent as Mushroom } from "../assets/mushroom.svg";
import { ReactComponent as Garlic } from "../assets/garlic.svg";
import { ReactComponent as Pepper } from "../assets/pepper.svg";
import { ReactComponent as Ham } from "../assets/ham.svg";
import { ReactComponent as Sausage } from "../assets/sausage.svg";
import { ReactComponent as Tuna } from "../assets/tuna.svg";
import { Cheese, Crust, Sauce, Size } from "../enums";

interface Props {
  key: string;
}

export const getAsset = ({ key }: Props): JSX.Element => {
  switch (key) {
    case Size.Small:
      return <Circle width="55%" />;
    case Size.Medium:
      return <Circle width="70%" />;
    case Size.Large:
      return <Circle width="85%" />;
    case Size.XLarge:
      return <Circle width="100%" />;

    case Crust.Thin:
      return <Circle strokeWidth={5} />;
    case Crust.Thick:
      return <Circle />;
    case Crust.Cheese:
      return <Circle stroke="#FFA600" />;

    case Sauce.Red:
      return <Circle strokeWidth={0} fill="red" />;
    case Sauce.White:
      return <Circle strokeWidth={0} fill="white" />;

    case Cheese.Cheddar:
      return <Cheddar />;
    case Cheese.Ricotta:
      return <Ricotta />;
    case Cheese.Mozzarella:
      return <Mozzarella />;

    case "Pepper":
      return <Pepper />;
    case "Tomato":
      return <Tomato />;
    case "Mushroom":
      return <Mushroom />;
    case "Garlic":
      return <Garlic />;

    case "Bacon":
      return <Bacon />;
    case "Ham":
      return <Ham />;
    case "Sausage":
      return <Sausage />;
    case "Tuna":
      return <Tuna />;

    default: {
      return <Box />;
    }
  }
};
