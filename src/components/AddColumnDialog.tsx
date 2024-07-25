import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DataTypeSelector from "./DataTypeSelector";
import { SelectChangeEvent } from "@mui/material";
import useStore from "../store";
import { TableState, Table } from "../../global_types/types";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

export interface AddColumnDialogProps {
  tableName: string;
  openColDialog: boolean;
  handleAddColumnClose: () => void;
  handleAddColumnOpen: () => void;
}

export default function AddColumnDialog({
  tableName,
  handleAddColumnClose,
  openColDialog,
}: AddColumnDialogProps) {
  const [columnName, setColumnName] = useState("");
  const [selectedDataType, setSelectedDataType] = useState("");
  const [hasForeignKey, setHasForeignKey] = useState(false);
  const [fkTable, setFkTable] = useState<Table | null>(null);
  const [selectedTableName, setSelectedTableName] = useState("");
  const [columns, setColumns] = useState<string[]>([]);
  const [fkColumn, setFkColumn] = useState("");
  const tables = useStore((state: TableState) => state.tables);

  const addColumn = useStore((state: TableState) => state.addColumn);

  const handleColumnNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setColumnName(event.currentTarget.value);
  };

  const handleDataTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedDataType(event.target.value);
  };

  const handleSaveClick = async () => {
    handleAddColumnClose();
    setColumnName(columnName.trim().replace(/[^A-Za-z0-9_]/g, "_"));
    await addColumn(tableName, columnName, selectedDataType, fkTable?.name || "", fkColumn);
  };

  const handleCheckboxClick = () => {
    setHasForeignKey(!hasForeignKey);
  };

  const handleTableSelect = (event: SelectChangeEvent<string>) => {
    setFkColumn("");
    setSelectedTableName(event.target.value);
    tables.forEach((table) => {
      if (table.name === event.target.value) {
        setFkTable(table);
        setColumns(table.columns);
      }
    });
  };

  const handleColumnSelect = (event: SelectChangeEvent<string>) => {
    setFkColumn(event.target.value);
  };

  return (
    <React.Fragment>
      <Dialog open={openColDialog} onClose={handleAddColumnClose}>
        <DialogContent>
          <DialogTitle>Add Column and Data Type</DialogTitle>
          {/* Column name input field */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="columnName"
            name="columnName"
            label="Column Name"
            type="text"
            variant="standard"
            onChange={handleColumnNameChange}
            fullWidth
          />
          {/* Column data type selector drop down menu */}
          <DataTypeSelector
            handleDataTypeChange={handleDataTypeChange}
            selectedDataType={selectedDataType}
            // disabled={hasForeignKey} for future development where dataType is retrieved from the database and not from the user.
          />
          {/* Checkbox and label */}
          <FormControlLabel
            control={
              <Checkbox
                checked={hasForeignKey}
                onChange={handleCheckboxClick}
                name="fkCheckbox"
                color="primary"
              ></Checkbox>
            }
            label="Add Foreign Key Constraint"
          />
          {/* Foreign key table selector drop down menu */}
          <FormControl sx={{ m: 1, width: 250, mt: 3 }}>
            <Select
              displayEmpty
              value={selectedTableName}
              onChange={handleTableSelect}
              input={<OutlinedInput />}
              disabled={!hasForeignKey}
            >
              <MenuItem disabled value="">
                <em>Table</em>
              </MenuItem>
              {tables.map(
                (table: Table) =>
                  tableName !== table.name && (
                    <MenuItem key={table.name} value={table.name}>
                      {table.name}
                    </MenuItem>
                  )
              )}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 250, mt: 3 }}>
            <Select
              displayEmpty
              value={fkColumn}
              onChange={handleColumnSelect}
              input={<OutlinedInput />}
              disabled={!hasForeignKey}
            >
              <MenuItem disabled value="">
                <em>Columns</em>
              </MenuItem>
              {columns.map((column: string) => (
                <MenuItem key={column} value={column}>
                  {column}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddColumnClose}>Cancel</Button>
          <Button onClick={handleSaveClick}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
