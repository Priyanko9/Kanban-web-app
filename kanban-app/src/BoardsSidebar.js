import { useState, useContext } from "react";
import styled from "styled-components";
import useResponseData from "./useResponseData";
import { ReactComponent as BoardSvg } from "./assets/icon-board.svg";
import { ReactComponent as KanbanSvg } from "./assets/KanbanLogo.svg";
import { backendData } from "./data";
import { ThemeContext } from "./App";
import { BoardContext } from "./BoardContext";
import AddNewBoard from "./AddNewBoard";

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
  color: ${(props) =>
    props.selected ? props.theme.colors.white : props.theme.colors.grey};
`;

const StyledBoardName = styled.span`
  margin-left: 15px;
`;

const StyledKanbanLogo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const StyledAllBoards = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`;

const BoardsSidebar = () => {
  const [selectedBoard, setSelectedBoard] = useState(0);
  const { theme } = useContext(ThemeContext);
  const { fetchBoard, state } = useContext(BoardContext);
  const {
    data: { boards },
  } = state || [];
  const [addBoardModal, setAddBoardModal] = useState(false);

  const selectBoard = (index) => {
    fetchBoard(index);
    setSelectedBoard(index);
  };
  return (
    <div>
      <StyledKanbanLogo>
        <KanbanSvg />
      </StyledKanbanLogo>
      <div style={{ marginTop: "20px" }}>
        <StyledAllBoards>All Boards ({boards?.length})</StyledAllBoards>
        {boards &&
          boards.map((board, index) => {
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
          <StyledBoardName onClick={() => setAddBoardModal(true)}>
            + Create New Board
          </StyledBoardName>
        </StyledBoardContainer>
      </div>
      <AddNewBoard
        addBoardModal={addBoardModal}
        setAddBoardModal={setAddBoardModal}
      />
    </div>
  );

  //   return <div></div>;
};

export default BoardsSidebar;
