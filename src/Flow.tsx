import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Edge,
  Node,
  Connection,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import TableObj from './vite-env';
import TableColumnsNode from './TableColumnsNode.tsx';
import GroupNode from './GroupNode.tsx';
import 'reactflow/dist/style.css';

//not using edges currently
// const initialEdges: Edge[] = [
//   //   { id: "e1-2", source: "1", target: "2", animated: true },
//   //   { id: "e1-3", source: "1", target: "3" }
// ];

// references custom node which is imported from TableColumnsNode.tsx
const nodeTypes = {
  custom: TableColumnsNode,
  groupNode: GroupNode,
};
type FlowProps = {tables: TableObj[]}
const BasicFlow = ({ tables }: FlowProps) => {
  // Initialize states for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // useState to grab a selected Node (to display table rows)
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const generateNodes = () => {
    const nodes: Node[] = [];
    let layoutX: number = 0;
    let layoutY: number = 0;

    tables.forEach((table: TableObj, tIndex: number):void => {
      //layout calcs
      if (layoutY > 600) {
        layoutY = 0;
        layoutX += 350;
        }
       
      
      const groupNode: Node = {
        id: `table-${tIndex}`, //tables[index][name]
        type: 'groupNode',
        // type: 'input',
        data: { label: table.name },
        className: 'light',
        position: { x: layoutX, y: layoutY },
        style: {
          width: 250,
          height: 60 + table.columns.length * 40,
          backgroundColor: 'rgba(245, 245, 245, 0.9)',
          borderRadius: '4px',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        },
      }
      nodes.push(groupNode);

      //leave this here, please! I'd like to change the flow header
      // const tableNameNode: Node = {
      //   id: `tablename-${tIndex}`,
      //   // type: 'custom',
      //   data: { label: table.name },
      //   position: { x: 15, y: 15 },
      //   parentNode: `table-${tIndex}`,
      //   draggable: false,
      //   extent: 'parent',
      // }
      // nodes.push(tableNameNode)

      //initialize column node position at 45px from top
      let y = 45;
      // iterate through columns array and create node for each column name
      table.columns.forEach((column: string, cIndex: number):void => {
        const columnNode: Node = {
          // id: 'A-2',
          id: `table-${tIndex}-column-${cIndex}`,
          // type: 'custom',
          data: { label: column },
          position: { x: 15, y: y },
          parentNode: `table-${tIndex}`,
          draggable: false,
          extent: 'parent',
          style: {
            width: 220,
            height: 40,
          }
        }
        nodes.push(columnNode);
        y += 40;
      })
      layoutY += 150 + table.columns.length * 40;
    });
    return nodes;
  };

  // have to add interface to make this valid TypeScript

  const onNodeClick = async (event: React.MouseEvent, node: Node): Promise<void> => {
    // try {
      console.log('node: ', node);
      console.log('table name: ', node.data.label);
      //node.data.label is the table name
      const columnData = await fetchColumnData(node.data.label);
      console.log('columnData: ', columnData);
      // setSelectedNode is passing in the node and columnData, appending the columnData to the node
      setSelectedNode({ ...node, columnData });
    // } catch (error) {
      // console.error('Error fetching column data: ', error);
    // }
  };


  // Fetches column data from the database
  const fetchColumnData = async (tableName: string) => {
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
    return result.data.getTableData;
  };

  // Effect to update nodes when 'tables' prop changes
  useEffect(() => {
    if (tables.length>0) {
      const newNodes = generateNodes();
      setNodes(newNodes);
    }
  }, [tables, setNodes]);
  const proOptions = { hideAttribution: true };
  return (
    <div className='flow-container'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // onNodeClick={onNodeClick} //implement show table data with button instead
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode={null}
        proOptions={proOptions}
      >
        <Background 
        color='#B3D7FF'  
        gap={50}      
        size={4}      
    />

      </ReactFlow>
    </div>
  );
};

export default BasicFlow;
