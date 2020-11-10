import {useState, useCallback, useEffect} from 'react';
import _ from 'lodash';

const Tast3 = () => {
    const [inputVal, setInputVal] = useState('')
    const [isStopCountDown, setIsStopCountDown] = useState(false)
    const [isValidInput, setIsValidInput] = useState(false)
    const [count, setCount] = useState(undefined)

    const handleInputChange = useCallback((e) => {
        setInputVal(e.target.value)
    }, [])

    const handleStart = useCallback(() => {
        if (!inputVal) {
            alert("Please enter a number")
            return
        }
        if ( _.isNaN(_.toNumber(inputVal))) {
            alert("Invalid input. Must be a number")
            setInputVal('')
            return
        }
        if (inputVal < 0) {
            alert("Invalid input. Must be parseIn number")
            setInputVal('')
            return
        }
        setIsValidInput(true)
        setCount(parseInt(inputVal))
        setIsStopCountDown(false)
    }, [inputVal])

    const handleStop = useCallback(() => {
        setIsStopCountDown(true)
    }, [])

    useEffect(() => {
        if (!isValidInput || isStopCountDown) {
            return () => {
            }
        }
        const countDown = setInterval(() => {
            setCount(count => count - 1)
        }, 1000)
        return () => {
            clearInterval(countDown)
        }
    }, [isValidInput, isStopCountDown])

    useEffect(() => {
        if (count <= 0) {
            setIsStopCountDown(true)
        }
    }, [count])

    return (
        <>
            <input value={inputVal} onChange={handleInputChange}/>
            <button onClick={handleStart}>Start</button>
            {isValidInput && <button onClick={handleStop}>Stop</button>}
            {count >= 0 && count}
        </>
    )
}

export default Tast3;