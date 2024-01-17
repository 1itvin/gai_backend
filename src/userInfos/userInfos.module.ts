import { Module } from '@nestjs/common';
import { UserInfoService } from './userInfos.service';
import { UserInfoController } from './userInfos.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {UserInfo} from "./userInfos.model";

@Module({
  providers: [UserInfoService],
  controllers: [UserInfoController],
  imports: [
    SequelizeModule.forFeature([User, UserInfo])
  ]
})
export class UserInfoModule {}
