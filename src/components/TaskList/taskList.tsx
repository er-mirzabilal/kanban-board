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
import { AppDispatch, RootState } from "@/redux/store";
import { addCard, addListTitle } from "@/redux/features/task-list-slice";
import { Draggable, Droppable } from "@hello-pangea/dnd";

interface TaskListProps {
  listId: string;
  title: string;
  index: number; // Index prop for draggable lists
}

const TaskList: FC<TaskListProps> = ({ listId, title, index }) => {
  const dispatch = useDispatch<AppDispatch>();

  const listTitle = useSelector((state: RootState) => {
    const list = state.rootReducer.tasklist.value.find(
      (list) => list.listId === listId
    );
    return list ? list.listTitle : "";
  });

  const cards = useSelector(
    (state: RootState) =>
      state.rootReducer.tasklist.value.find((list) => list.listId === listId)
        ?.cards || []
  );

  const [isAddCard, setIsAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [titalValue, setTitalValue] = useState(title);

  const handleAddACardClick = () => {
    setIsAddCard(true);
  };

  const handleAddCardClick = (listId: string) => {
    if (newCardTitle.trim() !== "") {
      dispatch(addCard({ listId, cardTitle: newCardTitle }));
      setNewCardTitle("");
      setIsAddCard(false);
    }
  };

  const handleTitleBlur = () => {
    if (titalValue.trim() !== "") {
      const payload = {
        listId: listId,
        listTitle: titalValue,
      };
      dispatch(addListTitle(payload));
    } else {
      setTitalValue(listTitle);
    }
  };

  return (
    // <Draggable draggableId={listId} index={index}>
    //   {(provided) => (
    <Box
      // ref={provided.innerRef}
      // {...provided.draggableProps}
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
          value={titalValue}
          onChange={(e) => setTitalValue(e.target.value)}
          onBlur={handleTitleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleTitleBlur();
            }
          }}
          sx={{
            width: "224px",
            border: "none",
            "& .MuiInputBase-input": {
              fontSize: "14px",
              fontWeight: 600,
              color: "#172B4D",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "2px solid #0c66e4",
              },
            },
          }}
        />
        <IconButton
          size="small"
          // {...provided.dragHandleProps}
        >
          <MoreHorizOutlinedIcon sx={{ color: "#44546F" }} />
        </IconButton>
      </Stack>

      {/* Cards section */}
      <Droppable key={listId} droppableId={`${listId}`} type="CARD">
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              overflowY: "auto",
              flex: 1,
              width: "100%",
              px: "2px",
              pb: "3px",
              backgroundColor: palette.color.listColors.bg,
            }}
          >
            {cards.map((card, index) => (
              <Draggable
                key={card.cardId}
                draggableId={card.cardId}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <ListCard
                      cardId={card.cardId}
                      listId={listId}
                      title={card.title}
                      listTitle={title}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>

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
            autoFocus
            onChange={(e) => setNewCardTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddCardClick(listId);
              }
            }}
            placeholder={"Enter a name for this card..."}
            value={newCardTitle}
            sx={{ width: "100%" }}
          />
          <Stack direction={"row"} gap={1}>
            <Button
              variant="contained"
              onClick={() => handleAddCardClick(listId)}
            >
              Add Card
            </Button>
            <IconButton
              size="small"
              onClick={() => {
                setIsAddCard(false);
                setNewCardTitle("");
              }}
            >
              <CloseRoundedIcon sx={{ color: "black" }} />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </Box>
    //   )}
    // </Draggable>
  );
};

export default TaskList;
