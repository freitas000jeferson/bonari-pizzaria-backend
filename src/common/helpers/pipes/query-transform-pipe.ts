import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class QueryTransformPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log(value);
    if (!metatype) {
      return value;
    }
    return plainToInstance(metatype, value);
  }
}
