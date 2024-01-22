// import { memo } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const ColumnNameNode = ({ data }: NodeProps) => {
  return (
    <div className="column-name-node">
      <Handle type='target' position={Position.Left} />
      <Handle type='source' position={Position.Right} />
      {/* <div className='tableName'>{data.label}</div> */}
      <Typography variant="body1" gutterBottom>{data.label}</Typography>
      <IconButton aria-label='delete' size='small'>
        <DeleteIcon fontSize='inherit' />
      </IconButton>
    </div>
  );
};

ColumnNameNode.displayName = 'ColumnNameNode';

export default ColumnNameNode;
// export default memo(CustomNode);

// import { useCallback } from 'react';


// const handleStyle = { left: 10 };

// function TextUpdaterNode({ data, isConnectable }) {
//   const onChange = useCallback((evt) => {
//     console.log(evt.target.value);
//   }, []);

//   return (
//     <div className="text-updater-node">
//       <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
//       <div>
//         <label htmlFor="text">Text:</label>
//         <input id="text" name="text" onChange={onChange} className="nodrag" />
//       </div>
//       <Handle
//         type="source"
//         position={Position.Bottom}
//         id="a"
//         style={handleStyle}
//         isConnectable={isConnectable}
//       />
//       <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
//     </div>
//   );
// }

// export default TextUpdaterNode;
