import { Injectable } from '@nestjs/common';

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
            return this.users.filter((user) => user.role === role)
        }

        return this.users
    }

    findOne(id: string) {
        return this.users.find(user => user.id === Number(id))
    }

    createUser(user: { name: string; email: string; role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {

        const highestUserId = [...this.users].sort((a, b) => b.id - a.id)

        const newUser = {
            id: highestUserId[0].id + 1,
            ...user
        }

        this.users.push(newUser)

        return newUser

    }

    updateUser(id: string, updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        this.users = this.users.map(user => {
            if (user.id === Number(id)) {
                return { ...user, ...updatedUser }
            }
            return user
        })

        return this.findOne(id)
    }

    deleteUser(id: string) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== Number(id))

        return removedUser
    }

}
