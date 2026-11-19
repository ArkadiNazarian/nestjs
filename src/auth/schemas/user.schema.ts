import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
    INTERN = 'INTERN',
    ENGINEER = 'ENGINEER',
    ADMIN = 'ADMIN',
}

@Schema({ timestamps: true, versionKey: false })
export class User {
    @Prop({ required: true, unique: true, type: String, trim: true })
    name: string;

    @Prop({ required: true, unique: true, trim: true })
    email: string;

    @Prop({ required: true, select: false, trim: true })
    password: string;

    @Prop({ required: true, enum: UserRole, default: UserRole.INTERN })
    role: UserRole
}

export const UserSchema = SchemaFactory.createForClass(User);