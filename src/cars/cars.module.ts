import { Module } from '@nestjs/common';
import { CarService } from './cars.service';
import { CarController } from './cars.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Car} from "./cars.model";

@Module({
  providers: [CarService],
  controllers: [CarController],
  imports: [
    SequelizeModule.forFeature([User, Car])
  ]
})
export class CarsModule {}
