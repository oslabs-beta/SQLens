import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import TableColumnsObject from './vite-env';
import TableColumnsNode from './TableColumnsNode.tsx';

import 'reactflow/dist/style.css';

//not using edges currently
// const initialEdges: Edge[] = [
//   //   { id: "e1-2", source: "1", target: "2", animated: true },
//   //   { id: "e1-3", source: "1", target: "3" }
// ];

//references custom node which is imported from TableColumnsNode.tsx
const nodeTypes = {
  custom: TableColumnsNode,
};
type FlowProps = {table: TableColumnsObject}
const BasicFlow = ({ tables }) => {
  // Initialize states for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );


  // Effect to update nodes when 'tables' prop changes
  useEffect(() => {
    // x and y variables for placement of nodes
    let x = 0;
    let y = 0;
    // after table date is loaded, render nodes using map function
    if (tables && typeof tables === 'object') {
      const newNodes = Object.keys(tables).map((tableName, index) => {
        // start new column of tables, once y approaches bottom of screen
        if (y > 600) {
          y = 0;
          x += 350;
        }
        // save y position
        const prevY = y;
        // calculate the y position for the next node based on current node's array length
        y += 150 + (tables[tableName].columns.length * 25)
        // create node
        return {
          id: index.toString(),
          type: 'custom',
          data: { label: tableName, rows: tables[tableName].columns },
          position: { x: x, y: prevY },
        };
      });
      setNodes(newNodes);
    }
  }, [tables, setNodes]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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
