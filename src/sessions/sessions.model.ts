import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Room } from "src/rooms/rooms.model";
import { SessionRoom } from "src/sessions_rooms/sessions_rooms.model";
import { Tariff } from "src/tariffs/tariffs.model";
import { Visitor } from "src/visitors/visitor.model";

@Table({ tableName: 'sessions' })
export class Session extends Model<Session>{
    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: new Date, description: 'booked date for session' })
    @Column({ type: DataType.DATE, allowNull: false })
    booked_date: Date;

    @ApiProperty({ example: 60, description: 'estimate session duration in minute' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    estimate_session_duration: number;

    @ApiProperty({ example: 5, description: 'estimate visitors number in session' })
    @Column({ type: DataType.INTEGER })
    estimate_visitors_num: number;

    @ApiProperty({ example: new Date, description: 'time start session' })
    @Column({ type: DataType.DATE })
    start_time_session: Date;

    @ApiProperty({ example: new Date, description: 'time end session' })
    @Column({ type: DataType.DATE })
    end_time_session: Date;

    @ApiProperty({ example: 'booked', description: 'Session status "booked/active/close/disactive"' })
    @Column({ type: DataType.TEXT, allowNull: false })
    status: string;

    @ApiProperty({ example: 1, description: 'Session tariff' })
    @ForeignKey(() => Tariff)
    @Column({ type: DataType.INTEGER, allowNull: false })
    tariff_id: number;

    @HasMany(() => Visitor)
    Visitor: Visitor
    @BelongsToMany(() => Room, () => SessionRoom)
    Rooms: Room[]
}