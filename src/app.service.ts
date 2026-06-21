import { Injectable } from '@nestjs/common';
// import {Task,tasks} from './FakeDatabase';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppService {
   constructor(private prisma: PrismaService) {}

  // getTasks(userId: string): Task[] {
  //   return tasks.filter((task) => task.userId === userId);}
  async getTasks(userId: string)  {
    const userTasks = await this.prisma.todoListItem.findMany({
      where: {
        userId: userId
      }
    })
    return userTasks;
  } 
  // addTasks(userId: string, newTask: Partial<Task>): Task {
  //   const newlyTask = {
  //     id: tasks.length + 1,
  //     userId,
  //     title: newTask.title!
  //   };
  //   tasks.push(newlyTask);
  //   return newlyTask;}

  async addTask(userId: string, newTask) {
    const createdTask = await this.prisma.todoListItem.create({
      data: {
        userId,
        title: newTask.title
      }
    });
    return createdTask;
  }

  // updateTask(taskId: number, updatedTask: Partial<Task>): Task {
  //   const taskIndex = taskId - 1;
  //   const taskToUpdate = tasks[taskIndex];
  //   const taskAfterUpdate = {
  //     ...taskToUpdate,
  //     ...updatedTask,
  //   };
  //   tasks[taskIndex] = taskAfterUpdate;
  //   return taskAfterUpdate;}

  async updateTask(userId: string, updatedTask: { id: string; title: string }) {
    const taskToUpdate = await this.prisma.todoListItem.findUnique({
      where: {
        id: updatedTask.id
      }
    });
    if (!taskToUpdate || taskToUpdate.userId !== userId) {
      throw new Error('Task not found or unauthorized');
    }
    const taskAfterUpdate = await this.prisma.todoListItem.update({
      where: {
        id: updatedTask.id
      },
      data: {
        title: updatedTask.title
      }
    });
    return taskAfterUpdate;
  }

  // deleteTask(taskId: number): Task[] {
  //   const taskIndex = tasks.findIndex((task) => task.id === taskId);
  //   tasks.splice(taskIndex, 1);
  //   return (tasks);}

  async deleteTask(userId: string, taskId: string) {
    const taskToDelete = await this.prisma.todoListItem.findUnique({
      where: {
        id: taskId
      }
    });
    if (!taskToDelete || taskToDelete.userId !== userId) {
      throw new Error('Task not found or unauthorized');
    }
    const deletedTask = await this.prisma.todoListItem.delete({
      where: {
        id: taskId,
      },
    });
    return { message: `${deletedTask.title} Completed` };
  }

}
