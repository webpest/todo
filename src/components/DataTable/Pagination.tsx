import React from 'react';
import styles from './Pagination.module.css';

type Props = {
  nextPage: () => void;
  previousPage: () => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  pageOptions: any;
  pageIndex: number;
};

const Pagination: React.FC<Props> = ({
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageOptions,
  pageIndex,
}) => {
  return (
    <div className={styles.pagination}>
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </button>{' '}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </button>{' '}
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
    </div>
  );
};

export default Pagination;
