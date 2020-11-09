import React from 'react'

const keyCode = {
    13: 'enter',
    8: 'backspace',
    9: 'tab',
    16: 'shift',
    17: 'ctrl',
    18: 'alt',
    19: 'pause/break',
    27: 'caps lock20escape',
    32: '(space)',
    33: 'page up',
    34: 'page down',
    35: 'end',
    36: 'home',
    37: 'left arrow',
    38: 'up arrow',
    46: ''
}


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: '',
            openModalMode: true,
            logKeyArr: []
        }
    }

    handleOpenModal = () => {
        this.setState({
            openModalMode: true
        })
    }
    handleChange = (e) => {
        this.setState({
            inputVal: e.target.value
        })

    }
    handleKeyDown = (e) => {
        const {openModalMode, logKeyArr} = this.state
        if (openModalMode) {
            this.setState({
                logKeyArr: [...logKeyArr, {
                    key: Math.random(),
                    val: keyCode[e.keyCode] ? keyCode[e.keyCode] : e.key
                }]
            })
        }
    }

    render() {
        const {inputVal, logKeyArr} = this.state
        return (
            <div>
                <input value={inputVal} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
                <button onClick={this.handleOpenModal}> Open Modal</button>
                {logKeyArr.map((item) => (<div key={item.key}>{item.val}</div>))}
            </div>
        )
    }
}

export default Task;