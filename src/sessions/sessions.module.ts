import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tariff } from 'src/tariffs/tariffs.model';
import { Visitor } from 'src/visitors/visitor.model';
import { SessionsController } from './sessions.controller';
import { Session } from './sessions.model';
import { SessionsService } from './sessions.service';
import { Room } from 'src/rooms/rooms.model';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService],
  imports: [
    SequelizeModule.forFeature([Session, Tariff, Visitor, Room])
  ]
})
export class SessionsModule {}
