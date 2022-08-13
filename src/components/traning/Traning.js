import { nanoid } from 'nanoid'
import React from 'react'
import { useState } from 'react'
import './Traning.scss'

export default function Traning() {
    const [traningDate, setTraningDate] = useState('')
    const [traningPassed, setTraningPassed] = useState(0)
    const [traningArr, setTraningArr] = useState([
        { id: '1wefw43434f', date: '16.10.22', passed: 12 },
        { id: '1wefwewrwer4f', date: '11.10.22', passed: 13 },
        { id: '1wewerwer434f', date: '23.10.22', passed: 9 },
        { id: '1werttyu34f', date: '15.10.22', passed: 6 },
        { id: '1wefgfhgh34f', date: '30.10.22', passed: 17 }
    ])

    const handleAdd = event => {
        event.preventDefault()
        if (traningDate !== '' && traningPassed !== 0 && traningPassed !== '') {
            if (traningArr.find(item => item.date === traningDate)) {
                const indx = traningArr.findIndex(item => item.date === traningDate)
                const newarr = [...traningArr]
                const newelem = traningArr[indx]
                newelem.passed = Number(newelem.passed) + Number(traningPassed)
                newarr[indx] = newelem
                setTraningArr(newarr)
            } else {
                const newarr = [...traningArr];
                newarr.push({ id: nanoid(), date: traningDate, passed: traningPassed })
                setTraningArr(newarr)
            }
            setTraningDate('')
            setTraningPassed(0)
        }
    }
    const handleDel = event => {
        setTraningArr(traningArr.filter(item => item.id !== event.target.dataset.id))
    }
    const handleChange = event => {
        const changeElem = traningArr.find(item => item.id === event.target.dataset.id)
        setTraningDate(changeElem.date)
        setTraningPassed(changeElem.passed)
    }
    return (
        <div className='traning'>
            <form action="" className='traning__form' onSubmit={handleAdd}>
                <div className='traning__data-area'>
                    <label htmlFor="">Дата(ДД.ММ.ГГ):</label>
                    <input type="text" className='traning__data-input' value={traningDate} onChange={event => setTraningDate(event.target.value)} />
                </div>
                <div className='traning__passed-area'>
                    <label htmlFor="">Пройдено:</label>
                    <input type="text" className='traning__passed-input' value={traningPassed} onChange={event => setTraningPassed(event.target.value)} />
                </div>
                <div className='traning__button-area'>
                    <button className='traning__button'>Добавить</button>
                </div>
            </form>
            <ul className='traning__list-title'>
                <li>Дата(ДД.ММ.ГГ)</li>
                <li>Пройдено</li>
                <li>Действия</li>
            </ul>
            <ul className='traning__list'>
                {traningArr.sort((a, b) => {
                    const A = a.date.split('.')
                    const B = b.date.split('.')
                    const AA = new Date('20' + A[2], A[1] - 1, A[0],)
                    const BB = new Date('20' + B[2], B[1] - 1, B[0],)
                    return AA - BB
                }).map(item =>
                    <li className='traning__item' key={item.id}>
                        <p className='traning__date'>{item.date}</p>
                        <p className='traning__passed'>{item.passed}</p>
                        <div className='traning__button-group'>
                            <p className='traning__change-button'>
                                <span data-id={item.id} onClick={handleChange}>✎</span>
                            </p>
                            <p className='traning__del-button'>
                                <span data-id={item.id} onClick={handleDel}>✖</span>
                            </p>
                        </div>
                    </li>)}
            </ul>
        </div>
    )
}
