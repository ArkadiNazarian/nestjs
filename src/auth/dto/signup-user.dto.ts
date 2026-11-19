import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { UserRole } from "../schemas/user.schema.js";

export class SignupUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string; //name must be string and not empty
    @IsEmail() //email must be email
    email: string;
    @IsOptional()
    @IsEnum(UserRole, //role must be enums one of these
        {
            message: 'valid role required'
        }
    )
    role: UserRole;

    @IsNotEmpty()
    @Length(4, 8)
    password: string;
}