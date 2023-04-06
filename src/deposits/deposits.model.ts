import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Client } from "src/clients/client.model";
import { PaymentType } from "src/payment_types/payment_types.model";
import { Visitor } from "src/visitors/visitor.model";

interface DepositsCreationAttrs {
    visitor_id: number
    payment_type_id: number
    client_id: number
    deposit_value: number
}

@Table({ tableName: 'deposits' })
export class Deposit extends Model<Deposit, DepositsCreationAttrs>{
    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 1, description: 'Deposit visitor' })
    @ForeignKey(() => Visitor)
    @Column({ type: DataType.INTEGER, allowNull: false })
    visitor_id: number

    @ApiProperty({ example: 1, description: 'Deposit тип оплаты' })
    @ForeignKey(() => PaymentType)
    @Column({ type: DataType.INTEGER, allowNull: false })
    payment_type_id: number

    @ApiProperty({ example: 1, description: 'Deposit client' })
    @ForeignKey(() => Client)
    @Column({ type: DataType.INTEGER, allowNull: false })
    client_id: number

    @ApiProperty({ example: 1000, description: 'Deposit value' })
    @Column({ type: DataType.FLOAT, allowNull: false })
    value: number
}