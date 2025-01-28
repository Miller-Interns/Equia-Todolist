import type { TodoTask } from './task-type';
export type TodoList = {
  idList: number;
  category: string;
  isEdited: boolean;
  isDone: boolean;
  isDeleted: boolean;
  TodoTask?: TodoTask[];
};
