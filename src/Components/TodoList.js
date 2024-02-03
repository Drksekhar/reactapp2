import React, { useState } from 'react'
import { addBtn, delBtn, todolist } from './TodoList2'

export default function TodoList() {
    const [text, setText] = useState('')
    const [list, setList] = useState([])

    function addItem() {
        if (text === '') return

        const newList = [...list]
        newList.push(text)
        setList(newList)
        setText('')
    }
    function deleteAll() {
        setList([])

    }

    return (
        <div>
            <br />
            <span style={todolist}>Todos List 1 </span>
            <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
            <button style={addBtn} onClick={addItem}>ADD</button>
            <button style={delBtn} onClick={deleteAll}>DELETE ALL</button>
            <br />
            <br />
            <hr />
            {
                list.map((item) =>
                    <li>
                        {item}
                    </li>
                )
            }


        </div>
    )
}
