import styled from "styled-components";
import { useContext, useState } from "react";
import Modal from "./Modal";
import { BoardContext } from "./BoardContext";

const StyledModalContainer = styled.div`
  width: 200px;
  background: white;
  padding: 20px;
  position: relative;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 5px;
`;

const StyledCloseModal = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const AddNewTask = ({ setShowAddModal, showAddModal }) => {
  const { addNewTask } = useContext(BoardContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [status, setStatus] = useState("");
  const [subtasks, setSubtasks] = useState([{ title: "", isCompleted: false }]);

  const addSubtaskName = (name) => {
    subtasks[subtasks.length - 1].title = name;
  };

  const addNewSubtask = () => {
    subtasks.push({ title: "", isCompleted: false });
    setSubtasks([...subtasks]);
  };

  const createNewTask = () => {
    addNewTask({
      title,
      description,
      status: "Todo",
      subtasks,
    });
    setShowAddModal(false);
  };

  const removeSubtask = (index) => {
    subtasks.splice(index, 1);
    setSubtasks([...subtasks]);
  };

  return showAddModal ? (
    <Modal>
      <StyledModalContainer>
        <div>
          <label>Title</label>
          <br />
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <textarea onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Subtasks</label>
          {subtasks.map((ele, i) => {
            return (
              <div>
                {ele.title ? (
                  <input type="text" value={ele.title} />
                ) : (
                  <input
                    type="text"
                    onChange={(e) => addSubtaskName(e.target.value)}
                  />
                )}

                <span onClick={() => removeSubtask(i)}>X</span>
              </div>
            );
          })}
          <button onClick={addNewSubtask}>Create New Subtask</button>
        </div>
        <div>
          <div>Status</div>
          <div>
            <StyledSelect>
              <option>Todo</option>
            </StyledSelect>
          </div>
        </div>
        <button onClick={() => createNewTask()}>Create Task</button>
        <StyledCloseModal onClick={() => setShowAddModal(false)}>
          X
        </StyledCloseModal>
      </StyledModalContainer>
    </Modal>
  ) : null;
};

export default AddNewTask;
