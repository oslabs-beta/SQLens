const generateEdges = (tables) => {
    const edges = [];
  
    tables.forEach((table, tIndex) => {
      table.foreignKeys.forEach((fk, fkIndex) => {
        const edge = {
          id: `fk-${tIndex}-${fkIndex}`,
          source: `table-${tIndex}-column-${fk.sourceColumnIndex}`,
          target: `table-${fk.targetTableIndex}-column-${fk.targetColumnIndex}`,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#ff006e' }, // Custom styling for foreign key edges
        };
        edges.push(edge);
      });
    });
  
    return edges;
  };

  export default generateEdges;