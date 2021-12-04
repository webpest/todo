import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Loader, SearchBar, DataTable, Alert } from "components";
import { fetchTodos } from "api/todos";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filterTodos, setFilterTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const getTodos = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchTodos();
        if (mounted) {
          setTodos(data);
          setFilterTodos(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getTodos();

    return () => {
      mounted = false;
    };
  }, []);

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

      const result = todos.filter((todo) => {
        const status =
          completed === null ? true : todo.completed.toString() === completed;
        return todo.title.search(search) !== -1 && status;
      });
      setFilterTodos(result);
    },
    [todos]
  );

  if (isLoading) return <Loader />;
  if (error) return <Alert>{error.message} - cannot fetch todos</Alert>;

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
