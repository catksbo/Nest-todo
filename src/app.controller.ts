import { Controller, Delete, Get, Param, Post, Body, Put, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import type {Task} from './FakeDatabase';
import { AuthGuard } from './auth/auth.guard';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get(':id')
  // getTasks(@Param('id') id: string): Task[] {
  //   const userId = id;
  //   return this.appService.getTasks(userId);
  // }
  @UseGuards(AuthGuard)
  @Get('tasks')
  getTasks(@Req() req) {
    return this.appService.getTasks(req.user.sub);
  }

  // @Post(':id')
  // addTask(@Body() newTask: Partial<Task>, @Param('id') id: string): Task | undefined {
  //   const userId = id;
  //   if (!newTask.title) return undefined
  //   return this.appService.addTasks(userId, newTask);
  // }

  // @Put(':id')
  // updateTask(@Param('id') id: string, @Body() updatedTask: Partial<Task>): Task | undefined {
  //   const taskId = +id;
  //   if (!updatedTask.title) return undefined
  //   return this.appService.updateTask(taskId, updatedTask);
  // }

  // @Delete(':id')
  // deleteTask(@Param('id') id: string): Task[] {
  //   const taskId = +id;
  //   return this.appService.deleteTask(taskId);
  // }

  

}
