import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Deponent } from "src/deponents/deponents.model";
import { Deposit } from "src/deposits/deposits.model";
import { Visitor } from "src/visitors/visitor.model";

interface ClientCreationAttrs {
    name: string;
    number_phone: string;
}

@Table({ tableName: 'clients' })
export class Client extends Model<Client, ClientCreationAttrs>{
    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: "Nikita", description: 'Client Name' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @ApiProperty({ example: "Romanov", description: 'Client lastname' })
    @Column({ type: DataType.STRING })
    lastname: string;

    @ApiProperty({ example: "79085060871", description: 'Client phone' })
    @Column({ type: DataType.STRING, allowNull: false })
    number_phone: string;

    @ApiProperty({ example: "active", description: 'Client status (active/disactive)' })
    @Column({ type: DataType.STRING })
    status: string;

    @HasMany(() => Visitor)
    Visitor: Visitor
    @HasMany(() => Deponent)
    Deponent: Deponent
    @HasMany(() => Deposit)
    Deposit: Deposit
}