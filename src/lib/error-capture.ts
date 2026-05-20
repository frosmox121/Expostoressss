let lastError: Error | null = null;

if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    lastError = event.error;
  });
  window.addEventListener("unhandledrejection", (event) => {
    lastError = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
  });
}

export function consumeLastCapturedError(): Error | null {
  const err = lastError;
  lastError = null;
  return err;
}
