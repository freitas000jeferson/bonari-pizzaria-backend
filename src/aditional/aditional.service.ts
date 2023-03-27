import { Injectable } from '@nestjs/common';
import { CreateAditionalDto } from './dto/create-aditional.dto';
import { UpdateAditionalDto } from './dto/update-aditional.dto';
import { AditionalRepository } from './repositories/aditional.repository';

@Injectable()
export class AditionalService {
  constructor(private readonly aditionalRepository: AditionalRepository) {}
  create(createAditionalDto: CreateAditionalDto) {
    return 'This action adds a new aditional';
  }

  findAll() {
    return `This action returns all aditional`;
  }

  async findById(id: string) {
    return await this.aditionalRepository.getById(id);
  }

  update(id: string, updateAditionalDto: UpdateAditionalDto) {
    return `This action updates a #${id} aditional`;
  }

  remove(id: string) {
    return `This action removes a #${id} aditional`;
  }
}
