import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tariff } from 'src/tariffs/tariffs.model';
import { Visitor } from 'src/visitors/visitor.model';
import { SessionsController } from './sessions.controller';
import { Session } from './sessions.model';
import { SessionsService } from './sessions.service';
import { Room } from 'src/rooms/rooms.model';
import { VisitorsModule } from 'src/visitors/visitors.module';
import { SessionsRoomsModule } from 'src/sessions_rooms/sessions_rooms.module';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService],
  imports: [
    SequelizeModule.forFeature([Session, Tariff, Visitor, Room]),
    forwardRef(() => VisitorsModule),
    SessionsRoomsModule
  ],
  exports:[
    SessionsService
  ]
})
export class SessionsModule { }
