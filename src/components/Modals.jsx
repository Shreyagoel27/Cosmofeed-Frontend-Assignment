import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../Redux/thunks";

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

export default function TaskModal({
  title,
  id,
  summary,
  description,
  priority,
  dueDate,
  createdAt,
  edit,
}) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const inputProps = {
    step: 300,
  };
  const [formData, setFormData] = React.useState({
    summary: summary,
    description: description,
    priority: priority,
    dueDate: dueDate,
    update: false,
  });
  const handleClose = () => {
    if (formData?.update) {
      alert("Changes saved");
      return;
    }
    setOpen(false);
  };
  const handleChange = (event) => {
    if (!edit) return;
    setFormData({
      ...formData,
      update: true,
      [event.target.name]: event.target.value,
    });
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
        }),
      );
    } else
      dispatch(
        addTask({
          ...formData,
          createdAt: new Date().getTime(),
          id: id ? id : new Date().getTime(),
        }),
      );

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
              value={formData?.priority}
              onChange={handleChange}
              label="Priority"
              name="priority"
            >
              <MenuItem value="None" disabled></MenuItem>
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
            InputLabelProps={{
              shrink: true, // Ensures the label doesn't overlap with the value
            }}
          />

          <Box style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
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
}
