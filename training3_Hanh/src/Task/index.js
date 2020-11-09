import React from 'react'

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
            console.log(e.charCode)
            if (e.charCode === 13) {
                this.setState({
                    logKeyArr: [...logKeyArr, 'Enter']
                })
            } else if (e.charCode === 32) {
                this.setState({
                    logKeyArr: [...logKeyArr, 'Space']
                })
            } else if (e.which === 46) {
                this.setState({
                    logKeyArr: [...logKeyArr, 'Delete']
                })
            } else {
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