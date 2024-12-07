import React, { useEffect, useState } from "react";
import TaskModal from "./components/Modals";
import TabList from "./components/TabList/TabList";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, IconButton, TextField, Typography } from "@mui/material";
import { globalSearch, groupBy } from "./utils";
import { groupTaskList, searchTask } from "./Redux/thunks";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const dispatch = useDispatch();

  const taskList = useSelector((state) => state.taskList);
  const globalSearchList = useSelector((state) => state.globalSearchList);
  const groupByList = useSelector((state) => state.groupByList);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);

  const [pendingTaskList, setPendingTaskList] = useState({});
  const [completedTaskList, setCompletedTaskList] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimer, setSearchTimer] = useState(null);
  const [groupByValue, setGroupByValue] = useState("");
  const [MenuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Tasks");

  useEffect(() => {
    if (Object.entries(globalSearchList).length) {
      const pendingTask = {};
      const completedTask = {};

      Object.keys(globalSearchList).forEach((key) => {
        const pendingFilteredTasks = globalSearchList[key].filter(
          (task) => task.currentState === true,
        );
        const completedTasks = globalSearchList[key].filter(
          (task) => task.currentState === false,
        );
        pendingTask[key] = pendingFilteredTasks;
        completedTask[key] = completedTasks;
      });

      setPendingTaskList(pendingTask);
      setCompletedTaskList(completedTask);
    } else {
      const pendingTask = {};
      const completedTask = {};

      Object.keys(taskList).forEach((key) => {
        const pendingFilteredTasks = taskList[key].filter(
          (task) => task.currentState === true,
        );
        const completedTasks = taskList[key].filter(
          (task) => task.currentState === false,
        );
        pendingTask[key] = pendingFilteredTasks;
        completedTask[key] = completedTasks;
      });
      setPendingTaskList(pendingTask);
      setCompletedTaskList(completedTask);
    }
    return () => {
      setPendingTaskList([]);
      setCompletedTaskList([]);
    };
  }, [taskList, groupByList, globalSearchList]);

  useEffect(() => {
    if (searchQuery.length) {
      const data = globalSearch(taskList, searchQuery);
      dispatch(searchTask(data));
    }
  }, [taskList]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    setSearchTimer(
      setTimeout(() => {
        const data = globalSearch(taskList, e.target.value);
        dispatch(searchTask(data));
      }, 300),
    );
  };

  const options = [
    {
      label: "Priority",
      value: "priority",
    },
    {
      label: "Created On",
      value: "createdAt",
    },
    {
      label: "Pending On",
      value: "dueDate",
    },
    {
      label: "None",
      value: "",
    },
  ];

  const handleGroupBy = (event, value) => {
    setGroupByValue(value?.value);
    const list = groupBy(taskList, value?.value);
    dispatch(groupTaskList(list, value?.value));
  };

  const handleOpenMenu = () => {
    setMenuOpen(!MenuOpen);
  };

  if (error) {
    toast.error(error);
  }
  if (loading) {
    return (
      <div className="loader-container">
        <span class="loader"></span>
      </div>
    );
  }
  return (
    <div className="todo-app">
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
              label="+"
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
    </div>
  );
}

export default App;
