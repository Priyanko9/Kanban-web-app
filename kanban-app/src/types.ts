export interface Subtask {
  title: string;
  isCompleted: boolean;
  isError?: boolean;
}

export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Column {
  name: string;
  tasks: Task[];
}

export interface Board {
  name: string;
  columns: Column[] | undefined;
}

export interface BackendData {
  boards: Board[];
}

export interface EditData {
  selectedTaskIndex: number;
  selectedBoardName: string;
  selectedColumn: Column;
  selectedTaskObj: Task;
}
