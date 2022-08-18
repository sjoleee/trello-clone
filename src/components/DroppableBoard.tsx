import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { TodoState } from "../atom";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 20px;
  border-radius: 5px;
  min-height: 200px;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IArea {
  isDraggingFromThisWith?: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IArea>`
  padding: 20px 10px;
  background-color: ${(props) =>
    props.isDraggingOver ? "#a4b0be" : props.theme.boardColor};
  flex-grow: 1;
  transition: background-color 0.1s ease-in-out;
`;

interface IBoardProps {
  todo: string[];
  boardId: string;
}

function DroppableBoard({ todo, boardId }: IBoardProps) {
  const [todoState, setTodoState] = useRecoilState(TodoState);
  const [todoText, setTodoText] = useState("");
  const { register, watch, handleSubmit, setValue } = useForm();
  const onValid = (data: any) => {
    setTodoState((prev) => {
      const pushedBoard = [...prev[boardId]];
      pushedBoard.push(data[boardId]);
      console.log(pushedBoard);
      return { ...prev, [boardId]: pushedBoard };
    });
    setValue(boardId, "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register(boardId, { required: true })}
          placeholder="입력해주세요"
        />
        <button>등록</button>
      </form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            // isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todo.map((item, idx) => (
              <DraggableCard item={item} idx={idx} key={item} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DroppableBoard;
