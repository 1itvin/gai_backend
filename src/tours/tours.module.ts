import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import {SequelizeModule} from "@nestjs/sequelize";
// import {User} from "../users/users.model";
// import {Role} from "../roles/roles.model";
// import {UserRoles} from "../roles/user-roles.model";
import {Tour} from "./tours.model";
import {FilesModule} from "../files/files.module";

@Module({
  providers: [ToursService],
  controllers: [ToursController],
  imports: [
    SequelizeModule.forFeature([/*User,*/ Tour]),
      FilesModule
  ]
})
export class ToursModule {}
