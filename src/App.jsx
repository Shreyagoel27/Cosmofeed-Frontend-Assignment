import React, { useState } from "react";
import TaskModal from "./components/Modals";
import TabList from "./components/TabList";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskList);

  return (
    <div>
      <TabList list={taskList} />
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
