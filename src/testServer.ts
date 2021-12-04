import { rest } from "msw";
import { setupServer } from "msw/node";

const allTodos = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: true,
  },
];

const baseUrl = "https://jsonplaceholder.typicode.com/";

const server = setupServer(
  rest.get(baseUrl + "todos", (req, res, ctx) => {
    return res(ctx.json({ todos: allTodos }));
  }),
  rest.get("*", (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: "You must add request handler." })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest, baseUrl };
