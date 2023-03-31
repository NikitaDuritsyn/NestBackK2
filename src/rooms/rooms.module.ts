import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoomsController } from './rooms.controller';
import { Room } from './rooms.model';
import { RoomsService } from './rooms.service';
import { Session } from 'src/sessions/sessions.model';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [
    SequelizeModule.forFeature([Room, Session])
  ]
})
export class RoomsModule { }
