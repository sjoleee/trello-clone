import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface ITodoState {
  [key: string]: ITodo[];
}

export const TodoState = atom<ITodoState>({
  key: "todo",
  default: {
    "To do": [],
    Doing: [],
    Done: [],
  },
});
