import { gql } from '@apollo/client';

// to fetch details from all tables
export const GET_TABLE_NAMES = gql`
query {
  getTableNames {
    name
    columns
    foreignKeys {
      columnName
      foreignTableName
      foreignColumnName
    }
  }
}
`;

// to fetch row data from a specific table
export const GET_TABLE_DATA = gql`
  query GetTableData($tableName: String!) {
    getTableData(tableName: $tableName) {
      columnData
    }
  }
`;

// to fetch the details of a specific table
export const GET_TABLE_DETAILS = gql`
  query GetTableDetails($tableName: String!) {
    getTableDetails(tableName: $tableName) {
      name
      columns
      foreignKeys {
        columnName
        foreignTableName
        foreignColumnName
      }
    }
  }
`;

// to add a new column to a table
export const ADD_COLUMN_TO_TABLE = gql`
  mutation AddColumnToTable(
    $tableName: String!
    $columnName: String!
    $dataType: String!
    $fkTable: String
    $fkColumn: String
  ) {
    addColumnToTable(
      tableName: $tableName
      columnName: $columnName
      dataType: $dataType
      fkTable: $fkTable
      fkColumn: $fkColumn
    )
  }
`;
// to edit the name of a table
export const EDIT_TABLE_NAME = gql`
  mutation EditTableName($oldName: String!, $newName: String!) {
    editTableName(oldName: $oldName, newName: $newName)
  }
`;
// to delete a table
export const DELETE_TABLE = gql`
  mutation DeleteTable($tableName: String!) {
    deleteTable(tableName: $tableName)
  }
`;

export const DELETE_COLUMN = gql`
  mutation DeleteColumn($tableName: String!, $columnName: String!) {
    deleteColumn(tableName: $tableName, columnName: $columnName)
  }
`;
