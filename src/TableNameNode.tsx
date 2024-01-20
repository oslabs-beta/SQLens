// // import { memo } from 'react';
// import { NodeProps } from 'reactflow';

// const TableNameNode = ({ data }: NodeProps) => {
//   return (
//     <>
//       <div className='tableName'>{data?.label}</div>
//     </>
//   );
// };

// TableNameNode.displayName = 'TableNameNode';

// export default TableNameNode;
// // export default memo(CustomNode);

import { Node, NodeProps } from 'reactflow';
 
type NodeData = {
  data: {label: string};
};
 
type TableNameNode = Node<NodeData>;
 
export default function TableNameNode({ data }: NodeProps<NodeData>):Node {
    // const label = data.label;
    return (
      <>
        <div>{data.label}</div>
      </>
    );
}