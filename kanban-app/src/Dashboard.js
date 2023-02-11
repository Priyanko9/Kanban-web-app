import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "./App";
import { ReactComponent as BoardSvg } from "./assets/icon-board.svg";
import useResponseData from "./useResponseData";
import BoardsSidebar from "./BoardsSidebar";
import BoardColumns from "./BoardColumns";
import BoardContent from "./BoardContent";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Dashboard = () => {
  const response = useResponseData();
  console.log("response dashboard:", response);
  return (
    <StyledContainer>
      <div>
        <BoardsSidebar />
        <div>Content</div>
      </div>
      <div style={{ width: "100%" }}>
        <StyledHeader>
          <div>Dashboard Header</div>
          <div>+ Add New Task</div>
        </StyledHeader>
        <BoardContent />
      </div>
    </StyledContainer>
  );
};

export default Dashboard;
