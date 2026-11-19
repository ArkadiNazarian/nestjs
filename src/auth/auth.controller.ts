import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignupUserDTO } from './dto/signup-user.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('signup')
  async Signup(@Body() userBody: SignupUserDTO) {
    //  i removed the ValidationPipe from the body and add it globally in main.ts
    return this.authService.Signup(userBody)

  }
}
