import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

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
  return (
    <Wrapper>
      <Title>{boardId}</Title>
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
