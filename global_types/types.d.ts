export interface TableState {
  tables: Table[];
  searchValue: string;
  databaseURI?: string;
  setSearchValue: (searchValue: string) => void;
  setTables: (tables: Table[]) => void;
  fetchTables: () => Promise<void>;
  fetchAndUpdateTableDetails: (
    tableName: string,
    oldName?: string
  ) => Promise<void>;
  updateColumnName: (
    tableName: string,
    columnName: string,
    newColumnName: string
  ) => Promise<boolean>;
  addColumn: (
    tableName: string,
    columnName: string,
    dataType: string,
    refTable: string,
    refColumn: string
  ) => Promise<void>;
  addTable: (tableName: string) => Promise<void>;
  deleteColumn: (tableName: string, columnName: string) => Promise<void>;
  deleteTable: (tableName: string) => Promise<void>;
  editTable: (tableName: string, newTableName: string) => Promise<boolean>;
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

export interface Test {
  globals: boolean;
  environment: string;
}
