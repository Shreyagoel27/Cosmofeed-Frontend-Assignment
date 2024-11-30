import React, { useState } from "react";
import TaskModal from "./components/Modals";

function App() {
  const [list, setList] = useState([]);
  return (
    <div>
      App
      <TaskModal title="+" id={0} />
    </div>
  );
}

export default App;
