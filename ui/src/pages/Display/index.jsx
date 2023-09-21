import React, { useState, useRef } from 'react'
import { Tabs } from 'antd';
import ChartSettingBoard from '../../components/Chart/ChartSettingBoard'
import DataList from './DataList';
export default function Display() {
    return (
        <>
            <Tabs tabPosition="left" defaultActiveKey="1" items={[
                {
                    key: '1',
                    label: 'Table',
                    children: <DataList />
                },
                {
                    key: '2',
                    label: 'Chart',
                    children: <ChartSettingBoard />
                }]} />

        </>
    )
}
