import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')   // /users route
export class UsersController {

    @Get() // /users or /user?role=Admin
    findAll(@Query('role') role?: 'Admin' | 'User') {
        return []
    }

    @Get(":id") // users/:id
    findOne(@Param("id") id: string) {
        return { id }
    }

    @Post() // /users
    createUser(@Body() user: Object) {
        return user
    }

    @Patch(":id") // users/:id
    updateUser(@Param("id") id: string, @Body() userUpdate: Object) {
        return { id, userUpdate }
    }

    @Delete("id")
    deleteUser(@Param("id") id: string) {
        return { id }
    }
}
