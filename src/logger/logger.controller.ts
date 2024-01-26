import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { UpdateLoggerDto } from './dto/update-logger.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Логи')
@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @ApiOperation({summary: 'Создание лога'})
  @ApiResponse({status: 201})
  @Post()
  create(@Body() createLoggerDto: CreateLoggerDto) {
    return this.loggerService.create(createLoggerDto);
  }

  @ApiOperation({summary: 'Получить все логи'})
  @ApiResponse({status: 200})
  @Get()
  findAll() {
    return this.loggerService.findAll();
  }

  @ApiOperation({summary: 'Получить лог по ID'})
  @ApiResponse({status: 200})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loggerService.findOne(+id);
  }

  @ApiOperation({ summary: "Обновление лога" })
  @ApiResponse({ status: 200})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateLoggerDto: UpdateLoggerDto) {
    return this.loggerService.update(+id, updateLoggerDto);
  }

  @ApiOperation({ summary: "Удаление лога" })
  @ApiResponse({ status: 200, description: `Лог успешно удалён` })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loggerService.remove(+id);
  }
}
