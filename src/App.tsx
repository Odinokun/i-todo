import { useState } from 'react';
import { v1 } from 'uuid';
import { Todolist } from './components/Todolist';
import './App.css';
import { AddItemForm } from './components/AddItemForm';
import { log } from 'util';

export interface ITasks {
  id: string;
  title: string;
  isDone: boolean;
}

export interface IFilterValues {
  all: string;
  active: string;
  completed: string;
}

interface ITodolist {
  id: string;
  title: string;
  filter: keyof IFilterValues;
}

interface ITasksObj {
  [key: string]: ITasks[];
}

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<ITodolist[]>([
    {id: todolistId1, title: 'What to learn?', filter: 'active'},
    {id: todolistId2, title: 'What to buy?', filter: 'all'},
  ]);

  const [tasksObj, setTasksObj] = useState<ITasksObj>({
    [todolistId1]: [
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'Css', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'React', isDone: true},
      {id: v1(), title: 'Redux', isDone: false},
      {id: v1(), title: 'GSAP', isDone: false},
      {id: v1(), title: 'Three.js', isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: 'Chicken', isDone: true},
      {id: v1(), title: 'Tomatoes', isDone: true},
      {id: v1(), title: 'Water', isDone: true},
      {id: v1(), title: 'Oranges', isDone: true},
      {id: v1(), title: 'Cheese', isDone: false},
    ],
  });

  const addTask = (todolistId: string, title: string) => {
    const newTask: ITasks = {id: v1(), title: title, isDone: false};
    setTasksObj({...tasksObj, [todolistId]: [newTask, ...tasksObj[todolistId]]});
  };

  const removeTask = (todolistId: string, id: string) => {
    tasksObj[todolistId] = tasksObj[todolistId].filter(t => t.id !== id);
    setTasksObj({...tasksObj});
  };

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todo => todo.id !== todolistId));
    delete tasksObj[todolistId];
    setTasksObj({...tasksObj});
  };

  const changeStatus = (todolistId: string, taskId: string) => {
    tasksObj[todolistId] = tasksObj[todolistId].map(t => t.id === taskId ? {...t, isDone: !t.isDone} : t);
    setTasksObj({...tasksObj});
  };

  const changeFilter = (todolistId: string, value: keyof IFilterValues) => {
    setTodolists(todolists.map(todo => todo.id === todolistId ? {...todo, filter: value} : todo));
  };

  const addTodolist = (title: string) => {
    const newTodolist: ITodolist = {id: v1(), title, filter: 'all'};
    setTodolists([newTodolist, ...todolists]);
    setTasksObj({[newTodolist.id]: [], ...tasksObj});
  };

  return (
    <div className="App">
      <AddItemForm addItem={ addTodolist }/>
      {
        todolists.map(todo => {
          let tasksForTodolist = tasksObj[todo.id];
          if (todo.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
          }
          if (todo.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
          }

          return (
            <Todolist
              key={ todo.id }
              todolistId={ todo.id }
              title={ todo.title }
              tasks={ tasksForTodolist }
              addTask={ addTask }
              removeTask={ removeTask }
              changeFilter={ changeFilter }
              changeTaskStatus={ changeStatus }
              filter={ todo.filter }
              removeTodolist={ removeTodolist }
            />
          );
        })
      }
    </div>
  );
}

export default App;
