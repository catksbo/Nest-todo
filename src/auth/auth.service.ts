import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, 
    private jwtService: JwtService) {}
  // async loginUser(userEmail: string, userPassword: string) {
  //   await this.prisma.user.create({
  //     data: {
  //       email: userEmail,
  //       password: userPassword
  //     }
  //   }) 
  // }
  async registerUser(userEmail: string, userPassword: string) {
    const existsUser = await this.prisma.user.findUnique({
      where: {
        email: userEmail
      }
    });
    if (existsUser) {
      throw new Error('User already exists');
    }
    const user = await this.prisma.user.create({
      data: {
        email: userEmail,
        password: userPassword
      }
    });
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async loginUser(userEmail: string, userPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userEmail
      }
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(userPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);
    return token;
  }

}

