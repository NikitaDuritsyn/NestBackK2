import { Injectable } from '@nestjs/common';
import { Todo } from './todos.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    constructor(@InjectModel(Todo) private todoRepository: typeof Todo) {
        this.updateTasks();
        setInterval(() => {
            this.updateTasks();
        }, 30 * 60 * 1000); // Запускать обновление каждые полчаса (30 минут)
    }


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

    async updateTasks() {
        const tasks = await this.todoRepository.findAll();

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const tasksToUpdate = tasks.filter(task => {
            const updatedAt = new Date(task.updatedAt);
            return updatedAt < todayStart || updatedAt > todayEnd;
        });

        for (const task of tasksToUpdate) {
            await this.todoRepository.update({ done: false }, { where: { id: task.id } });
        }
    }
}
