// import { memo } from 'react';
import { NodeProps } from 'reactflow';

const CustomNode = ({ data }: NodeProps) => {
  return (
    <>
      <div className='tableName'>{data?.label}</div>
      {/* Map through data and handle cases of it being undefined */}
    </>
  );
};

CustomNode.displayName = 'CustomNode';

export default CustomNode;
// export default memo(CustomNode);