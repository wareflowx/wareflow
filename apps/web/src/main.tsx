import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import './styles.css'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Apply Geist fonts
if (typeof document !== 'undefined') {
  document.body.classList.add(`${GeistSans.variable} ${GeistMono.variable}`)
  document.documentElement.classList.add(GeistSans.className)
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<RouterProvider router={router} />)
}
