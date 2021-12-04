import React, { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';

type Props = {
  handleFilter: (queries: {search: string, completed: string | null}) => void;
};

const SearchBar: React.FC<Props> = ({ handleFilter }) => {
  const [queries, setQueries] = useState({
    search: '',
    completed: null,
  });

  useEffect(() => {
    if (queries.search !== '' || queries.completed !== null) {
      handleFilter(queries);
    }
  }, [queries, handleFilter]);

  const handleFilterChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const {value, name} = evt.target;
    setQueries({
      ...queries,
      [name]: value,
    });
  };

  return (
    <div className={styles.search_bar}>
      <div className={styles.form_field}>
        <label htmlFor="search">Search</label>
        <input
          name="search"
          id="search"
          type="text"
          onChange={handleFilterChange}
          value={queries.search}
        />
      </div>
      <div className={styles.form_field}>
        <label htmlFor="completed">Completed</label>
        <select
          name="completed"
          id="completed"
          onChange={handleFilterChange}
          defaultValue=""
        >
          <option disabled value=""></option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
