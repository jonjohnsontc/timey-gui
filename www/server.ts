import { serve } from "https://deno.land/std/http/server.ts";
import { dirname, fromFileUrl, join } from "https://deno.land/std/path/mod.ts";
import { refresh } from "./devServer/mod.ts";

// Create useful file path variable for our code.
const __dirname = fromFileUrl(dirname(import.meta.url));
const clientFilePath = join(__dirname, "./devServer/client.js");
const indexFilePath = join(__dirname, "./index.html");

// Construct the refresh middleware.
const refreshMiddleware = refresh();

// Start a server on port `8000`.
serve((req: Request) => {
  // Handle custom refresh middleware requests.
  const res = refreshMiddleware(req);

  if (res) {
    return res;
  }

  // Handle requests for the client-side refresh code.
  if (req.url.endsWith("client.js")) {
    const client = Deno.readTextFileSync(clientFilePath);

    return new Response(client, {
      headers: {
        "Content-Type": "application/javascript",
      },
    });
  }

  // Handle requests for the page's HTML.
  const index = Deno.readTextFileSync(indexFilePath);

  return new Response(index, {
    headers: { "Content-Type": "text/html" },
  });
});

console.log("Listening on http://localhost:8000");
