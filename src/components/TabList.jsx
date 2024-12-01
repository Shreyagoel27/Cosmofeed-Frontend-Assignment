import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import React from "react";
import TaskModal from "./Modals";

function TabList({ list }) {
  const handleAction = (action, id) => {
    switch (action) {
      case "edit":
        return <TaskModal title="Edit" id={id} />;
        break;
      case "delete":
        alert("Deleting " + id);
        break;
      case "read":
        alert("Reading " + id);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {list.map((item, index) => {
        return (
          <List key={index}>
            {console.log(item)}
            <ListItem>
              <ListItemText primary={item?.summary} />
              <ListItemText primary={item?.priority} />
              <ListItemText primary={item?.createdAt} />
              <ListItemText primary={item?.dueDate} />
              <TaskModal
                title={<EditIcon />}
                id={item?.id}
                summary={item?.summary}
                description={item?.description}
                priority={item?.priority}
                dueDate={item?.dueDate}
                createdAt={item?.createdAt}
                edit={true}
              />
              <TaskModal
                title={<DeleteIcon />}
                id={item?.id}
                summary={item?.summary}
                description={item?.description}
                priority={item?.priority}
                dueDate={item?.dueDate}
                createdAt={item?.createdAt}
              />{" "}
              <TaskModal
                title={<RemoveRedEyeIcon />}
                id={item?.id}
                summary={item?.summary}
                description={item?.description}
                priority={item?.priority}
                dueDate={item?.dueDate}
                createdAt={item?.createdAt}
              />
            </ListItem>
          </List>
        );
      })}
    </div>
  );
}

export default TabList;
