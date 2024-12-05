import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../Redux/thunks";
import { Pending } from "@mui/icons-material";

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
  title = "Open Modal",
  id = 0,
  summary = "",
  description = "",
  priority = "None",
  dueDate = "",
  createdAt = new Date().getTime(),
  edit = false,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(() => ({
    summary: "",
    description: "",
    priority: "",
    dueDate: "",
    update: false,
  }));

  const handleOpen = useCallback(() => {
    setFormData({
      summary: summary,
      description: description,
      priority: priority,
      dueDate: dueDate,
      update: false,
    });
    setOpen(true);
  }, [summary, description, priority, dueDate]);

  const handleClose = useCallback(() => {
    if (formData.update) {
      alert("Changes saved");
      return;
    }
    setOpen(false);
  }, [formData]);

  const handleChange = (event) => {
    if (!edit) return;
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, update: true, [name]: value }));
  };

  const handleSave = () => {
    if (
      formData.summary.length < 1 ||
      formData.description.length < 10 ||
      formData.dueDate.length < 10
    ) {
      alert("Please fill in the required fields");
      return;
    }
    if (edit && id !== 0) {
      dispatch(
        editTask({
          ...formData,
          createdAt: createdAt,
          id: id,
          pending: true,
        }),
      );
    } else {
      dispatch(
        addTask({
          ...formData,
          createdAt: new Date().getTime().toString(),
          id: id ? id : new Date().getTime().toString(),
          pending: true,
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
      <Button onClick={handleOpen}>{title}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="summary"
            label="Summary"
            variant="outlined"
            onChange={handleChange}
            name="summary"
            value={formData.summary}
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
            id="due-date"
            label="Due Date"
            variant="outlined"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            name="dueDate"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button onClick={handleCancel} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default TaskModal;
