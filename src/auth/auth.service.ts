import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    const user = await this.prisma.user.create({
      data: {
        email: userEmail,
        password: hashedPassword
      }
    });
    return this.generateToken(user.id);
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
    return this.generateToken(user.id);
    
  }
  async generateToken(userId: string) {
    const payload = { sub: userId };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = uuidv4();
    await this.saveRefreshToken(userId, refreshToken);
    return {accessToken, refreshToken};
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    await this.prisma.refreshToken.deleteMany({ where: { userId: userId } });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userId,
        expiresAt: expiresAt
      }
    });
  }
}
