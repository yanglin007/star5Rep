import React, { useState } from 'react'
import {
    ApiOutlined, NodeIndexOutlined, UnorderedListOutlined,
    VerticalAlignBottomOutlined, SettingOutlined, DatabaseOutlined,
    MessageOutlined, FilePdfOutlined, DeliveredProcedureOutlined
} from '@ant-design/icons';
import Config from '../pages/Config';
import Display from '../pages/Display/index';
import Header from './Header';
import RuleManage from '../pages/RuleManage';
import FetchData from '../pages/FetchData';
import AddFlow from "../pages/AddFlow"
import FlowList from "./flowManage/list/index"

export default function Navigation() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState();
    const onClick = (index, data) => {
        setActiveIndex(index);
        data && setData(setData);
    }
    const arr = [
        { label: "Flow List", icon: <UnorderedListOutlined />, component: <FlowList setFlow={(data)=>setData(data)} onChangeTab={onClick} />, title: "Workflow List" },
        { label: "Add Flow", icon: <NodeIndexOutlined />, component: < AddFlow data={data} />, title: "Workflow" },
        { label: "Mapping", icon: <ApiOutlined />, component: <RuleManage />, title: "Mapping Rule  Manage" },
        // { label: "Fetch", icon: <VerticalAlignBottomOutlined />, component: <FetchData />, title: "Fetch Data" },
        { label: "Display", icon: <DatabaseOutlined />, component: <Display />, title: "Data Display", noTitle: true },
        // // { label: "Ask", icon: <MessageOutlined />, component: <Ask />, title: "Data analyze" },
        // { label: "Report", icon: <FilePdfOutlined /> },
        // { label: "Publish", icon: <DeliveredProcedureOutlined /> },
        // { label: "Config", icon: <SettingOutlined />, component: <Config />, title: "System Config" }
    ];
    return (
        <div className='container'>
            <div className='navigation'>
                <ul className='list'>
                    {arr.map((item, index) => <li key={index} className={`item ${activeIndex === index ? "active" : null}`} onClick={() => onClick(index)}>
                        <span className='icon'>{item.icon}</span>
                        <span className='text'>{item.label}</span>
                    </li>)}
                    <div className='circle' style={{ transform: [`translateX(${activeIndex * 70}px)`] }}></div>
                </ul>
            </div >
            {!arr[activeIndex].noTitle && <Header title={arr[activeIndex].title} />}
            <div className={`content ${arr[activeIndex].label.toLocaleLowerCase()}`}>
                {arr[activeIndex].component}
            </div>
        </div>
    )
}
