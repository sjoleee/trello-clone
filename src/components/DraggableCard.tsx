import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
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
      {(provided) => (
        <Card
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
