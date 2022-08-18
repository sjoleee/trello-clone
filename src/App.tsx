import React from "react";
import { useState } from "react";
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
import TrashCan from "./components/TrashCan";

const Title = styled.h1`
  font-size: 50px;
  white-space: pre-wrap;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const Form = styled.form``;
const Input = styled.input``;

function App() {
  const [todo, setTodo] = useRecoilState(TodoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    //기존 로직 : 전체 obj를 다 복사한 후 수정하여 set함수로 대체함.
    // if (!destination) {
    //   return;
    // } else {
    //   setTodo((prev) => {
    //     const copiedObj: ITodoState = {};
    //     Object.keys(prev).map((item) => {
    //       copiedObj[item] = [...prev[item]];
    //     });
    //     const arr = copiedObj[source.droppableId].splice(source.index, 1);
    //     copiedObj[destination.droppableId].splice(destination.index, 0, ...arr);
    //     return copiedObj;
    //   });
    // }

    //수정된 로직 : obj중에서 변경되는 arr만 복사한 후 수정. 변경되지 않는 arr은 처음부터 복사하지 않는다.
    if (!destination) {
      return;
    } else if (destination.droppableId === source.droppableId) {
      setTodo((prev) => {
        const copiedBoard = [...prev[source.droppableId]];
        const tmp = copiedBoard.splice(source.index, 1);
        copiedBoard.splice(destination.index, 0, ...tmp);
        return { ...prev, [source.droppableId]: copiedBoard };
      });
    } else if (destination.droppableId === "TrashCan") {
      setTodo((prev) => {
        const sourceBoard = [...prev[source.droppableId]];
        sourceBoard.splice(source.index, 1);
        return { ...prev, [source.droppableId]: sourceBoard };
      });
    } else if (destination.droppableId !== source.droppableId) {
      setTodo((prev) => {
        const sourceBoard = [...prev[source.droppableId]];
        const destinationBoard = [...prev[destination.droppableId]];
        const tmp = sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, ...tmp);
        return {
          ...prev,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Title>🧑🏻‍💻{"\n"}asdfaf</Title>
        <Form>
          <Input />
        </Form>
        <Boards>
          {Object.keys(todo).map((item) => (
            <DroppableBoard todo={todo[item]} boardId={item} key={item} />
          ))}
        </Boards>
        <TrashCan />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
