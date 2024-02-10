import { CreateUserInfoDto } from "./dto/create-userInfo.dto";
import { InjectModel } from "@nestjs/sequelize";
import { UserInfo } from "./userInfos.model";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateUserInfoDto } from "./dto/update-userInfo.dto";

@Injectable()
export class UserInfoService {
  constructor(
    @InjectModel(UserInfo) private userInfoRepository: typeof UserInfo
  ) {}

  async getUserInfoByEmail(email: string) {
    const userInfo = await this.userInfoRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return userInfo;
  }

  async getUserInfoByPhone(phone: string) {
    const userInfo = await this.userInfoRepository.findOne({
      where: { phone },
      include: { all: true },
    });
    return userInfo;
  }

  async createUserInfo(dto: CreateUserInfoDto) {
    const candidateEmail = await this.getUserInfoByEmail(dto.email);
    if (candidateEmail) {
      throw new HttpException(
        "Пользователь с такой почтой существует",
        HttpStatus.BAD_REQUEST
      );
    }

    const candidatePhone = await this.getUserInfoByPhone(dto.phone);
    if (candidatePhone) {
      throw new HttpException(
        "Пользователь с таким номером существует",
        HttpStatus.BAD_REQUEST
      );
    }

    const userInfo = await this.userInfoRepository.create(dto);
    return userInfo;
  }

  async getAllUserInfos() {
    return await this.userInfoRepository.findAll();
  }

  async getUserInfoByID(id: number) {
    const userInfo = await this.userInfoRepository.findOne({
      where: { id: id },
      include: { all: true },
    });
    return userInfo;
  }

  async updateUserInfo(userInfoId: number, updateDto: UpdateUserInfoDto) {
    const userInfo = await this.userInfoRepository.findByPk(userInfoId);
    if (!userInfo) {
      throw new HttpException(
        "Такой записи не существует",
        HttpStatus.BAD_REQUEST
      );
    }

    userInfo.update(updateDto);
    return userInfo;
  }

  async deleteUserInfo(userInfoId: number) {
    const candidate = await this.userInfoRepository.findOne({
      where: { id: userInfoId },
    });
    if (!candidate) {
      throw new HttpException(
        "Такого пользователя не существует",
        HttpStatus.BAD_REQUEST
      );
    }
    await this.userInfoRepository.destroy({ where: { id: userInfoId } });
    return { message: "Информация о пользователе успешно удалёна" };
  }
}
