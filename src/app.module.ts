import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RoomsModule } from './rooms/rooms.module';
import { ServicesModule } from './services/services.module';
import { TariffsModule } from './tariffs/tariffs.module';
import { PaymentTypesModule } from './payment_types/payment_types.module';
import { SessionsModule } from './sessions/sessions.module';
import { ClientsModule } from './clients/clients.module';
import { VisitorsModule } from './visitors/visitors.module';
import { DepositsModule } from './deposits/deposits.module';
import { DeponentsModule } from './deponents/deponents.module';
import { VisitorsServicesModule } from './visitors_services/visitors_services.module';
import { SessionsRoomsModule } from './sessions_rooms/sessions_rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.${process.env.NODE_ENV}.env`],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User],
      autoLoadModels: true, // Для создания моделей в базе данных на основе самих моделей
    }),
    UsersModule,
    RoomsModule,
    ServicesModule,
    TariffsModule,
    PaymentTypesModule,
    SessionsModule,
    ClientsModule,
    VisitorsModule,
    DepositsModule,
    DeponentsModule,
    VisitorsServicesModule,
    SessionsRoomsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
