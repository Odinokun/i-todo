import React, {useState} from 'react';
import {v1} from 'uuid';
import {Todolist} from './components/Todolist';
import './App.css';

export interface ITasks {
  id: string
  title: string
  isDone: boolean
}

export interface IFilterValues {
  all: string;
  active: string;
  completed: string;
}

function App() {
  const [tasks, setTasks] = useState<ITasks[]>([
    {id: v1(), title: 'HTML', isDone: true},
    {id: v1(), title: 'Css', isDone: true},
    {id: v1(), title: 'React', isDone: true},
    {id: v1(), title: 'Redux', isDone: false},
    {id: v1(), title: 'GSAP', isDone: false},
    {id: v1(), title: 'Three.js', isDone: false},
  ]);
  const [filter, setFilter] = useState<keyof IFilterValues>('all');

  const addTask = (title: string) => {
    const newTask = {id: v1(), title: title, isDone: false};
    setTasks([newTask, ...tasks])
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const changeStatus = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: !t.isDone} : t))
  }

  const changeFilter = (value: keyof IFilterValues) => {
    setFilter(value);
  }

  let tasksForTodolist = tasks;
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone)
  }
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => !t.isDone)
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn?"
        tasks={tasksForTodolist}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
