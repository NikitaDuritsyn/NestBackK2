import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Visitor } from "src/visitors/visitor.model";
import { VisitorService } from "src/visitors_services/visitors_services.model";

interface ServiceCreationAttrs {
    title: string;
    price: number;
}

@Table({ tableName: 'services' })
export class Service extends Model<Service, ServiceCreationAttrs>{

    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Кальян', description: 'Название услуги' })
    @Column({ type: DataType.TEXT, allowNull: false })
    title: string;

    @ApiProperty({ example: 700, description: 'Цена за услугу' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    price: number;

    @BelongsToMany(() => Visitor, () => VisitorService)
    Visitors: Visitor[];
}