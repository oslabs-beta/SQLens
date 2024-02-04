/**  This component renders our main react flow nodes */

import { NodeProps } from 'reactflow';
import TableHeader from './TableHeader';
import { FaHand } from 'react-icons/fa6';
import AddTable from './AddTable';

export type TurboNodeData = {
  label: string;
};

export default function TurboNode({ data }: NodeProps<TurboNodeData>) {
  return (
    <>
      {/* Top right icon */}
      <div className='cloud gradient'>
        <div>
          <FaHand />
        </div>
      </div>
      {/* Main Turbo Node div with wrapping colors */}
      <div className='wrapper gradient'>
        <div className='inner'>
          {/* Conditionally renders Add Table or Table Name header */}
          {data.label === 'Add New Table' ? (
            <AddTable data={data} />
          ) : (
            <TableHeader data={data} />
          )}
        </div>
      </div>
    </>
  );
}

TurboNode.displayName = 'TurboNode';
