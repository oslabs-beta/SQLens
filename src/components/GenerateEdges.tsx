import {Table, Edge } from '../vite-env';

const generateEdges = (tables: Table[]): Edge[] => {
    const edges: Edge[] = [];
  
    // const edgeTypes = {
    //   turbo: TurboEdge,
    // };
    
    // const defaultEdgeOptions = {
    //   type: 'turbo',
    //   markerEnd: 'edge-circle',
    // };

    // Iterate over each table
    tables.forEach((table, tIndex) => {
      // Iterate over each foreign key in the table
      table.foreignKeys.forEach((fk, fkIndex) => {
        // Find the index of the foreign table
        // const targetTableIndex = tables.findIndex(t => t.name === fk.foreignTableName);
        // // const targetTable = tables[tables.findIndex(t => t.name === fk.foreignTableName)].name;
        // if (targetTableIndex === -1) {
        //   return; // If foreign table not found, skip this foreign key
        // }

        // // Find the index of the column in the source and target tables
        // const sourceColumnIndex = table.columns.findIndex(col => col === fk.columnName);
        // const targetColumn = fk.columnName;
        // console.log('targetColumn: ', targetColumn)
        // // const sourceColumn = table.columns.findIndex(col => col === fk.columnName); // what is this doing
        // const targetColumnIndex = tables[targetTableIndex].columns.findIndex(col => col === fk.foreignColumnName);
        // console.log('targetColumnIndex: ', targetColumnIndex)
        // // const targetColumn = tables[targetTableIndex].columns.findIndex(col => col === fk.foreignColumnName); // what is this doing

        // // Ensure both columns are found
        // if (sourceColumnIndex === -1 || targetColumnIndex === -1) {
        //   return; // If column not found, skip this foreign key
        // }

        // Create the edge
        const edge: Edge = {
          id: `fk-${tIndex}-${fkIndex}`,
          target: `table-${table.name}-column-${fk.columnName}`,
          source: `table-${fk.foreignTableName}-column-${fk.foreignColumnName}`,
          // type: 'turbo',
          animated: false,
          style: {
            // stroke: '#ff006e',
          }, 
        };

        edges.push(edge);
      });
    });

    return edges;
  };

  export default generateEdges;
