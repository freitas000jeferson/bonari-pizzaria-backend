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
import { ClientService } from './services/client.service';
import { ClientQueryParamsDto } from './dto/client-query-params.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
@Controller({ path: 'users', version: '1' })
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @Get('all')
  async findAll() {
    return await this.clientService.findAll();
  }

  @Get()
  async findAllPaginate(
    @Query(new QueryTransformPipe()) pagination: PaginationDto,
    @Query(new QueryTransformPipe()) query: ClientQueryParamsDto
  ) {
    return await this.clientService.findAllPaginated(pagination, query);
  }

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.create(createClientDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.clientService.findById(id);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto
  ) {
    return await this.clientService.update(id, updateClientDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.clientService.delete(id);
  }
}
