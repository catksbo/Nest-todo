import { Body, Controller, Post, Res} from '@nestjs/common';
import type { Response } from 'express';
import {UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import bcrypt from "bcrypt";
import { SignupDto } from 'src/Dto/Signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private  authService: AuthService) {}

  // @Post('login')
  // async loginUser(@Body() body: { email: string; password: string }) {
  //   return this.authService.loginUser(body.email, body.password);
  // }

  @Post('register')
  async registerUser(@Body() body: SignupDto, @Res({ passthrough: true }) res: Response) {
    if (!body.email || !body.password) {
      throw new Error('Email and password are required');
    } 
  
    const token = await this.authService.registerUser(body.email, body.password);
    if (!token) {
    throw new UnauthorizedException();
    };

    res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return { message: 'User registered successfully', token };
  }

  @Post('login')
  async loginUser(@Body() body: SignupDto) {
      if (!body.email || !body.password) {
        throw new Error('Email and password are required');
      }
      const token = await this.authService.loginUser(body.email, body.password);
      if (!token) {
        throw new UnauthorizedException();
      }
      return { message: 'User logged in successfully', token };
    }
  
  @Post('logout')
  async logoutUser(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return { message: 'User logged out successfully' };
  }


}


