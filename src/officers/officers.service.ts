import {CreateOfficerDto} from "./dto/create-officer.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Officer} from "./officers.model";
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateOfficerDto } from "./dto/update-officer.dto";

@Injectable()
export class OfficerService {

    constructor(@InjectModel(Officer) private officerRepository: typeof Officer) {}


    async createOfficer(dto: CreateOfficerDto) {
        const officer = await this.officerRepository.create(dto);
        return officer;
    }
 
    async getAllOfficers() {
        return await this.officerRepository.findAll();
      }

    async getOfficerByID(id: number) {
      const officer = await this.officerRepository.findOne({
          where: { id: id },
          include: { all: true }
      });
      return officer;
    }

    async updateOfficer(officerId: number, updateDto: UpdateOfficerDto) {
        const officer = await this.officerRepository.findByPk(officerId);
        if (!officer) {
          throw new HttpException(
            "Такой записи не существует",
            HttpStatus.BAD_REQUEST
          );
        }
    
        officer.update(updateDto);
        return officer;
      }

      async deleteOfficer(officerId: number) {
        const candidate = await this.officerRepository.findOne({
          where: { id: officerId },
        });
        if (!candidate) {
          throw new HttpException(
            "Такой записи не существует",
            HttpStatus.BAD_REQUEST
          );
        }
        await this.officerRepository.destroy({ where: { id: officerId } });
        return { message: "Запись успешно удалён" };
      }
}
