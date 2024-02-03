/// <reference types="vite/client" />

export interface TableObj {
  name: string;
  columns: string[];
  foreignKeys: foreignKeysObj[];
}

export interface foreignKeysObj {
  columnName: string;
  foreignTableName: string;
  foreignColumnName: string;
}

export interface FlowProps {
  tables: TableObj[];
  fetchAndUpdateTables: () => void;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  searchValue: string;
}

export interface TableState {
  tables: TableObj[];
  searchValue: string;
  databaseURI?: string;
  setSearchValue: (searchValue: string) => void;
  setTables: (tables: TableObj[]) => void;
  fetchTables: () => Promise<void>;
  handleURISubmit: () => Promise<void>;
  fetchAndUpdateTableDetails: (tableName: string, oldName?: string) => Promise<void>;
}

export interface TableMenuProps {
  handleAddColumnOpen: () => void;
  handleAlertOpen: () => void;
  handleEditTableName: () => void;
  anchorEl: HTMLButtonElement | null;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
}

export interface AddColumnDialogProps {
  tableName: string;
  openColDialog: boolean;
  handleAddColumnClose: () => void;
  handleAddColumnOpen: () => void;
}

export interface DataTypeSelectorProps {
  handleDataTypeChange: (event: SelectChangeEvent<string>) => void;
  selectedDataType: string;
}

export interface ForeignKey {
  columnName: string;
  foreignTableName: string;
  foreignColumnName: string;
}

export interface Table {
  name: string;
  columns: string[];
  foreignKeys: ForeignKey[];
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated: boolean;
  style?: { stroke?: string };
}

export interface RowData {
  columnName: string;
  value: string | null;
}

export interface TableData {
  rowData: RowData[];
}

// declare module 'apollo-server-express' {
//   interface ServerRegistration {
//     app: Express.Application;
//   }
// }
