import { useContext, useState } from "react";
import { BoardContext } from "./BoardContext";
import Modal from "./Modal";

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

  const createNewBoardFunc = () => {
    createNewBoard({
      name: boardName,
      columns,
    });
    setAddBoardModal(false);
  };

  return addBoardModal ? (
    <Modal>
      <div style={{ backgroundColor: "white", padding: "20px" }}>
        <h3>Add New Board</h3>
        <div>
          <label>Name</label>
          <div style={{ marginTop: "10px" }}>
            <input type="text" onChange={(e) => setBoardName(e.target.value)} />
          </div>
        </div>
        <div>
          <label>Columns</label>
          {columns.map((col, i) => {
            return (
              <div>
                <span>
                  <input
                    type="text"
                    onChange={(e) => setColumnName(e.target.value)}
                  />
                </span>
                <span>X</span>
              </div>
            );
          })}
        </div>
        <div onClick={addNewColumn}>+ Add New Column</div>
        <div onClick={createNewBoardFunc}>Create New Board</div>
      </div>
    </Modal>
  ) : null;
};

export default AddNewBoard;
