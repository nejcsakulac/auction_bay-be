import { PrismaService } from '../../prisma.service';
import { User } from './user.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}



  async getUser(id: string): Promise<UserDto | null> {
    return this.prisma.user.findUnique({
      where: { id: String(id) },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        avatar: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });
  }

  async getMe(email: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        avatar: true,
        updatedAt: true,
        createdAt: true,
        password: false,
      },
    });
    return user as UserDto;
  }

  async createUser(data: User): Promise<UserDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingUser) {
      throw new BadRequestException('User with that email already exists.');
    }
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong while creating a new user',
      );
    }
  }

  async updateUser(id: string, data: User): Promise<UserDto> {
    const updatedData: any = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      avatar: data.avatar,
    };

    return this.prisma.user.update({
      where: { id: String(id) },
      select: {
        id: false,
        first_name: true,
        last_name: true,
        avatar: true,
        email: true,
        createdAt: true,
        updatedAt: false,
        password: false,
      },
      data: updatedData,
    });
  }

  async updateUserAvatarByEmail(
    email: string,
    imagePath: string,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { email: email },
      data: {
        avatar: imagePath,
      },
    });
  }

  async deleteUser(id: string): Promise<UserDto> {
    return this.prisma.user.delete({
      where: { id: String(id) },
    });
  }
}