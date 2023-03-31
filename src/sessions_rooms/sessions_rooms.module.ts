import { Module } from '@nestjs/common';
import { SessionsRoomsController } from './sessions_rooms.controller';
import { SessionsRoomsService } from './sessions_rooms.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SessionRoom } from './sessions_rooms.model';
import { Session } from 'src/sessions/sessions.model';
import { Room } from 'src/rooms/rooms.model';

@Module({
  controllers: [SessionsRoomsController],
  providers: [SessionsRoomsService],
  imports: [
    SequelizeModule.forFeature([SessionRoom, Session, Room])
  ],
  exports:[
    SessionsRoomsService
  ]
})
export class SessionsRoomsModule { }
