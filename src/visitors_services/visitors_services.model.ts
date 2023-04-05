import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Service } from "src/services/services.model";
import { Visitor } from "src/visitors/visitor.model";

interface VisitorServiceCreationAttrs {
    visitor_id: number;
    service_id: number;
}

@Table({ tableName: 'visitors_services' })
export class VisitorService extends Model<VisitorService, VisitorServiceCreationAttrs>{
    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 1, description: 'Ссылка на id посетителя' })
    @ForeignKey(() => Visitor)
    @Column({ type: DataType.INTEGER, allowNull: false, unique: false })
    visitor_id: number;

    @ApiProperty({ example: 1, description: 'Ссылка на id услуги' })
    @ForeignKey(() => Service)
    @Column({ type: DataType.INTEGER, allowNull: false, unique: false })
    service_id: number;
}