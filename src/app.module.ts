import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import {Posts} from "./posts/posts.model";
import { ToursModule } from './tours/tours.module';
import {Tour} from "./tours/tours.model";
import { RecordModule } from './records/records.module';
import {Record} from "./records/records.model";
import { ReviewModule } from './reviews/reviews.module';
import {Review} from "./reviews/reviews.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';

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
            models: [User, Role, UserRoles, Posts, Tour, Record, Review],
            autoLoadModels: true,

            // dialect: 'postgres',
            // host: 'localhost',
            // port: 5432,
            // username: 'dav',
            // password: '1234',
            // database: 'travel_agency',
            // models: [User, Role, UserRoles, Posts, Tour, Record, Review],
            // autoLoadModels: true
            
            synchronize: true,
            
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        ToursModule,
        RecordModule,
        ReviewModule,
        FilesModule,
    ]
})
export class AppModule {}
