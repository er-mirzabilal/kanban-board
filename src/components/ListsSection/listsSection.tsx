"use client";
import { useState } from "react";
import {
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { palette } from "@/theme/palette";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  addList,
  reorderCards,
  reorderLists,
} from "@/redux/features/task-list-slice";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { TaskList } from "../TaskList";

const ListsSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const taskLists = useSelector(
    (state: RootState) => state.rootReducer.tasklist.value
  );
  const [listTitle, setListTitle] = useState("");
  const [isAddList, setIsAddList] = useState(false);

  const handleAddAnotherListClick = () => {
    setIsAddList(true);
  };

  const handleAddListClick = () => {
    setIsAddList(false);
  };

  const handleAddListButtonClick = () => {
    if (listTitle.trim() !== "") {
      dispatch(addList(listTitle));
      setIsAddList(false);
      setListTitle(""); // Clear title after adding
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    // No destination means no change
    if (!destination) return;

    // If the item is dropped where it was already, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      dispatch(
        reorderLists({
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    } else if (type === "CARD") {
      dispatch(
        reorderCards({
          source,
          destination,
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        key="all--lists"
        droppableId="all--lists"
        direction="horizontal"
        type="list"
      >
        {(provided) => (
          <Container
            maxWidth="xl"
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              overflowY: "auto",
              height: "100%",
              pt: "75px",
              px: "0px !important",
              display: "flex",
            }}
          >
            <Stack direction={"row"} gap={1.5} alignItems="flex-start">
              {taskLists.map((list, index) => (
                <Draggable
                  key={list.listId}
                  draggableId={list.listId}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? 0.8 : 1,
                        transition: snapshot.isDragging
                          ? "transform 0.1s ease"
                          : "",
                      }}
                    >
                      <TaskList
                        listId={list.listId}
                        title={list.listTitle}
                        index={index}
                      />
                    </div>
                  )}
                </Draggable>
              ))}

              {!isAddList ? (
                <Stack
                  direction={"row"}
                  gap={1}
                  onClick={handleAddAnotherListClick}
                  sx={{
                    height: "42px",
                    minWidth: "272px",
                    p: "12px",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "12px",
                    cursor: "pointer",
                    backgroundColor: "#d981ab",
                    "&:hover": {
                      backgroundColor: "#C76C9E",
                    },
                  }}
                >
                  <AddRoundedIcon
                    sx={{
                      width: "20px",
                      height: "20px",
                      color: palette.base.white,
                    }}
                  />
                  <Typography
                    variant="text-sm-regular"
                    sx={{ color: palette.base.white }}
                  >
                    Add another list
                  </Typography>
                </Stack>
              ) : (
                <Stack
                  direction={"column"}
                  gap={1}
                  sx={{
                    minWidth: "272px",
                    height: "93px",
                    p: "10px",
                    borderRadius: "12px",
                    backgroundColor: palette.color.listColors.bg,
                  }}
                >
                  <TextField
                    autoFocus
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddListButtonClick();
                      }
                    }}
                    placeholder={"Enter list name..."}
                    sx={{ width: "100%" }}
                  />
                  <Stack direction={"row"} gap={1}>
                    <Button
                      variant="contained"
                      onClick={handleAddListButtonClick}
                    >
                      Add List
                    </Button>
                    <IconButton size="small" onClick={handleAddListClick}>
                      <CloseRoundedIcon sx={{ color: "black" }} />
                    </IconButton>
                  </Stack>
                </Stack>
              )}
              {provided.placeholder}
            </Stack>
            {/* {provided.placeholder} */}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListsSection;
