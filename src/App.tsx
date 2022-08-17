import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ITodoState, TodoState } from "./atom";
import DraggableCard from "./components/DraggableCard";
import DroppableBoard from "./components/DroppableBoard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;
`;

function App() {
  const [todo, setTodo] = useRecoilState(TodoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) {
      return;
    } else {
      setTodo((prev) => {
        const copiedObj: ITodoState = {};
        Object.keys(prev).map((item) => {
          copiedObj[item] = [...prev[item]];
        });
        const arr = copiedObj[source.droppableId].splice(source.index, 1);
        copiedObj[destination.droppableId].splice(destination.index, 0, ...arr);
        return copiedObj;
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todo).map((item) => (
            <DroppableBoard todo={todo[item]} boardId={item} key={item} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
