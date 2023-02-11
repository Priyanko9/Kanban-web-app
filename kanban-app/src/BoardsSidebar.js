import { useState, useContext } from "react";
import styled from "styled-components";
import useResponseData from "./useResponseData";
import { ReactComponent as BoardSvg } from "./assets/icon-board.svg";
import { backendData } from "./data";
import { ThemeContext } from "./App";
import { BoardContext } from "./BoardContext";

const StyledBoardContainer = styled.div`
  width: 276px;
  height: 48px;
  background: ${(props) =>
    props.selected ? props.theme.colors.violet : props.theme.colors.white};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  padding-left: 20px;
`;

const StyledBoardName = styled.span`
  margin-left: 15px;
`;

const BoardsSidebar = () => {
  const [selectedBoard, setSelectedBoard] = useState(0);
  const { theme } = useContext(ThemeContext);
  const { fetchBoard } = useContext(BoardContext);
  const { boards } = backendData || [];

  const selectBoard = (index) => {
    fetchBoard(index);
    setSelectedBoard(index);
  };
  return (
    <>
      <div>Kanban</div>
      <div>All Boards {boards.length}</div>
      {boards.map((board, index) => {
        return (
          <StyledBoardContainer
            key={index}
            selected={selectedBoard === index}
            theme={theme}
            onClick={() => selectBoard(index)}
          >
            <span>
              <BoardSvg />
            </span>
            <StyledBoardName>{board.name}</StyledBoardName>
          </StyledBoardContainer>
        );
      })}
      <StyledBoardContainer theme={theme}>
        <span>
          <BoardSvg />
        </span>
        <StyledBoardName>+ Create New Board</StyledBoardName>
      </StyledBoardContainer>
    </>
  );

  //   return <div></div>;
};

export default BoardsSidebar;
