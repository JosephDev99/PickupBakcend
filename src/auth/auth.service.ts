import { Injectable, UnauthorizedException, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    return this.userRepository.signUp(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validateUserPassword(signInDto);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name
    }

    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Successfully Generated JWT Token with payload ${JSON.stringify(payload)}`);

    return { accessToken };
  }
  // remove(id: string) {
  //   return this.userRepository.deleteOne({ id: id }).exec();
  // }
  // async deleteUser(request, response): Promise<any> {
  //   try {
  //     const cookie = request.cookies['jwt'];
  //     const data = await this.jwtService.verifyAsync(cookie);
  //     if (!data) {
  //       throw new HttpException('Invalid data', HttpStatus.FORBIDDEN);
  //     }
  //     const user = await this.userRepository.findOne({ email: data["email"] });
  //     console.log("clear cookie");

  //     await this.userRepository.delete({ email: user.email });
  //     return await response.clearCookie('jwt');
  //   }
  //   catch (error) {
  //     throw new HttpException('log in first', HttpStatus.FORBIDDEN);
  //   }
  // }
  // async update(signInDto: SignInDto): Promise<any> {
  //   const user = await this.userRepository.validateUserPassword(signInDto);

  //   if (!user) {
  //     throw new UnauthorizedException('Invalid Credentials');
  //   }

  //   const payload: JwtPayload = {
  //     id: user.id,
  //     email: user.email,
  //     name: user.name
  //   }

  //   const accessToken = await this.jwtService.sign(payload);
  //   this.logger.debug(`Successfully Generated JWT Token with payload ${JSON.stringify(payload)}`);

  //   return { accessToken };
  // }
}
