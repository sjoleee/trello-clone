import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { TodoState } from "../atom";

const Form = styled.form``;
const Input = styled.input``;

interface IBoardInput {
  boardInput: string;
}

function CreateBoardForm() {
  const setTodoState = useSetRecoilState(TodoState);
  const { register, handleSubmit, setValue } = useForm<IBoardInput>();
  const onValid = ({ boardInput }: IBoardInput) => {
    setTodoState((prev) => {
      const boardId = Date.now();
      return { ...prev, [boardId]: { name: boardInput, todos: [] } };
    });
    setValue("boardInput", "");
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input {...register("boardInput", { required: true })} />
    </Form>
  );
}
export default CreateBoardForm;
