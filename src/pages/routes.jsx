
import { lazy } from 'react';


const Home = lazy(() => import('pages/home/components'));

export const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: `home`,
    element: <Home />
  },
  {
    path: '*',
    element: <Home/>
  }
];
