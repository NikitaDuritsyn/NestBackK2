import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Deponent } from "src/deponents/deponents.model";
import { Deposit } from "src/deposits/deposits.model";

interface PaymentTypeCreationAttrs {
    title: string;
    type: string;
}

@Table({ tableName: 'payment_types' })
export class PaymentType extends Model<PaymentType, PaymentTypeCreationAttrs>{

    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Наличая оплата', description: 'Название типа оплаты' })
    @Column({ type: DataType.TEXT, allowNull: false })
    title: string;

    @ApiProperty({ example: 'Cash', description: 'Тип оплаты' })
    @Column({ type: DataType.TEXT, allowNull: false })
    type: string;

    @HasMany(() => Deposit)
    Deposit: Deposit
    @HasMany(() => Deponent)
    Deponent: Deposit
}