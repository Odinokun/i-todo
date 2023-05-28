import { ITasksObj } from '../App';
import { AddTodoActionType, RemoveTodoActionType } from './todolists-reducer';

type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  taskId: string;
  todolistId: string;
};
type AddTaskActionType = {
  type: 'ADD-TASK';
  title: string;
  todolistId: string;
};
type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS';
  taskId: string;
  isDone: boolean;
  todolistId: string;
};
type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE';
  taskId: string;
  title: string;
  todolistId: string;
};

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodoActionType | RemoveTodoActionType;

export const tasksReducerAC = (state: ITasksObj, action: ActionType): ITasksObj => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return { ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId) };
    case 'ADD-TASK':
      return { ...state, [action.todolistId]: [{ id: '4', title: action.title, isDone: false }, ...state[action.todolistId]] };
    case 'CHANGE-TASK-STATUS':
      return { ...state, [action.todolistId]: state[action.todolistId].map(t => (t.id === action.taskId ? { ...t, isDone: action.isDone } : t)) };
    case 'CHANGE-TASK-TITLE':
      return { ...state, [action.todolistId]: state[action.todolistId].map(t => (t.id === action.taskId ? { ...t, title: action.title } : t)) };
    case 'ADD-TODOLIST':
      return { ...state, [action.todolistId]: [] };
    case 'REMOVE-TODOLIST':
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    default:
      throw new Error('I dont understand this action type');
  }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', taskId, todolistId };
};
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return { type: 'ADD-TASK', title, todolistId };
};
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId };
};
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId };
};
