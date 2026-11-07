import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service.js';

@Controller('users')   // /users route
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get() // /users or /user?role=Admin
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role)
    }

    @Get(":id") // users/:id
    findOne(@Param("id") id: string) {
        return this.usersService.findOne(id)
    }

    @Post() // /users
    createUser(@Body() user: { name: string; email: string; role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        return this.usersService.createUser(user)
    }

    @Patch(":id") // users/:id
    updateUser(@Param("id") id: string, @Body() userUpdate: { name: string; email: string; role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        return this.usersService.updateUser(id, userUpdate)
    }

    @Delete("id")
    deleteUser(@Param("id") id: string) {
        return this.usersService.deleteUser(id)
    }
}
