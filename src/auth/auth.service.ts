import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async loginUser(userEmail: string, userPassword: string) {
    await this.prisma.user.create({
      data: {
        email: userEmail,
        password: userPassword
      }
      
    })
    console.log(userEmail, userPassword); 
  }

}

