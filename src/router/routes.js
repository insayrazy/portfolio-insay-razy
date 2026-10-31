import { lazy } from 'react'

// Route-level code splitting: each page is its own chunk.
export const Home = lazy(() => import('@/pages/Home'))
export const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
export const NotFound = lazy(() => import('@/pages/NotFound'))

export const ROUTES = {
  home: '/',
  projects: '/projects',
}
