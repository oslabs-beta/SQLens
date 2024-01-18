import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import TableColumnsNode from './TableColumnsNode.tsx';
import 'reactflow/dist/style.css';

//not using edges currently
// const initialEdges: Edge[] = [
//   //   { id: "e1-2", source: "1", target: "2", animated: true },
//   //   { id: "e1-3", source: "1", target: "3" }
// ];

// references custom node which is imported from TableColumnsNode.tsx
const nodeTypes = {
  custom: TableColumnsNode,
};

const BasicFlow = ({ tables }) => {
  // Initialize states for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  //
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  // have to add interface to make this valid TypeScript

  const onNodeClick = async (event, node) => {
    try {
      console.log('node: ', node);
      console.log('table name: ', node.data.label);
      //node.data.label is the table name
      const columnData = await fetchColumnData(node.data.label);
      // setSelectedNode is passing in the node and columnData, appending the columnData to the node
      setSelectedNode({ ...node, columnData });
    } catch (error) {
      console.error('Error fetching column data: ', error);
    }
  };

  
  // Fetches column data from the database
  const fetchColumnData = async (tableName) => {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetTableData($tableName: String!) {
            getTableData(tableName: $tableName) {
              columnData
            }
          }
        `,
        variables: { tableName },
      }),
    });

    const result = await response.json();
    if (result.errors) {
      console.error(result.errors);
      throw new Error('Error fetching column data');
    }
    return result.data.getTaData;
  };

  // Effect to update nodes when 'tables' prop changes
  useEffect(() => {
    // x and y variables for placement of nodes
    let x = 0;
    let y = 0;
    // after table date is loaded, render nodes using map function
    if (tables && typeof tables === 'object') {
      const newNodes = tables.map((table, index) => {
        if (y > 600) {
          y = 0;
          x += 350;
        }
        const prevY = y;
        y += 150 + table.columns.length * 25;
        return {
          id: index.toString(),
          type: 'custom',
          data: { label: table.name, rows: table.columns },
          position: { x: x, y: prevY },
        };
      });
      setNodes(newNodes);
    }
  }, [tables, setNodes]);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode={null}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default BasicFlow;
