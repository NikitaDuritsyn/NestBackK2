import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
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
import { RolesModule } from './roles/roles.module';
import { UsersRolesModule } from './users_roles/users_roles.module';
import { TodosModule } from './todos/todos.module';

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
      models: [],
      autoLoadModels: true,
      logging: false, // для тогоа чтобы не писал мне лям запросов 
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
    RolesModule,
    UsersRolesModule,
    TodosModule,
  ],
  controllers: [],
})
export class AppModule { }
