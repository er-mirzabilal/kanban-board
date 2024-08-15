import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardReducer from "./features/board-slice";
import taskCardReducer from "./features/task-card-slice";

import { TypedUseSelectorHook, useSelector } from "react-redux";

const rootReducer = combineReducers({
  board: boardReducer,
  taskcard: taskCardReducer,
});

export const store = configureStore({
  reducer: {
    rootReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelecter: TypedUseSelectorHook<RootState> = useSelector;
