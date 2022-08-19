import { atom } from "recoil";

interface IBoard {
  name: string;
  todos: ITodo[];
}

export interface ITodo {
  id: string;
  text: string;
}

export interface ITodoState {
  [key: string]: IBoard;
}

export const TodoState = atom<ITodoState>({
  key: "todo",
  default: {
    0: { name: "To do", todos: [] },
    1: { name: "Doing", todos: [] },
    2: { name: "Done", todos: [] },
  },
});

export const BoardsState = atom<string[]>({
  key: "boards",
  default: ["0", "1", "2"],
});
