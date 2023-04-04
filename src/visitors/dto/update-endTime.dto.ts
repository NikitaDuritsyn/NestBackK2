import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class UpdateEndTimeDto {
    @ApiProperty({ example: 2, description: 'id сессии' })
    sessionId: number;

    @ApiProperty({ example: '2023-04-04T14:55:22.080Z', description: 'дата конца течения времени пользователя в сессии' })
    endTime: Date;

    @ApiProperty({ example: [1, 2, 3, 4], description: 'массив пользователей в сессии время которыйх нужно сделать update' })
    visitorsId: [number];
}