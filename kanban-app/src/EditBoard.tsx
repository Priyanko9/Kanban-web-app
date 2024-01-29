import { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BoardContext } from "./BoardContext";
import Modal from "./Modal";
import Textbox from "./Atoms/Input";
import Button from "./Atoms/Button";
import { ThemeContext } from "./App";
import { Column } from "./types";

const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

interface EditBoard {
  editBoardModal: boolean;
  setEditBoardModal: (args: boolean) => void;
}

const EditBoard: React.FC<EditBoard> = ({
  editBoardModal,
  setEditBoardModal,
}) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [boardName, setBoardName] = useState("");
  const ThemeContextValue = useContext(ThemeContext);
  const boardContextValue = useContext(BoardContext);

  useEffect(() => {
    if (boardContextValue != null) {
      const {
        state: {
          selectedBoard: { name, columns },
        },
      } = boardContextValue;
      if (columns != undefined && columns != null) setColumns([...columns]);
      setBoardName(name);
    }
  }, [boardContextValue]);

  const addNewColumn = () => {
    columns.push({ name: "", tasks: [] });
    setColumns([...columns]);
  };

  const removeColumn = (index: number) => {
    columns.splice(index, 1);
    setColumns([...columns]);
  };

  const editBoardFunc = () => {
    if (boardContextValue != null) {
      const { editBoard } = boardContextValue;
      editBoard({
        name: boardName,
        columns,
      });
      setEditBoardModal(false);
      setColumns([]);
    }
  };

  if (ThemeContextValue !== null) {
    const { theme } = ThemeContextValue;

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
  }
  return null;
};

export default EditBoard;
