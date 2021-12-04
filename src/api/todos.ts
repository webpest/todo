import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

export const fetchTodos = async (): Promise<AxiosResponse<ITodo[]>> => {
  try {
    const todos: AxiosResponse<ITodo[]> = await axios.get("/todos", config);
    return todos;
  } catch (error) {
    throw new Error(error);
  }
};
