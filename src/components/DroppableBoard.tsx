import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { ITodo, TodoState } from "../atom";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 20px;
  border-radius: 5px;
  min-height: 200px;
  max-height: 500px;
  width: 200px;
  min-width: 200px;
  display: flex;
  flex-direction: column;

  box-shadow: 0px 1px 1px 1px #55555545;
  &:last-child {
  }
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
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDraggingOver ? "#a4b0be" : props.theme.boardColor};
  flex-grow: 1;
  transition: background-color 0.1s ease-in-out;
  border-radius: 0 0 5px 5px;
  overflow-y: scroll;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  background-color: #f0f0f0;
  opacity: 0.4;
  border: none;
  width: 100%;
  height: 25px;
  border-radius: 5px;
  padding: 0 15px;
  &:focus {
    outline: none;
    opacity: 1;
    ::placeholder {
      opacity: 0;
    }
  }
`;

export interface IBoardProps {
  todo: ITodo[];
  boardId: string;
  boardName: string;
}

interface IForm {
  todoText: string;
}

function DroppableBoard({ todo, boardId, boardName }: IBoardProps) {
  const setTodoState = useSetRecoilState(TodoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: data.todoText,
    };
    setTodoState((prev) => {
      return {
        ...prev,
        [boardId]: {
          name: prev[boardId].name,
          todos: [...prev[boardId].todos, newTodo],
        },
      };
    });
    setValue("todoText", "");
  };
  return (
    <Wrapper>
      <Title>{boardName}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input {...register("todoText", { required: true })} placeholder="✏️" />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            // isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todo.map((item, idx) => (
              <DraggableCard
                text={item.text}
                id={item.id}
                idx={idx}
                key={item.id}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DroppableBoard;
