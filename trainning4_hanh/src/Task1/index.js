import {useState, useEffect, useMemo} from 'react';
import _ from 'lodash';
import axios from 'axios';

const Task1 = () => {
    const [jokes, setJokes] = useState([])
    const [isLoading, setLoading] = useState(false)
    const reqFunc = useMemo(() => {
        return async () => {
            setLoading(true)
            try {
                const res = await axios('https://official-joke-api.appspot.com/random_joke')
                const data = res.data
                setJokes(jokes => [...jokes, data])
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }

        }
    }, [])

    const getMoreJokes = useMemo(() => {
        return _.debounce(() => {
            reqFunc().catch(e => console.log(e))
        }, 1000)
    }, [reqFunc])

    useEffect(() => {
        reqFunc().catch(err => console.error(err))
    }, [reqFunc])

    return (
        <>
            <button style={{padding: 10, color: 'grey', margin: '0 auto'}} onClick={getMoreJokes}>Get more joke</button>
            {isLoading && <div>Loading...</div>}
            {jokes.map((item) => (
                <div key={item.id} style={{padding: 10, margin: 10, border: ' 1px solid grey'}}>
                    punchline: {item.punchline}<br/>
                    setup: {item.setup}<br/>
                </div>
            ))}
        </>
    )
}

export default Task1;