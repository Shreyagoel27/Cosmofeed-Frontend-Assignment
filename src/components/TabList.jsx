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
            <ListItem>
              <ListItemText primary={item?.summary} />
              <ListItemText primary={item?.priority} />
              <ListItemText primary={item?.createdAt} />
              <ListItemText primary={item?.dueDate} />
              <ListItemButton>
                <ListItemIcon>
                  <EditIcon onClick={() => handleAction("edit", index)} />
                </ListItemIcon>
                <ListItemIcon>
                  <DeleteIcon onClick={() => handleAction("delete", index)} />
                </ListItemIcon>
                <ListItemIcon>
                  <RemoveRedEyeIcon
                    onClick={() => handleAction("read", index)}
                  />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        );
      })}
    </div>
  );
}

export default TabList;
