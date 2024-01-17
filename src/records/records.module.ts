import { Module } from '@nestjs/common';
import { RecordService } from './records.service';
import { RecordController } from './records.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Tour} from "../tours/tours.model";
// import {Role} from "../roles/roles.model";
// import {UserRoles} from "../roles/user-roles.model";
import {Record} from "./records.model";
// import {FilesModule} from "../files/files.module";

@Module({
  providers: [RecordService],
  controllers: [RecordController],
  imports: [
    SequelizeModule.forFeature([User, Tour, Record])/*,
      FilesModule*/
  ]
})
export class RecordModule {}
