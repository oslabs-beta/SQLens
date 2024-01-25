import React, { memo, ReactNode, useState } from 'react';
import { Handle, NodeProps, Position, Node } from 'reactflow';
import TableHeader from './TableHeader';
import { FaHand } from "react-icons/fa6";
import AddTable from './AddTable';

export type TurboNodeData = {
  title?: string;
  // icon?: ReactNode;
  // subline?: string;
  label: string;
  parent?: string;
  fetchAndUpdateTables?: ()=> void ;
};

export default function TurboNode ({ data }: NodeProps<TurboNodeData>) {

  return (
    <>
      <div className="cloud gradient">
        <div>
          <FaHand />
        </div>
      </div>
      <div className="wrapper gradient">
        <div className="inner">
        {data.label === "Add New Table" ? <AddTable data={data} /> : <TableHeader data={data} />}
          {/* <AddTable data={data} /> */}
          {/* <TableHeader data={data}/> */}
        </div>
        {/* </div> */}

      </div>
    </>
  );
}

TurboNode.displayName = 'TurboNode';
