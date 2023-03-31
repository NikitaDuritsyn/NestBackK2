import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Room } from "src/rooms/rooms.model";
import { Session } from "src/sessions/sessions.model";

interface SessionRoomCreationAttrs {
    room_id: number;
    session_id: number;
}

@Table({ tableName: 'sessions_rooms' })
export class SessionRoom extends Model<SessionRoom, SessionRoomCreationAttrs>{
    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 1, description: 'Ссылка на id комнаты' })
    @ForeignKey(() => Room)
    @Column({ type: DataType.INTEGER, allowNull: false })
    room_id: number;

    @ApiProperty({ example: 1, description: 'Ссылка на id сессии' })
    @ForeignKey(() => Session)
    @Column({ type: DataType.INTEGER, allowNull: false })
    session_id: number;
}