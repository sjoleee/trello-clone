import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { TodoState } from "./atom";
import CreateBoardForm from "./components/CreateBoardForm";
import DroppableBoard from "./components/DroppableBoard";
import TrashCan from "./components/TrashCan";

const Title = styled.h1`
  font-size: 50px;
  white-space: pre-wrap;
  text-align: center;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 0 50px;
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  overflow-x: scroll;
  padding-left: 50px;
`;

function App() {
  const [todo, setTodo] = useRecoilState(TodoState);
  console.log(todo);
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
        const copiedBoard = [...prev[source.droppableId].todos];
        const tmp = copiedBoard.splice(source.index, 1);
        copiedBoard.splice(destination.index, 0, ...tmp);
        return {
          ...prev,
          [source.droppableId]: {
            name: prev[source.droppableId].name,
            todos: copiedBoard,
          },
        };
      });
    } else if (destination.droppableId === "TrashCan") {
      setTodo((prev) => {
        const sourceBoard = [...prev[source.droppableId].todos];
        sourceBoard.splice(source.index, 1);
        return {
          ...prev,
          [source.droppableId]: {
            name: prev[source.droppableId].name,
            todos: sourceBoard,
          },
        };
      });
    } else if (destination.droppableId !== source.droppableId) {
      setTodo((prev) => {
        const sourceBoard = [...prev[source.droppableId].todos];
        const destinationBoard = [...prev[destination.droppableId].todos];
        const tmp = sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, ...tmp);
        return {
          ...prev,
          [source.droppableId]: {
            name: prev[source.droppableId].name,
            todos: sourceBoard,
          },
          [destination.droppableId]: {
            name: prev[destination.droppableId].name,
            todos: destinationBoard,
          },
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Title>🧑🏻‍💻{"\n"}상조의 칸반보드 만들기</Title>
        <CreateBoardForm />
        <Boards>
          {Object.keys(todo).map((item) => (
            <DroppableBoard
              todo={todo[item].todos}
              boardId={item}
              boardName={todo[item].name}
              key={item}
            />
          ))}
        </Boards>
        <TrashCan />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
