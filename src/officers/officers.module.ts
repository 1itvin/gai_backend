import { Module } from '@nestjs/common';
import { OfficerService } from './officers.service';
import { OfficersController } from './officers.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Rank} from "../ranks/ranks.model";
import {Officer} from "./officers.model";

@Module({
  providers: [OfficerService],
  controllers: [OfficersController],
  imports: [
    SequelizeModule.forFeature([User, Rank, Officer])
  ]
})
export class OfficersModule {}
