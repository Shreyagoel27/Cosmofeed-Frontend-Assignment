import React, { useEffect, useState } from "react";
import TaskModal from "./components/Modals";
import TabList from "./components/TabList";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { globalSearch } from "./utils";
import { searchTask } from "./Redux/thunks";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskList);
  const globalSearchList = useSelector((state) => state.globalSearchList);

  const [pendingTaskList, setPendingTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimer, setSearchTimer] = useState(null);

  useEffect(() => {
    if (globalSearchList.length) {
      setPendingTaskList(
        globalSearchList.filter((task) => task.pending === true),
      );
      setCompletedTaskList(
        globalSearchList.filter((task) => task.pending === false),
      );
    } else {
      setPendingTaskList(taskList.filter((task) => task.pending === true));
      setCompletedTaskList(taskList.filter((task) => task.pending === false));
    }
    return () => {
      setPendingTaskList([]);
      setCompletedTaskList([]);
    };
  }, [taskList, globalSearchList]);

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
        console.log("hi");
        const data = globalSearch(taskList, e.target.value);
        dispatch(searchTask(data));
      }, 300),
    );
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
      />
      <h2>All Task</h2>
      <TabList list={globalSearchList.length ? globalSearchList : taskList} />

      <h2>Pending Task</h2>
      <TabList list={pendingTaskList} />

      <h2>Completed Task</h2>
      <TabList list={completedTaskList} />
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
  );
}

export default App;
