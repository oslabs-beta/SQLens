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
  // const setTables = useStore((state: TableState) => state.setTables);
  // const queries = useStore((state: TableState) => state.queries);
  // const setQueries = useStore((state: TableState) => state.setQueries);

  const fetchAndUpdateTableDetails = useStore(
    (state: TableState) => state.fetchAndUpdateTableDetails
  );

  const handleColumnNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setColumnName(event.currentTarget.value);
  };

  const handleDataTypeChange = (event: SelectChangeEvent<string>) => {
    // console.log(event.target.value);
    setSelectedDataType(event.target.value);
  };

  const handleSaveClick = async () => {
    handleAddColumnClose();
    setColumnName(columnName.trim().replace(/[^A-Za-z0-9_]/g, "_"));

    const response = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // This mutation is used to change the table name in the database
      // This is a graphQL query, not a SQL query
      body: JSON.stringify({
        query:`
          mutation addColumnToTable($tableName: String!, $columnName: String!, $dataType: String!, $fkTable: String, $fkColumn: String){
            addColumnToTable( tableName: $tableName, columnName: $columnName, dataType: $dataType, fkTable: $fkTable, fkColumn: $fkColumn)
          }`,
        variables: {
          tableName: tableName,
          columnName: columnName,
          dataType: selectedDataType,
          fkTable: fkTable,
          fkColumn: fkColumn,
        },
      }),
    });

    const final = await response.json();
    if (final.errors) {
      console.error(final.errors[0].message);
      alert(final.errors[0].message);
      // throw new Error("Error changing table name");
      //add a user alert
    } else {
      fetchAndUpdateTableDetails(tableName);
      // console.log(final);
    }
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
