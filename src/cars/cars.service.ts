import { CreateCarDto } from "./dto/create-car.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Car } from "./cars.model";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateCarDto } from "./dto/update-car.dto";

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car) private carRepository: typeof Car
  ) {}

  async getCarByPlate(plate: string) {
    const car = await this.carRepository.findOne({
      where: { plate },
      include: { all: true },
    });
    return car;
  }

  async createCar(dto: CreateCarDto) {
    const candidatePlate = await this.getCarByPlate(dto.plate);
    if (candidatePlate) {
      throw new HttpException(
        "Пользователь с таким номером существует",
        HttpStatus.BAD_REQUEST
      );
    }

    const car = await this.carRepository.create(dto);
    return car;
  }

  async getAllCars() {
    return await this.carRepository.findAll();
  }

  async getCarByID(id: number) {
    const car = await this.carRepository.findOne({
      where: { id: id },
      include: { all: true },
    });
    return car;
  }

  async updateCar(carId: number, updateDto: UpdateCarDto) {
    const car = await this.carRepository.findByPk(carId);
    if (!car) {
      throw new HttpException(
        "Такой записи не существует",
        HttpStatus.BAD_REQUEST
      );
    }

    car.update(updateDto);
    return car;
  }

  async deleteCar(carId: number) {
    const candidate = await this.carRepository.findOne({
      where: { id: carId },
    });
    if (!candidate) {
      throw new HttpException(
        "Такого пользователя не существует",
        HttpStatus.BAD_REQUEST
      );
    }
    await this.carRepository.destroy({ where: { id: carId } });
    return { message: "Информация о пользователе успешно удалёна" };
  }
}
