import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRepository } from './../../user/repository/user.repository';

import { CryptoService } from 'src/common/helpers/crypto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login() {}

  async refresh() {}

  async logout() {}
  // ------------------------------------------------

  async userSingup() {}

  async userLogin() {}

  async userRefresh() {}

  async userLogout() {}
}
