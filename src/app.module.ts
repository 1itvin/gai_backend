import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {SequelizeModule} from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import {Rank} from "./ranks/ranks.model";
import {Officer} from "./officers/officers.model";
import { UserInfosModule } from './userInfos/userInfos.module';
import {UserInfo} from "./userInfos/userInfos.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';
import { AppLoggerMiddleware } from "./middleware/httplogger.middleware";
import { LoggerModule } from './logger/logger.module';
import { RanksModule } from "./ranks/ranks.module";
import { OfficersModule } from "./officers/officers.module";
import { CarsModule } from "./cars/cars.module";
import { Car } from "./cars/cars.model";
import { Violation } from "./violations/violations.model";
import { ViolationsModule } from "./violations/violations.module";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
        //    envFilePath: `./.env`,
           isGlobal: true
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve( __dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, UserInfo, Role, UserRoles, Rank, Officer, Car, Violation],
            autoLoadModels: true,

            // PORT=5000
            // POSTGRES_HOST=localhost
            // POSTGRES_USER=dav
            // POSTGRES_DB=gai2
            // POSTGRESS_PASSWORD=1234
            // POSTGRESS_PORT=5432
            // PRIVATE_KEY=secret_key_1111
            
            synchronize: true,
            
        }),
        AuthModule,
        UsersModule,
        UserInfosModule,
        RolesModule,
        RanksModule,
        OfficersModule,
        CarsModule,
        ViolationsModule,

        FilesModule,
        LoggerModule,
    ]
})
export class AppModule implements NestModule { 
    configure(consumer: MiddlewareConsumer): void { 
      consumer.apply(AppLoggerMiddleware).forRoutes('*'); 
    } 
  }
