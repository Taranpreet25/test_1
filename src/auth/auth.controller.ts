import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){
        
    }


    @Post('/signup')
    signUp(@Body() authCredentialdto : AuthCredentialDto): Promise<void>{
        return this.authService.signUp(authCredentialdto);
    }


    @Post('/signin')
    signin(@Body() authCredentialdto : AuthCredentialDto): Promise<{ accessToken: string}>{
        return this.authService.signIn(authCredentialdto);
    }

   

    @Get()
    getUser(): Promise<User[]> {
        return this.authService.getUser();
      }

}











