import { typeGameDetails } from "../types/typeGameDetails";
import { rocket, rocketOutline } from "ionicons/icons";

export const constGameSpaceShip: typeGameDetails = {
  gameUID: "spaceship-1",
  icon: {
    active: rocket,
    notActive: rocketOutline,
  },
  title: {
    it_IT: "SpaceShip",
    en_GB: "SpaceShip",
  },
  subtitle: {
    it_IT: "Salva lo spazio",
    en_GB: "Save the space",
  },
  imageURL:
    "https://cdn.pixabay.com/photo/2012/11/28/11/28/rocket-launch-67723_1280.jpg",
  description: {
    it_IT: "Prova a salvare lo spazio dagli asteroidi",
    en_GB: "Try to save the space from asteroids",
  },
};
