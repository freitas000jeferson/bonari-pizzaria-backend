import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { MongoOperatorEnum } from 'src/common/constants/mongo-operator-enum';

export class OrderQueryParamsDto {
  @ApiProperty({
    description: '',
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: '',
    type: String,
    example: '',
    required: false,
    enum: MongoOperatorEnum,
  })
  @IsEnum(MongoOperatorEnum)
  @IsOptional()
  statusOp?: MongoOperatorEnum;

  @ApiProperty({
    description: '',
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  clientId?: string;

  @ApiProperty({
    description: '',
    type: String,
    example: '',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isDelivery?: boolean;

  @ApiProperty({
    description: '',
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    description: '',
    type: String,
    example: '',
    required: false,
    enum: MongoOperatorEnum,
  })
  @IsEnum(MongoOperatorEnum)
  @IsOptional()
  startDateOp?: MongoOperatorEnum;

  @ApiProperty({
    description: '',
    type: String,
    example: '',
    required: false,
  })
  @IsString()
  @IsOptional()
  updateDate?: string;

  @ApiProperty({
    description: '',
    type: String,
    example: '',
    enum: MongoOperatorEnum,
  })
  @IsEnum(MongoOperatorEnum)
  @IsOptional()
  updateDateOp?: MongoOperatorEnum;
}

export function makeWhereOrder(
  query: OrderQueryParamsDto
): Prisma.OrderWhereInput {
  return {
    AND: {
      status: query.status
        ? {
            [query.statusOp || 'equals']: query.status,
          }
        : undefined,
      clientId: query.clientId
        ? {
            equals: query.clientId,
          }
        : undefined,
      isDelivery: query.isDelivery
        ? {
            equals: query.isDelivery,
          }
        : undefined,
      startDate:
        query.startDate && query.startDateOp
          ? { [query.startDateOp]: query.startDate }
          : undefined,
      updateDate:
        query.updateDate && query.updateDateOp
          ? { [query.updateDateOp]: query.updateDate }
          : undefined,
    },
  };
}
