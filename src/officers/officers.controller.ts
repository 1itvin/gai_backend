import {CreateOfficerDto} from "./dto/create-officer.dto";
import {OfficerService} from "./officers.service";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {Officer} from "./officers.model";
import {Body, Controller, Get, Param, Post, Query, Put, Delete} from '@nestjs/common';
import { UpdateOfficerDto } from "./dto/update-officer.dto";
import {Roles} from "../auth/roles-auth.decorator";

@ApiTags('Сотрудники ГАИ')
@Controller('officers')
export class OfficersController {

    constructor(private officerService: OfficerService) {}

    @ApiBearerAuth()
    @ApiOperation({summary: 'Создание сотрудника ГАИ'})
    @ApiResponse({status: 201, type: Officer})
    @Roles("USER")
    @Post()
    create(@Body() dto: CreateOfficerDto) {
        return this.officerService.createOfficer(dto);
    }

    @ApiOperation({summary: 'Получить всех сотрудников ГАИ'})
    @ApiResponse({status: 200, type: [Officer]})
    @Get()
    getAllOfficers() {
        return this.officerService.getAllOfficers();
    }

    @ApiOperation({summary: 'Получить сотрудника ГАИ по ID'})
    @ApiResponse({status: 200, type: Officer})
    @Get('/:id')
    getOfficerByID(@Param('id') id: number) {
        return this.officerService.getOfficerByID(id);
    }
    
    @ApiBearerAuth()
    @ApiOperation({ summary: "Обновление сотрудника ГАИ" })
    @ApiResponse({ status: 200, type: Officer })
    @Roles("USER")
    @Put("/:id")
    update(@Param("id") officerId: number, @Body() updateDto: UpdateOfficerDto) {
        return this.officerService.updateOfficer(officerId, updateDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: "Удаление сотрудника ГАИ" })
    @ApiResponse({ status: 200, description: `сотрудника ГАИ успешно удалёна` })
    @Roles("USER")
    @Delete("/:id")
    deleteOfficer(@Param("id") officerId: number) {
        return this.officerService.deleteOfficer(officerId);
    }
    
}
