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
import MobileView from "./MobileView";
import LargeScreenView from "./LargeScreenView";

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
  const [groupByValue, setGroupByValue] = useState({
    label: "None",
    value: "",
  });
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
    setGroupByValue(value);
    const list = groupBy(taskList, value);
    dispatch(groupTaskList(list, value));
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
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <div className="todo-app">
      <LargeScreenView
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleGroupBy={handleGroupBy}
        options={options}
        taskList={taskList}
        globalSearchList={globalSearchList}
        pendingTaskList={pendingTaskList}
        completedTaskList={completedTaskList}
        groupByValue={groupByValue}
      />
      <MobileView
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleGroupBy={handleGroupBy}
        options={options}
        MenuOpen={MenuOpen}
        setMenuOpen={setMenuOpen}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        taskList={taskList}
        globalSearchList={globalSearchList}
        pendingTaskList={pendingTaskList}
        completedTaskList={completedTaskList}
        handleOpenMenu={handleOpenMenu}
      />
    </div>
  );
}

export default App;
