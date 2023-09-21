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
      <div
        className="dndnode"
        onDragStart={(event) => {
          event.stopPropagation();
          onDragStart(event, 'custom', 'Fetch Data', 1);
        }}
        draggable
      >
        Fetch Data
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => {
          event.stopPropagation();
          onDragStart(event, 'custom', 'generate  report', 2);
        }}
        draggable
      >
        generate report
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => {
          event.stopPropagation();
          onDragStart(event, 'custom', 'generate chart', 3);
        }}
        draggable
      >
        generate chart
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => {
          event.stopPropagation();
          onDragStart(event, 'custom', 'Publish', 4);
        }}
        draggable
      >
        Publish
      </div>
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
