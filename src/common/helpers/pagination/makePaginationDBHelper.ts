import { PaginationDto } from './pagination.dto';

export const makePaginationDBHelper = ({
  page = 0,
  size = 10,
  sort,
  order,
}: PaginationDto) => {
  let orderBy = undefined;
  if (sort && order) {
    orderBy = { [sort]: order };
  }
  return {
    skip: page * size,
    take: Number(size),
    orderBy,
  };
};
