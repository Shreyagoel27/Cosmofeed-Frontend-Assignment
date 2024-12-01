import React, { useState } from "react";
import TaskModal from "./components/Modals";

function App() {
  const [list, setList] = useState([]);
  return (
    <div>
      <TaskModal title="+" id={0} createdAt={new Date()} />
    </div>
  );
}

export default App;
