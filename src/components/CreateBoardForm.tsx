import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { BoardsState, TodoState } from "../atom";

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
  width: 120px;
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

interface IBoardInput {
  boardInput: string;
}

function CreateBoardForm() {
  const setTodoState = useSetRecoilState(TodoState);
  const setBoards = useSetRecoilState(BoardsState);
  const { register, handleSubmit, setValue } = useForm<IBoardInput>();
  const onValid = ({ boardInput }: IBoardInput) => {
    const boardId = Date.now();
    setTodoState((prev) => {
      return { ...prev, [boardId]: { name: boardInput, todos: [] } };
    });
    console.log(boardInput);
    setBoards((prev) => [...prev, String(boardId)]);
    setValue("boardInput", "");
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register("boardInput", { required: true })}
        placeholder="보드를 추가해보세요!"
      />
    </Form>
  );
}
export default CreateBoardForm;
