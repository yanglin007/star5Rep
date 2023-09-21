import React, { Component } from 'react';
import { Row, Col } from 'antd'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropElement from './DropElement';
import update from 'immutability-helper';
import './chartSettingBoard.css'

import ConfigDropBox from './ConfigDropBox'
import DragElement from './DragElement'
import echartConfig from './echartConfig';
import { Input, Space } from 'antd'
const { TextArea } = Input;;
const pieData = [
    { value: 335, name: 'share1', type: 'value', id: 0, color: '#9CC5B0' },
    { value: 310, name: 'share2', type: 'value', id: 1, color: '#C9856B' },
    { value: 234, name: 'share3', type: 'value', id: 2, color: '#6F9FA7' },
    { value: 135, name: 'share4', type: 'value', id: 3, color: '#334553' },
    { value: 1548, name: 'share5', type: 'value', id: 4, color: '#B34038' }
]
export class ChartSettingBoard extends Component {

    constructor(props) {
        super(props);
        this.dragEleMove = this.dragEleMove.bind(this);
        this.beginDrag = this.beginDrag.bind(this)
        // this.canDrop = this.canDrop.bind(this)
        this.endDrag = this.endDrag.bind(this)
        this.delItem = this.delItem.bind(this)
        this.changeItem = this.changeItem.bind(this)
    }

    state = {
        activeId: '',
        activeDropId: '',
        itemList: pieData,
        dropConfig: echartConfig['pie']
    }

    dragEleMove(id) {
        this.setState({ activeDropId: id })
    }

    beginDrag(id) {
        this.setState({ activeId: id })
    }

    // canDrop(id) {
    //     const { itemList, activeId, dropConfig } = this.state;
    //     if (activeId && itemList[activeId].type != dropConfig[id].type) {
    //         return false;
    //     }
    //     return true
    // }

    endDrag() {
        const { itemList, activeId, dropConfig, activeDropId } = this.state;
        // const ilist = update(itemList, { $splice: [[activeId, 1]] })
        const dlist = update(dropConfig, { [activeDropId]: { items: { $push: [itemList[activeId]] } } })
        this.setState({ dropConfig: dlist })
    }

    delItem(item, pitem, pid) {
        const { itemList, dropConfig } = this.state;
        for (let i = 0; i < pitem.items.length; i++) {
            if (pitem.items[i].id === item.id) {
                pitem.items.splice(i, 1);
                break;
            }
        }
        // const nlist = update(itemList, { $push: [item] })
        const dropList = update(dropConfig, { [pid]: { $set: pitem } })
        this.setState({ dropConfig: dropList })
    }



    changeItem(value, key, id, pid) {
        const { dropConfig } = this.state;
        const nitem = { ...dropConfig[pid].items[id] }
        nitem[key] = value;
        const dropList = update(dropConfig, { [pid]: { items: { [id]: { $set: nitem } } } })
        this.setState({ dropConfig: dropList })
    }

    render() {
        const { itemList, dropConfig } = this.state
        const leftItems = itemList.map((item, idx) => {
            return (
                <div key={idx}>
                    <DragElement item={item} beginDrag={this.beginDrag} id={idx} endDrag={this.endDrag} />
                </div>
            )
        })

        const dropList = dropConfig.map((item, idx) => {
            const items = item.items.map((sitem, sid) => {
                return (
                    <DropElement key={sid} item={sitem} pitem={item} pid={idx} delItem={this.delItem} changeItem={(value, key) => this.changeItem(value, key, sid, idx)} />
                )
            })

            return (
                <Col sm={10} key={idx} >
                    <ConfigDropBox move={this.dragEleMove} item={item} id={idx} >
                        {items}
                    </ConfigDropBox>
                </Col>
            )
        })
        return (
            // <div className='chartSettingBoard'>
            //     <Row gutter={10}>
            //         <Col sm={18}>
            //             <Row gutter={10}>
            //                 {dropList}
            //             </Row>
            //         </Col>
            //         <Col sm={6}>
            //             {leftItems}
            //         </Col>
            //     </Row>
            // </div>
            <div className='workflow'>
                <Space.Compact block>
                    <TextArea
                        placeholder="Autosize height with minimum and maximum number of lines"
                        autoSize={{
                            minRows: 2,
                            maxRows: 6,
                        }}
                    />search</Space.Compact>
                <div className='workflow-edit'>
                    {dropList}
                    {leftItems}
                </div>
            </div>
        )
    }
}


export default DragDropContext(HTML5Backend)(ChartSettingBoard);