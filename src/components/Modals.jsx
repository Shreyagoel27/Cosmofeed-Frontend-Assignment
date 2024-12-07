import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  Modal,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../Redux/thunks";
import { timeStampToDate } from "../utils";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  p: 4,
};

const TaskModal = ({
  label = "Open Modal",
  id = 0,
  title = "",
  description = "",
  priority = "None",
  currentState = false,
  dueDate = "",
  createdAt = new Date().getTime(),
  edit = false,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(() => ({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    update: false,
  }));
  const tasklist = useSelector((state) => state.taskList);
  const groupByValue = useSelector((state) => state.groupByValue);
  const handleOpen = useCallback(() => {
    setFormData({
      title: title,
      description: description,
      priority: priority,
      dueDate: dueDate,
      update: false,
    });
    setOpen(true);
  }, [title, description, priority, dueDate]);

  const handleClose = useCallback(() => {
    if (formData.update) {
      alert("Changes saved");
      return;
    }
    setOpen(false);
  }, [formData]);

  const handleChange = (e) => {
    if (!edit) return;
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (
      formData.title.length < 10 ||
      formData.title.length > 140 ||
      formData.description.length < 10 ||
      formData.description.length > 500 ||
      formData.dueDate.length < 10
    ) {
      let errorMessage = "";

      switch (true) {
        case formData.title.length < 10:
          errorMessage = "Title must be at least 10 characters long.";
          break;
        case formData.title.length > 140:
          errorMessage = "Title must not exceed 140 characters.";
          break;
        case formData.description.length < 10:
          errorMessage = "Description must be at least 10 characters long.";
          break;
        case formData.description.length > 500:
          errorMessage = "Description must not exceed 500 characters.";
          break;
        case formData.dueDate.length < 10:
          errorMessage = "Due Date is invalid or incomplete.";
          break;
        default:
          errorMessage = "Invalid input. Please check your data.";
      }

      toast.error(errorMessage);
      return;
    }

    if (edit && id !== 0) {
      dispatch(
        editTask(
          tasklist,
          {
            ...formData,
            createdAt: createdAt,
            id: id,
            currentState: currentState,
          },
          groupByValue,
        ),
      );
    } else {
      dispatch(
        addTask(tasklist, groupByValue, {
          ...formData,
          createdAt: timeStampToDate(new Date().getTime()),
          id: id ? id : new Date().getTime().toString(),
          currentState: true,
        }),
      );
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleOpen} color="info">
        {label}
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            onChange={handleChange}
            name="title"
            value={formData.title}
            required
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            onChange={handleChange}
            name="description"
            value={formData.description}
            required
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
              labelId="priority-select-label"
              value={formData.priority}
              onChange={handleChange}
              label="Priority"
              name="priority"
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>

          <TextField
            required
            id="due-date"
            label="Due Date"
            variant="outlined"
            type="date"
            value={formData.dueDate} // Controlled value
            onChange={handleChange}
            name="dueDate"
            InputLabelProps={{
              shrink: true, // Force the label to float
            }}
          />

          {edit ? (
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button onClick={handleCancel} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSave} variant="contained">
                Save
              </Button>
            </Box>
          ) : (
            <>
              <TextField
                value={createdAt}
                label="Created At"
                variant="outlined"
                name="createdAt"
              />
              <TextField
                value={currentState ? "Pending" : "Completed"}
                label="Current State"
                variant="outlined"
                name="id"
              />
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default TaskModal;
