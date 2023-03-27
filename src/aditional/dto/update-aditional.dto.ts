import { PartialType } from '@nestjs/swagger';
import { CreateAditionalDto } from './create-aditional.dto';

export class UpdateAditionalDto extends PartialType(CreateAditionalDto) {}
