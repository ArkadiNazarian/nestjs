import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreaUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string; //name must be string and not empty
    @IsEmail() //email must be email
    email: string;
    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], //role must be enums one of these
        {
            message: 'Valid role required'
        }
    )
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}