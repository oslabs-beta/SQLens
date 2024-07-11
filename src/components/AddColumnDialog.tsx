import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DataTypeSelector from "./DataTypeSelector";
import { AddColumnDialogProps } from "../vite-env";
import { SelectChangeEvent } from "@mui/material";
import useStore from "../store";
import { TableState, Table } from "../vite-env";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
  const setTables = useStore((state: TableState) => state.setTables);
  const queries = useStore((state: TableState) => state.queries);
  const setQueries = useStore((state: TableState) => state.setQueries);

  const handleColumnNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setColumnName(event.currentTarget.value);
  };

  const handleDataTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedDataType(event.target.value);
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
        console.log("selected table: ", table);
      }
    });
  };

  const handleColumnSelect = (event: SelectChangeEvent<string>) => {
    setFkColumn(event.target.value);
  };

  const handleSaveClick = async () => {
    const selectedTable = tables.filter((table) => table.name === tableName)[0];
    if (
      selectedTable.columns.includes(columnName) ||
      columnName.match(/[^A-Za-z0-9_]/g) ||
      columnName.length === 0
    ) {
      alert(
        `Please select a valid name. \n\nNames may include underscores, but must not include spaces or other special characters. \n\nNames must be unique.`
      );
    } else {
      handleAddColumnClose();
      const updatedTables: Table[] = tables.map((table) => {
        if (table.name === tableName) {
          table.columns.push(columnName);
          if (hasForeignKey && fkTable !== null) {
            table.foreignKeys.push({
              columnName: columnName,
              foreignTableName: fkTable.name,
              foreignColumnName: fkColumn,
            });
          }
        }
        return table;
      });

      console.log(fkTable?.name, fkColumn);
      setTables(updatedTables);
      let query = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${selectedDataType};`;
      if (hasForeignKey) {
        query += ` ADD CONSTRAINT fk_${columnName} FOREIGN KEY (${columnName}) REFERENCES ${fkTable?.name}(${fkColumn});`;
      }
      setQueries([...queries, query]);

      //reset useStates
      setColumns([]);
      setFkTable(null);
      setFkColumn("");
      setSelectedTableName("");
      setSelectedDataType("");
      setColumnName("");
      setHasForeignKey(false);
    }
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
