import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface RoomCreationAttrs {
    title: string;
}

@Table({ tableName: 'rooms' })
export class Room extends Model<Room, RoomCreationAttrs>{

    @ApiProperty({example: 1, description:'unic PK for room'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: 'Окно в небо 1', description:'Название комнаты'})
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @ApiProperty({example: '#ff00ff', description:'Цвет комнаты'})
    @Column({ type: DataType.STRING })
    color: string;
}