import React, {useCallback, useEffect, useRef, useState} from 'react'

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


const Task = () => {

    const [inputVal, setVal] = useState('')
    const [openModalMode, setModalMode] = useState(false)
    const [logKeyArr, setLogKeyArr] = useState([])
    const inputRef = useRef()

    const handleKeyDown = useCallback(
        (e) => {
            setLogKeyArr((logKeyArr) =>
                ([...logKeyArr, {
                    key: Math.random(),
                    val: keyCode[e.keyCode] ? keyCode[e.keyCode] : e.key
                }])
            )
        }, [])

    useEffect(() => {
        if (!openModalMode) {
            return () => {
            }
        }
        const {current} = inputRef
        if (!(inputRef && current)) {
            return () => {
            }
        }
        current.addEventListener('keydown', handleKeyDown)
        return () => {
            current.removeEventListener('keydown', handleKeyDown)
        }
    }, [openModalMode, handleKeyDown])

    const handleOpenModal = useCallback(() => {
        setModalMode(true)
    }, [])

    const handleChange = useCallback((e) => {
        setVal(e.target.value)

    }, [])

    return (
        <div>
            <input value={inputVal} onChange={handleChange} ref={inputRef}/>
            <button onClick={handleOpenModal}> Open Modal</button>
            {logKeyArr.map((item) => (<div key={item.key}>{item.val}</div>))}
        </div>
    )
}

export default Task;