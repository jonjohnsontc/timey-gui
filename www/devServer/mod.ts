/**
 * Watch files from current directory
 * and trigger a refresh on change.
 */
async function watch() {
  // Create our file watcher.
  const watcher = Deno.watchFs("./");

  // Wait for, and loop over file events.
  for await (const event of watcher) {
    // Skip the "any" and "access" events to reduce
    // unnecessary refreshes.
    if (["any", "access"].includes(event.kind)) {
      continue;
    }

    // TODO: trigger a browser refresh.
    sockets.forEach((socket) => {
      socket.send("refresh");
    });
  }
}

/**
 * In-memory store of open WebSockets for
 * triggering browser refresh.
 */
const sockets: Set<WebSocket> = new Set();

/**
 * Upgrade a request connection to a WebSocket if
 * the url ends with "/refresh"
 */
function refreshMiddleware(req: Request): Response | null {
  if (req.url.endsWith("/refresh")) {
    const { response, socket } = Deno.upgradeWebSocket(req);

    // Add the new socket to our in-memory store
    // of WebSockets.
    sockets.add(socket);

    // Remove the socket from our in-memory store
    // when the socket closes.
    socket.onclose = () => {
      sockets.delete(socket);
    };

    return response;
  }

  return null;
}

/**
 * Constructs a refresh middleware for reloading
 * the browser on file changes.
 */
export function refresh(): (req: Request) => Response | null {
  watch();

  return refreshMiddleware;
}
