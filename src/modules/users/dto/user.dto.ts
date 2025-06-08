import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  first_name: string | null;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  last_name: string | null;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
  })
  email: string | null;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Date when the user account was created',
  })
  createdAt: Date;
}