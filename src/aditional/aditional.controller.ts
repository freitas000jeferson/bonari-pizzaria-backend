import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AditionalService } from './aditional.service';
import { CreateAditionalDto } from './dto/create-aditional.dto';
import { UpdateAditionalDto } from './dto/update-aditional.dto';

@Controller('aditional')
export class AditionalController {
  constructor(private readonly aditionalService: AditionalService) {}

  @Post()
  create(@Body() createAditionalDto: CreateAditionalDto) {
    return this.aditionalService.create(createAditionalDto);
  }

  @Get()
  findAll() {
    return this.aditionalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aditionalService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAditionalDto: UpdateAditionalDto
  ) {
    return this.aditionalService.update(id, updateAditionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aditionalService.remove(id);
  }
}
