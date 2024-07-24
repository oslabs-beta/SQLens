import { gql } from 'apollo-server-express';

// Defines the GraphQL schema
export const typeDefs = gql`
  type ForeignKey {
    columnName: String
    foreignTableName: String
    foreignColumnName: String
  }

  type Table {
    name: String
    columns: [String]
    foreignKeys: [ForeignKey]
  }

  type RowData {
    columnData: [String]
  }


  type Query {
    getTableNames: [Table]
    getTableData(tableName: String!): [RowData]
    getTableDetails(tableName: String!): Table
  }

  type Mutation {
    addColumnToTable(tableName: String!, columnName: String!, dataType: String!, refTable: String, refColumn: String): String
    editTableName(oldName: String!, newName: String!): String
    deleteTable(tableName: String!): String
    deleteColumn(tableName: String!, columnName: String!): String
    editColumn(newColumnName: String!, columnName: String!, tableName: String!): String
    addTable(tableName: String!): String
  }
`;

// If getTableNames is called, the resolver will return an array of objects, each object has a key of name, columns, and foreignKeys
// If getTableData is called, the resolver will return an array of objects, each object has a key of columnData
