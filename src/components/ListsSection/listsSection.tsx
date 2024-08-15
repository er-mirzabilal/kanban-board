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
import { TaskList } from "../TaskList";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { palette } from "@/theme/palette";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelecter } from "@/redux/store";

const ListsSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [listTitle, setListTitle] = useState("");
  const [taskLists, setTaskLists] = useState([
    { id: 1, title: "To Do" },
    { id: 2, title: "In Progress" },
    { id: 3, title: "Done" },
  ]);

  const [isAddList, setIsAddList] = useState(false);

  const handleAddAnotherListClick = () => {
    setIsAddList(true);
  };

  const handleAddListClick = () => {
    setIsAddList(false);
  };

  const handleAddListButtonClick = () => {
    const newList = {
      id: taskLists.length + 1,
      title: `${listTitle}`,
    };
    setTaskLists((prevTaskLists) => [...prevTaskLists, newList]);
    setIsAddList(false);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        overflowY: "auto",
        height: "100%",
        pt: "75px",
        px: "0px !important",
      }}
    >
      <Stack direction={"row"} gap={1.5} alignItems="flex-start">
        {taskLists.map((list) => (
          <TaskList key={list.id} lisIid={list.id} title={list.title} />
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
              sx={{ width: "20px", height: "20px", color: palette.base.white }}
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
              onChange={(e) => setListTitle(e.target.value)}
              placeholder={"Enter list name..."}
              sx={{ width: "100%" }}
            ></TextField>
            <Stack direction={"row"} gap={1}>
              <Button variant="contained" onClick={handleAddListButtonClick}>
                Add List
              </Button>
              <IconButton size="small" onClick={handleAddListClick}>
                <CloseRoundedIcon sx={{ color: "black" }} />
              </IconButton>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default ListsSection;
