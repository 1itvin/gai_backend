import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcryptjs";
import { Violation } from '../violations/violations.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    @InjectModel(Violation) private violationRepository: typeof Violation,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("USER");
    await user.$set("roles", [role.id]);
    user.roles = [role];
    const hashPassword = await bcrypt.hash(dto.password, 5);
    user.update({ ...dto, password: hashPassword });
    return user;
  }

  async getAllUsers(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const users = await this.userRepository.findAll({
      include: { all: true },
      offset: offset,
      limit: limit,
    });
    return users;
  }

  async getUserByID(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      include: { all: true },
    });
    return user;
  }

  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: { login },
      include: { all: true },
    });
    return user;
  }

  async giveRole(userId: number, dto: AddRoleDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      include: { all: true },
    });
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add("role", role.id);
      return { message: "Пользователю успешно дана новая роль" };
    }
    throw new HttpException(
      "Пользователь или роль не найдены",
      HttpStatus.NOT_FOUND
    );
  }

  async takeRole(userId: number, dto: AddRoleDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      include: { all: true },
    });
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$remove("role", role.id);
      await user.save();
      return { message: "У пользователю успешно удалена роль" };
    }
    throw new HttpException(
      "Пользователь или роль не найдены",
      HttpStatus.NOT_FOUND
    );
  }

  async ban(userId: number, dto: BanUserDto) {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }

  async unban(userId: number) {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
    user.banned = false;
    user.banReason = null;
    await user.save();
    return user;
  }

  async updateUser(userId: number, updateDto: UpdateUserDto) {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new HttpException(
        "Такого пользователя не существует",
        HttpStatus.BAD_REQUEST
      );
    }
    if (updateDto.password) {
      const hashPassword = await bcrypt.hash(updateDto.password, 5);
      user.update({ ...updateDto, password: hashPassword });
      return user;
    }

    user.update(updateDto);
    return user;
  }

  async deleteUser(userId: number) {
    const candidate = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!candidate) {
      throw new HttpException(
        "Такого пользователя не существует",
        HttpStatus.BAD_REQUEST
      );
    }
    await this.userRepository.destroy({ where: { id: userId } });
    return { message: "Пользователь успешно удалён" };
  }

  async payViolation(userId: number, violationId: number) {
    const user = await this.userRepository.findByPk(userId);
    const violation = await this.violationRepository.findByPk(violationId);

    if (!user) {
      throw new NotFoundException(`Такого пользователя не существует`);
    }

    if (!violation) {
      throw new NotFoundException(`Такого нарушения не существует`);
    }

    if (violation.suspectId !== user.id) {
      throw new NotFoundException('Это нарушение не того пользователя');
    }

    violation.isPaided = true;
    await violation.save();
  }
}
