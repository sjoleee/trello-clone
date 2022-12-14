import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const StyledCan = styled.img<{ isDraggingOver: boolean }>`
  position: fixed;
  display: flex;
  width: 80px;
  height: auto;

  /* transform: ${(props) => (props.isDraggingOver ? "scale(1.1)" : null)}; */
`;
const CanContainer = styled.div`
  position: fixed;
  bottom: 10vh;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
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
