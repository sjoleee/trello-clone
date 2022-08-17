import { atom } from "recoil";

export interface ITodoState {
  [key: string]: string[];
}

export const TodoState = atom<ITodoState>({
  key: "todo",
  default: {
    to_do: ["a", "b"],
    doing: ["c", "d"],
    done: ["e", "f"],
  },
});
