import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '@/routes/layouts/default';
import ErrorPage from '@/routes/layouts/error';
import { AppRoutes } from '@/config';

const appRouter = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import('@/views/home/home')).default }),
      },
    ],
  },
]);

export default appRouter;
