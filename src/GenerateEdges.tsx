const generateEdges = (tables) => {
    const edges = [];
  
    // Iterate over each table
    tables.forEach((table, tIndex) => {
      // Iterate over each foreign key in the table
      table.foreignKeys.forEach((fk, fkIndex) => {
        // Find the index of the foreign table
        const targetTableIndex = tables.findIndex(t => t.name === fk.foreignTableName);
        if (targetTableIndex === -1) {
          return; // If foreign table not found, skip this foreign key
        }
  
        // Find the index of the column in the source and target tables
        const sourceColumnIndex = table.columns.findIndex(col => col === fk.columnName);
        const targetColumnIndex = tables[targetTableIndex].columns.findIndex(col => col === fk.foreignColumnName);
  
        // Ensure both columns are found
        if (sourceColumnIndex === -1 || targetColumnIndex === -1) {
          return; // If column not found, skip this foreign key
        }
  
        // Create the edge
        const edge = {
          id: `fk-${tIndex}-${fkIndex}`,
          source: `table-${tIndex}-column-${sourceColumnIndex}`,
          target: `table-${targetTableIndex}-column-${targetColumnIndex}`,
          type: 'smoothstep',
          animated: false,
          style: { 
            stroke: '#ff006e',
          }, // Custom styling for foreign key edges
        };
  
        edges.push(edge);
      });
    });
  
    return edges;
  };

  export default generateEdges;