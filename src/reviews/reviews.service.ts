import {CreateReviewDto} from "./dto/create-reviews.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Review} from "./reviews.model";
// import {FilesService} from "../files/files.service";
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateReviewDto } from "./dto/update-reviews.dto";

@Injectable()
export class ReviewService {

    constructor(@InjectModel(Review) private recordRepository: typeof Review) {}


    async createRecord(dto: CreateReviewDto) {
        const record = await this.recordRepository.create(dto);
        return record;
    }
 
    async getAllRecords() {
        return await this.recordRepository.findAll();
      }

    async getRecordByID(id: number) {
      const record = await this.recordRepository.findOne({
          where: { id: id },
          include: { all: true }
      });
      return record;
    }

    async updateRecord(recordId: number, updateDto: UpdateReviewDto) {
        const record = await this.recordRepository.findByPk(recordId);
        if (!record) {
          throw new HttpException(
            "Такой записи не существует",
            HttpStatus.BAD_REQUEST
          );
        }
    
        record.update(updateDto);
        return record;
      }

      async deleteRecord(recordId: number) {
        const candidate = await this.recordRepository.findOne({
          where: { id: recordId },
        });
        if (!candidate) {
          throw new HttpException(
            "Такой записи не существует",
            HttpStatus.BAD_REQUEST
          );
        }
        await this.recordRepository.destroy({ where: { id: recordId } });
        return { message: "Запись успешно удалёна" };
      }
}
