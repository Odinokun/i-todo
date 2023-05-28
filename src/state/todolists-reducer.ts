import { v1 } from 'uuid';
import { IFilterValues, ITodolist } from '../App';

type ActionType = RemoveTodoActionType | AddTodoActionType | ChangeTodoTitleActionType | ChangeTodoFilterActionType;

export type RemoveTodoActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};
export type AddTodoActionType = {
  type: 'ADD-TODOLIST';
  todolistId: string;
  title: string;
};
type ChangeTodoTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE';
  id: string;
  title: string;
};
type ChangeTodoFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: keyof IFilterValues;
};

export const todolistsReducer = (state: Array<ITodolist>, action: ActionType): Array<ITodolist> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id);
    case 'ADD-TODOLIST':
      return [...state, { id: action.todolistId, title: action.title, filter: 'all' }];
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => (tl.id === action.id ? { ...tl, title: action.title } : tl));
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => (tl.id === action.id ? { ...tl, filter: action.filter } : tl));
    default:
      throw new Error('I dont understand this action type');
  }
};

export const removeTodoAC = (todolistId: string): RemoveTodoActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId };
};
export const addTodoAC = (title: string): AddTodoActionType => {
  return { type: 'ADD-TODOLIST', todolistId: v1(), title };
};
export const changeTodoTitleAC = (todolistId: string, title: string): ChangeTodoTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title };
};
export const changeTodoFilterAC = (todolistId: string, filter: keyof IFilterValues): ChangeTodoFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter };
};
