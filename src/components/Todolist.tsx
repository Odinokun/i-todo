import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {IFilterValues, ITasks} from '../App';

interface IProps {
  title: string
  tasks: Array<ITasks>
  addTask: (title: string) => void
  removeTask: (id: string) => void
  changeFilter: (value: keyof IFilterValues) => void
}

export const Todolist: FC<IProps> = ({
                                       title,
                                       tasks,
                                       addTask,
                                       removeTask,
                                       changeFilter
                                     }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()

  const addTaskHandler = () => {
    addTask(newTaskTitle);
    setNewTaskTitle('')
  }

  const onAllTasksHandler = () => changeFilter('all')
  const onActiveTasksHandler = () => changeFilter('active')
  const onCompletedTasksHandler = () => changeFilter('completed')


  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  return (
    <div>
      <h2>{title}</h2>

      <div>
        <button onClick={onAllTasksHandler}>All</button>
        <button onClick={onActiveTasksHandler}>Active</button>
        <button onClick={onCompletedTasksHandler}>Completed</button>
      </div>
      <br/>

      <div>
        <input
          type="text"
          value={newTaskTitle}
          placeholder="add new task"
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTaskHandler}>add</button>
      </div>

      <ul>
        {tasks.map(t => {
          const onRemoveHandler = () => removeTask(t.id)
          return (
            <li key={t.id}>
              <button onClick={onRemoveHandler}>x</button>
              <input type="checkbox" checked={t.isDone}/>
              <span>{t.title}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}