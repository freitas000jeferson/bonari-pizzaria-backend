import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { RoleUserEnum } from 'src/common/entities/role-user.enum';

export class ClientQueryParamsDto {
  @ApiProperty({
    description: 'consulta por email',
    type: String,
    example: 'joao@gmail.com',
    required: false,
  })
  @IsString()
  email?: string = undefined;

  @ApiProperty({
    description: 'consulta por email',
    type: String,
    example: 'joao@gmail.com',
    required: false,
  })
  @IsString()
  phoneNumber?: string = undefined;
  @ApiProperty({
    description: 'consulta por email',
    type: String,
    example: 'joao@gmail.com',
    required: false,
  })
  @IsString()
  name?: string = undefined;
}

export const makeWhereEmailAndPhoneNumber = (
  query: ClientQueryParamsDto
): Prisma.ClientWhereInput => {
  return {
    AND: {
      email: query.email
        ? { contains: query.email, mode: 'insensitive' }
        : undefined,
      phoneNumber: query.phoneNumber
        ? { contains: query.phoneNumber, mode: 'insensitive' }
        : undefined,
    },
  };
};
