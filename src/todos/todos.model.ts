import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { Column, DataType, Model, Table } from "sequelize-typescript";


@Table({ tableName: 'todos' })
export class Todo extends Model<Todo>{
    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Помыть пол', description: 'title' })
    @Column({ type: DataType.TEXT, allowNull: false })
    title: string;

    @ApiProperty({ example: 'Швабра ты находится в туалете, там же и ведро, с водой понятно', description: 'description' })
    @Column({ type: DataType.TEXT, allowNull: false })
    description: string;

    @ApiProperty({ example: true, description: 'Флаг выполнена задача или нет' })
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    done: boolean;
}