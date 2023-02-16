import { useState, useContext } from "react";
import Modal from "./Modal";
import { BoardContext } from "./BoardContext";

const EditTask = ({
  showEditModal,
  selectedTask,
  editData,
  calculateStatusArray,
  setShowEditModal,
}) => {
  const [status, setStatus] = useState("");
  const statusList = calculateStatusArray();
  const contextValue = useContext(BoardContext);
  const { state, editTask } = contextValue;
  return showEditModal ? (
    <Modal>
      <div>
        <div>Status</div>
        <div>
          <select
            style={{ padding: "5px", width: "100%" }}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={selectedTask.status}>{selectedTask.status}</option>
            {statusList?.map((ele, i) => (
              <option value={ele}>{ele}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            editTask({ ...editData, newColumn: status });
            setShowEditModal(false);
            localStorage.setItem("appState", JSON.stringify(state));
          }}
        >
          Save
        </button>
      </div>
    </Modal>
  ) : null;
};

export default EditTask;
