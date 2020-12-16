import React, { useState, useEffect } from 'react';

const usePages = (limit) => {
  const [page, setPage] = useState(0);

  const setPageHandler = (direction = 1) => {
    let newPage = page + direction;
    if (newPage < 0) newPage = 0;
    if (newPage > limit) newPage = limit;
    setPage(newPage);
  };

  return [page, setPageHandler];
};

export default usePages;
