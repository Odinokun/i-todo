import { FC } from 'react';
import { IFilterValues, ITasks } from '../App';
import { AddItemForm } from './AddItemForm';

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
  const onRemoveTodolistHandler = () => {
    removeTodolist(todolistId)
  }

  const onAllTasksHandler = () => changeFilter('all', todolistId)
  const onActiveTasksHandler = () => changeFilter('active', todolistId)
  const onCompletedTasksHandler = () => changeFilter('completed', todolistId)

  return (
    <div>
      <div>
        <button onClick={onRemoveTodolistHandler}>delete todolist</button>
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
      <br/>

      <AddItemForm todolistId={todolistId} addItem={addTask}/>

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