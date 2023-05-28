import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducerAC } from './tasks-reducer';
import { addTodoAC, removeTodoAC } from './todolists-reducer';

test('correct task should be deleted from correct array', () => {
  const startState = {
    TodolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    TodolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };

  const action = removeTaskAC('2', 'TodolistId2');
  const endState = tasksReducerAC(startState, action);

  expect(endState['TodolistId1'].length).toBe(3);
  expect(endState['TodolistId2'].length).toBe(2);
  expect(endState['TodolistId2'].every(t => t.id !== '2')).toBeTruthy(); //верное утверждение
});

test('correct task sho uld be added to correct array', () => {
  const startState = {
    TodolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    TodolistId2: [
      { id: '1', title: 'Bread', isDone: false },
      { id: '2', title: 'Milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };

  const action = addTaskAC('juice', 'TodolistId2');
  const endState = tasksReducerAC(startState, action);

  expect(endState['TodolistId1'].length).toBe(3);
  expect(endState['TodolistId2'].length).toBe(4);
  expect(endState['TodolistId2'][0].id).toBeDefined(); // была определена
  expect(endState['TodolistId2'][0].title).toBe('juice');
  expect(endState['TodolistId2'][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
  const startState = {
    TodolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    TodolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };
  const action = changeTaskStatusAC('2', false, 'TodolistId2');
  const endState = tasksReducerAC(startState, action);

  expect(endState['TodolistId2'][1].isDone).toBeFalsy();
  expect(endState['TodolistId1'][1].isDone).toBeTruthy();
});

test('title of specified task should be changed', () => {
  const startState = {
    TodolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    TodolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };
  const action = changeTaskTitleAC('2', 'beer', 'TodolistId2');
  const endState = tasksReducerAC(startState, action);

  expect(endState['TodolistId2'][1].title).toBe('beer');
  expect(endState['TodolistId1'][1].title).toBe('JS');
});

test('new property with new array should be added when new todolist is added', () => {
  const startState = {
    TodolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    TodolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };
  const action = addTodoAC('new todolist title');
  const endState = tasksReducerAC(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== 'TodolistId1' && k !== 'TodolistId2');
  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
  const startState = {
    TodolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    TodolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };
  const action = removeTodoAC('TodolistId2');
  const endState = tasksReducerAC(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['TodolistId2']).not.toBeDefined();
});
