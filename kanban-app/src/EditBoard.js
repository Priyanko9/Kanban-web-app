import { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BoardContext } from "./BoardContext";
import Modal from "./Modal";
import Textbox from "./Atoms/Input";
import Button from "./Atoms/Button";
import { ThemeContext } from "./App";

const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const EditBoard = ({ editBoardModal, setEditBoardModal }) => {
  const [columns, setColumns] = useState([]);
  const [boardName, setBoardName] = useState("");
  const { theme } = useContext(ThemeContext);
  const contextValue = useContext(BoardContext);
  const { state, editBoard } = contextValue;
  const { selectedBoard } = state;

  useEffect(() => {
    setColumns(selectedBoard.columns);
    setBoardName(selectedBoard.name);
  }, [selectedBoard]);

  const addNewColumn = () => {
    columns.push({ name: "", tasks: [] });
    setColumns([...columns]);
  };

  const removeColumn = (index) => {
    columns.splice(index, 1);
    setColumns([...columns]);
  };

  const editBoardFunc = () => {
    editBoard({
      name: boardName,
      columns,
    });
    setEditBoardModal(false);
    setColumns([]);
  };

  return editBoardModal ? (
    <Modal>
      <StyledContainer>
        <h3>Edit Board</h3>
        <div>
          <label>Name</label>
          <div style={{ marginTop: "10px" }}>
            <Textbox
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Columns</label>
          {columns.map((col, i) => {
            return (
              <div key={col.name}>
                <span>
                  <Textbox value={col.name} readOnly />
                </span>
                <span onClick={() => removeColumn(i)}>X</span>
              </div>
            );
          })}
        </div>
        <Button onClick={addNewColumn} theme={theme} isSecondary>
          + Add New Column
        </Button>
        <Button onClick={editBoardFunc} theme={theme}>
          Save Changes
        </Button>
      </StyledContainer>
    </Modal>
  ) : null;
};

export default EditBoard;
