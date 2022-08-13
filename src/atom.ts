import { atom } from "recoil";

export const TodoState = atom({
  key: "todo",
  default: ["a", "b", "c", "d", "e", "f"],
});
