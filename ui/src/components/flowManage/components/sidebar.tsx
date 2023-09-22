import React from 'react';
import { useEffect, useState } from 'react';
import { getList } from '../../../api/common.api';

export default () => {
  const [libs, setLibs] = useState([])
  const onDragStart = (event: any, nodeType: any, nodeLabel: any, nodeId: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/label', nodeLabel);
    event.dataTransfer.setData('application/id', nodeId);
    event.dataTransfer.effectAllowed = 'move';
  };

  useEffect(() => {
    const func = async () => {
      const { response } = await getList({ action: "getLib", filter: "" })
      if (response) {
        setLibs(response.data)
      }
    };
    func();
  }, [])


  return (
    <aside>
      <div className="description">Drag to add flow:</div>
      {/* <div
        className="dndnode input"
        onDragStart={(event) => {
          event.stopPropagation();
          onDragStart(event, 'input');
        }}
        draggable
      >
        开始节点
      </div> */}
      {libs.map((item:any)=> <div
        className="dndnode"
        onDragStart={(event) => {
          event.stopPropagation();
          onDragStart(event, 'custom', item.lib_name, item.lib_id);
        }}
        draggable
      >
       {item.lib_name}
      </div>)}
      {/* <div
        className="dndnode output"
        onDragStart={(event) => {
          event.stopPropagation();
          onDragStart(event, 'output');
        }}
        draggable
      >
        结束节点
      </div> */}
    </aside>
  );
};
