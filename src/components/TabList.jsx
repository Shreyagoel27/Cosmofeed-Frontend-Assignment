import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TaskModal from "./Modals";
import { deleteTask, editTask, sortTaskList } from "../Redux/thunks";
import { Box, IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid2";
import { sortData } from "../utils";

function TabList({ list }) {
  const [sorting, setSorting] = useState({ field: null, order: "asc" });
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleTaskStatus = (id, status) => {
    dispatch(editTask({ id, pending: status }));
  };

  const handleSort = (field) => {
    let newOrder = "asc";
    if (sorting.field === field && sorting.order === "asc") {
      newOrder = "desc";
    }

    setSorting({ field, order: newOrder });

    const sortedData = sortData(list, field, newOrder);
    dispatch(sortTaskList(sortedData));
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: "auto" }}>
      <Grid
        container
        sx={{
          alignItems: "center",
          borderBottom: "1px solid #ccc",
          textAlign: "center",
          padding: "8px 0",
        }}
      >
        <Grid
          container
          spacing={2}
          size={{ xs: 12, md: 12 }}
          sx={{ backgroundColor: "#ccc" }}
        >
          <Grid
            size={{ xs: 2 }}
            sx={{ border: "1px solid #ccc" }}
            onClick={() => {
              handleSort("summary");
            }}
          >
            Summary
          </Grid>
          <Grid
            size={{ xs: 2 }}
            sx={{ border: "1px solid #ccc" }}
            onClick={() => handleSort("dueDate")}
          >
            Due Date
          </Grid>
          <Grid
            size={{ xs: 2 }}
            sx={{ border: "1px solid #ccc" }}
            onClick={() => handleSort("priority")}
          >
            Priority
          </Grid>
          <Grid
            size={{ xs: 2 }}
            sx={{ border: "1px solid #ccc" }}
            onClick={() => handleSort("createdAt")}
          >
            Created At
          </Grid>
          <Grid
            size={{ xs: 2 }}
            sx={{ border: "1px solid #ccc" }}
            onClick={() => handleSort("actions")}
          >
            Actions
          </Grid>
        </Grid>
        {list.map((item, index) => (
          <Grid
            container
            size={{ xs: 12, md: 12 }}
            key={index}
            sx={{
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              textAlign: "center",
              padding: "8px 0",
            }}
            spacing={2}
          >
            <Grid size={{ xs: 2 }}>
              <Box dangerouslySetInnerHTML={{ __html: item?.summary }}></Box>
            </Grid>

            <Grid size={{ xs: 2 }}>
              <Box dangerouslySetInnerHTML={{ __html: item?.dueDate }}></Box>
            </Grid>

            <Grid size={{ xs: 2 }}>
              <Box dangerouslySetInnerHTML={{ __html: item?.priority }}></Box>
            </Grid>

            <Grid size={{ xs: 2 }}>
              <Box dangerouslySetInnerHTML={{ __html: item?.createdAt }}></Box>
            </Grid>

            <Grid size={{ xs: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                <TaskModal
                  title={
                    <Tooltip title="Edit">
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  }
                  id={item?.id}
                  summary={item?.summary}
                  description={item?.description}
                  priority={item?.priority}
                  dueDate={item?.dueDate}
                  createdAt={item?.createdAt}
                  edit={true}
                />

                <TaskModal
                  title={
                    <Tooltip title="View">
                      <IconButton color="info">
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </Tooltip>
                  }
                  id={item?.id}
                  summary={item?.summary}
                  description={item?.description}
                  priority={item?.priority}
                  dueDate={item?.dueDate}
                  createdAt={item?.createdAt}
                />

                <Tooltip
                  title={
                    !item?.pending ? "Mark as Completed" : "Mark as Pending"
                  }
                >
                  <IconButton
                    color={!item?.pending ? "success" : "warning"}
                    onClick={() => handleTaskStatus(item?.id, !item?.pending)}
                  >
                    {!item?.pending ? (
                      <CheckCircleIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(item?.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TabList;
