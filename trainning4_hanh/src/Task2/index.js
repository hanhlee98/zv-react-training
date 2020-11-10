import {useState, useCallback} from 'react';
import _ from 'lodash';
import axios from 'axios';

import {Input, AutoComplete} from 'antd';

const Task2 = () => {
    const [options, setOptions] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const [value, setValue] = useState('')

    const handleChange = useCallback((event) => {
        setValue(event)
    }, [])

    const handleSearch = useCallback(_.debounce((val) => {
        const main = async () => {
            setLoading(true)
            try {
                const res = await axios({
                    url: `https://restcountries.eu/rest/v2/name/${val}`,
                })
                const data = res.data
                setOptions(data.map((item) => {
                    return {
                        value: item.name,
                        label: (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span>
                                    <a
                                        href={`https://s.taobao.com/search?q=${item.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                    {item.name}
                                  </a>
                                </span>
                            </div>
                        ),
                    };
                }))

            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        main().catch(err => console.error(err))

    },200), [])

    const onSelect = (value) => {
        console.log('onSelect', value);
    };

    return (
        <>
            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{width: 300}}
                options={options}
                onChange={handleChange}
                value={value}
                onSelect={onSelect}
                onSearch={handleSearch}
            >
                <Input.Search size="large" placeholder="Search Country by name" loading={isLoading} enterButton/>
            </AutoComplete>
        </>
    )
}

export default Task2;