import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Dayjs } from "dayjs";
import { DropResult } from "@hello-pangea/dnd";

const uniqueId = (num: number) => {
  return `${Date.now() + num}`;
};

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
  startDate: string | null | Dayjs;
  dueDate: string | null | Dayjs;
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

interface UpdateCardDatesPayload {
  listId: string;
  cardId: string;
  startDate: Dayjs | null;
  dueDate: Dayjs | null;
}

interface ReorderListsPayload {
  sourceIndex: number;
  destinationIndex: number;
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
      listId: uniqueId(1),
      listTitle: "To Do",
      cards: [],
    },
    {
      listId: uniqueId(2),
      listTitle: "In Progress",
      cards: [],
    },
    {
      listId: uniqueId(3),
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

    updateCardDates: (state, action: PayloadAction<UpdateCardDatesPayload>) => {
      const { listId, cardId, startDate, dueDate } = action.payload;

      const list = state.value.find((list) => list.listId === listId);
      if (list) {
        const card = list.cards.find((card) => card.cardId === cardId);
        if (card) {
          if (startDate !== null) {
            card.startDate = startDate.toISOString();
          } else if (startDate === null) {
            card.startDate = startDate;
          }

          if (dueDate !== null) {
            card.dueDate = dueDate.toISOString();
          } else if (dueDate === null) {
            card.dueDate = dueDate;
          }
        }
      }
    },

    addListTitle: (
      state,
      action: PayloadAction<{
        listId: string;
        listTitle: string;
      }>
    ) => {
      const { listId, listTitle } = action.payload;

      const list = state.value.find((list) => list.listId === listId);
      if (list) {
        list.listTitle = listTitle;
      }
    },

    addCardTitle: (
      state,
      action: PayloadAction<{
        listId: string;
        cardId: string;
        cardTitle: string;
      }>
    ) => {
      const { listId, cardId, cardTitle } = action.payload;

      const list = state.value.find((list) => list.listId === listId);
      if (list) {
        const card = list.cards.find((card) => card.cardId === cardId);
        if (card) {
          card.title = cardTitle; // Update the title
        }
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

    editComment: (
      state,
      action: PayloadAction<{
        listId: string;
        cardId: string;
        commentId: number;
        newMessage: string;
      }>
    ) => {
      const { listId, cardId, commentId, newMessage } = action.payload;

      const list = state.value.find((list) => list.listId === listId);
      if (list) {
        const card = list.cards.find((card) => card.cardId === cardId);
        if (card && card.comments) {
          const comment = card.comments.find(
            (comment) => comment.id === commentId
          );
          if (comment) {
            // Update the comment's message
            comment.message = newMessage;
          }
        }
      }
    },

    deleteComment: (
      state,
      action: PayloadAction<{
        listId: string;
        cardId: string;
        commentId: number;
      }>
    ) => {
      const { listId, cardId, commentId } = action.payload;

      const list = state.value.find((list) => list.listId === listId);
      if (list) {
        const card = list.cards.find((card) => card.cardId === cardId);
        if (card && card.comments) {
          // Remove the comment by filtering it out
          card.comments = card.comments.filter(
            (comment) => comment.id !== commentId
          );
        }
      }
    },

    reorderCards: (
      state,
      action: PayloadAction<{
        source: DropResult["source"];
        destination: DropResult["destination"];
      }>
    ) => {
      const { source, destination } = action.payload;
      // Check if destination is valid (not null or undefined)
      if (!destination) return;

      // Find the source and destination lists
      const sourceList = state.value.find(
        (list) => list.listId === source.droppableId
      );
      const destinationList = state.value.find(
        (list) => list.listId === destination.droppableId
      );
      if (!sourceList) {
        console.error(
          `Source list not found for droppableId: ${source.droppableId}`
        );
        return;
      }
      if (!destinationList) {
        console.error(
          `Destination list not found for droppableId: ${destination.droppableId}`
        );
        return;
      }
      // Remove the card from the source list
      const [movedCard] = sourceList.cards.splice(source.index, 1);

      // Add the card to the destination list
      destinationList.cards.splice(destination.index, 0, movedCard);
    },

    reorderLists: (state, action: PayloadAction<ReorderListsPayload>) => {
      const { sourceIndex, destinationIndex } = action.payload;

      // Ensure the source and destination indices are within bounds
      if (
        sourceIndex >= 0 &&
        destinationIndex >= 0 &&
        sourceIndex < state.value.length &&
        destinationIndex < state.value.length
      ) {
        // Remove the list from the source index
        const [movedList] = state.value.splice(sourceIndex, 1);

        // Insert the list at the destination index
        state.value.splice(destinationIndex, 0, movedList);
      }
    },
  },
});

export const {
  addList,
  addCard,
  addListTitle,
  addCardTitle,
  updateCardDates,
  addDescription,
  addComment,
  editComment,
  deleteComment,
  reorderCards,
  reorderLists,
} = listSlice.actions;
export default listSlice.reducer;
