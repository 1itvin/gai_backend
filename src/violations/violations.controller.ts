import {CreateViolationDto} from "./dto/create-violation.dto";
import {ViolationService} from "./violations.service";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {Violation} from "./violations.model";
import {Body, Controller, Get, Param, Post, Query, Put, Delete} from '@nestjs/common';
import { UpdateViolationDto } from "./dto/update-violation.dto";
import {Roles} from "../auth/roles-auth.decorator";

@ApiTags('Нарушения')
@Controller('violations')
export class ViolationController {

    constructor(private violationService: ViolationService) {}

    @ApiBearerAuth()
    @ApiOperation({summary: 'Создание нарушения'})
    @ApiResponse({status: 201, type: Violation})
    @Roles("USER")
    @Post()
    create(@Body() dto: CreateViolationDto) {
        return this.violationService.createViolation(dto);
    }

    @ApiOperation({summary: 'Получить все нарушения'})
    @ApiResponse({status: 200, type: [Violation]})
    @Get()
    getAllViolations() {
        return this.violationService.getAllViolations();
    }

    @ApiOperation({summary: 'Получить нарушение по ID'})
    @ApiResponse({status: 200, type: Violation})
    @Get('/:id')
    getViolationByID(@Param('id') id: number) {
        return this.violationService.getViolationByID(id);
    }
    
    @ApiBearerAuth()
    @ApiOperation({ summary: "Обновление нарушения" })
    @ApiResponse({ status: 200, type: Violation })
    @Roles("USER")
    @Put("/:id")
    update(@Param("id") violationId: number, @Body() updateDto: UpdateViolationDto) {
        return this.violationService.updateViolation(violationId, updateDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: "Удаление нарушения" })
    @ApiResponse({ status: 200, description: `Запись успешно удалёна` })
    @Roles("USER")
    @Delete("/:id")
    deleteViolation(@Param("id") violationId: number) {
        return this.violationService.deleteViolation(violationId);
    }
    
}
