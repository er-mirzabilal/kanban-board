import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CommentDetail {
  id: number;
  date: string;
  name: string;
  message: string;
}

export interface MemberDetail {
  id: number;
  name: string;
}

export interface CardDetail {
  cardId: string;
  title: string;
  desc: string;
  startDate: string | null;
  dueDate: string | null;
  members: MemberDetail[];
  comments: CommentDetail[];
}

interface AddCardPayload {
  listId: string;
  cardTitle: string;
}

interface AddCardDescPayload {
  listId: string;
  cardId: string;
  description: string;
}

interface AddCardCommentPayload {
  listId: string;
  cardId: string;
  name: string;
  commValue: string;
}

type ListState = {
  listId: string;
  listTitle: string;
  cards: CardDetail[];
}[];

type InitialState = {
  value: ListState;
};

const initialValue = {
  value: [
    {
      listId: "1",
      listTitle: "To Do",
      cards: [],
    },
    {
      listId: "2",
      listTitle: "In Progress",
      cards: [],
    },
    {
      listId: "3",
      listTitle: "Done",
      cards: [],
    },
  ],
} as InitialState;

const formatDate = (date: Date) => {
  // Array of month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get date components
  const day = date.getDate(); // Day of the month (1-31)
  const month = months[date.getMonth()]; // Month name (Jan-Dec)
  const year = date.getFullYear(); // Full year (e.g., 2024)

  // Get time components
  const hours = String(date.getHours()).padStart(2, "0"); // Hours (00-23)
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Minutes (00-59)

  // Format the date as "8 Aug 2024, 12:34"
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
};

export const listSlice = createSlice({
  name: "listSlice",
  initialState: initialValue,
  reducers: {
    addList: (state, action: PayloadAction<string>) => {
      const uniqueId = () => {
        return `${Date.now()}`;
      };
      const newList = {
        listId: uniqueId(),
        listTitle: action.payload,
        cards: [],
      };
      state.value.push(newList);
    },

    addCard: (state, action: PayloadAction<AddCardPayload>) => {
      const { listId, cardTitle } = action.payload;
      const uniqueId = () => {
        return `${Date.now()}`;
      };

      // Find the list by listId
      const list = state.value.find((list) => list.listId === listId);
      if (list) {
        const newCard: CardDetail = {
          cardId: uniqueId(), // Generate unique card ID
          title: cardTitle,
          desc: "", // Default description
          startDate: null,
          dueDate: null,
          members: [], // Empty members array by default
          comments: [], // Empty comments array by default
        };

        // Add the new card to the list's cards array
        list.cards.push(newCard);
      }
    },

    addDescription: (state, action: PayloadAction<AddCardDescPayload>) => {
      const { listId, cardId, description } = action.payload;

      const list = state.value.find((list) => list.listId === listId);
      if (list) {
        const card = list.cards.find((card) => card.cardId === cardId);
        if (card) {
          card.desc = description; // Update the description
        }
      }
    },

    addComment: (state, action: PayloadAction<AddCardCommentPayload>) => {
      const uniqueId = () => {
        return `${Date.now()}`;
      };
      const { listId, cardId, name, commValue } = action.payload;

      const list = state.value.find((list) => list.listId === listId);
      if (list) {
        const card = list.cards.find((card) => card.cardId === cardId);
        if (card) {
          if (!card.comments) {
            card.comments = [];
          }
          // Update the comment
          const newComment: CommentDetail = {
            id: parseInt(uniqueId()),
            date: formatDate(new Date()),
            name: name || "Name",
            message: commValue,
          };
          card.comments.push(newComment);
        }
      }
    },
  },
});

export const { addList, addCard, addDescription, addComment } = listSlice.actions;
export default listSlice.reducer;
