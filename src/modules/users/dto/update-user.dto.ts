import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: 'http://example.com/avatar.jpg',
    description: "URL of the user's avatar image",
    required: false,
  })
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
  })
  email: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Date when the user account was created',
  })
  createdAt: Date;
}