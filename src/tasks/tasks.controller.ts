import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';

import { TasksService } from './tasks.service';
import { updateTaskStatus } from './update-task-status.dto';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard()) 
export class TasksController {
  private logger = new Logger('TaskController');

  constructor(private taskService: TasksService) {}


  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }


  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)} `)
    return this.taskService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id') id: string,
    @GetUser() user: User,
    ): Promise<void> {
    return this.taskService.deleteTask(id,user);
  }


  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: updateTaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status, user);
  }

 
  @Get()
  getTask(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`user "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)} `)
    return this.taskService.getTasks(filterDto, user);
  }
}
