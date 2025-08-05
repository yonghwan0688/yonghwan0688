const loadsh = require("lodash");
const PAGE_LIST_SIZE = 10;

module.exports = ({ totalCount, page, perPage = 10 }) => {
  const PER_PAGE = perPage;
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  let quotient = parseInt(page / PAGE_LIST_SIZE);
  if (page % PAGE_LIST_SIZE === 0) {
    quotient -= 1;
  }
  const startPage = quotient * PAGE_LIST_SIZE + 1;
  const endPage =
    startPage + PAGE_LIST_SIZE - 1 < totalPages
      ? startPage + PAGE_LIST_SIZE - 1
      : totalPages;
  const isFirst = page === 1;
  const isLast = page === totalPages;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  const paginator = {
    pageList: loadsh.range(startPage, endPage + 1),
    page,
    prevPage: page - 1,
    nextPage: page + 1,
    startPage,
    lastPage: totalPages,
    hasPrev,
    hasNext,
    isFirstPage,
    isLastPage,
  };
  return paginator;
};
