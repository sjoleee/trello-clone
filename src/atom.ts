import { atom } from "recoil";

export interface ITodoState {
  [key: string]: string[];
}

export const TodoState = atom<ITodoState>({
  key: "todo",
  default: {
    "To do": ["a", "b"],
    Doing: ["c", "d"],
    Done: ["e", "f"],
  },
});
