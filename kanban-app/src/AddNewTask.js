import styled from "styled-components";
import { useContext, useState } from "react";
import Modal from "./Modal";
import { BoardContext } from "./BoardContext";
import Textbox from "./Atoms/Input";
import SelectBox from "./Atoms/Selectbox";

const StyledModalContainer = styled.div`
  width: 200px;
  background: white;
  padding: 20px;
  position: relative;
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
          <Textbox onChange={(e) => setTitle(e.target.value)} />
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
                  <Textbox value={ele.title} />
                ) : (
                  <Textbox onChange={(e) => addSubtaskName(e.target.value)} />
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
            <SelectBox defaultValue="Todo" defaultName="Todo" />
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
