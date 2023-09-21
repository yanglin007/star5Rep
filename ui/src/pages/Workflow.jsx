import React from 'react'
import { FlowChartWithState, Content, Page, Sidebar, SidebarItem } from 'react-work-flow'

// 初始化一个空画板
const chartSimple = {
    offset: {
        x: 0,
        y: 0
    },
    nodes: {
    },
    links: {
    },
    selected: {},
    hovered: {}
}

const Workflow = () => {
    let workFlowValue = {}

    const getWorkFlowChartValue = (newWorkFlowValue) => {
        workFlowValue = newWorkFlowValue
        console.log("work-flow 的JSON数据： ", workFlowValue)
    }
    const validateLink = ({ linkId, fromNodeId, fromPortId, toNodeId, toPortId, chart }) => {
        if (fromNodeId === toNodeId) {
            return false
        }

        return true;
    }

    return (
        <Page>
            <Content>
                <FlowChartWithState initialValue={chartSimple}
                    getWorkFlowChartValue={getWorkFlowChartValue}
                    config={{ validateLink: validateLink }} />
            </Content>
            <Sidebar>
                <div style={{ margin: "10px", padding: "10px", background: "rgba(0,0,0,0.05)" }}>
                    Drag and drop these items onto the canvas.
                </div>
                <SidebarItem type="start" />
                <SidebarItem type="process-queue" />
                <SidebarItem type="process-point" />
                <SidebarItem type="end" />
            </Sidebar>
        </Page>
    )
}

export default Workflow;