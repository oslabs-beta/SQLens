import { useCallback, useEffect} from 'react';
import ReactFlow, {
  addEdge,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import ColumnNameNode from './ColumnNameNode.tsx';
// import GroupNode from './GroupNode.tsx';
import 'reactflow/dist/style.css';
import generateEdges from './GenerateEdges.tsx';
import generateNodes from './GenerateNodes.tsx';
import NavBar from './NavBar.tsx';
import useStore from '../store.ts';
import 'reactflow/dist/base.css';
import '../stylesheets/index.css';
import TurboNode from './TurboNode.tsx';
import TurboEdge from './TurboEdge.tsx';
// import _ from 'lodash';

// custom nodes
const nodeTypes = {
  turbo: TurboNode,
  colNode: ColumnNameNode,
};

// custom edges
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
  // const [nodePositions, setNodePositions] = useState({});

  const tables = useStore((state) => state.tables);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  // const { newNodes, newEdges } = useMemo(() => {
  //   return {
  //     newNodes: generateNodes(tables),
  //     newEdges: generateEdges(tables),
  //   };
  // }, [tables]);

  // const hasChanged = (current, updated) => {
  //   if (current.length !== updated.length) return true;
  

  //   return current.some((item, index) => {
  //     const currentItem = { ...item, position: undefined }; 
  //     const updatedItem = { ...updated[index], position: undefined };
  //     return !_.isEqual(currentItem, updatedItem);
  //   });
  // };


  // Effect to update nodes when 'tables' prop changes
  // useEffect(() => {
  //   // Only update nodes or edges if they have actually changed
  //   if (hasChanged(nodes, newNodes)) {
  //     setNodes(newNodes);
  //   }
  //   if (hasChanged(edges, newEdges)) {
  //     setEdges(newEdges);
  //   }
  // }, [newNodes, newEdges, nodes, edges, setNodes, setEdges]);

  useEffect(() => {
    if (tables.length > 0) {
      console.log('regenerating tables: ', tables)
      const newNodes = generateNodes(tables);
      const newEdges = generateEdges(tables);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [tables, setNodes, setEdges]);

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
