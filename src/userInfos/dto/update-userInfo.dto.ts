import { PartialType } from "@nestjs/swagger";
import { CreateUserInfoDto } from "./create-userInfo.dto";
export class UpdateUserInfoDto extends PartialType(CreateUserInfoDto) {}
