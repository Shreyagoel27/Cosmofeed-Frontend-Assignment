import React, { useEffect, useState } from "react";
import TaskModal from "./components/Modals";
import TabList from "./components/TabList";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskList);
  const [pendingTaskList, setPendingTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);

  useEffect(() => {
    setPendingTaskList(taskList.filter((task) => task.pending === true));
    setCompletedTaskList(taskList.filter((task) => task.pending === false));
  }, [taskList]);
  return (
    <div>
      <h2>All Task</h2>
      <TabList list={taskList} />

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
