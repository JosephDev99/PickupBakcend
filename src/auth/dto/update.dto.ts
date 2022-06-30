import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
