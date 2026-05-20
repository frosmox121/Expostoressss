import { createRootRoute, Outlet, ScrollRestoration, Scripts } from '@tanstack/react-router'
import * as React from 'react'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Expo Store - Premium Arabian Perfumes & Hair Restoration</title>
        <meta name="description" content="Exquisite viral Arabian perfumes like Yara, Khamrah, Bade'e Al Oud, premium Karseell Collagen hair treatments, elite electronics, and world-class sports apparel." />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
