import React from 'react'

interface Size {
    width: number
    height: number
}

interface IP {
    className?: string
    style?: React.CSSProperties
    children?: (props: Size) => React.ReactNode
}

interface IS {
    height: number
    width: number
}

class AutoSizer extends React.Component<IP, IS> {
    state = { height: 0, width: 0 }

    private containerRef: HTMLDivElement = null
    private timer: NodeJS.Timer = null

    listenResize = () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.setSize()
        }, 100)
    }

    setSize = () => {
        if (this.containerRef) {
            const { clientHeight, clientWidth } = this.containerRef
            this.setState({ height: clientHeight, width: clientWidth })
        }
    }

    setRef = (ref: HTMLDivElement) => {
        this.containerRef = ref
        this.setSize()
    }

    bindOrUnbindResize = (type: 'bind' | 'unbind') => {
        const listener = type === 'bind' ? window.addEventListener : window.removeEventListener
        listener('resize', this.listenResize, false)
    }

    componentDidMount() {
        this.bindOrUnbindResize('bind')
    }

    componentWillUnmount() {
        this.bindOrUnbindResize('unbind')
    }

    render() {
        const { className, style, children } = this.props
        const { width, height } = this.state
        return (
            <div className={className} style={style} ref={this.setRef}>
                {children({ width, height })}
            </div>
        )
    }
}

export default AutoSizer
