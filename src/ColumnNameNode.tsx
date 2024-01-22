// import { memo } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';

const ColumnNameNode = ({ data }: NodeProps) => {
  return (
    <>
      <Handle type='target' position={Position.Left} />
      <Handle type='source' position={Position.Right} />
      <div className='tableName'>{data.label}</div>
    </>
  );
};

ColumnNameNode.displayName = 'ColumnNameNode';

export default ColumnNameNode;
// export default memo(CustomNode);
