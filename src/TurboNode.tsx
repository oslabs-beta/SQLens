import React, { memo, ReactNode } from 'react';
import { Handle, NodeProps, Position, Node } from 'reactflow';
import { FiCloud } from 'react-icons/fi';
import { AiOutlineDrag } from "react-icons/ai";
// import TableMenu from "./TableMenu";
// import { useState } from "react";
// import { Check } from "@mui/icons-material";
// import { IconButton, Typography, Box, Button } from "@mui/material";
// import ClearIcon from "@mui/icons-material/Clear";
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import AddColumnDialog from "./AddColumnDialog";

export type TurboNodeData = {
  title: string;
  icon?: ReactNode;
  subline?: string;
};

export default function TurboNode ({ data }: NodeProps<TurboNodeData>) {
  return (
    <>
      <div className="cloud gradient">
        <div>
          <AiOutlineDrag />
        </div>
      </div>
      <div className="wrapper gradient">
        <div className="inner">
          <div className="body">
            {/* {data.icon && <div className="icon">{data.icon}</div>} */}
            <div>
              <div className="title">{data.title}</div>
              {data.subline && <div className="subline">{data.subline}</div>}
            </div>
          </div>
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </div>
      </div>
    </>
  );
}

TurboNode.displayName = 'TurboNode';