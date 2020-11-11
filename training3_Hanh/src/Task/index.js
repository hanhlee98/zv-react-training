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

    const handleOpenModal = useCallback(() => {
        setModalMode(true)
    }, [])

    const handleChange = useCallback((e) => {
        setVal(e.target.value)

    }, [])

    useEffect(() => {
        if (!openModalMode) {
            return () => {
            }
        }
        if (!inputRef.current) {
            return () => {
            }
        }
        const handleKeyDown = (e) => {
            if (openModalMode) {
                setLogKeyArr((logKeyArr) =>
                    ([...logKeyArr, {
                        key: Math.random(),
                        val: keyCode[e.keyCode] ? keyCode[e.keyCode] : e.key
                    }])
                )
            }
        }
        inputRef.current.addEventListener('keydown', handleKeyDown)
        return () => {
            inputRef.current.removeEventListener('keydown', handleKeyDown)
        }
    }, [openModalMode])

    return (
        <div>
            <input value={inputVal} onChange={handleChange} ref={inputRef}/>
            <button onClick={handleOpenModal}> Open Modal</button>
            {logKeyArr.map((item) => (<div key={item.key}>{item.val}</div>))}
        </div>
    )
}

export default Task;