import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateTodoDto {
    @ApiProperty({ example: 'Помыть пол', description: 'title' })
    title: string;

    @ApiProperty({ example: 'Швабра ты находится в туалете, там же и ведро, с водой понятно', description: 'description' })
    description: string;

    @ApiProperty({ example: true, description: 'Флаг выполнена задача или нет' })
    done: boolean;
}