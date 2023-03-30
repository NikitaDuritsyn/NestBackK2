import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Session } from "src/sessions/sessions.model";
import { Visitor } from "src/visitors/visitor.model";

interface TariffCreationAttrs {
    title: string;
    metric: string;
    cost: number;
}

@Table({ tableName: 'tariffs' })
export class Tariff extends Model<Tariff, TariffCreationAttrs>{

    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'По минутам', description: 'Название тарифа' })
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @ApiProperty({ example: 'TimeBased', description: 'Метрики (TimeBased/Fixed)' })
    @Column({ type: DataType.STRING, allowNull: false })
    metric: string;

    @ApiProperty({ example: 300, description: 'Продолжительность по времени в минутах (если Fixed например)' })
    @Column({ type: DataType.INTEGER })
    duration: number;

    @ApiProperty({ example: 500, description: 'Цена за все время' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    cost: number;

    @HasMany(() => Session)
    Session: Session

    @HasMany(() => Visitor)
    Visitor: Visitor
}