import Modal from "./Modal";
import Checkbox from "./Checkbox/Checkbox";

const ViewTask = ({
  selectedTask,
  calculateCompletedSubtaskCallback,
  showModal,
  setShowModal,
}) => {
  return showModal ? (
    <Modal>
      <div
        style={{
          background: "white",
          padding: "20px",
          position: "relative",
        }}
      >
        <div style={{ marginBottom: "10px" }}>{selectedTask.title}</div>
        <div style={{ marginBottom: "10px" }}>{selectedTask.description}</div>
        <div>
          <div>
            Subtasks {calculateCompletedSubtaskCallback(selectedTask.subtasks)}{" "}
            of {selectedTask.subtasks.length}
          </div>
          {selectedTask.subtasks.map((ele, index) => {
            return (
              <div
                style={{
                  background: "#E4EBFA",
                  marginBottom: "5px",
                  padding: "5px",
                }}
              >
                <Checkbox
                  textLabel={ele.title}
                  strikeThrough={true}
                  checkedState={ele.isCompleted}
                />
              </div>
            );
          })}
        </div>
        <div>
          <div>Status</div>
          <div>
            <select style={{ padding: "5px", width: "100%" }}>
              <option>{selectedTask.status}</option>
            </select>
          </div>
        </div>
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          X
        </div>
      </div>
    </Modal>
  ) : null;
};

export default ViewTask;
