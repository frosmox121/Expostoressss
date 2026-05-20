export function renderErrorPage(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Application Error</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 2rem; background: #fafafa; color: #1a1a1a; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h1 { color: #dc2626; margin-top: 0; }
        p { line-height: 1.5; color: #4b5563; }
        button { background: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
        button:hover { background: #1d4ed8; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>An error occurred</h1>
        <p>The application encountered an error while rendering this page.</p>
        <button onclick="window.location.reload()">Reload Page</button>
      </div>
    </body>
    </html>
  `;
}
