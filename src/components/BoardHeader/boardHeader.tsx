"use client";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import FlashOnOutlinedIcon from "@mui/icons-material/FlashOnOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { setTitle } from "@/redux/features/board-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelecter } from "@/redux/store";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 15,
  height: 15,
  border: `1px solid`,
}));

const BoardHeader = () => {
  const [boardTitle, setBoardTitle] = useState("My Board");
  const [boardTitleFlag, setBoardTitleFlag] = useState(true);
  const boardtitle = useAppSelecter(
    (state) => state.rootReducer.board.value.boardTitle
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleBoardTitleClick = () => {
    setBoardTitleFlag(false);
    setBoardTitle(boardTitle);
  };

  const handleboardTitleBlur = () => {
    console.log("TextField was deselected");
    // custom logic here
    setBoardTitle(boardTitle);
    setBoardTitleFlag(true);

    dispatch(setTitle(boardTitle));
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#9C446E",
        top: 0,
        left: 0,
        py: "7px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: "10px",
          width: "100%",
          display: "flex",
          // justifyContent: "space-between",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ width: "100%" }}
        >
          {/* left side actions */}
          <Stack
            direction={"row"}
            gap={0.5}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box sx={{ width: "auto" }}>
              {boardTitleFlag ? (
                <IconButton
                  onClick={handleBoardTitleClick}
                  sx={{ width: "100%" }}
                >
                  <Typography variant="text-lg-bold" sx={{ color: "white" }}>
                    {boardtitle}
                  </Typography>
                </IconButton>
              ) : (
                <TextField
                  sx={{
                    minWidth: "78px",
                    width: "auto !important",
                    "& .MuiOutlinedInput-root": {
                      "& input": {
                        height: "48px",
                        minWidth: "78px",
                        width: "auto !important",
                        backgroundColor: "White", // Change this to your desired text color
                        color: "black", // Change this to your desired text color
                      },
                    },
                  }}
                  autoFocus
                  defaultValue={boardTitle || "My Board"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleboardTitleBlur();
                    }
                  }}
                  onChange={(e) => setBoardTitle(e.target.value)}
                  onBlur={handleboardTitleBlur}
                  id="outlined-basic"
                  variant="outlined"
                />
              )}
            </Box>

            <IconButton>
              <StarBorderRoundedIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton>
              <PeopleOutlineIcon sx={{ color: "white" }} />
            </IconButton>
            <Stack direction={"row"}>
              <IconButton>
                <AutoAwesomeMosaicOutlinedIcon sx={{ color: "white" }} />
                <Typography
                  variant="text-sm-regular"
                  sx={{ color: "white", mx: "5px" }}
                >
                  Board
                </Typography>
                <KeyboardArrowDownRoundedIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
          </Stack>

          {/* left side actions */}
          <Stack
            direction={"row"}
            gap={0.5}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <IconButton>
              <RocketLaunchOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton>
              <FlashOnOutlinedIcon sx={{ color: "white" }} />
            </IconButton>

            {/* filter button */}
            <IconButton>
              <FilterListOutlinedIcon sx={{ color: "white" }} />
              <Typography
                variant="text-sm-regular"
                sx={{ color: "white", mx: "5px" }}
              >
                Filter
              </Typography>
            </IconButton>

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ backgroundColor: "#AC6386" }}
            />

            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              sx={{ mx: "3px" }}
              badgeContent={<SmallAvatar alt="Remy Sharp" src="" />}
            >
              <Avatar alt="Travis Howard" src="" />
            </Badge>

            {/* share button */}
            <IconButton
              sx={{
                backgroundColor: "#D6DBDC",
                "&:hover": {
                  backgroundColor: "#A1F2F4",
                },
              }}
            >
              <PersonAddAltOutlinedIcon sx={{ color: "#9C446E" }} />
              <Typography
                variant="text-sm-regular"
                sx={{ color: "#9C446E", mx: "5px" }}
              >
                Share
              </Typography>
            </IconButton>
            <IconButton>
              <MoreHorizOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default BoardHeader;
