import React, {FC} from 'react';
import {ITasks} from '../App';

interface IProps {
  title: string
  tasks: Array<ITasks>
}

export const Todolist: FC<IProps> = ({title, tasks}) => {
  return (
    <div>
      <h2>{title}</h2>

      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>

      <ul>
        {tasks.map(t => {
          return (
            <li key={t.id}>
              <button>x</button>
              <input type="checkbox" checked={t.isDone}/>
              <span>{t.title}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}