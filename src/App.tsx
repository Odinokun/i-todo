import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

export interface ITasks {
  id: number
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
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'Css', isDone: true},
    {id: 3, title: 'React', isDone: true},
    {id: 4, title: 'Redux', isDone: false},
    {id: 5, title: 'GSAP', isDone: false},
    {id: 6, title: 'Three.js', isDone: false},
  ]);
  const [filter, setFilter] = useState<keyof IFilterValues>('all');

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
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
        deleteTask={deleteTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
