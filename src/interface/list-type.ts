import type { TodoTask } from '../interface/task-type';

export type TodoList = {
    idList: number;
    category: string;
    isEdited: boolean;
    isDone: boolean;
    isDeleted: boolean;
    TodoTask?: TodoTask[];
}


