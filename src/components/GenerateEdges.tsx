import { Table, Edge } from "../../global_types/types";

const generateEdges = (tables: Table[]): Edge[] => {
  const edges: Edge[] = [];

  // Iterate over each table
  tables.forEach((table, tIndex) => {
    // Iterate over each foreign key in the table
    table.foreignKeys.forEach((fk, fkIndex) => {
      // Create the edge
      const edge: Edge = {
        id: `fk-${tIndex}-${fkIndex}`,
        target: `table-${table.name}-column-${fk.columnName}`,
        source: `table-${fk.foreignTableName}-column-${fk.foreignColumnName}`,
        animated: false,
      };

      edges.push(edge);
    });
  });

  return edges;
};

export default generateEdges;
