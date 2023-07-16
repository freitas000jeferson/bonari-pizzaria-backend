import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login() {}

  @Post('refresh')
  async refresh() {}

  @Post('logout')
  async logout() {}
  // ------------------------------------------------

  @Post('user/login')
  async userLogin() {}

  @Post('user/refresh')
  async userRefresh() {}

  @Post('user/logout')
  async userLogout() {}
}
