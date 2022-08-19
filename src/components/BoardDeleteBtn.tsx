import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { BoardsState, TodoState } from "../atom";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

interface IDeleteBtnProps {
  boardId: string;
}

function BoardDeleteBtn({ boardId }: IDeleteBtnProps) {
  const setTodoState = useSetRecoilState(TodoState);
  const [boards, setBoards] = useRecoilState(BoardsState);
  const handleBoardDelete = (event: React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    console.log(boards);
    setBoards((prev) => {
      const target = prev.indexOf(name);
      const copiedBoards = [...prev];
      copiedBoards.splice(target, 1);
      return copiedBoards;
    });
    setTodoState((prev) => {
      const copiedTodos = { ...prev };
      const { name, ...otherTodos } = copiedTodos;
      return otherTodos;
    });
  };

  return (
    <ButtonContainer>
      <Button name={boardId} onClick={handleBoardDelete}>
        ❎
      </Button>
    </ButtonContainer>
  );
}
export default BoardDeleteBtn;
