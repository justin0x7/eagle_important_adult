import * as React from 'react';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppDispatch } from './core/hooks/rtkHooks';
import { loadImportantEventsBasicData } from './core/store/slices/importantEventsSlice';

const Index = lazy(() => import('./pages'));

export default function App() {

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadImportantEventsBasicData());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/:encodedParamObject",
      element:
        <Suspense fallback={<>Loading...</>}>
          <Index />
        </Suspense>
    }
  ]);

  return <RouterProvider router={router} />;
}
