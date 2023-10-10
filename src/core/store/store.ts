import { configureStore } from "@reduxjs/toolkit";

import importantEventsVuxSliceReducer from "./slices/importantEventsVuxSlice";

export const store = configureStore({
  reducer: {
    importantEventsVux: importantEventsVuxSliceReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AsyncThunkConfig = {
  state: RootState,
  dispatch: AppDispatch;
};

export default store;
