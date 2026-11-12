import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreaUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle() //is for skip throttler for this controller
@Controller('users')   // /users route
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @SkipThrottle({ default: false }) // doesn't skip the throttler from this request
    @Get() // /users or /user?role=Admin
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role)
    }

    @Get(":id") // users/:id ParseIntPipe is for validation of /users/a ==> return error because we need numberic string like 142 and also ParseIntPipe converts "143" to 143
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }

    @Post() // /users validation pipe is using to validate the body based on the dto that we have defined with class-validatiors
    createUser(@Body(ValidationPipe) user: CreaUserDTO) {
        return this.usersService.createUser(user)
    }

    @Patch(":id") // users/:id
    updateUser(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateUserDto) {
        return this.usersService.updateUser(id, userUpdate)
    }

    @Delete("id")
    deleteUser(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id)
    }
}
