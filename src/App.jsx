import React, { useEffect, useState } from "react";
import TaskModal from "./components/Modals";
import TabList from "./components/TabList";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { globalSearch, groupBy } from "./utils";
import { groupTaskList, searchTask } from "./Redux/thunks";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  useEffect(() => {
    if (Object.entries(globalSearchList).length) {
      const pendingTask = {};
      const completedTask = {};

      Object.keys(globalSearchList).forEach((key) => {
        const pendingFilteredTasks = globalSearchList[key].filter(
          (task) => task.pending === true,
        );
        const completedTasks = globalSearchList[key].filter(
          (task) => task.pending === false,
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
          (task) => task.pending === true,
        );
        const completedTasks = taskList[key].filter(
          (task) => task.pending === false,
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

  if (error) {
    toast.error(error);
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="header-container">
        <TaskModal
          title="+"
          id={0}
          createdAt={new Date()}
          edit={true}
          summary={""}
          description={""}
          priority={"None"}
          dueDate={""}
        />
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ width: 300 }}
        />
        <Autocomplete
          disablePortal
          onChange={handleGroupBy}
          options={options}
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="Group By" />}
        />
      </div>

      <h2>All Task</h2>
      <TabList
        list={
          Object.entries(globalSearchList).length ? globalSearchList : taskList
        }
      />

      <h2>Pending Task</h2>
      <TabList list={pendingTaskList} />

      <h2>Completed Task</h2>
      <TabList list={completedTaskList} />
      <div className="new-task-container">
        <TaskModal
          title="+"
          id={0}
          createdAt={new Date()}
          edit={true}
          summary={""}
          description={""}
          priority={"None"}
          dueDate={""}
        />
      </div>
    </div>
  );
}

export default App;
