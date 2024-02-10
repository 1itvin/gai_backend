import { Module } from '@nestjs/common';
import { ViolationService } from './violations.service';
import { ViolationController } from './violations.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Violation} from "./violations.model";

@Module({
  providers: [ViolationService],
  controllers: [ViolationController],
  imports: [
    SequelizeModule.forFeature([User, Violation])
  ]
})
export class ViolationsModule {}
