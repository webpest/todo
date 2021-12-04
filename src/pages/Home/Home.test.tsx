import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { SWRConfig, cache } from "swr";
import { server, rest, baseUrl } from "testServer";
import Home from "./Home";

afterEach(() => cache.clear());

// test("it fetches and display todos", async () => {
//   render(
//     <SWRConfig value={{ dedupingInterval: 0 }}>
//       <Home />
//     </SWRConfig>
//   );
//   expect(screen.getByTitle("loader")).toBeInTheDocument();
// });

test("it handle server error", async () => {
  server.use(
    rest.get(baseUrl + "todos", async (req, res, ctx) => {
      console.log("hi");
      return res(ctx.status(500));
    })
  );
  const { getByText } = render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <Home />
    </SWRConfig>
  );
  const element = await waitFor(() => getByText(/cannot fetch todos/i));
  expect(element).toBeInTheDocument();
});
