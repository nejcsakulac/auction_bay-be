import { UserService } from './user.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get, NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.model';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfigUsers } from '../../middleware/users-multer.config';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user information' })
  @ApiOkResponse({ description: 'Successfully fetched user data.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getMe(@Req() req: any): Promise<UserDto> {
    const email = req.user.email;
    return this.userService.getMe(email);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({ description: 'Successfully fetched user data.', type: UserDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getUser(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiOkResponse({ description: 'User successfully deleted.' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async deleteUser(@Param('id') id: string): Promise<UserDto> {
    return this.userService.deleteUser(id);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a user' })
  @ApiOkResponse({ description: 'User successfully updated.' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateUser(
    @Param('id') id: string,
    @Body() postData: User,
  ): Promise<any> {
    return this.userService.updateUser(id, postData);
  }

  @Put('/me/update/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerConfigUsers))
  @ApiOperation({ summary: 'Upload and update user avatar' })
  @ApiCreatedResponse({
    description: 'User avatar has been correctly updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  async updateAndUploadProfilePicture(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Avatar upload failed or was not provided.',
      );
    }

    const imagePath = '/uploads/users/' + file.filename;
    const email = req.user.email;

    if (!email) {
      throw new BadRequestException('User email cannot be found.');
    }

    await this.userService.updateUserAvatarByEmail(email, imagePath);
  }
}