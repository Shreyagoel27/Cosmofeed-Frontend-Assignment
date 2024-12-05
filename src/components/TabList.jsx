import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TaskModal from "./Modals";
import { deleteTask, editTask, sortTaskList } from "../Redux/thunks";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { sortData } from "../utils";
import Grid from "@mui/material/Grid2";
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
          {label}{" "}
          {sorting.field === field ? (sorting.order === "asc" ? "↑" : "↓") : ""}
        </Grid>
      ))}
    </Grid>
  );
};

// Row component for rendering task data
const TableRow = ({ item, handleTaskStatus, handleDelete }) => {
  const handleStatus = () => {
    const data = {
      ...item,
      pending: !item?.pending,
    };
    handleTaskStatus(data);
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
      {["summary", "dueDate", "priority", "createdAt"].map((key) => (
        <Grid
          key={key}
          size={{
            xs: 2,
          }}
        >
          <Box dangerouslySetInnerHTML={{ __html: item[key] }} />
        </Grid>
      ))}
      <Grid
        size={{
          xs: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          <TaskModal
            title={
              <Tooltip title="Edit">
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
              </Tooltip>
            }
            {...item}
            edit
          />
          <TaskModal
            title={
              <Tooltip title="View">
                <IconButton color="info">
                  <RemoveRedEyeIcon />
                </IconButton>
              </Tooltip>
            }
            {...item}
          />
          <Tooltip
            title={!item?.pending ? "Mark as Completed" : "Mark as Pending"}
          >
            <IconButton
              color={!item?.pending ? "success" : "warning"}
              onClick={handleStatus}
            >
              {!item?.pending ? (
                <CheckCircleIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => handleDelete(item?.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
};

function TabList({ list }) {
  const [sorting, setSorting] = useState({ field: null, order: "asc" });
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleTaskStatus = (data) => {
    dispatch(editTask(data));
  };

  const handleSort = (field) => {
    const newOrder =
      sorting.field === field && sorting.order === "asc" ? "desc" : "asc";
    setSorting({ field, order: newOrder });

    const sortedData = sortData(list, field, newOrder);
    dispatch(sortTaskList(sortedData));
  };

  const headers = [
    { field: "summary", label: "Summary" },
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
              {group && <Typography variant="h6">{group}</Typography>}

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
