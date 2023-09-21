const echartConfig = {
    line: [{
        title: 'value/X Axis',
        key: 'xAxis',
        dropItem: 1,
        type: 'string',
        length: 1,
        dec: 'x axis, data type is string',
        items: []
    },
    {
        title: 'value/Y Axis',
        key: 'yAxis',
        dropItem: 2,
        type: 'value',
        length: 10,
        dec: 'y axis, data type is numer',
        chartSelectOpt: [{
            name: 'line chart',
            value: 'line'
        }, {
            name: 'bar chart',
            value: 'bar'
        }],
        items: []
    }
    ],
    bar: [{
        title: 'value/X Axis',
        key: 'xAxis',
        dropItem: 1,
        dec: 'x axis, data type is string',
        type: 'string',
        length: 1,
        items: []
    },
    {
        title: 'value/Y Axis',
        key: 'yAxis',
        dropItem: 2,
        type: 'value',
        dec: 'y axis, data type is string',
        chartSelectOpt: [{
            name: 'line chart',
            value: 'line'
        }, {
            name: 'bar chart',
            value: 'bar'
        }],
        length: 10,
        items: []
    }
    ],
    pie: [{
        title: 'data item',
        key: 'series',
        dropItem: 1,
        dec: 'data type is number！',
        type: 'value',
        length: 10,
        items: []
    }]
}

export default echartConfig;