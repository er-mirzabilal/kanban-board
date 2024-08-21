import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: BoardState;
};

type BoardState = {
  isBoardTitle: boolean;
  boardTitle: string;
  bid: string;
};

const initialState = {
  value: {
    isBoardTitle: true,
    boardTitle: "My Board",
    bid: "",
  } as BoardState,
} as InitialState;

export const board = createSlice({
  name: "board",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isBoardTitle: true,
          boardTitle: action.payload,
          bid: "1",
        },
      };
    },
  },
});

export const { setTitle } = board.actions;
export default board.reducer;
