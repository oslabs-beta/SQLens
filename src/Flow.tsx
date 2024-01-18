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

import TableColumnsNode from './TableColumnsNode.tsx';

import 'reactflow/dist/style.css';

//defines type for fakeData object
// type FakeDataType = {
//   [key: string]: string[];
// }
//fake data object - this would be coming from back end instead
// const fakeData: FakeDataType = {
//   people: ['id', 'name', 'age'],
//   ships: ['id', 'planet', 'pilot', 'engine'],
//   planets: ['id', 'name', 'size'],
// };

//initial nodes array
// const initialNodes: Node[] = [];

//initialize count to be used as id
// let count = 0;

//for in loop to create note and push into initialNodes array
// for (const property in fakeData) {
//   const rows: string[] = fakeData[property];
//   initialNodes.push({
//     id: count.toString(),
//     type: 'custom',
//     data: { label: property, rows: rows },
//     //position of node is currentl hard coded, must be changed based on previous node height
//     position: { x: 0, y: count * 150 },
//   });
//   count++;
// }

//not using edges currently
// const initialEdges: Edge[] = [
//   //   { id: "e1-2", source: "1", target: "2", animated: true },
//   //   { id: "e1-3", source: "1", target: "3" }
// ];

//c references custom node which is imported from CustomNode.tsx
const nodeTypes = {
  custom: TableColumnsNode,
};

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
    if (tables && typeof tables === 'object') {
      let newNodes = Object.keys(tables).map((tableName, index) => {
        return {
          id: index.toString(),
          type: 'custom',
          data: { label: tableName, rows: tables[tableName].columns },
          position: { x: 0, y: index * 150 },
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
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default BasicFlow;
