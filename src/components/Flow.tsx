import { useCallback, useEffect} from 'react';
import ReactFlow, {
  addEdge,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import ColumnNameNode from './ColumnNameNode.tsx';
import 'reactflow/dist/style.css';
import generateEdges from './GenerateEdges.tsx';
import generateNodes from './GenerateNodes.tsx';
import NavBar from './NavBar.tsx';
import useStore from '../store.ts';
import 'reactflow/dist/base.css';
import '../stylesheets/index.css';
import TurboNode from './TurboNode.tsx';
import TurboEdge from './TurboEdge.tsx';

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


  const tables = useStore((state) => state.tables);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  useEffect(() => {
    if (tables.length > 0) {
      const newNodes = generateNodes(tables);
      const newEdges = generateEdges(tables);

      const updatedNodes = newNodes.map(newNode => {

        const existingNode = nodes.find(n => n.id === newNode.id && !newNode.id.includes('-column-'));
        return existingNode ? { ...newNode, position: existingNode.position } : newNode;
      });

      setNodes(updatedNodes);
      setEdges(newEdges);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tables, setNodes, setEdges]);

  const proOptions = { hideAttribution: true };
  return (
    <>
      <NavBar />
      <div className="flow-container" data-testid="flow-container">
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
