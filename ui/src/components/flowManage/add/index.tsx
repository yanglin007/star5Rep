import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  useReactFlow,
  MarkerType,
} from 'react-flow-renderer';
import { Drawer } from "antd"
import Sidebar from '../components/sidebar';
import UpdateNode from '../components/nodeContent';
import UpdateEdge from '../components/edgeContent';
import CustomNode from '../components/customNode';
// 示例效果
import { nodes as listNodes, edges as listEdges } from './data';

import './index.less';
import FlowBtn from './FlowBtn';
import { typeMap } from '../components/config';
import { getList } from '../../../api/common.api';
import { transOptions } from '../../../utils';

const nodeTypes = {
  custom: CustomNode,
};

const oldNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'start', nodeBg: '#ffffff', isHidden: false, id: '1' },
    style: { backgroundColor: '#ffffff' },
    className: 'nodeStyle',
    position: { x: 200, y: 60 },
  },
];
let initialNodes: any = [];
let initialEdges: any = [];


let id = 1;
const getId = () => {
  id += 1;
  return `${id}`;
};
let initialConfigs:any ={};

const SmoothTransition = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeInfo, setNodeInfo] = useState<any>({});
  const [edgeInfo, setEdgeInfo] = useState<any>({});
  const [nodeShow, setNodeShow] = useState<boolean>(false);
  const configRef=useRef(null);
  const [config,setConfig]=useState({});
  const [configs,setConfigs]=useState(initialConfigs);
  const [rules,setRules]=useState();
  //add edges
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        params.markerEnd = {
          type: MarkerType.ArrowClosed,
        };
        return addEdge(params, eds);
      }),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // delete node
  const onChange = (nodeId: string) => {
    setNodes((nds) => nds.filter((item) => item.id !== nodeId));
  };

  // add drag node
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/label');
      const typeId = event.dataTransfer.getData('application/id');
      const config = event.dataTransfer.getData('application/config');

      console.log('label', label)
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
  
      const newNode: any = {
        id: getId(),
        type,
        position,
        className: 'nodeStyle',
        data: { label: '', isHidden: false },
        height:"60px"
      };
      if (type === 'custom') {
        newNode.data.onChange = onChange;
        newNode.dragHandle = '.nodelabel';
        newNode.data.label = label;
        newNode.data.typeId = typeId;
      }

      setNodes((nds) => nds.concat(newNode));

      setNodeInfo({
        ...newNode.data,
        id:newNode.id,
        nodeBg: newNode.style && newNode.style.background ? newNode.style.background : '#ffffff',
      });
      setConfig({...config});
      setNodeShow(true);

    },
    [reactFlowInstance],
  );

  // click node
  const onNodeClick = (e: any, node: any) => {
    console.log("click", node);
    setNodeInfo({
      ...node.data,
      id: node.id,
      nodeBg: node.style && node.style.background ? node.style.background : '#ffffff',
    });
    setNodeShow(true);
    setConfig(configs[node.id]);
    console.log("click configs",nodes)
  };

  // click edge
  const onEdgeClick = (e: any, edge: any) => {
    setEdgeInfo(edges.find((item) => edge.id === item.id));
    setNodeShow(false);
  };

  // change node
  const changeNode = (val: any) => {
    setNodes((nds) =>
      nds.map((item) => {
        if (item.id === val.id) {
          item.data = val;
          item.hidden = val.isHidden;
          item.style = { background: val.nodeBg };
        }
        return item;
      }),
    );
    // console.log(val, nodes)
  };

  // change edge
  const changeEdge = (val: any) => {
    setEdges((nds) =>
      nds.map((item) => {
        if (item.id === val.id) {
          item.label = val.label;
          item.type = val.type;
          item.style = { stroke: val.color };
        }
        return item;
      }),
    );
    // console.log(val, edges)
  };

  const { setViewport } = useReactFlow();
  setViewport({ x: 0, y: 0, zoom: 1 });
  const setFlow = (flow) => {
    setNodes(flow.nodes);
    setEdges(flow.edges);
    setConfigs(flow.configs);
  }
  const onClose=()=>{
    const config=configRef.current.getData();
    console.log("onclose",nodeInfo)
    setConfigs({...configs,[nodeInfo.id]:config});
    setTimeout(() => setNodeShow(false), 0)
  }
  useEffect(()=>{
    const getData = async () => {
      const { response } = await getList({ action: "getRule", filter:"" });
      if (response) {
        const r=transOptions(response.data);
        setRules(r);
      }
    }
    getData();
    setNodes(initialNodes);
    setEdges(initialEdges);
    console.log("nodes",initialNodes);
    console.log("edges",initialEdges);
  },[])
  return (
    <>
      <FlowBtn nodes={nodes} edges={edges} configs={configs} setFlow={setFlow} onChange={onChange}/>
      <div className="dndflow">
        <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            defaultPosition={[0, 0]}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Drawer title={typeMap[nodeInfo.typeId]?.title} placement="right" onClose={onClose} open={nodeShow}>
              {typeMap[nodeInfo.typeId]&&React.cloneElement(typeMap[nodeInfo.typeId]?.comp,{ref:configRef,config:config,rules})}
            </Drawer>
            {/* {nodeShow ? (
              <UpdateNode info={nodeInfo} onChange={changeNode} />
            ) : (
              <UpdateEdge info={edgeInfo} onChange={changeEdge} />
            )} */}
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </>
  );
};

const AddFlow = (props) => {
  console.log("adddflow",props)
  const { data } = props;
  if (data) {
    initialNodes = JSON.parse(data.node_list);
    initialEdges = JSON.parse(data.edge_list);
    initialConfigs= JSON.parse(data.config_list);
  } else {
    initialNodes = oldNodes;
    initialEdges = [];
    initialConfigs={};
  }
  return (
    <ReactFlowProvider>
      <SmoothTransition />
    </ReactFlowProvider>
  );
};

export default AddFlow;
