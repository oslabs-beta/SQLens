
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
