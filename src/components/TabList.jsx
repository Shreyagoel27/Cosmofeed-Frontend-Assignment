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
import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "../Redux/thunks";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
function TabList({ list }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const hanndleTaskStatus = (id, status) => {
    dispatch(editTask({ id: id, pending: status }));
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
              <DeleteIcon onClick={() => handleDelete(item?.id)} />
              <TaskModal
                title={<RemoveRedEyeIcon />}
                id={item?.id}
                summary={item?.summary}
                description={item?.description}
                priority={item?.priority}
                dueDate={item?.dueDate}
                createdAt={item?.createdAt}
              />
              {!item?.pending ? (
                <CheckCircleIcon
                  onClick={() => hanndleTaskStatus(item?.id, true)}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  onClick={() => hanndleTaskStatus(item?.id, false)}
                />
              )}
            </ListItem>
          </List>
        );
      })}
    </div>
  );
}

export default TabList;
