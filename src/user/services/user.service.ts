import { Injectable } from '@nestjs/common';
import { UserReposiitory } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { PaginationDto } from 'src/common/helpers/pagination';
import { UserQueryParamsDto as QueryParamsDto } from '../dto/user-query-params.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userReposiitory: UserReposiitory) {}
  async findAll() {}
  async findAllPaginated(pagination: PaginationDto, query: QueryParamsDto) {}
  async create(createUserDto: CreateUserDto) {}
  async findById(id: string) {}
  async update(id: string, updateUserDto: UpdateUserDto) {}
  async delete(id: string) {}
}
