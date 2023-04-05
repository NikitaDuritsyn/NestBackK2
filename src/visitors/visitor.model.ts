import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table, Unique } from "sequelize-typescript";
import { Client } from "src/clients/client.model";
import { Deponent } from "src/deponents/deponents.model";
import { Deposit } from "src/deposits/deposits.model";
import { Service } from "src/services/services.model";
import { Session } from "src/sessions/sessions.model";
import { Tariff } from "src/tariffs/tariffs.model";
import { VisitorService } from "src/visitors_services/visitors_services.model";

interface VisitorCreationAttrs {
    session_id: number;
    tariff_id: number;
    name: string;
    status: string;
}

@Table({ tableName: 'visitors' })
export class Visitor extends Model<Visitor, VisitorCreationAttrs>{
    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 1, description: 'Visitor Session' })
    @ForeignKey(() => Session)
    @Column({ type: DataType.INTEGER, allowNull: false })
    session_id: number;

    @ApiProperty({ example: 1, description: 'Visitor tariff' })
    @ForeignKey(() => Tariff)
    @Column({ type: DataType.INTEGER, allowNull: false })
    tariff_id: number;

    @ApiProperty({ example: 1, description: 'Если есть номер то есть ссылка на клиента' })
    @ForeignKey(() => Client)
    @Column({ type: DataType.INTEGER })
    client_id: number;

    @ApiProperty({ example: new Date, description: 'Время начала старта сессии для посетителя' })
    @Column({ type: DataType.DATE })
    start_time_visitor: Date;

    @ApiProperty({ example: new Date, description: 'Время конца старта сессии для посетителя' })
    @Column({ type: DataType.DATE })
    end_time_visitor: Date;

    @ApiProperty({ example: 'Nikita', description: 'Имя посетителя' })
    @Column({ type: DataType.TEXT, allowNull: false })
    name: string;

    @ApiProperty({ example: 'booked', description: 'Статус посетителя (booked/active/close/disactive)' })
    @Column({ type: DataType.TEXT, allowNull: false })
    status: string;

    @HasMany(() => Deponent)
    Deponent: Deponent;

    @HasMany(() => Deposit)
    Deposit: Deposit;

    @BelongsToMany(() => Service, () => VisitorService)
    Services: Service[];
}