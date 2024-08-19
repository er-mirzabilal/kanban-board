import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ActivityDetail {
  id: number;
  name: string;
  comment: string;
}

export interface MemberDetail {
  id: number;
  name: string;
}

interface CardDetail {
  cid: number;
  title: string;
  desc: string;
  date: string | null;
  dueDate: string | null;
  activity: ActivityDetail[];
  members: MemberDetail[];
}

interface CardList {
  listId: number;
  cards: CardDetail[];
}

type CardState = CardList[];

const initialValue: CardState = [
  {
    listId: 1,
    cards: [
      {
        cid: 0,
        title: "",
        desc: "",
        date: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        activity: [
          {
            id: 0,
            name: "",
            comment: "",
          },
        ],
        members: [
          {
            id: 0,
            name: "",
          },
        ],
      },
    ],
  },
];

export const listCardSlice = createSlice({
  name: "listCardSlice",
  initialState: initialValue,
  reducers: {
    setFullCard: (
      state,
      action: PayloadAction<{ listId: number; card: CardDetail }>
    ) => {
      const { listId, card } = action.payload;
      const list = state.find((list) => list.listId === listId);

      if (list) {
        list.cards.push(card); // Directly push the card to the cards array
      }
    },
  },
});

export const getFullCard = (state: RootState) => state.rootReducer.taskcard;

export const { setFullCard } = listCardSlice.actions;
export default listCardSlice.reducer;
