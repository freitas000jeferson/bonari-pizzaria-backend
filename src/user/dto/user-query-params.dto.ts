import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { RoleUserEnum } from 'src/common/entities/role-user.enum';

export class UserQueryParamsDto {
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
    enum: RoleUserEnum,
    example: 'joao@gmail.com',
    required: false,
  })
  @IsEnum(RoleUserEnum)
  role?: RoleUserEnum = undefined;

  @ApiProperty({
    description: 'consulta por email',
    type: String,
    example: 'joao@gmail.com',
    required: false,
  })
  @IsBoolean()
  isEnable?: boolean = undefined;
}

export const makeWhereEmailAndPhoneNumber = (
  query: UserQueryParamsDto
): Prisma.UserWhereInput => {
  return {
    AND: {
      email: query.email
        ? { contains: query.email, mode: 'insensitive' }
        : undefined,
      phoneNumber: query.phoneNumber
        ? { contains: query.phoneNumber, mode: 'insensitive' }
        : undefined,
      role: query.role ? { equals: query.role } : undefined,
      isEnable: query.isEnable ? { equals: query.isEnable } : undefined,
    },
  };
};
