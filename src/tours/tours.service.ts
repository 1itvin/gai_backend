import {CreateTourDto} from "./dto/create-tour.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Tour} from "./tours.model";
import {FilesService} from "../files/files.service";
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateTourDto } from "./dto/update-tour.dto";

@Injectable()
export class ToursService {

    constructor(@InjectModel(Tour) private tourRepository: typeof Tour,
                private fileService: FilesService) {}

    async createTour(dto: CreateTourDto, image: any) {
        const fileName = await this.fileService.createFile(image);
        const tour = await this.tourRepository.create({...dto, image: fileName})
        return tour;
    }

    //paggination 
    async getAllTours(page: number, limit: number) {
        const offset = (page - 1) * limit;
        const tours = await this.tourRepository.findAll({
          include: { all: true },
          offset: offset,
          limit: limit
        });
        return tours;
      }

      async getTourByID(id: number) {
        const tour = await this.tourRepository.findOne({
            where: { id: id },
            include: { all: true }
        });
        return tour;
      }

      async updateTour(tourId: number, updateDto: UpdateTourDto) {
        const tour = await this.tourRepository.findByPk(tourId);
        if (!tour) {
          throw new HttpException(
            "Такого тура не существует",
            HttpStatus.BAD_REQUEST
          );
        }
    
        tour.update(updateDto);
        return tour;
      }

      async deleteTour(tourId: number) {
        const candidate = await this.tourRepository.findOne({
          where: { id: tourId },
        });
        if (!candidate) {
          throw new HttpException(
            "Такого тура не существует",
            HttpStatus.BAD_REQUEST
          );
        }
        await this.tourRepository.destroy({ where: { id: tourId } });
        return { message: "Тур успешно удалён" };
      }
}
