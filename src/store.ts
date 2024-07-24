import { create } from "zustand";
import {
  getTables,
  getTableDetails,
  mutateColumnName,
  mutateNewColumn,
  mutateFetch,
} from "./utilities/utility.ts";
import { TableState } from "../global_types/types";

const useStore = create<TableState>((set, get) => ({
  // Table state that will be used to store the tables
  tables: [],
  setTables: (tables) => set({ tables }),

  // may not need
  searchValue: "",
  setSearchValue: (searchValue: string) => set({ searchValue }),

  // Fetch all tables, columns, and foreign keys from the database. To be executed once at load time
  fetchTables: async () => {
    try {
      const res = await getTables();
      set({ tables: res });
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  },

  // Fetch updated table information from the database including table name, columns and foreign keys
  fetchAndUpdateTableDetails: async (tableName: string, oldName?: string) => {
    try {
      const updatedTableDetails = await getTableDetails(tableName);
      const tables = get().tables;

      let updatedTables;
      // If the table name has been updated, update the table name in the table state as well as column and foreign key data
      if (oldName) {
        updatedTables = tables.map((table) =>
          table.name === oldName ? updatedTableDetails : table
        );
      } else {
        // If the table name has not been updated, update the columns and foreign keys in the table state
        updatedTables = tables.map((table) =>
          table.name === tableName ? updatedTableDetails : table
        );
      }
      set({ tables: updatedTables });

      // console.log(`table in store: ${tableName}`);
      // console.log('tables state in store: ', tables)
      // console.log('updatedTable: ', updatedTableDetails)
    } catch (error) {
      console.error("Error fetching updated table details:", error);
    }
  },

  updateColumnName: async (
    tableName: string,
    columnName: string,
    newColumnName: string
  ) => {
    const query = `
      mutation editColumn($newColumnName: String!, $columnName: String!, $tableName: String!) {
        editColumn(newColumnName: $newColumnName, columnName: $columnName, tableName: $tableName)
      }
    `;
    const variables = {
      tableName,
      columnName,
      newColumnName
    };
    const errMsg = "Error updating column";
    const success = await mutateFetch(query, variables, errMsg);
    if (success) {
      await get().fetchAndUpdateTableDetails(tableName);
    }
  },

  addColumn: async (
    tableName: string,
    columnName: string,
    dataType: string,
    refTable: string,
    refColumn: string
  ) => {
    const query = `
      mutation addColumnToTable($tableName: String!, $columnName: String!, $dataType: String!, $refTable: String, $refColumn: String){
        addColumnToTable( tableName: $tableName, columnName: $columnName, dataType: $dataType, refTable: $refTable, refColumn: $refColumn)
      }`;
    const variables = {
      tableName,
      columnName,
      dataType,
      refTable,
      refColumn,
    };
    const errMsg = "Error adding column";
    const success = await mutateFetch(query, variables, errMsg);
    if (success) {
      await get().fetchAndUpdateTableDetails(tableName);
    }
  },

  addTable: async (tableName: string) => {
    const query = `
      mutation addTable($tableName: String!){
        addTable( tableName: $tableName)
      }
      `;
    const variables = { tableName: tableName };
    const errMsg = "Error adding table";
    const success = await mutateFetch(query, variables, errMsg);
    if (success) {
      const newTable = { name: tableName, columns: [], foreignKeys: [] };
      set({ tables: get().tables.concat(newTable) });
      await get().fetchAndUpdateTableDetails(tableName);
    }
  },
}));

export default useStore;
