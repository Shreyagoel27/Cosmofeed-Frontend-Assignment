import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskModal from "../Modals";
import { deleteTask, editTask, sortTaskList } from "../../Redux/thunks";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeDateFormat } from "../../utils";
import Grid from "@mui/material/Grid2";
import "./tablist.css";
import DescriptionModal from "../DecisionModal/DecisionModal";
// Header component for sortable table columns
const TableHeader = ({ headers, sorting, handleSort }) => {
  return (
    <Grid
      container
      spacing={1}
      sx={{ backgroundColor: "#ccc" }}
      size={{
        xs: 12,
      }}
    >
      {headers.map(({ field, label }) => (
        <Grid
          key={field}
          size={{
            xs: 2,
          }}
          sx={{
            border: "1px solid #ccc",
            cursor: "pointer",
            textAlign: "center",
            padding: "8px 0",
          }}
          onClick={() => handleSort(field)}
        >
          {label}
          {sorting.field === field ? (sorting.order === "asc" ? "↑" : "↓") : ""}
        </Grid>
      ))}
    </Grid>
  );
};

// Row component for rendering task data
const TableRow = ({ item, handleTaskStatus, handleDelete }) => {
  const handleStatus = () => {
    handleTaskStatus(item?.id, !item?.currentState);
  };
  return (
    <Grid
      container
      spacing={2}
      size={{
        xs: 12,
      }}
      sx={{
        alignItems: "center",
        borderBottom: "1px solid #ccc",
        textAlign: "center",
        padding: "8px 0",
      }}
    >
      {["title", "dueDate", "priority", "createdAt"].map((key) => {
        if (key === "dueDate") {
          return (
            <Grid
              key={key}
              size={{
                xs: 2,
              }}
            >
              <Box
                dangerouslySetInnerHTML={{
                  __html: ChangeDateFormat(item[key]),
                }}
              />
            </Grid>
          );
        }
        return (
          <Grid
            key={key}
            size={{
              xs: 2,
            }}
          >
            <Box
              className="hyphenate"
              dangerouslySetInnerHTML={{ __html: item[key] }}
            />
          </Grid>
        );
      })}
      <Grid
        size={{
          xs: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",

            width: "100%",
            overflow: "hidden",
          }}
        >
          <Tooltip title="Edit">
            <span>
              <TaskModal label={<EditIcon />} {...item} edit />
            </span>
          </Tooltip>
          <Tooltip title="View">
            <span>
              <TaskModal label={<RemoveRedEyeIcon />} {...item} />
            </span>
          </Tooltip>
          <Tooltip
            title={
              !item?.currentState ? "Mark as Completed" : "Mark as Pending"
            }
          >
            <IconButton
              color={!item?.currentState ? "success" : "warning"}
              onClick={handleStatus}
            >
              {!item?.currentState ? (
                <CheckCircleIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <DescriptionModal
              label={<DeleteIcon />}
              question="Are you sure you want to delete?"
              handleDelete={handleDelete}
              id={item?.id}
            />
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
};

function TabList({ list }) {
  const [sorting, setSorting] = useState({ field: null, order: "asc" });
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskList);
  const groupBy = useSelector((state) => state.groupByValue);

  const handleDelete = (id) => {
    dispatch(deleteTask(taskList, id));
  };

  const handleTaskStatus = (id, status) => {
    const list = Object.values(taskList).flat();
    const task = list.find((item) => item.id === id);

    dispatch(
      editTask(
        taskList,
        {
          ...task,
          currentState: status,
        },
        groupBy,
      ),
    );
  };

  const handleSort = (field) => {
    const newOrder =
      sorting.field === field && sorting.order === "asc" ? "desc" : "asc";
    setSorting({ field, order: newOrder });

    dispatch(sortTaskList(list, field, newOrder));
  };

  const headers = [
    { field: "title", label: "Title" },
    { field: "dueDate", label: "Due Date" },
    { field: "priority", label: "Priority" },
    { field: "createdAt", label: "Created At" },
    { field: "actions", label: "Actions" },
  ];

  return (
    <Box sx={{ flexGrow: 1, overflow: "auto" }}>
      <Grid
        container
        sx={{ borderBottom: "1px solid #ccc", textAlign: "center" }}
      >
        <TableHeader
          headers={headers}
          sorting={sorting}
          handleSort={handleSort}
        />

        {Object.keys(list).map((group) => {
          if (list[group].length === 0) return null;
          return (
            <Grid
              container
              spacing={2}
              size={{
                xs: 12,
              }}
              key={group}
            >
              {group && (
                <Typography variant="h6" className="todo-app__tab-title">
                  {group}
                </Typography>
              )}

              {list[group].map((task) => (
                <TableRow
                  key={task.id}
                  item={task}
                  handleTaskStatus={handleTaskStatus}
                  handleDelete={handleDelete}
                />
              ))}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default TabList;
