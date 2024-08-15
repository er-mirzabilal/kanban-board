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
    
    // setFullCard: (state, action: PayloadAction<CardDetail>) => {
    //   const index = state.findIndex((card) => card.cid === action.payload.cid);
    //   if (index !== -1) {
    //     state[index] = action.payload;
    //   } else {
    //     state.push(action.payload);
    //   }
    // },

    // setFullCard: (
    //   state,
    //   action: PayloadAction<{ listId: number; card: CardDetail }>
    // ) => {
    //   const { listId, card } = action.payload;
    //   const list = state.find((list) => list.listId === listId);
    //   const index = state.findIndex((card) => card.listId === action.payload.listId);
    //   // if (index !== -1) {
    //   //   state[index].cards = action.payload.newId;
    //   // }
    //   if (list && index !== -1) {
    //     state[index].cards = [...list.cards , card] as CardDetail[];
    //   }
    // },

    // setCardId: (
    //   state,
    //   action: PayloadAction<{ cid: number; newId: number }>
    // ) => {
    //   const index = state.findIndex((card) => card.cid === action.payload.cid);
    //   if (index !== -1) {
    //     state[index].cards = action.payload.newId;
    //   }
    // },
    // setCardTitle: (
    //   state,
    //   action: PayloadAction<{ cid: number; title: string }>
    // ) => {
    //   const index = state.findIndex((card) => card.cid === action.payload.cid);
    //   if (index !== -1) {
    //     state[index].title = action.payload.title;
    //   }
    // },
    // setCardDesc: (
    //   state,
    //   action: PayloadAction<{ cid: number; desc: string }>
    // ) => {
    //   const index = state.findIndex((card) => card.cid === action.payload.cid);
    //   if (index !== -1) {
    //     state[index].desc = action.payload.desc;
    //   }
    // },
    // setCardDate: (
    //   state,
    //   action: PayloadAction<{ cid: number; date: string | null }>
    // ) => {
    //   const index = state.findIndex((card) => card.cid === action.payload.cid);
    //   if (index !== -1) {
    //     state[index].date = action.payload.date;
    //   }
    // },
    // setCardDueDate: (
    //   state,
    //   action: PayloadAction<{ cid: number; dueDate: string | null }>
    // ) => {
    //   const index = state.findIndex((card) => card.cid === action.payload.cid);
    //   if (index !== -1) {
    //     state[index].dueDate = action.payload.dueDate;
    //   }
    // },
    // addCardActivity: (
    //   state,
    //   action: PayloadAction<{ cid: number; activity: ActivityDetail }>
    // ) => {
    //   const index = state.findIndex((card) => card.cid === action.payload.cid);
    //   if (index !== -1) {
    //     state[index].activity.push(action.payload.activity);
    //   }
    // },
    // removeCardActivity: (
    //   state,
    //   action: PayloadAction<{ cid: number; activityId: number }>
    // ) => {
    //   const index = state.findIndex((card) => card.cid === action.payload.cid);
    //   if (index !== -1) {
    //     state[index].activity = state[index].activity.filter(
    //       (activity) => activity.id !== action.payload.activityId
    //     );
    //   }
    // },
    // addCardMember: (
    //   state,
    //   action: PayloadAction<{ cid: number; member: MemberDetail }>
    // ) => {
    //   const index = state.findIndex((card) => card.cid === action.payload.cid);
    //   if (index !== -1) {
    //     state[index].members.push(action.payload.member);
    //   }
    // },
    // removeCardMember: (
    //   state,
    //   action: PayloadAction<{ cid: number; memberId: number }>
    // ) => {
    //   const index = state.findIndex((card) => card.cid === action.payload.cid);
    //   if (index !== -1) {
    //     state[index].members = state[index].members.filter(
    //       (member) => member.id !== action.payload.memberId
    //     );
    //   }
    // },
  },
});

// export const getFullCard = (state: RootState) => state.rootReducer.taskcard;
// export const getCardById = (state: RootState, cid: number) =>
//   state.rootReducer.taskcard.find((card) => card.cid === cid);
// export const getCardTitle = (state: RootState, cid: number) =>
//   state.rootReducer.taskcard.find((card) => card.cid === cid)?.title;

export const getFullCard = (state: RootState) => state.rootReducer.taskcard;
// export const getCardId = (state: RootState) =>
//   state.rootReducer.taskcard.map((card) => card.cid);
// export const getCardTitle = (state: RootState) =>
//   state.rootReducer.taskcard.map((card) => card.title);
// export const getCardDesc = (state: RootState) =>
//   state.rootReducer.taskcard.map((card) => card.desc);
// export const getCardStartDate = (state: RootState) =>
//   state.rootReducer.taskcard.map((card) => card.date);
// export const getCardDueDate = (state: RootState) =>
//   state.rootReducer.taskcard.map((card) => card.dueDate);
// export const getCardActivity = (state: RootState) =>
//   state.rootReducer.taskcard.map((card) => card.activity);
// export const getCardMembers = (state: RootState) =>
//   state.rootReducer.taskcard.map((card) => card.members);

export const {
  setFullCard,
  // setCardId,
  // setCardTitle,
  // setCardDesc,
  // setCardDate,
  // setCardDueDate,
  // addCardActivity,
  // removeCardActivity,
  // addCardMember,
  // removeCardMember,
} = listCardSlice.actions;
export default listCardSlice.reducer;
