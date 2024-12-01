import React, { useState } from "react";
import TaskModal from "./components/Modals";
import TabList from "./components/TabList";

function App() {
  const [list, setList] = useState([
    {
      title: "Task 1",
      description: "This is a task",
      createdAt: new Date(),
      dueDate: new Date(),
      priority: "High",
    },
    {
      title: "Task 2",
      description: "This is a task",
      createdAt: new Date(),
      dueDate: new Date(),
      priority: "Medium",
    },
    {
      title: "Task 3",
      description: "This is a task",
      createdAt: new Date(),
      dueDate: new Date(),
      priority: "Low",
    },
  ]);
  return (
    <div>
      <TabList list={list} />
      <TaskModal title="+" id={0} createdAt={new Date()} />
    </div>
  );
}

export default App;
