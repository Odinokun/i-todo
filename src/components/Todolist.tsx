import { FC } from 'react';
import { IFilterValues, ITasks } from '../App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

interface IProps {
  todolistId: string;
  title: string;
  tasks: Array<ITasks>;
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, id: string) => void;
  changeFilter: (todolistId: string, value: keyof IFilterValues) => void;
  changeTaskStatus: (todolistId: string, taskId: string) => void;
  filter: keyof IFilterValues;
  removeTodolist: (todolistId: string) => void;
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void;
  changeTodolistTitle: (todolistId: string, newTitle: string) => void;
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
                                       removeTodolist,
                                       changeTaskTitle,
                                       changeTodolistTitle,
                                     }) => {
  const onRemoveTodolistHandler = () => removeTodolist(todolistId);
  const onChangeTodolistTitle = (newTitle: string) => changeTodolistTitle(todolistId, newTitle);

  const onAllTasksHandler = () => changeFilter(todolistId, 'all');
  const onActiveTasksHandler = () => changeFilter(todolistId, 'active');
  const onCompletedTasksHandler = () => changeFilter(todolistId, 'completed');

  const addTaskHandler = (title: string) => addTask(todolistId, title);


  return (
    <div>
      <div>
        <button onClick={ onRemoveTodolistHandler }>delete todolist</button>
        <h2>
          <EditableSpan title={ title } onChange={ onChangeTodolistTitle }/>
        </h2>
      </div>
      <div>
        <button className={ filter === 'all' ? 'activeFilter' : '' }
                onClick={ onAllTasksHandler }>All
        </button>
        <button className={ filter === 'active' ? 'activeFilter' : '' }
                onClick={ onActiveTasksHandler }>Active
        </button>
        <button className={ filter === 'completed' ? 'activeFilter' : '' }
                onClick={ onCompletedTasksHandler }>Completed
        </button>
      </div>
      <br/>
      <AddItemForm addItem={ addTaskHandler }/>
      <ul>
        { tasks.map(t => {
          const onRemoveHandler = () => removeTask(todolistId, t.id);
          const onChangeStatusHandler = () => changeTaskStatus(todolistId, t.id);
          const onChangeTitleHandler = (value: string) => changeTaskTitle(todolistId, t.id, value);

          return (
            <li className={ t.isDone ? 'isDone' : '' } key={ t.id }>
              <button onClick={ onRemoveHandler }>x</button>
              <input type="checkbox"
                     checked={ t.isDone }
                     onChange={ onChangeStatusHandler }
              />
              <EditableSpan title={ t.title } onChange={ onChangeTitleHandler }/>
            </li>
          );
        }) }
      </ul>
    </div>
  );
};