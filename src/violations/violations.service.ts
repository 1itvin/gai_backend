import { CreateViolationDto } from "./dto/create-violation.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Violation } from "./violations.model";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateViolationDto } from "./dto/update-violation.dto";

@Injectable()
export class ViolationService {
  constructor(
    @InjectModel(Violation) private violationRepository: typeof Violation
  ) {}


  async createViolation(dto: CreateViolationDto) {
    const violation = await this.violationRepository.create(dto);
    return violation;
  }

  async getAllViolations() {
    return await this.violationRepository.findAll();
  }

  async getViolationByID(id: number) {
    const violation = await this.violationRepository.findOne({
      where: { id: id },
      include: { all: true },
    });
    return violation;
  }

  async updateViolation(violationId: number, updateDto: UpdateViolationDto) {
    const violation = await this.violationRepository.findByPk(violationId);
    if (!violation) {
      throw new HttpException(
        "Такой записи не существует",
        HttpStatus.BAD_REQUEST
      );
    }

    violation.update(updateDto);
    return violation;
  }

  async deleteViolation(violationId: number) {
    const candidate = await this.violationRepository.findOne({
      where: { id: violationId },
    });
    if (!candidate) {
      throw new HttpException(
        "Такого пользователя не существует",
        HttpStatus.BAD_REQUEST
      );
    }
    await this.violationRepository.destroy({ where: { id: violationId } });
    return { message: "Информация о пользователе успешно удалёна" };
  }
}
