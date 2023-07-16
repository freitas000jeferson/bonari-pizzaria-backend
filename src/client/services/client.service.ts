import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/helpers/pagination';
import { CryptoService } from 'src/common/helpers/crypto';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientQueryParamsDto } from '../dto/client-query-params.dto';
import { ClientRepository } from '../repository/client.repository';
import { UpdateClientDto } from '../dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}
  async findAll() {}
  async findAllPaginated(
    pagination: PaginationDto,
    query: ClientQueryParamsDto
  ) {}
  async create(data: CreateClientDto) {
    const existUser = await this.clientRepository.find({
      email: data.email,
      phoneNumber: data.phoneNumber,
    });
    if (existUser)
      throw new BadRequestException({ message: 'User already exists!' });
    data.password = await CryptoService.createPasswordHash(data.password);

    return await this.clientRepository.create(data);
  }
  async findById(id: string) {}
  async update(id: string, updateClientDto: UpdateClientDto) {}
  async delete(id: string) {}
}
