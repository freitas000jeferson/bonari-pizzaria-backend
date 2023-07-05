import { PaginationDto } from './pagination.dto';

export const makePaginationApiResponseHelper = ({
  pagination,
  totalItems,
}: {
  pagination: PaginationDto;
  totalItems: number;
}) => {
  const size: number = Number(pagination.size!);
  const totalPages = Math.ceil(totalItems / size!) - 1;
  const currentPage = Number(pagination.page);

  return {
    length: totalItems,
    size: size,
    lastPage: totalPages,
    page: currentPage,
    startIndex: currentPage * size,
    endIndex: currentPage * size + (size + 1),
  };
};
