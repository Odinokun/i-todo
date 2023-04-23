import { ChangeEvent, KeyboardEvent, FC, useState } from 'react';
import { IFilterValues, ITasks } from '../App';

interface IProps {
  todolistId: string
  title: string
  tasks: Array<ITasks>
  addTask: (title: string, todolistId: string) => void
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: keyof IFilterValues, todolistId: string) => void
  changeTaskStatus: (taskId: string, todolistId: string) => void
  filter: keyof IFilterValues
  removeTodolist: (todolistId: string) => void
}

export const Todolist: FC<IProps> = ({
  todolistId,
  title,
  tasks,
  addTask,
  removeTask,
  changeFilter,
  changeTaskStatus,
  filter,
  removeTodolist
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
      addTask(newTaskTitle.trim(), todolistId);
      setNewTaskTitle('')
    } else {
      setError("WTF dude???")
    }
  }

  const onRemoveTodolistHandler = () => {
    removeTodolist(todolistId)
  }

  const onAllTasksHandler = () => changeFilter('all', todolistId)
  const onActiveTasksHandler = () => changeFilter('active', todolistId)
  const onCompletedTasksHandler = () => changeFilter('completed', todolistId)

  return (
    <div>
      <div>
        <button onClick={onRemoveTodolistHandler} >delete todolist</button>
        <h2>{title}</h2>
      </div>

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
      <br />

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
          const onRemoveHandler = () => removeTask(t.id, todolistId)
          const onChangeStatusHandler = () => changeTaskStatus(t.id, todolistId)

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