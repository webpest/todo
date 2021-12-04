import React, { useState, useMemo, useCallback } from "react";
import useSWR from "swr";
import { Loader, SearchBar, DataTable, Alert } from "components";
import styles from "./Home.module.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: React.FC = () => {
  const [filterTodos, setFilterTodos] = useState<ITodo[]>([]);

  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/todos",
    fetcher,
    {
      onSuccess: (data, key, config) => {
        setFilterTodos(data);
      },
    }
  );

  const memoizedData = useMemo(() => filterTodos, [filterTodos]);
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        Cell: ({ row }: any) => {
          return row.index + 1;
        },
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Completed",
        accessor: "completed",
        Cell: ({ row }: any) => {
          return row.original.completed ? "Yes" : "No";
        },
      },
    ],
    []
  );

  const handleFilter = useCallback(
    (queries: { search: string; completed: string | null }): void => {
      const { search, completed } = queries;

      const result = data.filter((todoData: ITodo) => {
        const status =
          completed === null
            ? true
            : todoData.completed.toString() === completed;
        return todoData.title.search(search) !== -1 && status;
      });
      setFilterTodos(result);
    },
    [data]
  );

  if (error) return <Alert>cannot fetch todos</Alert>;
  if (!data) return <Loader />;

  return (
    <div>
      <header className={styles.header}>
        <div className="container">
          <h1>Todos</h1>
        </div>
      </header>
      <main>
        <div className="container">
          <SearchBar handleFilter={handleFilter} />
          {filterTodos.length < 1 ? (
            <Alert>No result for the search</Alert>
          ) : (
            <DataTable data={memoizedData} columns={columns} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
