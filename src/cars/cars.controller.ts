import {CreateCarDto} from "./dto/create-car.dto";
import {CarService} from "./cars.service";
// import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {Car} from "./cars.model";
import {Body, Controller, Get, Param, Post, Query, Put, Delete} from '@nestjs/common';
import { UpdateCarDto } from "./dto/update-car.dto";
import {Roles} from "../auth/roles-auth.decorator";

@ApiTags('Машины')
@Controller('cars')
export class CarController {

    constructor(private carService: CarService) {}

    @ApiBearerAuth()
    @ApiOperation({summary: 'Создание машины'})
    @ApiResponse({status: 201, type: Car})
    @Roles("USER")
    @Post()
    create(@Body() dto: CreateCarDto) {
        return this.carService.createCar(dto);
    }

    @ApiOperation({summary: 'Получить все машины'})
    @ApiResponse({status: 200, type: [Car]})
    @Get()
    getAllCars() {
        return this.carService.getAllCars();
    }

    @ApiOperation({summary: 'Получить машину по ID'})
    @ApiResponse({status: 200, type: Car})
    @Get('/:id')
    getCarByID(@Param('id') id: number) {
        return this.carService.getCarByID(id);
    }
    
    @ApiBearerAuth()
    @ApiOperation({ summary: "Обновление машины" })
    @ApiResponse({ status: 200, type: Car })
    @Roles("USER")
    @Put("/:id")
    update(@Param("id") carId: number, @Body() updateDto: UpdateCarDto) {
        return this.carService.updateCar(carId, updateDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: "Удаление машины" })
    @ApiResponse({ status: 200, description: `Запись успешно удалёна` })
    @Roles("USER")
    @Delete("/:id")
    deleteCar(@Param("id") carId: number) {
        return this.carService.deleteCar(carId);
    }
    
}
