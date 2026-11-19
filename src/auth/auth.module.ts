import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
  }])],
  controllers: [AuthController],
  providers: [AuthService],

  // we use this when we want to export the module and then we should imports in others module
  // exports:[]
})
export class AuthModule { }
