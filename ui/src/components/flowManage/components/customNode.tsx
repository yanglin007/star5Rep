import React, { memo, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

import { Handle, Position ,useStore} from 'react-flow-renderer';
import { Drawer } from "antd"
import { typeMap } from './config';

export default memo(({ data, id, isConnectable }: any) => {
  const size = useStore((s) => {
    const node = s.nodeInternals.get(id);
  
    return {
      height: "60px",
    };
  });
  // console.log("customnodes",data)
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="my_handle"
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      <div className={`nodeContent ${typeMap[data.typeId].className}`} style={data.style}>
        <div className='title'>{typeMap[data.typeId].icon}{typeMap[data.typeId].name}</div>
        <div className="nodelabel">{data.label}</div>
        <div className="close">
          <CloseOutlined
            onClick={(e) => {
              e.stopPropagation();
              data.onChange(id);
            }}
            className="icon-close"
          />
        </div>
      </div >

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="my_handle"
        isConnectable={isConnectable}
        style={{ bottom:"-24px"}}
      />
    </>
  );
});
