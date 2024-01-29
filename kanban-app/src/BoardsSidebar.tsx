import { useState, useContext } from "react";
import styled from "styled-components";
import useResponseData from "./useResponseData";
import { ReactComponent as BoardSvg } from "./assets/icon-board.svg";
import { ReactComponent as KanbanSvg } from "./assets/KanbanLogo.svg";
import { backendData } from "./data";
import { ThemeContext } from "./App";
import { BoardContext } from "./BoardContext";
import AddNewBoard from "./AddNewBoard";
import { Board } from "./types";
import Checkbox from "./Atoms/Checkbox";

type StyledBoardContainerProps = {
  selected?: boolean;
};

const StyledBoardContainer = styled.div<StyledBoardContainerProps>`
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

const BoardsSidebar: React.FC = () => {
  const [selectedBoard, setSelectedBoard] = useState(0);
  const [addBoardModal, setAddBoardModal] = useState(false);
  const themeContext = useContext(ThemeContext);
  const boardContext = useContext(BoardContext);

  if (boardContext != null) {
    const { fetchBoard, state } = boardContext;
    const {
      data: { boards },
    } = state || [];

    const selectBoard = (index: number) => {
      fetchBoard(index);
      setSelectedBoard(index);
    };

    if (themeContext != null) {
      const { theme } = themeContext;
      return (
        <div>
          <StyledKanbanLogo>
            <KanbanSvg />
          </StyledKanbanLogo>
          <div style={{ marginTop: "20px" }}>
            <StyledAllBoards>All Boards ({boards?.length})</StyledAllBoards>
            {boards
              ? boards.map((board: Board, index: number) => {
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
                })
              : null}
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
          <div>
            <input type="checkbox" />
          </div>
        </div>
      );
    }
  }
  return null;
};

export default BoardsSidebar;
