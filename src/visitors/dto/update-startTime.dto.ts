import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class UpdateStartTimeDto {
    @ApiProperty({ example: 2, description: 'id сессии' })
    sessionId: number;

    @ApiProperty({ example: '2023-04-04T14:55:22.080Z', description: 'дата начала старта течения времени пользователя в сессии' })
    startTime: Date;

    @ApiProperty({ example: [1,2,3,4], description: 'массив пользователей в сессии время которыйх сделать update' })
    visitorsId: [number];
}