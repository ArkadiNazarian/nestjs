import { Injectable, NotFoundException } from '@nestjs/common';
import { CreaUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {


    // private is for ts and user is property in this class 
    //  if we don't write private, usersService.users.push(...) we can do this
    private users = [
        {
            id: 1,
            name: "Leanne Graham",
            email: "Sincere@april.biz",
            role: "INTERN",
        },
        {
            id: 2,
            name: "Ervin Howell",
            email: "Shanna@melissa.tv",
            role: "INTERN",
        },
        {
            id: 3,
            name: "Clementine Bauch",
            email: "Nathan@yesenia.net",
            role: "ENGINEER",
        },
        {
            id: 4,
            name: "Patricia Lebsack",
            email: "Julianne.OConner@kory.org",
            role: "ENGINEER",
        },
        {
            id: 5,
            name: "Chelsey Dietrich",
            email: "Lucio_Hettinger@annie.ca",
            role: "ADMIN",
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const users = this.users.filter((user) => user.role === role)

            if (users.length === 0) throw new NotFoundException('User not found')

            return users
        }

        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        // NotFoundException is for /user/99 that we don't have a such user but if we retur it we get 200 status and empty body so NotFoundException is for this case
        if (!user) throw new NotFoundException('User not found')

        return user
    }

    createUser(user: CreaUserDTO) {

        const highestUserId = [...this.users].sort((a, b) => b.id - a.id)

        const newUser = {
            id: highestUserId[0].id + 1,
            ...user
        }

        this.users.push(newUser)

        return newUser

    }

    updateUser(id: number, updatedUser: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUser }
            }
            return user
        })

        return this.findOne(id)
    }

    deleteUser(id: number) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }

}
