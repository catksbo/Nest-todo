import { Controller, Delete, Get, Param, Post, Body, Put, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
// import type {Task} from './FakeDatabase';
import { AuthGuard } from './auth/auth.guard';
import { CreateTaskDto } from './Dto/CreateTask.dto';
import { UpdateTaskDto } from './Dto/UpdateTask.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ResGetTaskDto } from './Dto/ResGetTask.dto';

@ApiBearerAuth()
@ApiTags('Application')
@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get(':id')
  // getTasks(@Param('id') id: string): Task[] {
  //   const userId = id;
  //   return this.appService.getTasks(userId);
  // }
  @UseGuards(AuthGuard)
  @Get('')
  @ApiOperation({ summary: 'Find all tasks of user' })
  @ApiOkResponse({description: 'Tasks fetched successfully', type: [ResGetTaskDto]})
  getTasks(@Req() req) {
    return this.appService.getTasks(req.user.sub);
  }

  // @Post(':id')
  // addTask(@Body() newTask: Partial<Task>, @Param('id') id: string): Task | undefined {
  //   const userId = id;
  //   if (!newTask.title) return undefined
  //   return this.appService.addTasks(userId, newTask);
  // }

  @UseGuards(AuthGuard)
  @Post('')
  @ApiOperation({ summary: 'Add task for user' })
  // @ApiBody({
  // type: CreateTaskDto})
  @ApiOkResponse({
  description: 'Task created successfully',
  type: ResGetTaskDto
})
  addTask(@Body() newTask: CreateTaskDto, @Req() req) {
    const userId = req.user.sub;
    if (!newTask.title) return undefined
    return this.appService.addTask(userId, newTask);
  }

  // @Put(':id')
  // updateTask(@Param('id') id: string, @Body() updatedTask: Partial<Task>): Task | undefined {
  //   const taskId = +id;
  //   if (!updatedTask.title) return undefined
  //   return this.appService.updateTask(taskId, updatedTask);
  // }

  @UseGuards(AuthGuard)
  @Put('')
  updateTask(@Body() updatedTask: UpdateTaskDto, @Req() req) {
    const userId = req.user.sub;
    if (!updatedTask.title || !updatedTask.id) return undefined
    return this.appService.updateTask(userId, updatedTask);
  }

  // @Delete(':id')
  // deleteTask(@Param('id') id: string): Task[] {
  //   const taskId = +id;
  //   return this.appService.deleteTask(taskId);
  // }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteTask(@Param('id') taskId: string, @Req() req) {
    const userId = req.user.sub;
    return this.appService.deleteTask(userId, taskId);
  }

}
