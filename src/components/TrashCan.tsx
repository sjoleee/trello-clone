import { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const StyledCan = styled.img<{ isDraggingOver: boolean }>`
  position: fixed;
  display: flex;
  width: 100px;
  height: auto;

  transform: ${(props) => (props.isDraggingOver ? "scale(1.2)" : null)};
`;
const CanContainer = styled.div`
  position: fixed;
  bottom: 10vh;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

function TrashCan() {
  return (
    <Droppable droppableId="TrashCan">
      {(provided, snapshot) => (
        <CanContainer ref={provided.innerRef} {...provided.droppableProps}>
          {provided.placeholder}
          <StyledCan
            isDraggingOver={snapshot.isDraggingOver}
            src={
              snapshot.isDraggingOver
                ? "img/trash-open.png"
                : "img/trash-closed.png"
            }
            //
          />
        </CanContainer>
      )}
    </Droppable>
  );
}

export default TrashCan;
