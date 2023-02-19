import { useContext, useState } from "react";
import styled from "styled-components";
import { BoardContext } from "./BoardContext";
import Modal from "./Modal";

const StyledInput = styled.input`
  width: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  height: 25px;
`;
const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const StyledButton = styled.button`
  width: 90%;
  background: silver;
  border-radius: 25px;
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  margin-top: 10px;
`;

const AddNewBoard = ({ addBoardModal, setAddBoardModal }) => {
  const [columns, setColumns] = useState([]);
  const [columnName, setColumnName] = useState("");
  const [boardName, setBoardName] = useState("");
  const contextValue = useContext(BoardContext);
  const { createNewBoard } = contextValue;

  const addNewColumn = () => {
    columns.push({ name: columnName, tasks: [] });
    setColumns([...columns]);
  };

  const removeColumn = (index) => {
    columns.splice(index, 1);
    setColumns([...columns]);
  };

  const createNewBoardFunc = () => {
    createNewBoard({
      name: boardName,
      columns,
    });
    setAddBoardModal(false);
  };

  return addBoardModal ? (
    <Modal>
      <StyledContainer>
        <h3>Add New Board</h3>
        <div>
          <label>Name</label>
          <div style={{ marginTop: "10px" }}>
            <StyledInput
              type="text"
              onChange={(e) => setBoardName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Columns</label>
          {columns.map((col, i) => {
            return (
              <div>
                <span>
                  <StyledInput
                    type="text"
                    onChange={(e) => setColumnName(e.target.value)}
                  />
                </span>
                <span onClick={() => removeColumn(i)}>X</span>
              </div>
            );
          })}
        </div>
        <StyledButton onClick={addNewColumn}>+ Add New Column</StyledButton>
        <StyledButton onClick={createNewBoardFunc}>
          Create New Board
        </StyledButton>
      </StyledContainer>
    </Modal>
  ) : null;
};

export default AddNewBoard;
