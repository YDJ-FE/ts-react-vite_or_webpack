import * as React from 'react'
import ReactEcharts from 'echarts-for-react'

import * as styles from './style.scss'
import option from './option'

interface IProps {
    style?: React.CSSProperties
}

function ChartPie({ style }: IProps) {
    return (
        <div className={styles.chart} style={style}>
            <ReactEcharts option={option} style={{ height: '100%', width: '100%' }} />
        </div>
    )
}

export default ChartPie
