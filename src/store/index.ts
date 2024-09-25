import { configureStore } from "@reduxjs/toolkit";
import subjectReducer from "./slices/subjectSlice";
import topicReducer from "./slices/topicSlice";

export const store = configureStore({
  reducer: {
    subjects: subjectReducer,
    topics: topicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
