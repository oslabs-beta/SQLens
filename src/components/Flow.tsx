import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  // Background,
  Edge,
  Node,
  Connection,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow';
import FlowProps from '../vite-env';
import TableObj from '../vite-env';
import ColumnNameNode from './ColumnNameNode.tsx';
import GroupNode from './GroupNode.tsx';
import 'reactflow/dist/style.css';
import generateEdges from './GenerateEdges.tsx';
import generateNodes from './GenerateNodes.tsx';
import NavBar from './NavBar.tsx';
import useStore from '../store.ts';
import 'reactflow/dist/base.css';
import '../stylesheets/index.css';
import TurboNode, { TurboNodeData } from './TurboNode.tsx';
import TurboEdge from './TurboEdge.tsx';
import FunctionIcon from './FunctionIcon.tsx';
import { SelectChangeEvent } from '@mui/material/Select';

//not using edges currently
// const initialEdges: Edge[] = [
//     { id: "e1-2", source: "1", target: "2", animated: true },
//     { id: "e1-3", source: "1", target: "3" }
// ];

// custom nodes
const nodeTypes = {
  turbo: TurboNode,
  colNode: ColumnNameNode,
  // groupNode: GroupNode
};

const edgeTypes = {
  turbo: TurboEdge,
};

const defaultEdgeOptions = {
  type: 'turbo',
  markerEnd: 'edge-circle',
};

const Flow = () => {
  // Initialize states for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // useState to grab a selected Node (to display table rows)
  // const [selectedNode, setSelectedNode] = useState(null);
  const { tables, fetchTables } = useStore((state) => ({
    tables: state.tables,
    fetchTables: state.fetchTables,
  }));

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  //generate all tables as TURBO group nodes with column nodes inside
  // const generateNodes = () => {
  //   const nodes: Node[] = [];
  //   let layoutX: number = 0;
  //   let layoutY: number = 0;

  //   tables.forEach((table: TableObj, tIndex: number): void => {
  //     //layout calcs
  //     if (layoutY > 600) {
  //       layoutY = 0;
  //       layoutX += 375;
  //     }

  //     //create group node for each table
  //     const groupNode: Node = {
  //       id: `table-${tIndex}`, //tables[index][name]
  //       type: 'turbo',
  //       // type: 'input',
  //       data: {
  //         label: table.name,
  //         fetchAndUpdateTables: fetchTables,
  //       },
  //       className: 'light',
  //       position: { x: layoutX, y: layoutY },
  //       style: {
  //         width: 250,
  //         height: 75 + table.columns.length * 40,
  //         // backgroundColor: "rgba(245, 245, 245, 0.9)",
  //         // borderRadius: "4px",
  //         // boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
  //       },
  //     };
  //     nodes.push(groupNode);

  //     //initialize column node position at 45px from top
  //     let y = 60;
  //     // iterate through columns array and create node for each column name
  //     table.columns.forEach((column: string, cIndex: number): void => {
  //       const columnNode: Node = {
  //         // id: 'A-2',
  //         id: `table-${tIndex}-column-${cIndex}`,
  //         // type: 'custom',
  //         data: {
  //           label: column,
  //           parent: table.name,
  //           fetchAndUpdateTables: fetchTables,
  //         },
  //         type: 'colNode',
  //         position: { x: 15, y: y },
  //         parentNode: `table-${tIndex}`,
  //         draggable: false,
  //         extent: 'parent',
  //         style: {
  //           width: 220,
  //           height: 40,
  //         },
  //       };
  //       nodes.push(columnNode);
  //       y += 40;
  //     });
  //     layoutY += 150 + table.columns.length * 40;
  //   });
  //   //push add table node into nodes array

  //   // makes a custom node to allow for adding tables
  //   const addTable: Node = {
  //     id: 'add-table-node', // A unique identifier for your custom node
  //     type: 'turbo', // Define a custom type if needed
  //     data: {
  //       label: 'Add New Table',
  //       fetchAndUpdateTables: fetchTables,
  //       // Custom label or any other data you want to include
  //       // Other custom data properties...
  //     },
  //     position: { x: layoutX, y: layoutY }, // Define the position
  //     // position: { x: 700, y: 1100 }, // Define the position
  //     style: {
  //       width: 250,
  //       // height: 60 + table.columns.length * 40,
  //       // backgroundColor: "rgba(245, 245, 245, 0.9)",
  //       // borderRadius: "4px",
  //       // boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
  //     },
  //     // Other properties if needed...
  //   };
  //   nodes.push(addTable);

  //   return nodes;
  // };

  // const onNodeClick = async (
  //   event: React.MouseEvent,
  //   node: Node
  // ): Promise<void> => {
  //   // try {
  //   console.log('node: ', node);
  //   console.log('table name: ', node.data.label);
  //   //node.data.label is the table name
  //   const columnData = await fetchColumnData(node.data.label);
  //   console.log('columnData: ', columnData);
  //   // setSelectedNode is passing in the node and columnData, appending the columnData to the node
  //   setSelectedNode({ ...node, columnData });
  //   // } catch (error) {
  //   // console.error('Error fetching column data: ', error);
  //   // }
  // };

  // Fetches column data from the database
  // const fetchColumnData = async (tableName: string) => {
  //   const response = await fetch('/api/graphql', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       query: `
  //         query GetTableData($tableName: String!) {
  //           getTableData(tableName: $tableName) {
  //             columnData
  //           }
  //         }
  //       `,
  //       variables: { tableName },
  //     }),
  //   });

  //   const result = await response.json();
  //   if (result.errors) {
  //     console.error(result.errors);
  //     throw new Error('Error fetching column data');
  //   }
  //   return result.data.getTableData;
  // };

  // Effect to update nodes when 'tables' prop changes
  useEffect(() => {
    if (tables.length > 0) {
      console.log('regenerating tables: ', tables)
      const newNodes = generateNodes(tables);
      const newEdges = generateEdges(tables);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [tables, setNodes, setEdges]);

  //dbspy
  // useEffect(() => {
  //   reRender(schemaStore);
  // }, [schemaStore]);

  // function reRender(schemaStore: SchemaStore) {
  //   if (!schemaStore || !Object.keys(schemaStore).length) return;
  //   const initialEdges = createEdges(schemaStore);

  //   setEdges(initialEdges);
  //   const initialNodes = createNodes(schemaStore, initialEdges);
  //   setNodes(initialNodes);
  // }
//end db spy

  const proOptions = { hideAttribution: true };
  return (
    <>
      <NavBar />
      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          // onNodeClick={onNodeClick} //implement show table data with button instead
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode={null}
          proOptions={proOptions}
        >
          {/* <Background /> */}
          {/* <Background */}
          {/* color="#B3D7FF" // Color of the grid lines */}
          {/* gap={50} // Spacing between grid lines */}
          {/* size={4} // Thickness of grid lines */}
          {/* /> */}

          {/* <Controls showInteractive={false} /> */}
          <svg>
            <defs>
              <linearGradient id="edge-gradient">
                <stop offset="0%" stopColor="#ae53ba" />
                <stop offset="100%" stopColor="#2a8af6" />
              </linearGradient>

              <marker
                id="edge-circle"
                viewBox="-5 -5 10 10"
                refX="0"
                refY="0"
                markerUnits="strokeWidth"
                markerWidth="10"
                markerHeight="10"
                orient="auto"
              >
                <circle
                  stroke="#2a8af6"
                  strokeOpacity="0.75"
                  r="2"
                  cx="0"
                  cy="0"
                />
              </marker>
            </defs>
          </svg>
        </ReactFlow>
      </div>
    </>
  );
};

export default Flow;