import React from "react";
import { useState } from "react";
import { Check } from "@mui/icons-material";
import { IconButton, Typography, Box } from "@mui/material";
import { ImPlus } from "react-icons/im";
import ClearIcon from "@mui/icons-material/Clear";
import useStore from "../store";
import { TableState } from "../../global_types/types";
// import e from "express";

const AddTable = ({
  data,
}: {
  data: {
    label: string;
  };
}) => {
  // manages the editing staus and edited label
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState("");

  // useStore to interact with the application's global state, fetching functions and state slices.
  const addTable = useStore((state: TableState) => state.addTable);

  //function to initiate the editing mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // function to cancel editing, reverting changes
  const handleEditCancel = () => {
    setIsEditing(false);
  };

  // function to update state with the new label
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEditedLabel(e.currentTarget.value);
  };

  // finalize the addition of the table, sending a request to the backend and updating the global state.
  const handleCheckClick = async () => {
    setIsEditing(false);
    setEditedLabel(editedLabel.trim().replace(/[^A-Za-z0-9_]/g, "_"));
    await addTable(editedLabel);
    setEditedLabel(data.label); // reset the edited label to "Add new table"
  };

  // Render component, edit or view mode based on isEditing state
  return (
    <Box
      className="group-node"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        width: 1,
      }}
    >
      {isEditing ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <input
            type="text"
            value={editedLabel}
            onChange={handleInputChange}
            placeholder={data.label}
            className="table-name-input"
          />
          <Box>
            <IconButton
              aria-label="save"
              size="small"
              onClick={handleCheckClick}
            >
              <Check fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="cancel"
              size="small"
              onClick={handleEditCancel}
            >
              <ClearIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography className="column-label" variant="h6" noWrap>
            {data.label}
          </Typography>

          <IconButton aria-label="edit" size="small" onClick={handleEditClick}>
            <ImPlus fontSize="inherit" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default AddTable;
