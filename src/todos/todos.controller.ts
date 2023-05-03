import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { Todo } from './todos.model';
import { CreateTodoDto } from './dto/create-todo.dto';

@ApiTags('Сессии')
@Controller('/api')
export class TodosController {
    constructor(private todosServices: TodosService) { }

    @ApiOperation({ summary: 'Создание задачи' })
    @ApiResponse({ status: 200, type: Todo })
    @Post('/create_todo')
    createTodo(@Body() TodoDto: CreateTodoDto) {
        return this.todosServices.createTodo(TodoDto)
    }

    @ApiOperation({ summary: 'Создание задачи' })
    @ApiResponse({ status: 200, type: Todo })
    @Post('/update_todo/:id')
    updateTodo(@Body() TodoDto: CreateTodoDto, @Param('id') todoId: number) {
        return this.todosServices.updateTodo(TodoDto, todoId)
    }

    @ApiOperation({ summary: 'Получить весь лист задач' })
    @ApiResponse({ status: 200, type: [Todo] })
    @Get('/get_todos')
    getAllTodos() {
        return this.todosServices.getAllTodos()
    }


}
