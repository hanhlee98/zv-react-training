import React from 'react'

const keyCode = {
    13: ' enter',
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
    38: 'up arrow	'
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
    handleKeyPress = (e) => {
        const {openModalMode, logKeyArr} = this.state

        if (openModalMode) {
            if (keyCode[e.charCode]) {
                this.setState({
                    logKeyArr: [...logKeyArr, keyCode[e.charCode]]
                })
            }
            else {
                this.setState({
                    logKeyArr: [...logKeyArr, e.key]
                })
            }
        }
    }

    render() {
        const {inputVal, logKeyArr} = this.state
        return (
            <div>
                <input value={inputVal} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                <button onClick={this.handleOpenModal}> Open Modal</button>
                {logKeyArr.map((item) => (<div key={Math.random()}>{item}</div>))}
            </div>
        )
    }
}

export default Task;