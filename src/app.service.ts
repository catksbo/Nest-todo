import { Injectable } from '@nestjs/common';
import {Task,tasks} from './FakeDatabase';

@Injectable()
export class AppService {
   
  getTasks(userId: string): Task[] {
    return tasks.filter((task) => task.userId === userId);
  }
  addTasks(userId: string, newTask: Partial<Task>): Task {
    const newlyTask = {
      id: tasks.length + 1,
      userId,
      title: newTask.title!
    };
    tasks.push(newlyTask);
    return newlyTask;
  }

  updateTask(taskId: number, updatedTask: Partial<Task>): Task {
    const taskIndex = taskId - 1;
    const taskToUpdate = tasks[taskIndex];
    const taskAfterUpdate = {
      ...taskToUpdate,
      ...updatedTask,
    };
    tasks[taskIndex] = taskAfterUpdate;
    return taskAfterUpdate;
  }

  deleteTask(taskId: number): Task[] {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    tasks.splice(taskIndex, 1);
    return (tasks);
  }

}
