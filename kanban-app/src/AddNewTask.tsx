import styled from "styled-components";
import { useContext, useState } from "react";
import Modal from "./Modal";
import { BoardContext } from "./BoardContext";
import Textbox from "./Atoms/Input";
import SelectBox from "./Atoms/Selectbox";
import Button from "./Atoms/Button";
import { ThemeContext } from "./App";

const StyledModalContainer = styled.div`
  background: white;
  padding: 20px;
  position: relative;
  border-radius: 10px;
`;

const StyledCloseModal = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

type AddNewTaskProps = {
  showAddModal: boolean;
  setShowAddModal: (s: boolean) => void;
};

const AddNewTask: React.FC<AddNewTaskProps> = ({
  setShowAddModal,
  showAddModal,
}) => {
  const boardContext = useContext(BoardContext);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, isError: false },
  ]);
  const themeContext = useContext(ThemeContext);

  const addSubtaskName = (name: string) => {
    subtasks[subtasks.length - 1].title = name;
  };

  const addNewSubtask = () => {
    subtasks.push({ title: "", isCompleted: false, isError: false });
    setSubtasks([...subtasks]);
  };

  const checkSubTaskIsEmpty = () => {
    let checkError = false;
    let newSubtasks = subtasks.map((task) => {
      if (task.title === "") {
        task.isError = true;
        checkError = true;
      }
      return task;
    });
    setSubtasks(newSubtasks);
    return checkError;
  };

  const checkError = () => {
    let error = false;
    if (title === "") {
      setTitleError(true);
      error = true;
    }
    if (checkSubTaskIsEmpty()) {
      error = true;
    }
    return error;
  };

  const resetSubtask = () => {
    setSubtasks([{ title: "", isCompleted: false, isError: false }]);
  };

  const closeModal = () => {
    setShowAddModal(false);
    resetSubtask();
  };

  const createNewTask = () => {
    if (!checkError() && boardContext !== null) {
      const { addNewTask } = boardContext;
      addNewTask({
        title,
        description,
        status: "Todo",
        subtasks,
      });
      setShowAddModal(false);
      resetSubtask();
    }
  };

  const removeSubtask = (index: number) => {
    subtasks.splice(index, 1);
    setSubtasks([...subtasks]);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  if (themeContext != null) {
    const { theme } = themeContext;

    return showAddModal ? (
      <>
        <Modal>
          <StyledModalContainer>
            <h2>Add New Task</h2>
            <div>
              <label>Title</label>
              <br />
              <Textbox onChange={onChangeTitle} isError={titleError} />
            </div>
            <div>
              <label>Description</label>
              <br />
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "500px", height: "100px" }}
              />
            </div>
            <div>
              <label>Subtasks</label>
              {subtasks.map((ele, i) => {
                return (
                  <div key={ele.title}>
                    {ele.title ? (
                      <Textbox value={ele.title} />
                    ) : (
                      <Textbox
                        onChange={(e) => addSubtaskName(e.target.value)}
                        isError={ele.isError}
                      />
                    )}

                    <span onClick={() => removeSubtask(i)}>X</span>
                  </div>
                );
              })}
              <Button onClick={addNewSubtask} theme={theme} isSecondary>
                Create New Subtask
              </Button>
            </div>
            <div>
              <div>Status</div>
              <div>
                <SelectBox defaultValue="Todo" defaultName="Todo" />
              </div>
            </div>
            <Button onClick={() => createNewTask()} theme={theme}>
              Create Task
            </Button>
            <StyledCloseModal onClick={closeModal}>X</StyledCloseModal>
          </StyledModalContainer>
        </Modal>
      </>
    ) : null;
  }
  return null;
};

export default AddNewTask;
