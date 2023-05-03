import { Injectable } from '@nestjs/common';
import { Todo } from './todos.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    constructor(@InjectModel(Todo) private todoRepository: typeof Todo) { }

    async getAllTodos() {
        const todos = (await this.todoRepository.findAll()).sort((a, b) => a.id - b.id);
        return todos
    }

    async updateTodo(dto: CreateTodoDto, todoId: number) {
        await this.todoRepository.update(dto, { where: { id: todoId } })
        return { massage: `Задача ${dto.title} изменена` }
    }

    async createTodo(dto: CreateTodoDto) {
        const todo = await this.todoRepository.create(dto)
        return todo
    }
}
