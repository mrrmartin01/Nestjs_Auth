import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  lastName?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@example.com',
  })
  email?: string;

  @IsStrongPassword()
  @IsOptional()
  @ApiProperty({
    description: 'Password of the user',
    example: 'StrongP@ssw0rd!',
  })
  password?: string;
}
