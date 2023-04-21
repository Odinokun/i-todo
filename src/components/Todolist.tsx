import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {IFilterValues, ITasks} from '../App';

interface IProps {
  title: string
  tasks: Array<ITasks>
  addTask: (title: string) => void
  removeTask: (id: string) => void
  changeFilter: (value: keyof IFilterValues) => void
  changeTaskStatus: (taskId: string) => void
  filter: keyof IFilterValues
}

export const Todolist: FC<IProps> = ({
                                       title,
                                       tasks,
                                       addTask,
                                       removeTask,
                                       changeFilter,
                                       changeTaskStatus,
                                       filter
                                     }) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && addTaskHandler()
    setError(null)
  }

  const addTaskHandler = () => {
    if (newTaskTitle.trim().length > 0) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('')
    } else {
      setError("WTF dude???")
    }
  }

  const onAllTasksHandler = () => changeFilter('all')
  const onActiveTasksHandler = () => changeFilter('active')
  const onCompletedTasksHandler = () => changeFilter('completed')

  return (
    <div>
      <h2>{title}</h2>

      <div>
        <button className={filter === 'all' ? 'activeFilter' : ''}
                onClick={onAllTasksHandler}>All
        </button>
        <button className={filter === 'active' ? 'activeFilter' : ''}
                onClick={onActiveTasksHandler}>Active
        </button>
        <button className={filter === 'completed' ? 'activeFilter' : ''}
                onClick={onCompletedTasksHandler}>Completed
        </button>
      </div>
      <br/>

      <div>
        <input
          type="text"
          className={error ? 'error' : ''}
          value={newTaskTitle}
          placeholder="add new task"
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTaskHandler}>add</button>
        {error && <div className="error-message">{error}</div>}
      </div>

      <ul>
        {tasks.map(t => {
          const onRemoveHandler = () => removeTask(t.id)
          const onChangeStatusHandler = () => changeTaskStatus(t.id)

          return (
            <li className={t.isDone ? 'isDone' : ''} key={t.id}>
              <button onClick={onRemoveHandler}>x</button>
              <input type="checkbox"
                     checked={t.isDone}
                     onChange={onChangeStatusHandler}
              />
              <span>{t.title}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}