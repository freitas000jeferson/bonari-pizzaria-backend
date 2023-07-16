import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { PaginationDto } from 'src/common/helpers/pagination';
import { UserQueryParamsDto as QueryParamsDto } from '../dto/user-query-params.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CryptoService } from 'src/common/helpers/crypto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findAll() {}
  async findAllPaginated(pagination: PaginationDto, query: QueryParamsDto) {}
  async create(data: CreateUserDto) {
    const existUser = await this.userRepository.find({
      email: data.email,
      phoneNumber: data.phoneNumber,
    });
    if (existUser)
      throw new BadRequestException({ message: 'User already exists!' });
    data.password = await CryptoService.createPasswordHash(data.password);

    return await this.userRepository.create(data);
  }
  async findById(id: string) {}
  async update(id: string, updateUserDto: UpdateUserDto) {}
  async delete(id: string) {}
}
