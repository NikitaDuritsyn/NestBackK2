import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Client } from "src/clients/client.model";
import { Visitor } from "src/visitors/visitor.model";

interface DeponentCreationAttrs {
    visitor_id: number;
    deponent_value: number;
    status: string;

}

@Table({ tableName: 'deponents' })
export class Deponent extends Model<Deponent, DeponentCreationAttrs>{
    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 1, description: 'Deponent visitor' })
    @ForeignKey(() => Visitor)
    @Column({ type: DataType.INTEGER, allowNull: false })
    visitor_id: number

    @ApiProperty({ example: 1, description: 'Deponent client (если есть)' })
    @ForeignKey(() => Client)
    @Column({ type: DataType.INTEGER })
    client_id: number

    @ApiProperty({ example: 500, description: 'Deponent value' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    value: number

    @ApiProperty({ example: 500, description: 'Deponent status (active/disactive)'})
    @Column({ type: DataType.TEXT, allowNull: false })
    status: string
}