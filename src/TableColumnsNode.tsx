// import { memo } from 'react';
import {
    // Handle,
    NodeProps,
    // Position
} from 'reactflow';

const CustomNode = ({
  data,
  // isConnectable,
}:
//   targetPosition = Position.Left,
//   sourcePosition = Position.Right
NodeProps) => {
  const rows = [];
  for (let i = 0; i < data.rows.length; i++) {
    rows.push(<div className='table row' key={i}>{data?.rows[i]}</div>);
  }

  return (
    <>
      {/* <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
      /> */}
      <div className='tableName'>{data?.label}</div>
      {rows}
      {/* <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
      /> */}
    </>
  );
};

CustomNode.displayName = 'CustomNode';

export default CustomNode;
// export default memo(CustomNode);
