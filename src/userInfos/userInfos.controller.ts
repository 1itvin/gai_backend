// import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CreateUserInfoDto} from "./dto/create-userInfo.dto";
import {UserInfoService} from "./userInfos.service";
// import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {UserInfo} from "./userInfos.model";
import {Body, Controller, Get, Param, Post, Query, Put, Delete} from '@nestjs/common';
import { UpdateUserInfoDto } from "./dto/update-userInfo.dto";
import {Roles} from "../auth/roles-auth.decorator";

@ApiTags('Информация о пользователе')
@Controller('userInfos')
export class UserInfoController {

    constructor(private userInfoService: UserInfoService) {}

    @ApiBearerAuth()
    @ApiOperation({summary: 'Создание информации о пользователе'})
    @ApiResponse({status: 201, type: UserInfo})
    @Roles("USER")
    @Post()
    create(@Body() dto: CreateUserInfoDto) {
        return this.userInfoService.createUserInfo(dto);
    }

    @ApiOperation({summary: 'Получить все информации о пользователях'})
    @ApiResponse({status: 200, type: [UserInfo]})
    @Get()
    getAllUserInfos() {
        return this.userInfoService.getAllUserInfos();
    }

    @ApiOperation({summary: 'Получить информацию о пользователе по ID'})
    @ApiResponse({status: 200, type: UserInfo})
    @Get('/:id')
    getUserInfoByID(@Param('id') id: number) {
        return this.userInfoService.getUserInfoByID(id);
    }
    
    @ApiBearerAuth()
    @ApiOperation({ summary: "Обновление информации о пользователе" })
    @ApiResponse({ status: 200, type: UserInfo })
    @Roles("USER")
    @Put("/:id")
    update(@Param("id") userInfoId: number, @Body() updateDto: UpdateUserInfoDto) {
        return this.userInfoService.updateUserInfo(userInfoId, updateDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: "Удаление информации о пользователе" })
    @ApiResponse({ status: 200, description: `Запись успешно удалёна` })
    @Roles("USER")
    @Delete("/:id")
    deleteUserInfo(@Param("id") userInfoId: number) {
        return this.userInfoService.deleteUserInfo(userInfoId);
    }
    
}
