import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/helpers/pagination';
import { QueryTransformPipe } from 'src/common/helpers/pipes/query-transform-pipe';
import { UserService } from './services/user.service';
import { UserQueryParamsDto as QueryParamsDto } from './dto/user-query-params.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get()
  async findAllPaginate(
    @Query(new QueryTransformPipe()) pagination: PaginationDto,
    @Query(new QueryTransformPipe()) query: QueryParamsDto
  ) {
    return await this.userService.findAllPaginated(pagination, query);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
