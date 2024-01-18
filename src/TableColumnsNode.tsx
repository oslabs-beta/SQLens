import { memo } from 'react';
import { NodeProps } from 'reactflow';

const CustomNode = ({ data }: NodeProps) => {
  return (
    <>
      <div className='tableName'>{data?.label}</div>
      {/* Map through data and handle cases of it being undefined */}
      {data?.rows?.map((row, index) => (
        <div className='table row' key={index}>{row}</div>
      ))}
    </>
  );
};

CustomNode.displayName = 'CustomNode';

export default memo(CustomNode);