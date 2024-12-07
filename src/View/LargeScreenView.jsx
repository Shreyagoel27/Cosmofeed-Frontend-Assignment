import React from "react";
import TabList from "../components/TabList/TabList";
import { Autocomplete, TextField } from "@mui/material";
import TaskModal from "../components/Modals";

function LargeScreenView({
  searchQuery,
  handleSearch,
  handleGroupBy,
  options,
  taskList,
  globalSearchList,
  pendingTaskList,
  completedTaskList,
  groupByValue,
}) {
  return (
    <>
      <div className="todo-app__header screen-lg">
        <h2 className="todo-app__logo">Todo App</h2>
        <div className="todo-app__controls">
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            sx={{
              width: 300,
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
            value={groupByValue}
            sx={{
              width: 300,
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

          <div className="todo-app__new-task">
            <TaskModal
              label={<span className="todo-app__new-task-label">Add Task</span>}
              id={0}
              createdAt={new Date()}
              edit={true}
              title={""}
              description={""}
              priority={"None"}
              dueDate={""}
              currentState={false}
            />
          </div>
        </div>
      </div>
      <div className="todo-app__tabs screen-lg">
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

        <div className="todo-app__tab">
          <h2 className="todo-app__tab-title">Pending Tasks</h2>
          <TabList list={pendingTaskList} />
        </div>

        <div className="todo-app__tab">
          <h2 className="todo-app__tab-title">Completed Tasks</h2>
          <TabList list={completedTaskList} />
        </div>
      </div>
    </>
  );
}

export default LargeScreenView;
