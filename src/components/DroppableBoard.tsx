import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
`;

interface IBoardProps {
  todo: string[];
  boardId: string;
}

function DroppableBoard({ todo, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(provided) => (
        <Board ref={provided.innerRef} {...provided.droppableProps}>
          <span>{boardId}</span>
          {todo.map((item, idx) => (
            <DraggableCard item={item} idx={idx} key={item} />
          ))}
          {provided.placeholder}
        </Board>
      )}
    </Droppable>
  );
}

export default DroppableBoard;
