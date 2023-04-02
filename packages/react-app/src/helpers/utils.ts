import { Category } from "../types/enum";

export const AnimalConstants = [
  {
    key: Category.Mouse,
    name: "Mouse",
    method: "StatementChange",
  },
  {
    key: Category.Cat,
    name: "Cat",
    method: "StatementChange",
  },
  {
    key: Category.Dog,
    name: "Dog",
    method: "StatementChange",
  },
];

export const WinnerAnimalConstants = [
  {
    key: Category.Mouse,
    winnerMessage: "Winner is Mouse",
  },
  {
    key: Category.Cat,
    winnerMessage: "Winner is Cat",
  },
  {
    key: Category.Dog,
    winnerMessage: "Winner is Dog",
  },
  {
    key: 4,
    winnerMessage: "The game ended in a tie",
  },
];

export const MintUrl = "https://www.conpet.xyz/mint/";
