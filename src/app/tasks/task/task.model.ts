export interface Task {
  id: string;
  title: string;
  summary: string;
  dueDate: string;
  completed: boolean;
}

export interface NewTaskData {
  title: string;
  summary: string;
  date: string;
}
