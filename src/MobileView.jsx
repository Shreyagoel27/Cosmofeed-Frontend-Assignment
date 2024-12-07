import React, { useEffect, useState } from "react";

import TabList from "./components/TabList/TabList";

import { Autocomplete, IconButton, TextField, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

function MobileView({
  searchQuery,
  handleSearch,
  handleGroupBy,
  options,
  MenuOpen,
  setMenuOpen,
  selectedOption,
  setSelectedOption,
  taskList,
  globalSearchList,
  pendingTaskList,
  completedTaskList,
  handleOpenMenu,
}) {
  return (
    <>
      <div className="todo-app__header screen-md">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            sx={{
              width: "70%",
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <Autocomplete
            disablePortal
            onChange={handleGroupBy}
            options={options}
            sx={{
              width: "30%",
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Group By"
                InputLabelProps={{
                  style: { color: "white" }, // Label color
                }}
              />
            )}
          />
          <IconButton onClick={handleOpenMenu}>
            <MenuIcon />
          </IconButton>
        </div>
        <div
          className={`todo-app__controls ${
            MenuOpen ? "open-menu" : "close-menu"
          }`}
        >
          <Typography
            variant="h6"
            onClick={() => {
              selectedOption === "All Tasks"
                ? setSelectedOption(null)
                : setSelectedOption("All Tasks");
              handleOpenMenu();
            }}
          >
            All Tasks
          </Typography>
          <Typography
            variant="h6"
            onClick={() => {
              selectedOption === "Pending Tasks"
                ? setSelectedOption(null)
                : setSelectedOption("Pending Tasks");
              handleOpenMenu();
            }}
          >
            Pending Tasks
          </Typography>
          <Typography
            variant="h6"
            onClick={() => {
              selectedOption === "Completed Tasks"
                ? setSelectedOption(null)
                : setSelectedOption("Completed Tasks");
              handleOpenMenu();
            }}
          >
            Completed Tasks
          </Typography>
        </div>
      </div>

      <div className="todo-app__tabs screen-md">
        {selectedOption === "All Tasks" && (
          <div className="todo-app__tab">
            <h2 className="todo-app__tab-title">All Tasks</h2>
            <TabList
              list={
                Object.entries(globalSearchList).length
                  ? globalSearchList
                  : taskList
              }
            />
          </div>
        )}

        {selectedOption === "Pending Tasks" && (
          <div className="todo-app__tab">
            <h2 className="todo-app__tab-title">Pending Tasks</h2>
            <TabList list={pendingTaskList} />
          </div>
        )}

        {selectedOption === "Completed Tasks" && (
          <div className="todo-app__tab">
            <h2 className="todo-app__tab-title">Completed Tasks</h2>
            <TabList list={completedTaskList} />
          </div>
        )}
      </div>
    </>
  );
}

export default MobileView;
