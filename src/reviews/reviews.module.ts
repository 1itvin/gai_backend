import { Module } from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { ReviewController } from './reviews.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Tour} from "../tours/tours.model";
// import {Role} from "../roles/roles.model";
// import {UserRoles} from "../roles/user-roles.model";
import {Review} from "./reviews.model";
// import {FilesModule} from "../files/files.module";

@Module({
  providers: [ReviewService],
  controllers: [ReviewController],
  imports: [
    SequelizeModule.forFeature([User, Tour, Review])/*,
      FilesModule*/
  ]
})
export class ReviewModule {}
