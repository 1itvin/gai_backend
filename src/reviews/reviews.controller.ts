// import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CreateReviewDto} from "./dto/create-reviews.dto";
import {ReviewService} from "./reviews.service";
// import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {Review} from "./reviews.model";
import {Body, Controller, Get, Param, Post, Query, Put, Delete} from '@nestjs/common';
import { UpdateReviewDto } from "./dto/update-reviews.dto";
import {Roles} from "../auth/roles-auth.decorator";

@ApiTags('Отзывы')
@Controller('reviews')
export class ReviewController {

    constructor(private recordService: ReviewService) {}

    @ApiBearerAuth()
    @ApiOperation({summary: 'Создание отзыва'})
    @ApiResponse({status: 201, type: Review})
    @Roles("USER")
    @Post()
    create(@Body() dto: CreateReviewDto) {
        return this.recordService.createRecord(dto);
    }

    @ApiOperation({summary: 'Получить все отзывы'})
    @ApiResponse({status: 200, type: [Review]})
    @Get()
    getAllReviews() {
        return this.recordService.getAllRecords();
    }

    @ApiOperation({summary: 'Получить отзыв по ID'})
    @ApiResponse({status: 200, type: Review})
    @Get('/:id')
    getReviewByID(@Param('id') id: number) {
        return this.recordService.getRecordByID(id);
    }
    
    @ApiBearerAuth()
    @ApiOperation({ summary: "Обновление отзыва" })
    @ApiResponse({ status: 200, type: Review })
    @Roles("USER")
    @Put("/:id")
    update(@Param("id") reviewId: number, @Body() updateDto: UpdateReviewDto) {
        return this.recordService.updateRecord(reviewId, updateDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: "Удаление отзыва" })
    @ApiResponse({ status: 200, description: `Отзыв успешно удалён` })
    @Roles("USER")
    @Delete("/:id")
    deleteReview(@Param("id") reviewId: number) {
        return this.recordService.deleteRecord(reviewId);
    }
    
}
