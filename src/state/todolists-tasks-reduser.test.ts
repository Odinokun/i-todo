import { ITodolist } from '../App';
import { tasksReducerAC } from './tasks-reducer';
import { addTodoAC, todolistsReducer } from './todolists-reducer';

test('its sould be equal', () => {
  const startTasksState = {};
  const startTodolistsState: ITodolist[] = [];

  const action = addTodoAC('new todolist title');
  const endTasksState = tasksReducerAC(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
