import * as React from 'react';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppDispatch } from './core/hooks/rtkHooks';
import { loadImportantEventsVuxBasicData } from './core/store/slices/importantEventsVuxSlice';

const Index = lazy(() => import('./pages'));

export default function App() {

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadImportantEventsVuxBasicData());
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
