// import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CreateRecordDto} from "./dto/create-record.dto";
import {RecordService} from "./records.service";
// import {FileInterceptor} from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {Record} from "./records.model";
import {Body, Controller, Get, Param, Post, Query, Put, Delete} from '@nestjs/common';
import { UpdateRecordDto } from "./dto/update-record.dto";
import {Roles} from "../auth/roles-auth.decorator";

@ApiTags('Записи')
@Controller('records')
export class RecordController {

    constructor(private recordService: RecordService) {}

    @ApiOperation({summary: 'Создание записи'})
    @ApiResponse({status: 201, type: Record})
    @Roles("USER")
    @Post()
    create(@Body() dto: CreateRecordDto) {
        return this.recordService.createRecord(dto);
    }

    @ApiOperation({summary: 'Получить все записи'})
    @ApiResponse({status: 200, type: [Record]})
    @Get()
    getAllRecords() {
        return this.recordService.getAllRecords();
    }

    @ApiOperation({summary: 'Получить запись по ID'})
    @ApiResponse({status: 200, type: Record})
    @Get('/:id')
    getRecordByID(@Param('id') id: number) {
        return this.recordService.getRecordByID(id);
    }
    
    @ApiOperation({ summary: "Обновление записи" })
    @ApiResponse({ status: 200, type: Record })
    @Roles("USER")
    @Put("/:id")
    update(@Param("id") recordId: number, @Body() updateDto: UpdateRecordDto) {
        return this.recordService.updateRecord(recordId, updateDto);
    }

    @ApiOperation({ summary: "Удаление записи" })
    @ApiResponse({ status: 200, description: `Запись успешно удалёна` })
    @Roles("USER")
    @Delete("/:id")
    deleteRecord(@Param("id") recordId: number) {
        return this.recordService.deleteRecord(recordId);
    }
    
}
