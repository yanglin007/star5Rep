
import jsPDF from "jspdf";
import "jspdf-autotable";
import CustomNode from "../components/flowManage/components/customNode";
import { typeMap } from "../components/flowManage/components/config";
const nodeTypes = {
    custom: CustomNode,
  };

export const inWindow = (left, top, startPosX, startPosY) => {
    let H = document.body.clientHeight;
    let W = document.body.clientWidth;
    if ((left < 20 && startPosX > left) || (left > W - 20 && startPosX < left) ||
        (top < 20 && startPosY > top) || ((top > H - 20 && startPosY < top))) {
        document.body.onmousemove = null;
        document.body.onmouseup = null;
        return false;
    }
    return true;

}
export const onMove = (e, id, setStyleLeft, setStyleTop) => {
    e.preventDefault();
    let startPosX = e.clientX;
    let startPosY = e.clientY;
    const tar = document.querySelector(id);
    const x = tar.offsetLeft;
    const y = tar.offsetTop;

    document.body.onmousemove = e => {
        let left = e.clientX - startPosX + x;
        let top = e.clientY - startPosY + y;
        if (inWindow(e.clientX, e.clientY, startPosX, startPosY)) {
            setStyleLeft(left);
            setStyleTop(top);
        }
    };
    document.body.onmouseup = function () {
        document.body.onmousemove = null;
    };
}

export const generatePDF = (myChart) => {
    var url = myChart.getConnectedDataURL({
        pixelRatio: 2,
        backgroundColor: '#fff',
        excludeComponents: [
            'toolbox',
        ],
        type: 'png'
    })
    const pdf = new jsPDF('p', 'pt')
    //pdf.addImage(url, 5, 5, 580, 300, 'img')
    pdf.addImage(url, "PNG", 10, 10)
    pdf.save('chart' + '.pdf')
}

export const generateWordDoc = (id) => {

    const html = document.querySelector(id).innerHTML;

    const doc = new jsPDF();

    doc.addHTML(html, function () {
        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "output.doc";
        link.click();
        URL.revokeObjectURL(url);
    });
}


export const toSaveFlow=(data)=>{
    let res={};
    res.node_list=JSON.stringify(data.nodes);
    res.edge_list=JSON.stringify(data.edges);
    res.config_list=JSON.stringify(data.configs);
    let flow=[];
    data.nodes.forEach(item => {
        if(item.data.typeId){
            flow.push({lib_id:item.data.typeId,config:data.configs[item.id]});
        }
    });
    res.libs=flow;
    return res;
}
export const createNode=(id,position,data,onChange,typeId)=>{
    
    const newNode= {
        id,
        type:"custom",
        position,
        className: 'nodeStyle',
        data: { label: '', isHidden: false },
        height:"60px",
        width:"140px"
      };
     
        newNode.data.onChange = onChange;
        newNode.dragHandle = '.nodelabel';
        newNode.data.label = data.title;
        newNode.data.typeId = typeId;
      return newNode;
}
export const createFlowData=(props,data=[])=>{
    let x=200;
    let y=60;
    let edges=[];
    let configs=[];
    let id=1;
    let nodes=[{
        id: '1',
        type: "input",
        data: { label: 'start', nodeBg: '#ffffff', isHidden: false, id: '1' },
        style: { backgroundColor: '#ffffff' },
        className: 'nodeStyle',
        position: { x, y },
      }
    ];
    let len=data.length;
    data.forEach((item,index)=>{
        item=parseInt(item);
        const map=typeMap[item];
        let prev=(index+1)+"";
        let now=(index+2)+"";
        const node=createNode(now,{x,y:70+(index+1)*60},map,props.onChange,item);
        nodes.push(node);
        if(index!=len){
             edges.push({id: 'e'+(prev)+'-'+now, source:prev, target:now})
        }
       
    })
    
    return {nodes,edges,configs}  
}

export const transOptions=(data)=>{
    let arr=[];
    data.forEach(item=>{
        arr.push({value:item.rule_id,label:item.rule_name});
    })
    return arr;
}