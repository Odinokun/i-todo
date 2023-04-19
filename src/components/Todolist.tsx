import React, {FC} from 'react';
import {IFilterValues, ITasks} from '../App';

interface IProps {
  title: string
  tasks: Array<ITasks>
  deleteTask: (id: number) => void
  changeFilter: (value: keyof IFilterValues) => void
}

export const Todolist: FC<IProps> = ({
                                       title,
                                       tasks,
                                       deleteTask,
                                       changeFilter
                                     }) => {
  const onAllTasksHandler = () => changeFilter('all')
  const onActiveTasksHandler = () => changeFilter('active')
  const onCompletedTasksHandler = () => changeFilter('completed')

  return (
    <div>
      <h2>{title}</h2>

      <div>
        <button onClick={onAllTasksHandler}>All</button>
        <button onClick={onActiveTasksHandler}>Active</button>
        <button onClick={onCompletedTasksHandler}>Completed</button>
      </div>

      <ul>
        {tasks.map(t => {
          const onClickHandler = () => deleteTask(t.id)
          return (
            <li key={t.id}>
              <button onClick={onClickHandler}>x</button>
              <input type="checkbox" checked={t.isDone}/>
              <span>{t.title}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}