import * as React from 'react'
import ReactEcharts from 'echarts-for-react'

import option from './option'

function ChartAreaStack() {
    return <ReactEcharts option={option} style={{ height: 600, width: '100%' }} />
}

export default ChartAreaStack
