import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema.js';
import { Model } from 'mongoose';
import { SignupUserDTO } from './dto/signup-user.dto.js';
import bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private UserModel: Model<User>) { }

    async Signup(signupData: SignupUserDTO) {

        const isUserExisted = await this.UserModel.findOne({
            email: signupData.email
        })

        if (isUserExisted) {
            throw new ConflictException('User already exists')
        }

        const hashPassword = await bcrypt.hash(signupData.password, 12)

        const createUser = await this.UserModel.create({
            email: signupData.email,
            name: signupData.name,
            password: hashPassword,
            role: signupData.role
        })

        return createUser

    }
}
