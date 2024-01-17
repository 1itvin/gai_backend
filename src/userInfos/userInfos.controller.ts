// import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CreateUserInfoDto} from "./dto/create-userInfo.dto";
import {UserInfoService} from "./userInfos.service";
// import {FileInterceptor} from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {UserInfo} from "./userInfos.model";
import {Body, Controller, Get, Param, Post, Query, Put, Delete} from '@nestjs/common';
import { UpdateUserInfoDto } from "./dto/update-userInfo.dto";

@ApiTags('Информация о пользователе')
@Controller('userInfos')
export class UserInfoController {

    constructor(private userInfoService: UserInfoService) {}

    @ApiOperation({summary: 'Создание записи'})
    @ApiResponse({status: 201, type: UserInfo})
    @Post()
    create(@Body() dto: CreateUserInfoDto) {
        return this.userInfoService.createUserInfo(dto);
    }

    @ApiOperation({summary: 'Получить все записи'})
    @ApiResponse({status: 200, type: [UserInfo]})
    @Get()
    getAllUserInfos() {
        return this.userInfoService.getAllUserInfos();
    }

    @ApiOperation({summary: 'Получить запись по ID'})
    @ApiResponse({status: 200, type: UserInfo})
    @Get('/:id')
    getUserInfoByID(@Param('id') id: number) {
        return this.userInfoService.getUserInfoByID(id);
    }
    
    @ApiOperation({ summary: "Обновление записи" })
    @ApiResponse({ status: 200, type: UserInfo })
    @Put("/:id")
    update(@Param("id") userInfoId: number, @Body() updateDto: UpdateUserInfoDto) {
        return this.userInfoService.updateUserInfo(userInfoId, updateDto);
    }

    @ApiOperation({ summary: "Удаление записи" })
    @ApiResponse({ status: 200, description: `Запись успешно удалёна` })
    @Delete("/:id")
    deleteUserInfo(@Param("id") userInfoId: number) {
        return this.userInfoService.deleteUserInfo(userInfoId);
    }
    
}
