import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState, } from 'reactflow';
import ColumnNameNode from './ColumnNameNode.tsx';
import 'reactflow/dist/style.css';
import generateEdges from './GenerateEdges.tsx';
import generateNodes from './GenerateNodes.tsx';
import useStore from '../store.ts';
import 'reactflow/dist/base.css';
import '../stylesheets/flowStyle.css';
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
    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), [setEdges]);
    useEffect(() => {
        if (tables.length > 0) {
            // console.log('regenerating tables: ', tables)
            const newNodes = generateNodes(tables);
            const newEdges = generateEdges(tables);
            const updatedNodes = newNodes.map(newNode => {
                const existingNode = nodes.find(n => n.id === newNode.id && !newNode.id.includes('-column-') && newNode.id !== 'add-table-node');
                return existingNode ? Object.assign(Object.assign({}, newNode), { position: existingNode.position }) : newNode;
            });
            setNodes(updatedNodes);
            setEdges(newEdges);
        }
    }, [tables, setNodes, setEdges, nodes]);
    const proOptions = { hideAttribution: true };
    return (_jsx(_Fragment, { children: _jsx("div", { className: "flow-container", "data-testid": "flow-container", children: _jsx(ReactFlow, { nodes: nodes, edges: edges, onNodesChange: onNodesChange, onEdgesChange: onEdgesChange, onConnect: onConnect, edgeTypes: edgeTypes, defaultEdgeOptions: defaultEdgeOptions, 
                // onNodeClick={onNodeClick} //implement show table data with button instead
                nodeTypes: nodeTypes, fitView: true, deleteKeyCode: null, proOptions: proOptions, children: _jsx("svg", { children: _jsxs("defs", { children: [_jsxs("linearGradient", { id: "edge-gradient", children: [_jsx("stop", { offset: "0%", stopColor: "#ae53ba" }), _jsx("stop", { offset: "100%", stopColor: "#2a8af6" })] }), _jsx("marker", { id: "edge-circle", viewBox: "-5 -5 10 10", refX: "0", refY: "0", markerUnits: "strokeWidth", markerWidth: "10", markerHeight: "10", orient: "auto", children: _jsx("circle", { stroke: "#2a8af6", strokeOpacity: "0.75", r: "2", cx: "0", cy: "0" }) })] }) }) }) }) }));
};
export default Flow;
