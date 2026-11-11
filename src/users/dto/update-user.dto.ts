import { CreaUserDTO } from "./create-user.dto.js";
import { PartialType } from "@nestjs/mapped-types";

// makes the all attributes of CreateUserDTO partial
export class UpdateUserDto extends PartialType(CreaUserDTO) { }