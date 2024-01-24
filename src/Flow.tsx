import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Edge,
  Node,
  Connection,
  useNodesState,
  useEdgesState,
} from "reactflow";
import TableObj from "./vite-env";
import ColumnNameNode from "./ColumnNameNode.tsx";
import GroupNode from "./GroupNode.tsx";
import "reactflow/dist/style.css";
import generateEdges from "./GenerateEdges.tsx";

//not using edges currently
// const initialEdges: Edge[] = [
//     { id: "e1-2", source: "1", target: "2", animated: true },
//     { id: "e1-3", source: "1", target: "3" }
// ];

// custom nodes
const nodeTypes = {
  colNode: ColumnNameNode,
  groupNode: GroupNode,
};

const BasicFlow = ({ tables, fetchAndUpdateTables }: { tables: TableObj[] }) => {
  // Initialize states for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // useState to grab a selected Node (to display table rows)
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  //generate all tables as group nodes with column nodes inside
  const generateNodes = () => {
    const nodes: Node[] = [];
    let layoutX: number = 0;
    let layoutY: number = 0;

    // makes a custom node to allow for adding tables
    const customNode: Node = {
      id: 'custom-node-id', // A unique identifier for your custom node
      type: 'groupNode', // Define a custom type if needed
      data: { 
        label: 'Add New Table', // Custom label or any other data you want to include
        // Other custom data properties...
      },
      position: { x: 700, y: 1100 }, // Define the position
      style: {
        width: 250,
        // height: 60 + table.columns.length * 40,
        backgroundColor: "rgba(245, 245, 245, 0.9)",
        borderRadius: "4px",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
      },
      // Other properties if needed...
    };
    nodes.push(customNode);


    tables.forEach((table: TableObj, tIndex: number): void => {
      //layout calcs
      if (layoutY > 600) {
        layoutY = 0;
        layoutX += 350;
      }

      //create group node for each table
      const groupNode: Node = {
        id: `table-${tIndex}`, //tables[index][name]
        type: "groupNode",
        // type: 'input',
        data: { label: table.name },
        className: "light",
        position: { x: layoutX, y: layoutY },
        style: {
          width: 250,
          height: 60 + table.columns.length * 40,
          backgroundColor: "rgba(245, 245, 245, 0.9)",
          borderRadius: "4px",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        },
      };
      nodes.push(groupNode);

      //initialize column node position at 45px from top
      let y = 45;
      // iterate through columns array and create node for each column name
      table.columns.forEach((column: string, cIndex: number): void => {
        const columnNode: Node = {
          // id: 'A-2',
          id: `table-${tIndex}-column-${cIndex}`,
          // type: 'custom',
          data: { label: column, parent: table.name, onDelete: fetchAndUpdateTables },
          type: "colNode",
          position: { x: 15, y: y },
          parentNode: `table-${tIndex}`,
          draggable: false,
          extent: "parent",
          style: {
            width: 220,
            height: 40,
          },
        };
        nodes.push(columnNode);
        y += 40;
      });
      layoutY += 150 + table.columns.length * 40;
    });
    return nodes;
  };

  const onNodeClick = async (
    event: React.MouseEvent,
    node: Node
  ): Promise<void> => {
    // try {
    console.log("node: ", node);
    console.log("table name: ", node.data.label);
    //node.data.label is the table name
    const columnData = await fetchColumnData(node.data.label);
    console.log("columnData: ", columnData);
    // setSelectedNode is passing in the node and columnData, appending the columnData to the node
    setSelectedNode({ ...node, columnData });
    // } catch (error) {
    // console.error('Error fetching column data: ', error);
    // }
  };

  // Fetches column data from the database
  const fetchColumnData = async (tableName: string) => {
    const response = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      throw new Error("Error fetching column data");
    }
    return result.data.getTableData;
  };

  // Effect to update nodes when 'tables' prop changes
  useEffect(() => {
    if (tables.length > 0) {
      const newNodes = generateNodes();
      const newEdges = generateEdges(tables);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [tables, setNodes, setEdges]);

  const proOptions = { hideAttribution: true };
  return (
    <div className="flow-container">
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
        {/* <Background /> */}
        <Background
          color="#B3D7FF" // Color of the grid lines
          gap={50} // Spacing between grid lines
          size={4} // Thickness of grid lines
        />
      </ReactFlow>
    </div>
  );
};

export default BasicFlow;
