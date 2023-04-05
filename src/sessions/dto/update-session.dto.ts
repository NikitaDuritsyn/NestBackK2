import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class UpdateSessionDto {
    @ApiProperty({ example: new Date, description: 'booked date for session' })
    booked_date: Date;

    @ApiProperty({ example: 60, description: 'estimate session duration in minute' })
    estimate_session_duration: number;

    @ApiProperty({ example: 5, description: 'estimate visitors number in session' })
    estimate_visitors_num: number;

    @ApiProperty({ example: new Date, description: 'time start session' })
    start_time_session: Date;

    @ApiProperty({ example: new Date, description: 'time end session' })
    end_time_session: Date;

    @ApiProperty({ example: 'booked', description: 'Session status "booked/active/close/disactive"' })
    status: string;

    @ApiProperty({ example: 1, description: 'Session tariff' })
    tariff_id: number;
}