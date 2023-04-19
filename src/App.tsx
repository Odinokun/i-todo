import React from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

export interface ITasks {
  id: number
  title: string
  isDone: boolean
}

function App() {

  const tasks: ITasks[] = [
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'Css', isDone: true},
    {id: 3, title: 'React', isDone: true},
    {id: 4, title: 'Redux', isDone: false},
    {id: 5, title: 'GSAP', isDone: false},
    {id: 6, title: 'Three.js', isDone: false},
  ]

  return (
    <div className="App">
      <Todolist title="What to learn?" tasks={tasks}/>
    </div>
  );
}

export default App;
