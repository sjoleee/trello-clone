import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#1e90ff" : props.theme.cardColor};

  color: ${(props) => (props.isDragging ? "white" : "black")};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

interface IDraggableCardProps {
  item: string;
  idx: number;
}

function DraggableCard({ item, idx }: IDraggableCardProps) {
  return (
    <Draggable draggableId={item} index={idx} key={item}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DraggableCard);
