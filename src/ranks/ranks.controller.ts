import {Body, Controller, Get, Param, Post, Put, Delete} from '@nestjs/common';
import {RanksService} from "./ranks.service";
import {CreateRankDto} from "./dto/create-rank.dto";
import { UpdateRankDto } from "./dto/update-rank.dto";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Rank} from "./ranks.model";

// @ApiBearerAuth()
@ApiTags('Звания')
@Controller('ranks')
export class RanksController {
    constructor(private rankService: RanksService) {}

    @ApiOperation({summary: 'Создание звания'})
    @ApiResponse({status: 201, type: Rank})
    @Post()
    create(@Body() dto: CreateRankDto) {
        return this.rankService.createRank(dto);
    }

    @ApiOperation({summary: 'Получить все звания'})
    @ApiResponse({status: 200, type: [Rank]})
    @Get()
    getAllRanks() {
        return this.rankService.getAllRanks();
  }

    @ApiOperation({summary: 'Получить звание по ID'})
    @ApiResponse({status: 200, type: Rank})
    @Get('/:id')
    getRankByID(@Param('id') id: number) {
        return this.rankService.getRankByID(id);
    }
    
    @ApiOperation({ summary: "Обновление звания" })
    @ApiResponse({ status: 200, type: Rank })
    @Put("/:id")
    update(@Param("id") rankId: number, @Body() updateDto: UpdateRankDto) {
        return this.rankService.updateRank(rankId, updateDto);
    }

    @ApiOperation({ summary: "Удаление звания" })
    @ApiResponse({ status: 200, description: `Звание успешно удалёна` })
    @Delete("/:id")
    deleteRank(@Param("id") rankId: number) {
        return this.rankService.deleteRank(rankId);
    }
}