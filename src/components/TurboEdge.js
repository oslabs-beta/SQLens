import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/**  This component renders a curved react flow "edge" (connecting line between nodes) */
import { getBezierPath } from 'reactflow';
export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, }) {
    const xEqual = sourceX === targetX;
    const yEqual = sourceY === targetY;
    const [edgePath] = getBezierPath({
        // Conditionally calculate sourceX and sourceY to display the gradient for a straight line
        sourceX: xEqual ? sourceX + 0.0001 : sourceX,
        sourceY: yEqual ? sourceY + 0.0001 : sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    return (_jsx(_Fragment, { children: _jsx("path", { id: id, style: style, className: "react-flow__edge-path", d: edgePath, markerEnd: markerEnd }) }));
}
