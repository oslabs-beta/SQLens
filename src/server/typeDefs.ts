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
  }
`;

// If getTableNames is called, the resolver will return an array of objects, each object has a key of name, columns, and foreignKeys
// If getTableData is called, the resolver will return an array of objects, each object has a key of columnData