import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
  Logger,
  Param,
  Res,
  Patch
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
// import { DeleteDto } from './dto/delete.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) { }

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    this.logger.verbose('Registering!'); // logging status
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    this.logger.verbose('Signing In!');
    return this.authService.signIn(signInDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req.user);
  }
  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.authService.remove(id);
  // }
  // @Delete('/delete')
  // async deleteUser(@Req() request: Request, @Res() response: Response): Promise<any> {
  //   console.log("sdfsffsdfsdfsdfsdf", request);
  //   return await this.authService.deleteUser(request, response);
  // }
  // @Patch('/update')
  // update(@Body() signUpDto: SignUpDto): Promise<void> {
  //   this.logger.verbose('Updating!'); // logging status
  //   return this.authService.update(signUpDto);
  // }
}
