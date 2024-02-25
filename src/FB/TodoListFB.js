import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../App'
import { ref } from 'firebase/database'
import { db } from './conf'

export default function TodoListFB() {
    const { user } = useContext(MyContext)
    const [text, setText] = useState('')
    const [list, setList] = useState([])

    function addItem() {
        if (text === '') return
        ref(db, 'myTodos')
        setText('')
    }

    useEffect(() => {
        if (user) {

        }
    }, [user])

    return (
        <div>
            <span>Todos List FB </span>
            <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={addItem}>ADD</button>
            <button >DELETE ALL</button>
            <ol>
                {
                    list.map((item) =>
                        <li>
                            {item}
                        </li>
                    )
                }
            </ol>
        </div>
    )
}
