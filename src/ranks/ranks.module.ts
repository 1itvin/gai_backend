import {Module} from '@nestjs/common';
import {RanksService} from './ranks.service';
import {RanksController} from './ranks.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Rank} from "./ranks.model";

@Module({
  providers: [RanksService],
  controllers: [RanksController],
  imports: [
  SequelizeModule.forFeature([Rank/*, Officers*/])
  ],
  exports: [
    RanksService
  ]
})
export class RanksModule {}
