import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {CreateRankDto} from "./dto/create-rank.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Rank} from "./ranks.model";
import { UpdateRankDto } from "./dto/update-rank.dto";

@Injectable()
export class RanksService {

    constructor(@InjectModel(Rank) private rankRepository: typeof Rank) {}

    async createRank(dto: CreateRankDto) {
        const rank = await this.rankRepository.create(dto);
        return rank;
    }

    async getRankByValue(value: string) {
      const rank = await this.rankRepository.findOne({where: {value}})
      return rank;
  }  

    async getRankByID(id: number) {
      const rank = await this.rankRepository.findOne({
          where: { id: id },
          include: { all: true }
      });
      return rank;
    }

    async updateRank(rankId: number, updateDto: UpdateRankDto) {
        const rank = await this.rankRepository.findByPk(rankId);
        if (!rank) {
          throw new HttpException(
            "Такой роли не существует",
            HttpStatus.BAD_REQUEST
          );
        }
    
        rank.update(updateDto);
        return rank;
      }

    async getAllRanks() {
        return await this.rankRepository.findAll();
      }

      async deleteRank(rankId: number) {
        const candidate = await this.rankRepository.findOne({
          where: { id: rankId },
        });
        if (!candidate) {
          throw new HttpException(
            "Такой роли не существует",
            HttpStatus.BAD_REQUEST
          );
        }
        await this.rankRepository.destroy({ where: { id: rankId } });
        return { message: "Роль успешно удалёна" };
      }
}
