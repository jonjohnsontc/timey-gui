import { useEffect, useRef } from "react";

// @ts-ignore 'handler' type
function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      // Create event listener that calls handler function stored in ref
      // @ts-ignore 'savedHandler' type
      const eventListener = (event: Event) => savedHandler.current(event);
      // Add event listener
      element.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}

// function saveTimer(timers, ) {
//   const newTimers = [...timers];
//   const length = `${getTime(time.mins)}:${getTime(time.secs)}`;
//   newTimers.splice(idx, 1, {
//     saved: true,
//     name: name,
//     length: length,
//     running: false,
//     finished: false,
//   });
//   setTimers(newTimers);
// }}
// }

export { useEventListener };
