"use client";

import { palette } from "@/theme/palette";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { ListCard } from "../ListCard";
import { FC, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, useAppSelecter } from "@/redux/store";
import { setFullCard } from "@/redux/features/task-card-slice";

interface TaskListProps {
  lisIid: number;
  title: string;
}

const TaskList: FC<TaskListProps> = ({ lisIid, title }) => {
  // const taskCard = useSelector(
  //   (state: RootState) => state.rootReducer.taskcard
  // );
  // const dispatch = useDispatch<AppDispatch>();

  const [isAddCard, setIsAddCard] = useState(false);
  const [taskCard, setTaskCard] = useState([
    {
      id: 1,
      title: "Card title",
      desc: "Desc A",
      date: "",
      dueDate: "",
      activity: [
        {
          name: "Name A",
          comment: "Comment A",
        },
      ],
      members: [
        {
          name: "Member A",
        },
      ],
    },
  ]);

  const [newCardTitle, setNewCardTitle] = useState("");

  const handleAddACardClick = () => {
    setIsAddCard(true);
  };

  const handleAddCardClick =
    (listId: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      if (newCardTitle.trim() !== "") {
        const cardCount =
          taskCard.find((list) => list.listId === listId)?.cards.length || 0;
        const newCardId = cardCount + 1;
        // dispatch(
        //   setFullCard({
        //     listId,
        //     card: {
        //       cid: newCardId,
        //       title: newCardTitle,
        //       desc: "",
        //       date: "",
        //       dueDate: "",
        //       activity: [
        //         {
        //           id: 0,
        //           name: "",
        //           comment: "",
        //         },
        //       ],
        //       members: [
        //         {
        //           id: 0,
        //           name: "",
        //         },
        //       ],
        //     },
        //   })
        // );

        const newCard = {
          id: taskCard.length + 1,
          title: newCardTitle,
          desc: "New Description",
          date: "",
          dueDate: "",
          activity: [],
          members: [],
        };

        setTaskCard((prevTaskCard) => [...prevTaskCard, newCard]);
        setNewCardTitle("");
        setIsAddCard(false);
      }
    };

  return (
    <Box
      //   maxHeight="sm"
      sx={{
        flex: "1 1 auto",
        width: "272px",
        maxWidth: "272px",
        maxHeight: "495px",
        backgroundColor: palette.color.listColors.bg,
        borderRadius: "12px",
        boxShadow: `var(--ds-shadow-raised, 0px 1px 1px #091e4240, 0px 0px 1px #091e424f)`,
        p: "7px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* List title section */}
      <Stack
        direction={"row"}
        gap={0.5}
        sx={{
          width: "272px",
          mb: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          defaultValue={title || "Title"}
          sx={{
            width: "224px",
            border: "none",
            "& .MuiInputBase-input": {
              fontSize: "14px", // Change the font size
              fontWeight: 600,
              color: "#172B4D", // Change the text color
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none", // Removes the border
              },
            },
          }}
        />
        <IconButton size="small">
          <MoreHorizOutlinedIcon sx={{ color: "#44546F" }} />
        </IconButton>
      </Stack>

      {/* Cards section */}
      <Box
        sx={{
          overflowY: "auto",
          flex: 1,
          width: "100%",
          px: "2px",
          pb: "3px",
          backgroundColor: palette.color.listColors.bg,
        }}
      >
         {taskCard.map((card) => (
          <ListCard key={card.id} title={card.title} listTitle={title} />
        ))} 

        {/* {taskCard
          .find((list) => list.listId === 1)
          ?.cards.map((card) => (
            <ListCard key={card.cid} title={card.title} listTitle={title} />
          ))} */}
      </Box>

      {/* Add new cards section */}
      {!isAddCard ? (
        <Stack
          direction={"row"}
          onClick={handleAddACardClick}
          sx={{
            height: "32px",
            width: "220px",
            mt: "10px",
            pl: "10px",
            display: "flex",
            alignItems: "center",
            borderRadius: "7px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#D0D4DB",
            },
          }}
        >
          <AddRoundedIcon sx={{ width: "20px", height: "20px" }} />
          <Typography variant="text-sm-regular" sx={{ ml: "5px" }}>
            Add a Card
          </Typography>
        </Stack>
      ) : (
        <Stack direction={"column"} gap={1} sx={{ mt: "10px" }}>
          <TextField
            placeholder={"Enter a name for this card..."}
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            sx={{ width: "100%" }}
          />
          <Stack direction={"row"} gap={1}>
            <Button variant="contained" onClick={handleAddCardClick(lisIid)}>
              Add Card
            </Button>
            <IconButton size="small" onClick={() => setIsAddCard(false)}>
              <CloseRoundedIcon sx={{ color: "black" }} />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default TaskList;
