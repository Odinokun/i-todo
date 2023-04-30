import React, { FC } from 'react';
import { Delete, Favorite, FavoriteBorder } from '@material-ui/icons';
import { Button, Checkbox, Grid, IconButton } from '@material-ui/core';

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
      <Grid container>
        <h3>
          <EditableSpan title={ title } onChange={ onChangeTodolistTitle }/>
        </h3>
        <IconButton onClick={ onRemoveTodolistHandler }>
          <Delete/>
        </IconButton>
      </Grid>
      <div>
        <Button
          color="primary"
          variant={ filter === 'all' ? 'contained' : 'outlined' }
          onClick={ onAllTasksHandler }
        >
          All
        </Button>
        <Button
          color="default"
          variant={ filter === 'active' ? 'contained' : 'outlined' }
          onClick={ onActiveTasksHandler }
        >
          Active
        </Button>
        <Button
          color="secondary"
          variant={ filter === 'completed' ? 'contained' : 'outlined' }
          onClick={ onCompletedTasksHandler }
        >
          Completed
        </Button>
      </div>
      <br/>
      <AddItemForm addItem={ addTaskHandler }/>

      { tasks.map(t => {
        const onRemoveHandler = () => removeTask(todolistId, t.id);
        const onChangeStatusHandler = () => changeTaskStatus(todolistId, t.id);
        const onChangeTitleHandler = (value: string) => changeTaskTitle(todolistId, t.id, value);

        return (
          <div className={ t.isDone ? 'isDone' : '' } key={ t.id }>
            <Checkbox
              checked={ t.isDone }
              color="primary"
              onChange={ onChangeStatusHandler }
              icon={ <FavoriteBorder/> }
              checkedIcon={ <Favorite/> }
            />
            <EditableSpan title={ t.title } onChange={ onChangeTitleHandler }/>
            <Button onClick={ onRemoveHandler }>
              <Delete/>
            </Button>
          </div>
        );
      }) }
    </div>
  );
};